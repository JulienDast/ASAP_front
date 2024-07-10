import { Link, useParams } from "react-router-dom";
import { Article } from "../../services/interfaces/ArticleInterface";
import {Comment} from "../../services/interfaces/CommentInterface";
import articlesData from '../../data-provisoire/articles.json';
import usersData from '../../data-provisoire/users.json';
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { HeartIcon } from "@heroicons/react/16/solid";
import { Typography } from "@material-tailwind/react";
import CommentCard from "../../components/MaterailTailwind/CommentCard";
import { useState, useEffect } from "react";
import { User } from "../../services/interfaces/UserInterface";
import CommentInput from "../../components/MaterailTailwind/CommentInput";

const ArticleView = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users] = useState<User[]>(usersData);
  const user = usersData[0]

  useEffect(() => {
    const foundArticle = articlesData.find(article => article.id === parseInt(id || '0', 10));
    if (foundArticle) {
      setArticle(foundArticle);
      setComments(foundArticle.comments);
    }
  }, [id]);

  if (!article) {
    return (
      <>
        <div className="flex flex-col text-center gap-y-10 font-text">
          <h3>Article non trouvé</h3>
          <Link to="/articles">
            <ButtonCta 
              color="black" 
              children={undefined} 
              buttonText="Retourner à la liste"
            />
          </Link>
        </div>
      </>
    )
  }

  return (
    <div className='flex flex-col px-4 py-2 lg:px-8 lg:py-4 w-11/12'>
      <div className="w-11/12 mx-auto my-10 text-center">
        <h1 className="sm:text-2xl text-xl text-layoutBackground !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          {article.category}
          <hr className="border border-black border-solid my-4"/>
        </h1>
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          {article.title}
        </h1>
        <h1 className="sm:text-2xl text-base text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          {article.subtitle}
        </h1>
      </div>
      <div className="my-10">
          <img src={article.illustration} alt={article.illustration} className="max-h-min sm:w-1/2 rounded-2xl drop-shadow-xl sm:mr-20 mb-10 sm:float-left" />
          <p className="text-justify indent-10">
            {article.body}
          </p>
      </div>
      <div className="w-full flex flex-row items-center gap-y-6 justify-between font-text">
        <p className='flex items-center text-xs md:text-base'>
          {article.date}
        </p>
        <p className="flex flex-row items-center">
          <HeartIcon className="h-5 w-5 text-yellow-300"/>
          <Typography color="blue-gray" className="font-medium" textGradient placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {article.likes.length}
          </Typography>
        </p>
        <p className='flex items-center text-xs md:text-base'>
          {article.author}
        </p>
      </div>
      <hr className="border border-black border-solid my-4 w-full"/>
      <h1 className="sm:text-2xl text-xl font-title">Commentaires {`(${comments.length})`}</h1>
      {comments.map(comment => {
        const user = users.find(u => u.id === comment.userId);
        return user ?<CommentCard key={comment.id} comment={comment} user={user} /> : null;
      })}
      <CommentInput user={user}/>
    </div>
  );
};

export default ArticleView;

