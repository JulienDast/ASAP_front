import { useState, useEffect } from "react";
import InputSearch from "../../components/MaterailTailwind/InputSearch";
import { Article, ArticleCategory } from "../../services/interfaces/ArticleInterface";
import { RadioHorizontalList } from "../../components/MaterailTailwind/RadioHorizontal";
import { Link, useLocation } from "react-router-dom";
import ArticleCard from "../../components/MaterailTailwind/ArticleCard";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import axios from "axios";
import { useAuth } from "../../interceptors/AuthProvider";
import { RoleUser } from "../../services/interfaces/UserInterface";

const ArticlesList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('TOUS');
  const [isLoading, setIsLoading] = useState(true);
  const articlesPerPage = 5;
  const { user } = useAuth(); 

  const location = useLocation();

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Article[]>('http://localhost:3000/article');
      setArticles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (!articles.length || location.state?.refresh) {
      fetchArticles();
    }
  }, [location.state]);
  

  const filteredArticles = articles.filter(article => {
    const matchesSearchTerm = `${article.title}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === ArticleCategory.TOUS || article.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const next = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return(
      <div className="flex flex-col items-center">
        <p>Chargement des articles</p> 
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

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-full md:w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Retrouvez les dernières nouvelles concernant le club !
        </h1>
        <div className="w-full md:w-1/2 flex flex-col gap-y-10 justify-center mt-12 mb-6 mx-auto">
          {user?.role === RoleUser.ADMIN &&
            <Link to="/articles/create">
              <ButtonCta children={undefined} buttonText={"AJOUTER UN ARTICLE"}/>
            </Link>
          }
          <InputSearch
            label="Rechercher un article"
            type="text"
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <RadioHorizontalList 
            firstRadio={ArticleCategory.TOUS} 
            secondRadio={ArticleCategory.REUNIONS} 
            thirdRadio={ArticleCategory.TOURNOIS} 
            fourthRadio={ArticleCategory.EVENEMENTS} 
            fifthRadio={ArticleCategory.DIVERS}
            onCategoryChange={setSelectedCategory} 
          />
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-y-10">
        {currentArticles.map(article => (
          <Link 
            key={article.id} 
            to={`/articles/${article.id}`} 
            className="w-full flex justify-center"
          >
            <ArticleCard article={article} />
          </Link>
        ))}
      </div>
      {!searchTerm && (
        <div className="flex justify-center my-10">
          <div className="flex items-center gap-8">
            <IconButton
              size="sm"
              variant="outlined"
              onClick={prev}
              disabled={currentPage === 1}
              placeholder={undefined} 
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <Typography 
              color="gray" 
              className="font-normal" 
              placeholder={undefined} 
              onPointerEnterCapture={undefined} 
              onPointerLeaveCapture={undefined}
            >
              Page 
              <strong className="text-gray-900">{" "}{currentPage}</strong> sur{" "}
              <strong className="text-gray-900">{totalPages}</strong>
            </Typography>
            <IconButton
              size="sm"
              variant="outlined"
              onClick={next}
              disabled={currentPage === totalPages || articles.length === 0}
              placeholder={undefined} 
              onPointerEnterCapture={undefined} 
              onPointerLeaveCapture={undefined}
            >
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;