import { Card, CardHeader, CardBody, Typography, Input } from "@material-tailwind/react";
import { User } from "../../services/interfaces/UserInterface";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";

interface CommentCardProps {
  user: User;
}

const CommentInput = ({ user }: CommentCardProps) => {
  return (
    <Card className="w-full h-fit bg-inherit flex flex-row border-b-2 border-gray-300 rounded-none shadow-none"
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}
    >
      <CardHeader 
        className="w-18 h-18 my-auto mx-2"  
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        <img 
          src={user.avatar}
          alt="profile-picture"
          className="h-18 w-18 object-cover"
        />
      </CardHeader>
      <CardBody 
        className="flex flex-row w-full text-center"  
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        <div className="my-auto overflow-hidden w-full">
          <Typography 
            className="text-xs lg:text-base w-full"  
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            <div className="w-full my-2">
              <Input 
                label="Votre commentaire"
                icon={<PaperAirplaneIcon/>}
                className="w-full"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined} 
                crossOrigin={undefined} 
              />
            </div>
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default CommentInput;