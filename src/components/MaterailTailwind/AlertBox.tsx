// import { Alert } from "@material-tailwind/react";
// import './ComponentsStyles/components-tailwind.css';
// import type { AlertProps } from "@material-tailwind/react";

// type CustomAlertProps = AlertProps & {
//   alertTitle: string,
//   alertFirstParagraph: string,
//   alertSecondParagraph: string,
//   alertThirdParagraph: string,
//   color:string
// };

// const AlertBox = ({alertTitle, alertFirstParagraph, alertSecondParagraph, alertThirdParagraph, color}: CustomAlertProps) => {
//   return (
//     <div>
//       <Alert className="alertBox font-text" color={color}>
//         <h1 className="text-2xl font-bold mb-5">{alertTitle}</h1>
//         <p>{alertFirstParagraph}</p>
//         <p>{alertSecondParagraph}</p>
//         <hr className="my-2"/>
//         <p>{alertThirdParagraph}</p>
//       </Alert>

//     </div>
//   );
// };

// export default AlertBox;

import { Alert, Button } from "@material-tailwind/react";
import './ComponentsStyles/components-tailwind.css';
import type { AlertProps, ButtonProps } from "@material-tailwind/react";

type MaterialTailwindColor = ButtonProps['color'];

type CustomAlertProps = AlertProps & {
  alertTitle: string,
  alertFirstParagraph: string,
  alertSecondParagraph: string,
  alertThirdParagraph: string,
  color: MaterialTailwindColor,
  colorFirstBtn?: MaterialTailwindColor,
  colorScndBtn?: MaterialTailwindColor,
  primaryButton?: {
    text: string,
    onClick: () => void
  },
  secondaryButton?: {
    text: string,
    onClick: () => void
  }
};

const AlertBox = ({
  alertTitle,
  alertFirstParagraph,
  alertSecondParagraph,
  alertThirdParagraph,
  color,
  primaryButton,
  secondaryButton,
  colorFirstBtn,
  colorScndBtn
}: CustomAlertProps) => {
  return (
    <div>
      <Alert className="alertBox flex justify-center text-center font-text" color={color}>
        <h1 className="text-2xl font-bold mb-5">{alertTitle}</h1>
        <p>{alertFirstParagraph}</p>
        <p>{alertSecondParagraph}</p>
        <hr className="my-2"/>
        <p>{alertThirdParagraph}</p>
        
        {(primaryButton || secondaryButton) && (
          <div className="mt-4 flex justify-center gap-3">
            {primaryButton && (
              <Button
                color={colorFirstBtn}
                onClick={primaryButton.onClick} 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}        
              >
                {primaryButton.text}
              </Button>
            )}
            {secondaryButton && (
              <Button
                color={colorScndBtn}
                onClick={secondaryButton.onClick}
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}              >
                {secondaryButton.text}
              </Button>
            )}
          </div>
        )}
      </Alert>
    </div>
  );
};

export default AlertBox;