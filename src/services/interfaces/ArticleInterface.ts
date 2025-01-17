import { Comment } from "./CommentInterface";
import { Like } from "./LikeInterface";
import { User } from "./UserInterface";

export enum ArticleCategory {
  TOUS = "TOUS",
  REUNIONS = "REUNIONS",
  TOURNOIS = "TOURNOIS",
  EVENEMENTS = "EVENEMENTS",
  DIVERS = "DIVERS",
}

export interface Article {
  id: number;
  title: string;
  subtitle?: string;
  body: string;
  category: ArticleCategory;
  picture: string;
  author: User;
  createdAt: string;
  comments: Comment[];
  likes: Like[];
  _count?: {
    likes: number;
    comments: number;
  };
}