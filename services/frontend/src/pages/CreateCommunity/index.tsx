// Core
import { useState } from "react";

// Components
import { AuthLayout } from "components/Layouts/AuthLayout";
import { DefaultButton } from "components/Buttons/DefaultButton";

// Form
import GeneralInfo, { GeneralInfoValuesType } from "./GeneralInfo";
import Governance, { GovernanceValuesType } from "./Governance";

// Wagmi
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

// Utils
import { communityFactoryAbi, contractAddresses } from "utils/constants";
import { Networks } from "utils/networks";

// Others
import Navigation from "./Navigation";

/*eslint-disable*/

export default function CreateCommunity() {
  const network = localStorage.getItem("network") || Networks.Sepolia;
  console.log(network);
  const [activeStep, setActiveStep] = useState(1);
  const [generalInfoValues, setGeneralInfoValues] =
    useState<GeneralInfoValuesType>({
      name: null,
      latitude: null,
      longitude: null,
    });
  const [governanceValues, setGovernanceValues] =
    useState<GovernanceValuesType>({
      votingDelay: null,
      votingPeriod: null,
      quorumPercentage: null,
      minDelay: null,
    });
  console.log(contractAddresses);
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddresses["31337"]["communityFactory"] as `0x${string}`,
    abi: communityFactoryAbi,
    functionName: "createCommunity",
  });

  const { data, write, error, isError } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  console.log(isSuccess);
  console.log(isLoading);
  console.log(prepareError);
  console.log(isPrepareError);
  console.log(error);
  console.log(isError);

  const canSave = () => {
    if (activeStep === 1) {
      return Object.values(generalInfoValues).every(
        (val) => val !== null && val !== ""
      );
    } else if (activeStep === 2) {
      return Object.values(governanceValues).every(
        (val) => val !== null && val !== ""
      );
    }
  };

  const handleNext = () => {
    if (activeStep === 2) {
      const args = { ...generalInfoValues, ...governanceValues };
      return write?.();
    }

    setActiveStep(activeStep + 1);
  };

  const getStep = (step: Number) => {
    let props;
    switch (step) {
      case 1:
        props = {
          values: generalInfoValues,
          onChange: setGeneralInfoValues,
        };

        return { form: <GeneralInfo {...props} />, buttonText: "Next" };
      case 2:
        props = {
          values: governanceValues,
          onChange: setGovernanceValues,
        };
        return { form: <Governance {...props} />, buttonText: "Almost there!" };
      default:
        return { form: <></>, buttonText: "Next" };
    }
  };
  return (
    <AuthLayout title="Create an Energy Community">
      <div className="sm:pb-8">
        <Navigation activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>

      <form>
        {getStep(activeStep).form}
        <DefaultButton
          onClick={handleNext}
          type="submit"
          color="cyan"
          className="mt-8 w-full"
          disabled={!canSave()}
        >
          {getStep(activeStep).buttonText}
        </DefaultButton>
      </form>
    </AuthLayout>
  );
}
