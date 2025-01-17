import { ChatBubbleLeftRightIcon, ScaleIcon } from "@heroicons/react/16/solid";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-4 py-2 lg:px-8 lg:py-4 bg-layoutBackground flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography 
        color="white"  
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        ©2024 ASAPadel™
      </Typography>
      <ul className="flex flex-wrap items-center justify-center gap-y-2 gap-x-8">
        <li>
          <Typography
            color="white"
            className="flex items-center gap-x-1 text-sm sm:text-base hover:underline hover:decoration-1 hover:decoration-yellow-300 ease-in-out underline-offset-4"            placeholder={undefined}
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}   
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-yellow-300"/>
            <Link to="/contact">Contact</Link>
          </Typography>
        </li>
        <li>
          <Typography
            color="white"
            className="flex items-center gap-x-1 text-sm sm:text-base hover:underline hover:decoration-1 hover:decoration-yellow-300 ease-in-out underline-offset-4"            placeholder={undefined}
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}   
          >
            <ScaleIcon className="w-5 h-5 text-yellow-300"/>
            <Link to="/cgu">Politique de confidentialité</Link>
          </Typography>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;

