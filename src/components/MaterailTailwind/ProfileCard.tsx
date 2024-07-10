import { Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import { User } from "../../services/interfaces/UserInterface";

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
          src={user.avatar || "https://www.ispo.com/sites/default/files/styles/listicle_header_square_desktop/public/2022-11/man-playing-padel.jpeg?h=6f3285a6&itok=ZjsTkf_r"} 
          alt="profile-picture"
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