import { useState, useEffect } from 'react';
import { AtSymbolIcon, ChatBubbleLeftEllipsisIcon, CheckBadgeIcon, PhoneIcon, UserIcon } from "@heroicons/react/16/solid";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { Link } from "react-router-dom";
import { User } from "../../services/interfaces/UserInterface";
import { useAuth } from '../../interceptors/AuthProvider';
import axios from 'axios';
import PadelPlayer from "../../assets/PadelPlayer.webp"

const UserProfile = () => {
  const [completeUser, setCompleteUser] = useState<User>();
  const { user } = useAuth(); 

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>(`http://localhost:3000/user/${user?.id}`);
      setCompleteUser(response.data);
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    if (user) {
      fetchUser(); 
    }
  }, [user]);


  if (!user) {
    return (
      <>
        <div className="flex mx-10 items-center flex-col text-center gap-y-10 font-text">
          <h3>Erreur lors de la récupération de votre profil. Veuillez vous reconnecter.</h3>
          <img className='h-16 w-16' src="https://media2.giphy.com/media/5EPpMxeBayAfuffLel/giphy.gif?cid=6c09b9529cny86yc69guck3rx93fmdeef4ui87j24tk6m8zi&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" alt="bouncing-ball" />
          <Link to="/signin">
            <ButtonCta 
              color="black" 
              children={undefined} 
              buttonText="Connexion"
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
          Bien servi, {completeUser?.firstname} !
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-8 lg:gap-x-8">
        <div className="w-full flex items-center justify-center lg:justify-start">
          <img 
            src={completeUser?.avatar? completeUser?.avatar : PadelPlayer}
            alt={`${completeUser?.firstname} ${completeUser?.lastname}`} 
            className='max-h-min rounded-2xl drop-shadow-xl'
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col items-center gap-y-6 justify-between font-text">
          <h1 className='my-1 flex items-center font-bold text-xl text-center'><UserIcon className="w-5 h-5 mr-2 lg:mr-5"/>{completeUser?.firstname} {completeUser?.lastname}</h1>
          <p className='my-1 flex items-center'><PhoneIcon className="w-5 h-5 mr-2 lg:mr-5"/>{completeUser?.phone}</p>
          <p className='my-1 flex items-center'><AtSymbolIcon className='w-5 h-5 mr-2 lg:mr-5'/>{completeUser?.email}</p>
          <p className='my-1 flex items-center'><CheckBadgeIcon className='w-5 h-5 mr-2 lg:mr-5'/>Licence n°{completeUser?.licence}</p>
          <p className='my-1 flex flex-col items-center text-center'><ChatBubbleLeftEllipsisIcon className='w-5 h-5'/>{completeUser?.bio}</p>
        </div>
      </div>
      <div className="flex text-center flex-col md:flex-row w-full justify-around gap-y-5 md:gap-y-0 my-10">
        <Link to="/profil/update-profil">
          <ButtonCta 
            children={undefined} 
            buttonText="Modifier mon profil"
            color="black"
          />
        </Link>
        <Link to='/profil/delete-profil'>
          <ButtonCta 
            children={undefined}
            buttonText="Supprimer mon compte"
            color="red"
          />
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
