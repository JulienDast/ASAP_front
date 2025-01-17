import { Link, useNavigate, useParams } from "react-router-dom";
import { Article } from "../../services/interfaces/ArticleInterface";
import {Comment} from "../../services/interfaces/CommentInterface";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { HeartIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Button, Typography } from "@material-tailwind/react";
import CommentCard from "../../components/MaterailTailwind/CommentCard";
import { useState, useEffect } from "react";
import { RoleUser, User } from "../../services/interfaces/UserInterface";
import CommentInput from "../../components/MaterailTailwind/CommentInput";
import AlertBox from "../../components/MaterailTailwind/AlertBox";
import axios from "axios";
import { formatDate } from "../../services/utils/DatesFormat";
import DOMPurify from 'dompurify';
import { useAuth } from "../../interceptors/AuthProvider";

const ArticleView = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState<number | false>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article?.likes.length || 0);
  const { user } = useAuth(); 

  const navigate = useNavigate();

  const fetchArticle = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Article>(`http://localhost:3000/article/${id}`);
      setArticle(response.data);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article:', error);
    } finally {
      setIsLoading(false)
    }
  };

  const fetchUsers = async () => {
    setIsUserLoading(true)
    try {
      const response = await axios.get<User[]>(`http://localhost:3000/user`);
      setUsers(response.data);      
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    } finally {
      setIsUserLoading(false)
    }
  };

  const addComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const deleteComment= async (commentId : number) => {
    try {
      await axios.delete(`http://localhost:3000/comment/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    }
  }

  const deleteArticle = async (id : number) => {
    try {
      await axios.delete(`http://localhost:3000/article/${id}`);
      navigate("/articles", { state: { refresh: true } });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
    }
  }

  const likeArticle = async(id:number)=>{
    try{
      await axios.post(`http://localhost:3000/like/${id}`);
      setIsLiked(true);
      setLikesCount(prevCount => prevCount + 1);
    } catch(error){
      console.error("Impossible le liker l'article", error);
    }
  }

  const unlikeArticle = async(id:number)=>{
    try{
      await axios.delete(`http://localhost:3000/like/${id}`);
      setIsLiked(false);
      setLikesCount(prevCount => prevCount - 1);
    } catch(error){
      console.error("Impossible de retirer le like sur l'article", error);
    }
  }

  useEffect(() => {
    if(article){
      setLikesCount(article.likes.length);    
    }
    if (article && user) {
      const userLiked = article.likes.some(like => like.userId === user.id);
      setIsLiked(userLiked);  
      setLikesCount(article.likes.length);    
    }
  }, [article, user]);
  

  useEffect(() => {
    if (id) {
      fetchArticle();
      fetchUsers(); //TODO Voir si il vaut pas mieux faire une recherche par id dans les comments pour retourner les users plutot que de fetch tous les users
    }
  }, [id]);

  if (isLoading || isUserLoading) {
    return(
      <div className="flex flex-col items-center">
        <p>Chargement de l'article</p> 
        <Button
          children={undefined} 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
          loading={true}
          variant="text"
        />
      </div>
    )
  }

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

  const cleanHTML = DOMPurify.sanitize(article.body);  

  return (
    <div className='flex flex-col px-4 py-2 lg:px-8 lg:py-4 w-11/12'>
      <div className="flex justify-center lg:justify-end gap-x-4 my-5">
        {user?.role === RoleUser.ADMIN &&
          <>
            <Link to={`/articles/${article.id}/update`}>
              <ButtonCta children={undefined} buttonText={"Modifier l'article"} color="black"/>
            </Link>
            <ButtonCta children={undefined} buttonText={"Supprimer l'article"} color="red" onClick={() => {
              setShowDeleteModal(true);
            }}/>
          </>
        }
      </div>
      {showDeleteModal &&
        <AlertBox 
          color={"red"} 
          children={undefined} 
          alertTitle={"Vous allez supprimer définitivement cet article !"} 
          alertFirstParagraph={"L'article et les commentaires associés seront supprimés."} 
          alertSecondParagraph={""} 
          alertThirdParagraph={""}
          colorFirstBtn="white"
          colorScndBtn="black"
          primaryButton={{
            text: "Confirmer",
            onClick: ()=>{ 
              if (id) {
              deleteArticle(+id);
              setShowDeleteModal(false);
              navigate("/articles");
            }}
          }}
          secondaryButton={{
            text: "Annuler",
            onClick: ()=>{setShowDeleteModal(false)}
          }}
        />
      }
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
        <img
          src={article.picture || "https://www.ispo.com/sites/default/files/styles/listicle_header_square_desktop/public/2022-11/man-playing-padel.jpeg?h=6f3285a6&itok=ZjsTkf_r"}
          alt={article.picture}
          className="max-h-min sm:w-1/2 rounded-2xl drop-shadow-xl sm:mr-20 mb-10 sm:float-left"
        />
        <div
          className="text-justify indent-10"
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
          />
      </div>
      <div className="w-full flex flex-row items-center gap-y-6 justify-between font-text">
        <p className='flex items-center text-xs md:text-base'>
          {formatDate(article.createdAt)}
        </p>
        <p className="flex flex-row items-center">
          {isLiked ?
            <HeartIcon onClick={()=>{unlikeArticle(article.id)}} className='h-5 w-5 text-yellow-300'/>
            :
            <HeartIcon onClick={()=>{likeArticle(article.id)}} className='h-5 w-5 text-black-500 stroke-current fill-none'/>
          }
          <Typography color="blue-gray" className="font-medium" textGradient placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {likesCount}
          </Typography>
        </p>
        <p className='flex items-center text-xs md:text-base'>
          {article.author.firstname} {article.author.lastname}
        </p>
      </div>
      <hr className="border border-black border-solid my-4 w-full"/>
      <h1 className="sm:text-2xl text-xl font-title">Commentaires {`(${comments.length})`}</h1>
      {comments.map((comment: Comment) => {
        const commenter = users.find(u => u.id === comment.userId);
        return commenter ?
        <div className="flex items-center"><CommentCard key={comment.id} comment={comment} user={commenter} />
          {(comment.userId === user?.id || user?.role === RoleUser.ADMIN) &&
            <TrashIcon className="w-5 h-5 text-red-300" onClick={()=>setShowDeleteCommentModal(comment.id)}/>
          }
        </div>
         : null;
      })}
      {showDeleteCommentModal &&
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <AlertBox 
            color={"red"} 
            children={undefined} 
            alertTitle={"Vous allez supprimer définitivement ce commentaire !"} 
            alertFirstParagraph={"Cette action est irréversible."} 
            alertSecondParagraph={""} 
            alertThirdParagraph={""}
            colorFirstBtn="white"
            colorScndBtn="black"
            primaryButton={{
              text: "Confirmer",
              onClick: ()=>{
                deleteComment(showDeleteCommentModal);
                setShowDeleteCommentModal(false);
              }
            }}
            secondaryButton={{
              text: "Annuler",
              onClick: ()=>{setShowDeleteCommentModal(false)}
            }}
          />
        </div>
      }
      {user &&
        <CommentInput user={user} articleId={article.id} onCommentAdded={addComment}/>
      }
    </div>
  );
};

export default ArticleView;