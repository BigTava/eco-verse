// Core
import { useState } from "react";

// Components
import { AuthLayout } from "components/Layouts/AuthLayout";
import { DefaultButton } from "components/Buttons/DefaultButton";

// Form
import GeneralInfo, { GeneralInfoValuesType } from "./GeneralInfo";
import Governance, { GovernanceValuesType } from "./Governance";

// Others
import Navigation from "./Navigation";

/*eslint-disable*/

export default function CreateCommunity() {
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
