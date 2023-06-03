// Core
import { useState, ReactText } from "react";
import { useUser } from "contexts/User.context";
import { toast } from "react-toastify";
import { useWeb3 } from "contexts/Web3.context";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { ContractTransaction } from "ethers";

// Components
import { AuthLayout } from "components/Layouts/AuthLayout";
import { DefaultButton } from "components/Buttons/DefaultButton";

// Form
import GeneralInfo, { GeneralInfoValuesType } from "./GeneralInfo";
/*eslint-disable*/

// Utils
import { communityFactoryAbi, contractAddresses } from "utils/constants";
import { isSupportedChain } from "utils/networks";

// Others
import Navigation from "./Navigation";

export default function CreateCommunity() {
  const { user } = useUser();
  const { web3 } = useWeb3();
  const { chainId } = useMoralis();

  const [activeStep, setActiveStep] = useState(1);
  const [generalInfoValues, setGeneralInfoValues] =
    useState<GeneralInfoValuesType>({
      name: null,
      latitude: null,
      longitude: null,
    });

  /* Contract Calls */
  const {
    runContractFunction: createCommunity,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: communityFactoryAbi,
    contractAddress: contractAddresses["31337"][
      "communityFactory"
    ] as `0x${string}`, // specify the networkId
    functionName: "createCommunity",
    params: { ...Object.values(generalInfoValues) },
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
      const id = toast.loading("Please wait...", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      await createCommunity({
        onSuccess: (tx: any) => handleSuccess(id, tx),
        onError: (error) => handleError(id, error),
      });
    }
  };

  const handleSuccess = async (toastId: ReactText, tx: ContractTransaction) => {
    await tx.wait();
    toast.update(toastId, {
      render: "Community created!",
      type: toast.TYPE.SUCCESS,
      position: "top-right",
      isLoading: false,
      autoClose: 1000,
    });
  };

  const handleError = (toastId: ReactText, error: any) => {
    console.log(error);
    toast.update(toastId, {
      render: "Error creating community!",
      type: toast.TYPE.ERROR,
      position: "top-right",
      isLoading: false,
      autoClose: 1000,
    });
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

      case 2:
        return {
          form: <span>{generalInfoValues.name} was successfully created!</span>,
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
