import React, { useState } from "react";
import { Card, CardHeader, CardBody, Typography, Input } from "@material-tailwind/react";
import { User } from "../../services/interfaces/UserInterface";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { Comment } from "../../services/interfaces/CommentInterface";
import PadelPlayer from '../../assets/PadelPlayer.webp';

interface CommentInputProps {
  user: Pick<User, 'id'| 'avatar'>;
  articleId: number; 
  onCommentAdded: (comment: Comment) => void;
}

const CommentInput = ({ user, articleId, onCommentAdded }: CommentInputProps) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
  
    try { 
      const response = await axios.post(`http://localhost:3000/comment/${articleId}`, {
        userId: user.id,
        articleId,
        text: commentText
      });
      console.log("Commentaire posté avec succès:", response.data);
      onCommentAdded(response.data)
      setCommentText("");
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire:", error);
    }
  };

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
          src={user.avatar? user.avatar : PadelPlayer}
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
        <form onSubmit={handleSubmit} className="w-full">
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
                  icon={
                    <PaperAirplaneIcon 
                      className="cursor-pointer" 
                      onClick={handleSubmit}
                    />
                  }
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full"
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined} 
                  crossOrigin={undefined} 
                />
              </div>
            </Typography>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default CommentInput;