// Core
import { useState, ReactText } from "react";
import { useUser } from "contexts/User.context";
import { toast } from "react-toastify";
import { useWeb3 } from "contexts/Web3.context";
import { useWeb3Contract } from "react-moralis";
import { ContractTransaction } from "ethers";
import { useNavigate } from "react-router-dom";

// Components
import { AuthLayout } from "components/Layouts/AuthLayout";
import { DefaultButton } from "components/Buttons/DefaultButton";

// Form
import GeneralInfo, { GeneralInfoValuesType } from "./GeneralInfo";

// Utils
import { communityFactoryAbi, contractAddresses } from "utils/constants";
import { isSupportedChain } from "utils/networks";

// Others
import Navigation from "./Navigation";

export default function NewMember() {
  const navigate = useNavigate();

  const { user } = useUser();
  const { web3 } = useWeb3();

  const [activeStep, setActiveStep] = useState(1);
  const [generalInfoValues, setGeneralInfoValues] =
    useState<GeneralInfoValuesType>({
      name: null,
      latitude: null,
      longitude: null,
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
    console.log(activeStep);
    if (activeStep === 2) {
      navigate("/dashboard");
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
    setActiveStep(2);
  };

  const handleError = (toastId: ReactText, error: any) => {
    /* eslint-disable no-console */
    console.error(error);
    toast.update(toastId, {
      render: "Error creating community!",
      type: toast.TYPE.ERROR,
      position: "top-right",
      isLoading: false,
      autoClose: 1000,
    });
  };

  const getStep = (step: Number) => {
    let props;
    switch (step) {
      case 1:
        props = {
          values: generalInfoValues,
          onChange: setGeneralInfoValues,
        };

        return {
          form: <GeneralInfo {...props} />,
          buttonText: "Let's go!",
        };

      case 2:
        return {
          form: (
            <div className="w-100 text-center">
              {generalInfoValues.name} was successfully created!
            </div>
          ),
          buttonText: "Let's go!",
        };
      default:
        return { form: <></>, buttonText: "Next" };
    }
  };
  return (
    <>
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
    </>
  );
}
