import { Link } from "react-router-dom";
import { Checkbox } from "@material-tailwind/react";
import { InputDefault } from "../../components/MaterailTailwind/Input";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";

const SignUp = () => {
  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 lg:w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Bienvenue sur ASAP,<br/>le site officiel du club de padel d'Agnetz 🥎
        </h1>
        <form className="flex flex-col gap-y-6 mx-auto mt-10 mb-6 font-text mx-0">
          <div className="form-container flex flex-col lg:flex-row justify-between my-10 gap-y-10 lg:gap-y-0">
            <div className="flex flex-col justify-center gap-y-10 w-full lg:w-2/5">
              <InputDefault
                label="Email*"
                type="email"
                name="email"
              />
              <InputDefault
                label="Prénom*"
                type="text"
                name="firstname"
              />
              <InputDefault
                label="Nom*"
                type="text"
                name="lastname"
              />
              <InputDefault
                label="Téléphone"
                type="text"
                name="phone"
              />
              <InputDefault
                label="N° de licence"
                type="text"
                name="licence"
              />
            </div>
            <div className="flex flex-col justify-center gap-y-10 w-full lg:w-2/5">
              <InputDefault
                label="Mot de passe*"
                type="password"
                name="password"
              />
              <InputDefault
                label="Confirmation du mot de passe*"
                type="password"
                name="password-confirmation"
              />
              <div className="flex flex-row items-center align-center">
                <Checkbox 
                  onPointerEnterCapture={undefined} 
                  onPointerLeaveCapture={undefined} 
                  crossOrigin={undefined}
                />
                <label>
                  Accepter les<br/>
                  <Link className="ml-1 underline" to="/cgu" target="blank">conditions générales d'utilisation</Link>
                </label>
              </div>
            </div>
          </div>
          <p>* Champs obligatoires<br/>(Le numéro de licence est obligatoire pour les compétiteurs)</p>
          <p></p>
          <Link to="/">
            <ButtonCta 
              type="submit" 
              buttonText="Inscription" 
              color="black" 
              children={undefined}
            />
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;