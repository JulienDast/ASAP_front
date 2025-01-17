import { useEffect, useState } from 'react';
import { User } from '../../services/interfaces/UserInterface';
import { Link, useLocation } from 'react-router-dom';
import InputSearch from '../../components/MaterailTailwind/InputSearch';
import { ProfileCard } from '../../components/MaterailTailwind/ProfileCard';
import { Button } from '@material-tailwind/react';
import axios from 'axios';

const MembersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const filteredUsers = users.filter(user =>
    `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<User[]>('http://localhost:3000/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (!users.length || location.state?.refresh) {
      fetchUsers();
    }
  }, [location.state]);

  if (isLoading) {
    return(
      <div className="flex flex-col items-center">
        <p>Chargement des articles</p> 
        <Button
          children={undefined} 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
          loading={true}
          variant="text"
        />
      </div>
    )
  }

  return (
    <div className='px-4 py-2 lg:px-8 lg:py-4 w-full'>
      <div className="w-9/12 mx-auto my-10 text-center">
        <h1 className="sm:text-5xl text-2xl text-titleColor !leading-[2.5rem] sm:!leading-[3.5rem] font-title">
          Les adhérents
        </h1>
        <div className="w-full md:w-1/2 flex justify-center my-12 mx-auto">
          <InputSearch
            label="Rechercher un adhérent"
            type="text"
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {filteredUsers.map(user => (
            <Link 
              key={user.id} 
              to={`/members/${user.id}`} 
              className="w-full flex justify-center"
            >
              <ProfileCard user={user} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersList;
