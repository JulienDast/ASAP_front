import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonCta from "../../components/MaterailTailwind/ButtonCta";
import { InputDefault } from "../../components/MaterailTailwind/Input";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/auth/signin", { email, password });

      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        navigate("/");
        window.location.reload(); 
      } else {
        setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
      }
    } catch (err) {
      console.error("Erreur de connexion:", err);
    } 
  };

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Bienvenue sur ASAP,<br/>le site officiel du club de padel d'Agnetz 🥎
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-6 max-w-sm mx-auto mt-10 mb-6 font-text">
          <InputDefault
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputDefault
            label="Mot de passe"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link to="/signin/forgot-password">
            <p className="text-gray-600 hover:underline hover:decoration-1 hover:decoration-gray-600 ease-in-out underline-offset-4">
              Mot de passe oublié ?
            </p>
          </Link>
          {error && <p className="text-red-500">{error}</p>}
          <ButtonCta 
            type="submit"
            buttonText={"Connexion"}
            color="black"
            children={undefined} 
          />
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