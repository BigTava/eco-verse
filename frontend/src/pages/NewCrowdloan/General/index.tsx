// Core
import { Dispatch, SetStateAction } from "react";

// Components
import { SelectField } from "components/Fields";
import Datepicker from "components/Fields/Datepicker";

// Utils
import { assets } from "utils/assets";

type TypeEnum = "CONSUMER" | "PROSUMER" | "INVESTOR" | "EXTERNAL";

export const typeEnumToMemberType = {
  CONSUMER: 0,
  PROSUMER: 1,
  INVESTOR: 2,
  EXTERNAL: 3,
};

export type GeneralInfoValuesType = {
  publicAddress: string | null;
  type: TypeEnum | null;
};

export type GeneralInfoProps = {
  values: GeneralInfoValuesType;
  onChange: Dispatch<SetStateAction<GeneralInfoValuesType>>;
};

type typeOptionsType = {
  value: TypeEnum;
  label: string;
};

export const typeOptions: Array<typeOptionsType> = [
  { value: "CONSUMER", label: "Consumer" },
  { value: "PROSUMER", label: "Prosumer" },
  { value: "EXTERNAL", label: "External Entity" },
];

export default function General(props: GeneralInfoProps) {
  const onTypeChange = (e) => {
    props.onChange({ ...props.values, type: e.value });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <Datepicker label="Start Date" />
      <Datepicker label="End Date" />
      <SelectField
        label="Asset Type"
        options={assets}
        name="type"
        className="col-span-full"
        onChange={onTypeChange}
        defaultValue={assets[0]}
        value={assets[0]}
      />
    </div>
  );
}
