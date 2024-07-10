import { Input } from "@material-tailwind/react";
import type { InputProps } from "@material-tailwind/react";

type CustomInputProps = InputProps & {
  label: string;
  type: string;
  value?:string
  className?:string
};

export function InputDefault({ label, type, value,className }: CustomInputProps) {
  return (
      <Input 
        label={label}
        type={type} 
        value={value}
        className={className}
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined} 
        crossOrigin={undefined}
      />
  );
}
