import { Link, useNavigate } from "react-router-dom";
import { InputDefault } from "../../components/MaterailTailwind/Input";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { Textarea } from "@material-tailwind/react";
import { useAuth } from "../../interceptors/AuthProvider";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { User } from "../../services/interfaces/UserInterface";
import axios from "axios";

const UpdateProfile = () => {
  
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [userData, setUserData] = useState<Omit<User, 'id'| 'email' | 'password' | 'role' | 'status' | 'comments'>>({
    firstname: '', 
    lastname: '',
    phone: '',
    licence: '',
    avatar: '',
    bio: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const fetchUser = async () => {
    try {
      const response = await axios.get<User>(`http://localhost:3000/user/${user?.id}`);
      const { firstname, lastname, phone, licence, avatar, bio } = response.data;
      setUserData({ firstname, lastname, phone, licence, avatar, bio });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData.firstname || !userData.lastname) {
      console.error('Tous les champs obligatoires doivent être renseignés.');
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/user/${user?.id}`, userData);
      navigate("/profil");
    } catch (error) {
      console.error('Erreur lors de la modification du profil:', error);
      console.log(userData);
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
          <h3>Erreur lors de la récupération de votre profil.</h3>
          <img className='h-16 w-16' src="https://media2.giphy.com/media/5EPpMxeBayAfuffLel/giphy.gif?cid=6c09b9529cny86yc69guck3rx93fmdeef4ui87j24tk6m8zi&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" alt="bouncing-ball" />
          <Link to="/profil">
            <ButtonCta 
              color="black" 
              children={undefined} 
              buttonText="Retourner sur votre profil"
            />
          </Link>
        </div>
      </>
    )
  }

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 lg:w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Balles neuves !
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 mx-auto mt-10 mb-6 font-text mx-0">
          <div className="form-container flex flex-col lg:flex-row justify-between my-10 gap-y-10 lg:gap-y-0">
            <div className="flex flex-col justify-center gap-y-10 w-full lg:w-2/5">
              <InputDefault
                label="Prénom*"
                type="text"
                name="firstname"
                value={userData?.firstname}
                onChange={handleInputChange}
              />
              <InputDefault
                label="Nom*"
                type="text"
                name="lastname"
                value={userData?.lastname}
                onChange={handleInputChange}
              />
              <InputDefault
                label="Téléphone"
                type="text"
                name="phone"
                value={userData?.phone}
                onChange={handleInputChange}
              />
              <InputDefault
                label="N° de licence"
                type="text"
                name="licence"
                value={userData?.licence}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col justify-center gap-y-10 w-full lg:w-2/5">
              <InputDefault
                label="Url de la photo de profil"
                type="text"
                name="avatar"
                value={userData?.avatar}
                onChange={handleInputChange}
              />
              <Textarea
                label="Bio"
                name="bio"
                value={userData?.bio}
                onPointerEnterCapture={undefined} 
                onPointerLeaveCapture={undefined}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <p>* Champs obligatoires<br/>(Le numéro de licence est obligatoire pour les compétiteurs)</p>
          <ButtonCta 
            type="submit" 
            buttonText="Modifier mon profil" 
            color="black" 
            children={undefined}
          />
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