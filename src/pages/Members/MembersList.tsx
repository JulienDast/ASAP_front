import { useState } from 'react';
import { User } from '../../services/interfaces/UserInterface';
import { Link } from 'react-router-dom';
import usersData from '../../data-provisoire/users.json';
import InputSearch from '../../components/MaterailTailwind/InputSearch';
import { ProfileCard } from '../../components/MaterailTailwind/ProfileCard';

const MembersList = () => {
  const [users] = useState<User[]>(usersData);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    `${user.firstname} ${user.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
