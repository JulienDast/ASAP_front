// import { Input } from "@material-tailwind/react";
// import type { InputProps } from "@material-tailwind/react";

// type CustomInputProps = InputProps & {
//   label: string;
//   type: string;
//   value?:string
//   className?:string
// };

// export function InputDefault({ label, type, value,className }: CustomInputProps) {
//   return (
//       <Input 
//         label={label}
//         type={type} 
//         value={value}
//         className={className}
//         onPointerEnterCapture={undefined} 
//         onPointerLeaveCapture={undefined} 
//         crossOrigin={undefined}
//       />
//   );
// }

import { Input } from "@material-tailwind/react";
import type { InputProps } from "@material-tailwind/react";

type CustomInputProps = InputProps & {
  label: string;
  type: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputDefault({ label, type, value, className, onChange, ...rest }: CustomInputProps) {
  return (
      <Input 
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined} 
      crossOrigin={undefined} 
      label={label}
      type={type}
      value={value}
      className={className}
      onChange={onChange}
      {...rest}      />
  );
}