import AlertBox from "../../components/MaterailTailwind/AlertBox";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { InputDefault } from "../../components/MaterailTailwind/Input";

const ForgotPassword = () => {
  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Double faute !<br/>Pour modifier votre mot de passe :
        </h1>
        <form className="flex flex-col items-center gap-y-6 max-w-sm mx-auto mt-10 mb-6 font-text">
          <InputDefault
            label="Email"
            type="email"
            name="email"
          />
          <ButtonCta 
            type="submit" 
            buttonText="changer de mot de passe" 
            color="black" 
            children={undefined}
          />
        </form>
      </div>
      <AlertBox
        color="green"
        children={undefined} 
        alertTitle="Un email vous a été envoyé !" 
        alertFirstParagraph="Si votre adresse email est connue de nos services, vous recevrez très bientôt un message."
        alertSecondParagraph="Suivez la procédure et nous vous revoyons très vite parmi nous !" 
        alertThirdParagraph="Padelistiquement ! L'équipe ASAP"
      />
    </div>
  );
};

export default ForgotPassword;