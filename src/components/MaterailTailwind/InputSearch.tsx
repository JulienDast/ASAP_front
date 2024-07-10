import { MagnifyingGlassCircleIcon } from "@heroicons/react/16/solid";
import { Input, InputProps } from "@material-tailwind/react";

type CustomInputIconProps = InputProps & {
  label: string;
  type: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const InputSearch = ({ label, type, className, onChange, value }: CustomInputIconProps) => {
  return (
    <Input
      icon={<MagnifyingGlassCircleIcon />}
      type={type}
      label={label}
      className={className}
      value={value}
      onChange={onChange} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined} 
      crossOrigin={undefined}
    />
  );
};

export default InputSearch;
