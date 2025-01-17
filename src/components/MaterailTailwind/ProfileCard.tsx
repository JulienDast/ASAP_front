import { Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import { User } from "../../services/interfaces/UserInterface";
import PadelPlayer from '../../assets/PadelPlayer.webp';

export function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="w-9/12" 
      placeholder={undefined}
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}
    >
      <CardHeader 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        className="h-40 w-full mt-0 mx-0"
      >
        <img 
          src={user.avatar ? user.avatar : PadelPlayer} 
          alt="profile-picture"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody 
        className="text-center"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography 
          variant="h4" 
          color="blue-gray"
          className="mb-2"
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
        >
          {user.firstname} {user.lastname}
        </Typography>
        <Typography 
          color="blue-gray" 
          className="font-medium" 
          textGradient 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
        >
          {user.licence ? `Licence : ${user.licence}` : "Non compétiteur"}
        </Typography>
      </CardBody>    
    </Card>
  );
}