// Components
import ReactDatePicker from "react-datepicker";
import Label from "../Label";

// Styles
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { formClasses } from "../styles";

type DatepickerProps = {
  label?: string;
};

export default function Datepicker(props: DatepickerProps) {
  return (
    <div>
      {props.label && <Label id={props.label}>{props.label}</Label>}
      <ReactDatePicker
        showIcon
        selected={new Date()}
        {...props}
        customInput={<input className={formClasses} />}
      />
    </div>
  );
}
