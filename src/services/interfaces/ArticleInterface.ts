import { Comment } from "./CommentInterface";
import { Like } from "./LikeInterface";


export interface Article {
  id: number;
  title: string;
  subtitle?: string;
  body: string;
  category: string;
  illustration?: string;
  author: string;
  date: string;
  comments: Comment[];
  likes: Like[];
}