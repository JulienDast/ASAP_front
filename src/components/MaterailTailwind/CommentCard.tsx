import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { Comment } from "../../services/interfaces/CommentInterface";
import { User } from "../../services/interfaces/UserInterface";
import { Link } from "react-router-dom";

interface CommentCardProps {
  comment: Comment;
  user: User;
}

const CommentCard = ({ comment, user }: CommentCardProps) => {
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
        <Link to={`/members/${user.id}`}>
          <img 
            src={user.avatar}
            alt="profile-picture"
            className="h-18 w-18 object-cover"
          />
        </Link>
      </CardHeader>
      <CardBody 
        className="flex flex-row w-full text-center"  
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-row gap-y-3 justify-center">
          <div className="flex flex-row-reverse items-center gap-y-3 gap-x-3">
            <Typography 
              color="blue-gray" 
              className="text-sm font-medium" 
              textGradient  
              placeholder={undefined} 
              onPointerEnterCapture={undefined} 
              onPointerLeaveCapture={undefined}
            >
              <Link to={`/members/${user.id}`}>
                {user.firstname} {user.lastname}
              </Link>
            </Typography>
          </div>
        </div>
        <div className="my-auto mx-auto pl-8 overflow-hidden">
          <Typography 
            className="mb-2 text-xs lg:text-base"  
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            {comment.text}
          </Typography>
        </div>
      </CardBody>    
    </Card>
  );
};

export default CommentCard;
