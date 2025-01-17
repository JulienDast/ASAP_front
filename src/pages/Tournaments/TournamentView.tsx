import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Tournament } from "../../services/interfaces/TournamentInterface";
import { Participation } from "../../services/interfaces/ParticipationInterface";
import { RoleUser } from "../../services/interfaces/UserInterface";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import TournamentCard from "../../components/MaterailTailwind/TournamentCard";
import AlertBox from "../../components/MaterailTailwind/AlertBox";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { useAuth } from "../../interceptors/AuthProvider";

interface UserPartial {
  id: number;
  firstname: string;
  lastname: string;
  licence?: string 
}

const TournamentView = () => {

  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournament | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showParticipationForm, setShowParticipationForm] = useState(false);
  const [showDeleteTournamentModal, setShowDeleteTournamentModal] = useState(false);
  const [showDeleteParticipationModal, setShowDeleteParticipationModal] = useState(false);
  const [users, setUsers] = useState<UserPartial[]>([]);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<UserPartial[]>([]);
  const [hasParticipation, setHasParticipation] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<UserPartial | null>(null);

  const navigate = useNavigate();
  const { user } = useAuth()

  const fetchTournament = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Tournament>(`http://localhost:3000/tournament/${id}`);
      setTournament(response.data);
      response.data.participations.find(
        participation => participation.userId === user?.id || participation.partnerId === user?.id
      ) && setHasParticipation(true);      
    } catch (error) {
      console.error('Erreur lors de la récupération du tournoi:', error);
    } finally {
      setIsLoading(false)
    }
  };

  const fetchUsers = async () => {
    setIsUserLoading(true)
    try {
      const response = await axios.get<UserPartial[]>('http://localhost:3000/user', {
        params: {
          fields: 'id,firstname,lastname,licence'
        }
      });      
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    } finally {
      setIsUserLoading(false)
    }
  };

  const deleteTournament = async (id : number) => {
    try {
      await axios.delete(`http://localhost:3000/tournament/${id}`);
      navigate("/tournaments", { state: { refresh: true } });
    } catch (error) {
      console.error('Erreur lors de la suppression du tournoi:', error);
    }
  }

  const createParticipation = async () => {
    try {
      await axios.post(`http://localhost:3000/tournament/participation/${tournament?.id}`, {
        partnerId: selectedPartner?.id
      });
      setHasParticipation(true);
    } catch (error) {
      console.error('Erreur lors de l\'inscription au tournoi:', error);
    } finally {
      fetchTournament();
    }
  };

  const deleteParticipation = async () => {
    try {
      await axios.delete(`http://localhost:3000/tournament/participation/${tournament?.id}`);
      setHasParticipation(false);
    } catch (error) {
      console.error('Erreur lors de la suppression de la participation:', error);
    } finally {
      fetchTournament();
    }
  };

  useEffect(() => {
    if (id) {
      fetchTournament();
      fetchUsers();
    }
  }, [id]);

  if (isLoading || isUserLoading){
    return(
      <div className="flex flex-col items-center">
        <p>Chargement du tournoi</p> 
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

  if (!tournament) {
    return (
      <>
        <div className="flex flex-col text-center gap-y-10 font-text">
          <h3>Tournoi non trouvé</h3>
          <Link to="/tournaments">
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

  const filterUsers = (search: string) => {
    const searchLower = search.toLowerCase(); 
    const participantIds = new Set(
      tournament.participations.flatMap(p => [p.userId, p.partnerId])
    );
  
    const filtered = users.filter(partner => 
      partner.licence &&
      partner.id !== user?.id &&
      !participantIds.has(partner.id) &&
      (partner.firstname.toLowerCase().includes(searchLower) || 
       partner.lastname.toLowerCase().includes(searchLower))
    );
  
    setFilteredUsers(filtered);
  };

  const handleUserSelect = (user: UserPartial) => {
    setSearchTerm(`${user.firstname} ${user.lastname}`);
    setFilteredUsers([]);
    setSelectedPartner(user);
  };

  return (
    <div className='flex flex-col px-4 py-2 lg:px-8 lg:py-4 lg:w-11/12'>
      <div className="w-11/12 mx-auto my-10 text-center">
        { user?.role === RoleUser.ADMIN &&
        <div className="flex justify-center lg:justify-end gap-x-4 my-5">
          <Link to={`/tournaments/${tournament.id}/update`}>
            <ButtonCta children={undefined} buttonText={"Modifier le tournoi"} color="black"/>
          </Link>
          <ButtonCta children={undefined} buttonText={"Supprimer le tournoi"} color="red" onClick={() => {
            setShowDeleteTournamentModal(true);
          }}/>
        </div>
        }
        {showDeleteTournamentModal &&
        <AlertBox 
          color={"red"} 
          children={undefined} 
          alertTitle={"Vous allez supprimer définitivement ce tournoi !"} 
          alertFirstParagraph={"Ce tournoi ainsi que toutes les inscriptions associées seront supprimés."} 
          alertSecondParagraph={""} 
          alertThirdParagraph={""}
          colorFirstBtn="white"
          colorScndBtn="black"
          primaryButton={{
            text: "Confirmer",
            onClick: ()=>{ 
              if (id) {
              deleteTournament(+id);
              setShowDeleteTournamentModal(false);
              navigate("/tournaments");
            }}
          }}
          secondaryButton={{
            text: "Annuler",
            onClick: ()=>{setShowDeleteTournamentModal(false)}
          }}
        />
      }
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title mb-10">
          Le chemin vers les sommets commence ici !
        </h1>
        <TournamentCard tournament={tournament}/>
        <h3 className="lg:hidden text-lg mt-10">
          <b>Informations :</b> <br/>{tournament.description}
        </h3>
        <h3 className="text-lg mt-10">
          <b>Nombre de paires inscrites :</b><br/>{tournament.participations.length} / {tournament.max_participant}
        </h3>
      </div>
      {!showDeleteParticipationModal &&
      <>
        <ol className="mx-auto text-center list-decimal">
          {tournament.participations.map((participation: Participation) => {
            const user = users.find(u => u.id === participation.userId);
            const partner = users.find(u => u.id === participation.partnerId);
            return <li className="font-bold">{user?.firstname} {user?.lastname} & {partner?.firstname} {partner?.lastname}</li>;
          })}
        </ol>
        <div className="mx-auto my-10 text-center">
          {!showParticipationForm &&
          <div className="mb-10">
            {new Date(tournament.start_date) > new Date() && (
              <>
                {(tournament.participations.length < tournament.max_participant && !hasParticipation && user) &&
                  <ButtonCta 
                    onClick={() => setShowParticipationForm(true)} 
                    color="blue" 
                    children={undefined} 
                    buttonText="Participer au tournoi"
                  />
                }
                {hasParticipation &&
                  <ButtonCta 
                    color="red" 
                    children={undefined} 
                    buttonText={"Supprimer ma participation"}
                    onClick={()=>{setShowDeleteParticipationModal(true)}}
                  />
                }
              </>
            )}
          </div>
          }
          {showParticipationForm && 
            <>
              <h1 className="text-lg mb-4">Participer avec :</h1>
              <div className="my-5">
                <input
                  type="text"
                  placeholder="Rechercher un partenaire"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    filterUsers(e.target.value);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-xl"
                />
                {filteredUsers.length > 0 && (
                  <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-xl">
                    {filteredUsers.map(partner => (
                      <li 
                        key={partner.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleUserSelect(partner)}
                      >
                        {partner.firstname} {partner.lastname}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-row gap-x-14">
                <ButtonCta 
                  onClick={() => {
                  setShowParticipationForm(false);
                  createParticipation();
                  }} 
                  children={undefined} 
                  buttonText={"Valider"}
                  color="blue"
                />
                <ButtonCta 
                  onClick={() => {
                    setShowParticipationForm(false);
                    setSearchTerm("");
                    setFilteredUsers([]);
                  }} 
                  children={undefined} 
                  buttonText={"Annuler"}
                />
              </div>
            </>
          }
        </div>
      </>
      }
      {showDeleteParticipationModal &&
        <AlertBox
          children={undefined}
          alertTitle="Vous allez supprimer votre participation !"
          alertFirstParagraph="Vous et votre partenaire ne serez plus inscrits à ce tournoi."
          alertSecondParagraph="Ca serait dommage quand même, non ?"
          alertThirdParagraph=""
          color="red"
          colorFirstBtn="white"
          colorScndBtn="black"
          primaryButton={{
            text: "Confirmer",
            onClick: ()=>{deleteParticipation() ,setShowDeleteParticipationModal(false)}
          }}
          secondaryButton={{
            text: "Annuler",
            onClick: ()=>{setShowDeleteParticipationModal(false)}
          }}
        />
      }
    </div>
  );
};

export default TournamentView;