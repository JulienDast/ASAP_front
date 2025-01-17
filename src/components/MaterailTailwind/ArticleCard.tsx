import { Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import { Article } from "../../services/interfaces/ArticleInterface";
import { ChatBubbleBottomCenterIcon, HeartIcon } from "@heroicons/react/16/solid";
import { formatDate } from "../../services/utils/DatesFormat";

const ArticleCard = ({ article }: { article: Article }) => {
  return (

    <Card className="w-full h-40 flex flex-row" 
      placeholder={undefined}
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}
    >
      <CardHeader 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        className="w-1/3 lg:w-1/4 mt-0 mx-0"
      >
        <img 
          src={article.picture || "https://www.ispo.com/sites/default/files/styles/listicle_header_square_desktop/public/2022-11/man-playing-padel.jpeg?h=6f3285a6&itok=ZjsTkf_r"} 
          alt="profile-picture"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody 
        className="flex flex-col lg:flex-row w-3/4 text-center"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="flex flex-row lg:flex-col gap-y-3 justify-center">
          <Typography  
            className="font-medium mr-2 lg:mr-0 text-layoutBackground" 
            textGradient 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            {article.category}
          </Typography>
          <div className="flex flex-row-reverse hidden lg:flex lg:flex-col-reverse items-center gap-y-3 gap-x-3">
            <Typography 
              color="blue-gray" 
              className="text-sm font-medium" 
              textGradient 
              placeholder={undefined} 
              onPointerEnterCapture={undefined} 
              onPointerLeaveCapture={undefined}
            >
              {formatDate(article.createdAt)}
            </Typography>
            <div className="flex flex-row items-center">
              <HeartIcon className="h-5 w-5 text-yellow-300"/>
              <Typography 
                color="blue-gray" 
                className="font-medium" 
                textGradient 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                {article._count?.likes}
              </Typography>
              <ChatBubbleBottomCenterIcon className="h-5 w-5 ml-2"/>
              <Typography 
                color="blue-gray" 
                className="font-medium" 
                textGradient 
                placeholder={undefined} 
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
              >
                {article._count?.comments}
              </Typography>
            </div>
          </div>
        </div>
        <div className="my-auto mx-auto px-8 overflow-hidden">
          <Typography 
            variant="h4" 
            className="mb-2 text-sm lg:text-xl line-clamp-2"
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            {article.title}
          </Typography>
        </div>
        <div className="flex flex-row-reverse justify-between lg:hidden lg:flex-col-reverse items-center gap-y-3 gap-x-3">
          <Typography 
            color="blue-gray" 
            className="text-sm font-medium" 
            textGradient 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            {formatDate(article.createdAt)}
          </Typography>
          <div className="flex flex-row items-center">
            <HeartIcon className="h-5 w-5 text-yellow-300"/>
            <Typography 
              color="blue-gray" 
              className="font-medium" 
              textGradient 
              placeholder={undefined} 
              onPointerEnterCapture={undefined} 
              onPointerLeaveCapture={undefined}
            >
              {article._count?.likes}
            </Typography>
            <ChatBubbleBottomCenterIcon className="h-5 w-5 ml-2"/>
            <Typography 
              color="blue-gray" 
              className="font-medium" 
              textGradient 
              placeholder={undefined} 
              onPointerEnterCapture={undefined} 
              onPointerLeaveCapture={undefined}
            >
              {article._count?.comments}
            </Typography>
          </div>
        </div>
      </CardBody>    
    </Card>
  );
};

export default ArticleCard;