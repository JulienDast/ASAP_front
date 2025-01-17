import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonCta from '../../components/MaterailTailwind/ButtonCta';
import { RoleUser, User } from '../../services/interfaces/UserInterface';
import { AtSymbolIcon, ChatBubbleLeftEllipsisIcon, CheckBadgeIcon, PhoneIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AlertBox from '../../components/MaterailTailwind/AlertBox';
import { useAuth } from '../../interceptors/AuthProvider';
import PadelPlayer from "../../assets/PadelPlayer.webp"

const MemberProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<User | undefined>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); 


  const fetchUser = async () => {
    try {
      const response = await axios.get<User>(`http://localhost:3000/user/${id}`);
      setMember(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'adhérent:', error);
    }
  };

  const deleteUser = async (id : number) => {
    try {
      await axios.delete(`http://localhost:3000/user/${id}`);
      navigate("/members", { state: { refresh: true } });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'adhérent:', error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (!member) {
    return (
      <>
        <div className="flex flex-col text-center gap-y-10 font-text">
          <h3>Utilisateur non trouvé</h3>
          <Link to="/members">
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
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          {member.firstname} {member.lastname}
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-8 lg:gap-x-8">
        <div className="w-full flex items-center justify-center lg:justify-start">
          <img 
            src={member.avatar? member.avatar : PadelPlayer}
            alt={`${member.firstname} ${member.lastname}`}
            className='min-h-max rounded-2xl drop-shadow-xl'
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col items-center gap-y-6 justify-between font-text">
          <p className='my-1 flex items-center'>
            <PhoneIcon className="w-5 h-5 mr-2 lg:mr-5 "/>
            {member.phone ? member.phone : "Non renseigné"}
          </p>          
          <p className='my-1 flex items-center'>
            <AtSymbolIcon className='w-5 h-5 mr-2 lg:mr-5'/>
            {member.email}
          </p>
          <p className='my-1 flex items-center'>
            <CheckBadgeIcon className='w-5 h-5 mr-2 lg:mr-5'/>
            {member.licence ? "N° licence : " + member.licence : " Licence non renseingée"}
            </p>
          <p className='my-1 flex flex-col items-center text-center'>
            <ChatBubbleLeftEllipsisIcon className='w-5 h-5'/>
            {member.bio ? member.bio : "Pas encore de bio !"}
          </p>
        </div>
      </div>
      <div className="flex text-center flex-col md:flex-row w-full justify-around gap-y-5 md:gap-y-0 my-10">
        <Link to="/members">
          <ButtonCta 
            children={undefined} 
            buttonText="Retourner à la liste"
            color="black"
          />
        </Link>
        {user?.role === RoleUser.ADMIN && member.id !== user.id &&
        <ButtonCta 
            children={undefined} 
            buttonText="Supprimer cet utilisateur"
            color="red"
            onClick={() => {
              setShowDeleteModal(true);
            }}
          />
        }
      </div>
      {showDeleteModal &&
        <AlertBox 
          color={"red"} 
          children={undefined} 
          alertTitle={"Vous allez supprimer définitivement cet adhérent !"} 
          alertFirstParagraph={"Son compte, ses publications et ses participations aux tournois seront supprimés."} 
          alertSecondParagraph={""} 
          alertThirdParagraph={""}
          colorFirstBtn="white"
          colorScndBtn="black"
          primaryButton={{
            text: "Confirmer",
            onClick: ()=>{ 
              if (id) {
              deleteUser(+id);
              setShowDeleteModal(false);
              navigate("/members");
            }}
          }}
          secondaryButton={{
            text: "Annuler",
            onClick: ()=>{setShowDeleteModal(false)}
          }}
        /> 
      }
    </div>
  );
};

export default MemberProfile;