import { Comment } from "./CommentInterface";

export enum RoleUser {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export enum StatusUser {
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
  BANNED = "BANNED",
}

export interface User {
  id: number;
  password: string,
  firstname: string,
  lastname: string,
  role: RoleUser,
  status: StatusUser,
  phone?: string,
  email: string,
  licence?: string,
  bio?: string
  avatar?:string
  comments?: Comment[];
}