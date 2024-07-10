import { Link } from "react-router-dom";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { InputDefault } from "../../components/MaterailTailwind/Input";

const SignIn = () => {
  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Bienvenue sur ASAP,<br/>le site officiel du club de padel d'Agnetz 🥎
        </h1>
        <form className="flex flex-col items-center gap-y-6 max-w-sm mx-auto mt-10 mb-6 font-text">
          <InputDefault
            label="Email"
            type="email"
            name="email"
          />
          <InputDefault
            label="Mot de passe"
            type="password"
            name="password"
          />
          <Link to="/signin/forgot-password">
            <p className="text-gray-600 hover:underline hover:decoration-1 hover:decoration-gray-600 ease-in-out underline-offset-4">
              Mot de passe oublié ?
            </p>
          </Link>
          <Link to="/">
            <ButtonCta 
              type="submit" 
              buttonText="Connexion"
              color="black" 
              children={undefined}
            />
          </Link>
        </form>
        <Link to="/signup">
          <ButtonCta 
            buttonText="Pas encore inscrit ?" 
            color="black" 
            children={undefined}
          />
        </Link>
      </div>
    </div>
  );
};

export default SignIn;