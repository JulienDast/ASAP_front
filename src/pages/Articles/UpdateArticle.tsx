import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { InputDefault } from "../../components/MaterailTailwind/Input";
import { Select, Option } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Article, ArticleCategory } from "../../services/interfaces/ArticleInterface";
import axios from "axios";

const UpdateArticle = () => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [articleData, setArticleData] = useState<Omit<Article, 'id' | 'comments' | 'likes' | 'createdAt' | 'author'>>({
    title: '', 
    subtitle: '',
    body: '',
    category: ArticleCategory.TOUS,
    picture: '',
  });

  const fetchArticle = async () => {
    try {
      const response = await axios.get<Article>(`http://localhost:3000/article/${id}`);
      const { title, subtitle, body, category, picture } = response.data;
      setArticleData({ title, subtitle: subtitle || '', body, category, picture });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article:', error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArticleData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string | void) => {
    if (value) {
      setArticleData(prev => ({ ...prev, category: value as ArticleCategory }));
    }
  };

  const handleEditorChange = (content: string) => {
    setArticleData(prev => ({ ...prev, body: content }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!articleData.title || !articleData.body || !articleData.category) {
      console.error('Tous les champs obligatoires doivent être renseignés.');
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/article/${id}`, articleData);
      navigate(`/articles/${id}`);
    } catch (error) {
      console.error('Erreur lors de la modification de l\'article:', error);
      console.log(articleData);
    }
  };

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 lg:w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Modifier l'article
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 mx-auto mt-10 mb-6 font-text mx-0">
          <div className="form-container flex flex-col my-10 gap-y-10">
            <InputDefault
              label="Titre*"
              type="text"
              name="title"
              value={articleData.title}
              onChange={handleInputChange}
            />
            <InputDefault
              label="Sous-titre"
              type="text"
              name="subtitle"
              value={articleData.subtitle}
              onChange={handleInputChange}
            />
            <div>
              <label htmlFor="body" className="block mb-2">Article*</label>
              <ReactQuill
                theme="snow"
                value={articleData.body}
                onChange={handleEditorChange}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'indent': '-1'}, {'indent': '+1'}],
                    ['clean']
                  ],
                }}
              />
            </div>
            <Select 
              label="Catégorie*"
              value={articleData.category}
              onChange={handleSelectChange}
              placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <Option value={ArticleCategory.DIVERS}>Divers</Option>
              <Option value={ArticleCategory.REUNIONS}>Réunions</Option>
              <Option value={ArticleCategory.TOURNOIS}>Tournois</Option>
              <Option value={ArticleCategory.EVENEMENTS}>Évènements</Option>
            </Select>
            <InputDefault
              label="picture*"
              type="text"
              name="picture"
              value={articleData.picture}
              onChange={handleInputChange}
            />
          </div>
          <p>* Champs obligatoires</p>
          <ButtonCta 
            type="submit"
            buttonText="Mettre à jour l'article"
            color="black" 
            children={undefined}          
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateArticle;