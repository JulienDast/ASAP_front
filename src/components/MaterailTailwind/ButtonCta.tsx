// import { Button } from "@material-tailwind/react";
// import type { ButtonProps } from "@material-tailwind/react";

// type CustomButtonProps = ButtonProps & {
//   buttonText: string,
//   color:string;
// };

// const ButtonCta = ({ buttonText, color }: CustomButtonProps) => {
//   return (
//     <>
//       <Button 
//         placeholder={undefined} 
//         onPointerEnterCapture={undefined} 
//         onPointerLeaveCapture={undefined}
//         color={color}
//       >
//         {buttonText}
//       </Button>
//     </>
//   );
// };

// export default ButtonCta;

import { Button } from "@material-tailwind/react";
import type { ButtonProps } from "@material-tailwind/react";

type CustomButtonProps = ButtonProps & {
  buttonText: string;
};

const ButtonCta = ({ buttonText, ...props }: CustomButtonProps) => {
  return (
    <Button 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined} 
      {...props}>
      {buttonText}
    </Button>
  );
};

export default ButtonCta;