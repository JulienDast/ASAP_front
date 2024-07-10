import { Comment } from "./CommentInterface";

export interface User {
  id: number;
  firstname: string,
  lastname: string,
  phone?: string,
  email: string,
  licence?: string,
  bio?: string
  avatar?:string
  comments?: Comment[];
}