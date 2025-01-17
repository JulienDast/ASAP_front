import { useEffect, useState } from "react";
import { Tournament } from "../../services/interfaces/TournamentInterface";
import { Link, useLocation } from "react-router-dom";
import TournamentCard from "../../components/MaterailTailwind/TournamentCard";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { useAuth } from "../../interceptors/AuthProvider";
import { RoleUser } from "../../services/interfaces/UserInterface";

const TournamentsList = () => {
  
  const { user } = useAuth(); 

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  const fetchTournaments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Tournament[]>('http://localhost:3000/tournament');
      setTournaments(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (!tournaments.length || location.state?.refresh) {
      fetchTournaments();
    }
  }, [location.state]);

  const tournamentsPerPage = 4;
  const indexOfLastTournament = currentPage * tournamentsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  const currentTournaments = tournaments.slice(indexOfFirstTournament, indexOfLastTournament);

  const totalPages = Math.ceil(tournaments.length / tournamentsPerPage);

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
          Le chemin vers les sommets commence ici !
        </h1>
        {
          user?.role === RoleUser.ADMIN &&
          <div className="my-10">
            <Link to="/tournaments/create">
              <ButtonCta children={undefined} buttonText={"AJOUTER UN TOURNOI"}/>
            </Link>
          </div>
        }
      </div>
      <div className="mt-12 flex flex-col gap-y-10">
        {currentTournaments.map(tournament => (
          <Link 
            key={tournament.id} 
            to={`/tournaments/${tournament.id}`} 
            className="w-full flex justify-center"
          >
            <TournamentCard tournament={tournament} />
          </Link>
        ))}
      </div>
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
    </div>
  );
};

export default TournamentsList;