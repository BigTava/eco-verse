// Core
import { useState } from "react";
import { useUser } from "contexts/User.context";
import { toast } from "react-toastify";
import { useWeb3 } from "contexts/Web3.context";

// Components
import { AuthLayout } from "components/Layouts/AuthLayout";
import { DefaultButton } from "components/Buttons/DefaultButton";

// Form
import GeneralInfo, { GeneralInfoValuesType } from "./GeneralInfo";
/*eslint-disable*/
// Wagmi
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useConnect,
  useAccount,
  useEnsName,
} from "wagmi";

// Utils
import { communityFactoryAbi, contractAddresses } from "utils/constants";
import { isSupportedChain } from "utils/networks";

// Others
import Navigation from "./Navigation";

export default function CreateCommunity() {
  const { user } = useUser();
  const { web3 } = useWeb3();

  const [activeStep, setActiveStep] = useState(1);
  const [generalInfoValues, setGeneralInfoValues] =
    useState<GeneralInfoValuesType>({
      name: null,
      latitude: null,
      longitude: null,
    });

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddresses["31337"]["communityFactory"] as `0x${string}`,
    abi: communityFactoryAbi,
    functionName: "createCommunity",
    args: Object.values(generalInfoValues),
  });

  const { data, write, error, isError } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const canSave = () => {
    if (activeStep === 1) {
      return Object.values(generalInfoValues).every(
        (val) => val !== null && val !== ""
      );
    }
  };

  const handleNext = async () => {
    if (!user) {
      return toast.warn("Please Login!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }

    if (!isSupportedChain(await web3.eth.getChainId())) {
      return toast.warn("Please connect to a correct network!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }

    if (activeStep === 1) {
      const args = { ...generalInfoValues };
      try {
        write?.();

        if (isSuccess) {
          return setActiveStep(activeStep + 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getStep = (step: Number) => {
    switch (step) {
      case 1:
        const props = {
          values: generalInfoValues,
          onChange: setGeneralInfoValues,
        };

        return {
          form: <GeneralInfo {...props} />,
          buttonText: "Let's go!",
        };
      default:
        return { form: <></>, buttonText: "Next" };
    }
  };
  return (
    <AuthLayout title="Create an Energy Community">
      <div className="sm:pb-8">
        <Navigation activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>

      {getStep(activeStep).form}
      <DefaultButton
        onClick={handleNext}
        color="cyan"
        className="mt-8 w-full"
        disabled={!canSave()}
      >
        {getStep(activeStep).buttonText}
      </DefaultButton>
    </AuthLayout>
  );
}
