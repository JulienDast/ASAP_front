import { useState, useEffect } from "react";
import InputSearch from "../../components/MaterailTailwind/InputSearch";
import { Article } from "../../services/interfaces/ArticleInterface";
import articlesData from "../../data-provisoire/articles.json"
import { RadioHorizontalList } from "../../components/MaterailTailwind/RadioHorizontal";
import { Link } from "react-router-dom";
import ArticleCard from "../../components/MaterailTailwind/ArticleCard";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const ArticlesList = () => {
  const [articles] = useState<Article[]>(articlesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const articlesPerPage = 5;

  const filteredArticles = articles.filter(article => {
    const matchesSearchTerm = `${article.title}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory;
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

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-full md:w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Retrouvez les dernières nouvelles concernant le club !
        </h1>
        <div className="w-full md:w-1/2 flex flex-col gap-y-10 justify-center mt-12 mb-6 mx-auto">
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
            firstRadio="Tous" 
            secondRadio="Réunions" 
            thirdRadio="Tournois" 
            fourthRadio="Évènements" 
            fifthRadio="Divers"
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
              disabled={currentPage === totalPages}
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