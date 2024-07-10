import { useState, useEffect } from 'react';
import { AtSymbolIcon, ChatBubbleLeftEllipsisIcon, CheckBadgeIcon, PhoneIcon, UserIcon } from "@heroicons/react/16/solid";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { Link } from "react-router-dom";
import { User } from "../../services/interfaces/UserInterface";
import usersData from '../../data-provisoire/users.json';

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const foundUser = usersData.find(u => u.id === 1);
    if (foundUser) {
      setUser(foundUser);
    }
  }, []);

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Bien servi, {user.firstname}!
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-8 lg:gap-x-8">
        <div className="w-full flex items-center justify-center lg:justify-start">
          <img src={user.avatar} alt={`${user.firstname} ${user.lastname}`} className='max-h-min rounded-2xl drop-shadow-xl' />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col items-center gap-y-6 justify-between font-text">
          <h1 className='my-1 flex items-center font-bold text-2xl'><UserIcon className="w-5 h-5 mr-2 lg:mr-5 "/>{user.firstname} {user.lastname}</h1>
          <p className='my-1 flex items-center'><PhoneIcon className="w-5 h-5 mr-2 lg:mr-5 "/>{user.phone}</p>
          <p className='my-1 flex items-center'><AtSymbolIcon className='w-5 h-5 mr-2 lg:mr-5'/>{user.email}</p>
          <p className='my-1 flex items-center'><CheckBadgeIcon className='w-5 h-5 mr-2 lg:mr-5'/>Licence n°{user.licence}</p>
          <p className='my-1 flex flex-col items-center text-center'><ChatBubbleLeftEllipsisIcon className='w-5 h-5'/>{user.bio}</p>
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