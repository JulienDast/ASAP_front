import { Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import { Tournament } from "../../services/interfaces/TournamentInterface";
import { formatDate } from "../../services/utils/DatesFormat";
import ButtonCta from "./ButtonCta";
import './ComponentsStyles/components-tailwind.css'

const TournamentCard = ({ tournament }: { tournament: Tournament }) => {

  function getEventStatus(startDate:string, endDate:string) {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (now < start) {
      return "À venir";
    } else if (now >= start && now <= end) {
      return "En cours";
    } else {
      return "Terminé";
    }
  }
  const tournamentStatus = getEventStatus(tournament.start_date, tournament.end_date);

  function getTournamentStatusColorClass() {
    switch(tournamentStatus) {
      case "À venir": return 'blue';
      case "En cours": return 'green';
      case "Terminé": return 'red';
      default: return 'black';
    }
  }

  function getTournamentColorClass(title:string) {
    const lowerCaseTitle = title.toLowerCase();
    
    if (lowerCaseTitle.match(/\bp25\b/)) {
      return 'text-green-500';
    } else if (lowerCaseTitle.match(/\bp100\b/)) {
      return 'text-blue-500';
    } else if (lowerCaseTitle.match(/\bp250\b/)) {
      return 'text-red-500';
    } else if (lowerCaseTitle.match(/\bp500\b/)) {
      return 'text-black';
    } else {
      return 'text-purple-500';
    }
  }

  return (
    <Card className="w-full flex flex-row justify-around px-5" 
      placeholder={undefined}
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}
    >
      <CardHeader 
        placeholder={undefined} 
        onPointerEnterCapture={undefined} 
        onPointerLeaveCapture={undefined}
        className="my-5 mx-0 text-xl flex flex-col justify-around shadow-none items-center"
      >
        <p className={`text-center mb-4 font-bold ${getTournamentColorClass(tournament.title)}`}>
          {tournament.title}
        </p>
        <p className="text-xs text-center mx-2">{formatDate(tournament.start_date)}<br/>-<br/>{formatDate(tournament.end_date)}</p>
      </CardHeader>
      <CardBody 
        className="flex justify-around items-center lg:flex-row w-3/4 text-center px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="my-auto">
          <Typography 
            variant="h4" 
            className="text-lg lg:text-xl line-clamp-2"
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            {tournament.location}
          </Typography>
        </div>
        <div className="hidden lg:block w-1/2 flex flex-row px-5 lg:flex-col gap-y-3 justify-center">
          <Typography  
            className="mr-2 lg:mr-0 text-inherit line-clamp-2" 
            textGradient 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            {tournament.description}
          </Typography>
        </div>
        <div id="cardTournament" className="my-auto">
          <Typography 
            color="blue-gray" 
            className="text-sm font-medium" 
            textGradient 
            placeholder={undefined} 
            onPointerEnterCapture={undefined} 
            onPointerLeaveCapture={undefined}
          >
            <ButtonCta 
              color={getTournamentStatusColorClass()}
              buttonText={tournamentStatus} 
              children={undefined}
            />
            <p className="hidden mt-4 lg:block">Nombre max de paires : {tournament.max_participant}</p>
          </Typography>
        </div>
      </CardBody>   
    </Card>
  );
};

export default TournamentCard;