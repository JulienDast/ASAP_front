import AlertBox from "../../components/MaterailTailwind/AlertBox";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { useAuth } from "../../interceptors/AuthProvider";
import axios from "axios";

const DeleteProfile = () => {

  const { user } = useAuth(); 

  const deleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/${user?.id}`);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Jeu, set et ... match ?
        </h1>
      </div>
      <div className="flex flex-col gap-y-24">
        <AlertBox
          children={undefined}
          alertTitle="Vous allez supprimer votre compte !"
          alertFirstParagraph='En appuyant sur "Supprimer le compte", toutes les données (informations personnelles, commentaires et inscriptions aux torunois) seront définitivement supprimées.'
          alertSecondParagraph="Cette action sera irréversible."
          alertThirdParagraph="Voulez-vous toujours supprimer votre compte ?" 
          color="red"
        />
        <div className="text-center sm:w-1/2 md:w-full">
          <ButtonCta 
            color="red"
            children={undefined} 
            buttonText="Supprimer mon compte"
            onClick={()=>{deleteUser()}}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;