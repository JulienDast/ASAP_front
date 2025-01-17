import React from "react";
import {Navbar, Typography, Button, IconButton, Collapse} from "@material-tailwind/react";
import { IdentificationIcon, NewspaperIcon, TrophyIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import LogoClub from "../../assets/LogoClub.png";
import { useAuth } from "../../interceptors/AuthProvider";

const NavbarApp = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const { user } = useAuth(); 
  
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const deleteToken = ()=>{
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col items-center lg:mb-0 lg:mt-0 lg:flex-row lg:gap-20 xl:gap-64">
      <Typography
        as="li"
        variant="paragraph"
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium hover:underline hover:decoration-2 hover:decoration-yellow-300 ease-in-out underline-offset-4" 
        placeholder="" 
        onPointerEnterCapture="" 
        onPointerLeaveCapture=""
      >
        <NewspaperIcon className="h-10 w-10 text-yellow-300" />
        <Link to="/articles" className="flex items-center">
          ARTICLES
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="paragraph"
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium hover:underline hover:decoration-2 hover:decoration-yellow-300 ease-in-out underline-offset-4" 
        placeholder="" 
        onPointerEnterCapture="" 
        onPointerLeaveCapture=""
      >
        <UserGroupIcon className="h-10 w-10 text-yellow-300" />
        <Link to="/members" className="flex items-center">
          ADHÉRENTS
        </Link>
      </Typography>
      <Typography
        as="li"           
        variant="paragraph"
        color="white"
        className="flex items-center gap-x-2 p-1 font-medium hover:underline hover:decoration-2 hover:decoration-yellow-300 ease-in-out underline-offset-4" 
        placeholder="" 
        onPointerEnterCapture="" 
        onPointerLeaveCapture=""
      >
        <TrophyIcon className="h-10 w-10 text-yellow-300" />
        <Link to="/tournaments" className="flex items-center">
          TOURNOIS
        </Link>
      </Typography>
      {user &&
        <Typography
          as="li"
          variant="paragraph"
          color="white"
          className="flex items-center gap-x-2 p-1 font-medium hover:underline hover:decoration-2 hover:decoration-yellow-300 ease-in-out underline-offset-4" 
          placeholder="" 
          onPointerEnterCapture="" 
          onPointerLeaveCapture=""
        >
          <IdentificationIcon className="h-10 w-10 text-yellow-300" />
          <Link to="/profil" className="flex items-center">
            MON PROFIL
          </Link>
        </Typography>
      }
    </ul>
  );
 
  return (
    <Navbar className="w-full mx-auto px-4 py-2 lg:px-8 lg:py-4 max-w-screen-2xl-100 bg-opacity-100 bg-layoutBackground border-none rounded-none"
      placeholder="" 
      onPointerEnterCapture=""
      onPointerLeaveCapture=""
    >
      <div className="mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to="/"><img className="w-18 h-18" src={LogoClub}/></Link>
        <div className="hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {!user ? (
            <Link to="/signin">
              <Button
                variant="gradient"
                size="sm"
                placeholder="" 
                onPointerEnterCapture="" 
                onPointerLeaveCapture=""
                className="hidden lg:inline-block"
              >
                <span>CONNEXION</span>
              </Button>
            </Link> 
            ):(
            <a href="/">
              <Button
                variant="gradient"
                size="sm"
                placeholder="" 
                onPointerEnterCapture="" 
                onPointerLeaveCapture=""
                className="hidden lg:inline-block"
                onClick={deleteToken}
              >
                <span>DÉCONNEXION</span>
              </Button>
            </a>
            )}
          </div>
        <IconButton
          variant="text"
          placeholder=""
          onPointerEnterCapture="" 
          onPointerLeaveCapture=""
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)} 
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              color="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              color="white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            {!user ? (
            <Link className="w-full" to="/signin">
              <Button 
                fullWidth
                variant="gradient"
                size="sm"
                placeholder="" 
                onPointerEnterCapture="" 
                onPointerLeaveCapture=""
              >
                <span>CONNEXION</span>
              </Button>
            </Link>
            ):(
            <a className="w-full" href="/">
              <Button 
                fullWidth 
                variant="gradient" 
                size="sm" 
                className=""
                placeholder="" 
                onPointerEnterCapture="" 
                onPointerLeaveCapture=""
                onClick={deleteToken}
              >
                <span>DÉCONNEXION</span>
              </Button>
            </a>
            )}
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarApp;