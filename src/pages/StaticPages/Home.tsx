import GifPadel from "../../assets/GifPadel.webp"

const Home = () => {
  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Bienvenue sur ASAP,<br/>le site officiel du club de padel d'Agnetz 🥎
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-y-8 gap-x-12 lg:gap-x-36">
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <img src={GifPadel} alt="joueur_padel_animated" className='rounded-2xl drop-shadow-xl' />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col gap-y-6 justify-between font-text">
          <p className='mt-5 text-center'>Le padel est un sport captivant et amusant, alliant rapidité et stratégie. Ouvert à tous les niveaux de compétence, il charme par sa convivialité et son dynamisme.</p>
          <p className='my-5 text-center'>Rejoignez-nous à Agnetz pour relever le défi ! Mesurez-vous aux meilleurs sur nos courts et améliorez vos compétences. Plongez dans des matchs palpitants dans une ambiance chaleureuse et amicale !</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
