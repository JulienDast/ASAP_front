import { ClockIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/16/solid';
import PistasPhoto from '../../assets/Pistas.png';


const Contact = () => {
  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-9/12'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Un conseil ? Un renseignement ?<br/> Contactez-nous !
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-y-8 gap-x-12 lg:gap-x-36">
        <div className="w-full lg:w-1/3 flex items-center justify-center">
          <img src={PistasPhoto} className='rounded-2xl drop-shadow-xl' />
        </div>
        <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col items-center gap-y-6 justify-between font-text">
          <p className='my-1 flex items-center'><PhoneIcon className="w-5 h-5 mr-5 "/>03 44 77 09 33</p>
          <p className='my-1 flex items-center'><EnvelopeIcon className='w-5 h-5 mr-5'/>secretariat.agnetz-tennis@hotmail.com</p>
          <p className='my-1 flex items-center'><MapPinIcon className='w-5 h-5 mr-5'/>Rue Joseph Van Lancker 60600 AGNETZ</p>
          <p className='my-1 flex items-center text-center'><ClockIcon className='w-5 h-5 mr-5'/>Permanences :<br/>Mercredi et samedi 15h00-18h00, dimanche 9h00-12h00</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;