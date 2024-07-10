import { Link } from "react-router-dom";
import { InputDefault } from "../../components/MaterailTailwind/Input";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { Textarea } from "@material-tailwind/react";
import { User } from "../../services/interfaces/UserInterface";
import usersData from '../../data-provisoire/users.json';


const user: User = usersData[0]


const UpdateProfile = () => {
  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 lg:w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Balles neuves !
        </h1>
        <form className="flex flex-col gap-y-6 mx-auto mt-10 mb-6 font-text mx-0">
          <div className="form-container flex flex-col lg:flex-row justify-between my-10 gap-y-10 lg:gap-y-0">
            <div className="flex flex-col justify-center gap-y-10 w-full lg:w-2/5">
              <InputDefault
                label="Prénom*"
                type="text"
                name="firstname"
                value={user.firstname}
              />
              <InputDefault
                label="Nom*"
                type="text"
                name="lastname"
                value={user.lastname}
              />
              <InputDefault
                label="Téléphone"
                type="text"
                name="phone"
                value={user.phone}
              />
              <InputDefault
                label="N° de licence"
                type="text"
                name="licence"
                value={user.licence}
              />
            </div>
            <div className="flex flex-col justify-center gap-y-10 w-full lg:w-2/5">
              <InputDefault
                label="Url de la photo de profil"
                type="text"
                name="avatar"
                value={user.avatar}
              />
              <Textarea
                label="Bio"
                name="bio"
                value={user.bio}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}/>
            </div>
          </div>
          <p>* Champs obligatoires<br/>(Le numéro de licence est obligatoire pour les compétiteurs)</p>
          <p></p>
          <Link to="/profil">
            <ButtonCta 
              type="submit" 
              buttonText="Modifier mon profil" 
              color="black" 
              children={undefined}
            />
          </Link>
          <Link to="/profil">
            <p className="text-gray-600 hover:underline hover:decoration-1 hover:decoration-gray-600 ease-in-out underline-offset-4">
              Annuler les modifications
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;