import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tournament } from "../../services/interfaces/TournamentInterface";
import axios from "axios";
import { InputDefault } from "../../components/MaterailTailwind/Input";
import { formatForDateTimeLocal, formatToISO8601 } from "../../services/utils/DatesFormat";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";

const UpdateTournament = () => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [tournamentData, setTournamentData] = useState<Omit<Tournament, "id" |'userId' | 'createdAt' | 'updatedAt'| 'participations'>>({
    title: '', 
    description: '',
    start_date: '',
    end_date: '',
    location: '',
    max_participant: 0,
  });

  const fetchTournament = async () => {
    try {
      const response = await axios.get<Tournament>(`http://localhost:3000/tournament/${id}`);
      const { title, description, start_date, end_date, location, max_participant } = response.data;
      setTournamentData({ title, description, start_date, end_date, location, max_participant });
    } catch (error) {
      console.error('Erreur lors de la récupération du tournoi:', error);
    }
  };

  useEffect(() => {
    fetchTournament();
  }, [id]);

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setTournamentData(prev => ({ ...prev, [name]: value }));
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedData = {
      ...tournamentData,
      start_date: formatToISO8601(tournamentData.start_date),
      end_date: formatToISO8601(tournamentData.end_date)
    };

    try {
      await axios.patch(`http://localhost:3000/tournament/${id}`, formattedData);
      navigate(`/tournaments/${id}`);
    } catch (error) {
      console.error('Erreur lors de la modification de l\'article:', error);
    }
  };

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-9/12'>
      <div className="lg:w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          À vous de servir !
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 mx-auto mt-10 mb-6 font-text mx-0">
          <div className="form-container flex flex-col my-10 gap-y-10">
            <InputDefault
              label="Titre"
              type="text"
              name="title"
              value={tournamentData.title}
              onChange={(e) => setTournamentData({ ...tournamentData, title: e.target.value })} 
              required
            />
            <InputDefault
              label="Description"
              type="text"
              name="description"
              value={tournamentData.description}
              onChange={(e) => setTournamentData({ ...tournamentData, description: e.target.value })}
              required
            />
            <InputDefault
              label="Date de début du tournoi"
              type="datetime-local"
              name="start_date"
              value={formatForDateTimeLocal(tournamentData.start_date)}
              onChange={(e) => {
                setTournamentData({ ...tournamentData, start_date: e.target.value });
              }}
              required
            />

            <InputDefault
              label="Date de fin du tournoi"
              type="datetime-local"
              name="end_date"
              value={formatForDateTimeLocal(tournamentData.end_date)}
              onChange={(e) => {
                setTournamentData({ ...tournamentData, end_date: e.target.value });
              }}
              required
            />
            <InputDefault
              label="Lieu"
              type="text"
              name="location"
              value={tournamentData.location}
              onChange={(e) => setTournamentData({ ...tournamentData, location: e.target.value })}
              required
            />
            <InputDefault
              label="Nombre de paires"
              type="number"
              name="max_participant"
              value={tournamentData.max_participant.toString()}
              onChange={(e) => setTournamentData({ ...tournamentData, max_participant: +e.target.value })}
              required
            />
          </div>
          <p>* Champs obligatoires</p>
          <ButtonCta 
            type="submit"
            buttonText="Publier le tournoi"
            color="black" children={undefined}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateTournament;