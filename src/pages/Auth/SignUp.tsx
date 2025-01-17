import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";
import { InputDefault } from "../../components/MaterailTailwind/Input";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../../services/interfaces/UserInterface";
import axios from "axios";

const SignUp = () => {

  const navigate = useNavigate();
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [newUserData, setNewUserData] = useState<Pick<User, 'email' | 'password' | 'firstname' | 'lastname' | 'licence' | 'phone'>>({
    email: '', 
    password: '',
    firstname: '',
    lastname: '',
    licence: '',
    phone: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password-confirmation') {
      setPasswordConfirmation(value);
    } else {
      setNewUserData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newUserData.email || !newUserData.firstname || !newUserData.lastname || !newUserData.password) {
      console.error('Tous les champs obligatoires doivent être renseignés.');
      return;
    }
    if (newUserData.password !== passwordConfirmation) {
      console.error('Le mot de passe et sa confirmation ne correspondent pas.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/user', newUserData)
      navigate("/signin");
    } catch (error) {
      console.error('Erreur lors de la publication de la création de l\'utilisateur:', error);
    }
  };

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 lg:w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Bienvenue sur ASAP,<br/>le site officiel du club de padel d'Agnetz 🥎
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 mx-auto mt-10 mb-6 font-text mx-0">
          <div className="form-container flex flex-col lg:flex-row justify-between my-10 gap-y-10 lg:gap-y-0">
            <div className="flex flex-col justify-center gap-y-10 w-full lg:w-2/5">
              <InputDefault
                label="Email"
                type="email"
                name="email"
                value={newUserData.email}
                onChange={handleInputChange}
                required
              />
              <InputDefault
                label="Prénom"
                type="text"
                name="firstname"
                value={newUserData.firstname}
                onChange={handleInputChange}
                required
              />
              <InputDefault
                label="Nom"
                type="text"
                name="lastname"
                value={newUserData.lastname}
                onChange={handleInputChange}
                required
              />
              <InputDefault
                label="Téléphone"
                type="text"
                name="phone"
                value={newUserData.phone}
                onChange={handleInputChange}
              />
              <InputDefault
                label="N° de licence"
                type="text"
                name="licence"
                value={newUserData.licence}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col justify-center gap-y-10 w-full lg:w-2/5">
              <InputDefault
                label="Mot de passe"
                type="password"
                name="password"
                value={newUserData.password}
                onChange={handleInputChange}
                required
              />
              <InputDefault
                label="Confirmation du mot de passe"
                type="password"
                name="password-confirmation"
                value={passwordConfirmation}
                onChange={handleInputChange}
                required
              />
              <div className="flex flex-row items-center align-center">
                <Checkbox 
                  onPointerEnterCapture={undefined} 
                  onPointerLeaveCapture={undefined} 
                  crossOrigin={undefined}
                  required
                />
                <label>
                  Accepter les<br/>
                  <Link className="ml-1 underline" to="/cgu" target="blank">conditions générales d'utilisation</Link>
                </label>
              </div>
            </div>
          </div>
          <p>* Champs obligatoires<br/>(Le numéro de licence est obligatoire pour les compétiteurs)</p>
            <ButtonCta 
              type="submit" 
              buttonText="Inscription" 
              color="black" 
              children={undefined}
            />
        </form>
      </div>
    </div>
  );
};

export default SignUp;