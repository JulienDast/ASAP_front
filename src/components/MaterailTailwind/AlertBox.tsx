import { Alert } from "@material-tailwind/react";
import './ComponentsStyles/components-tailwind.css';
import type { AlertProps } from "@material-tailwind/react";

type CustomAlertProps = AlertProps & {
  alertTitle: string,
  alertFirstParagraph: string,
  alertSecondParagraph: string,
  alertThirdParagraph: string,
  color:string
};

const AlertBox = ({alertTitle, alertFirstParagraph, alertSecondParagraph, alertThirdParagraph, color}: CustomAlertProps) => {
  return (
    <div>
      <Alert className="alertBox font-text" color={color}>
        <h1 className="text-2xl font-bold mb-5">{alertTitle}</h1>
        <p>{alertFirstParagraph}</p>
        <p>{alertSecondParagraph}</p>
        <hr className="my-2"/>
        <p>{alertThirdParagraph}</p>
      </Alert>

    </div>
  );
};

export default AlertBox;