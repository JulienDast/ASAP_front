import { Link, useParams } from 'react-router-dom';
import usersData from '../../data-provisoire/users.json';
import ButtonCta from '../../components/MaterailTailwind/ButtonCta';
import { User } from '../../services/interfaces/UserInterface';
import { AtSymbolIcon, ChatBubbleLeftEllipsisIcon, CheckBadgeIcon, PhoneIcon } from '@heroicons/react/16/solid';

const MemberProfile = () => {
  const { id } = useParams<{ id: string }>();
  const user: User | undefined = usersData.find(user => user.id === parseInt(id || '0', 10));

  if (!user) {
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
          {user.firstname} {user.lastname}
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-8 lg:gap-x-8">
        <div className="w-full flex items-center justify-center lg:justify-start">
          <img src={user.avatar} alt={`${user.firstname} ${user.lastname}`} className='max-h-min rounded-2xl drop-shadow-xl' />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col items-center gap-y-6 justify-between font-text">
          <p className='my-1 flex items-center'>
            <PhoneIcon className="w-5 h-5 mr-2 lg:mr-5 "/>
            {user.phone ? user.phone : "Non renseigné"}
          </p>          
          <p className='my-1 flex items-center'>
            <AtSymbolIcon className='w-5 h-5 mr-2 lg:mr-5'/>
            {user.email}
          </p>
          <p className='my-1 flex items-center'>
            <CheckBadgeIcon className='w-5 h-5 mr-2 lg:mr-5'/>
            {user.licence ? "N° licence : " + user.licence : " Licence non renseingée"}
            </p>
          <p className='my-1 flex flex-col items-center text-center'>
            <ChatBubbleLeftEllipsisIcon className='w-5 h-5'/>
            {user.bio ? user.bio : "Pas encore de bio !"}
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
      </div>
    </div>
  );
};

export default MemberProfile;