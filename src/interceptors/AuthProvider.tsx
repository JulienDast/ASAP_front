import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { User } from "../services/interfaces/UserInterface";

interface DecodedToken {
  id: number; 
  iat: number; 
  exp: number;
}

type UserProfile = Pick<User, 'id' | 'firstname' | 'lastname' | 'role' | 'status' | 'avatar'>;

const AuthContext = createContext<{ user: UserProfile | null; loading:boolean; setUser: React.Dispatch<React.SetStateAction<UserProfile | null>> } | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) {
        setUser(null);
      } else {
        try {
          const userId = jwtDecode<DecodedToken>(token).id.toString();
          const response = await axios.get<User>(`http://localhost:3000/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          const userProfile: UserProfile = {
            id: response.data.id,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            role: response.data.role,
            status: response.data.status,
            avatar: response.data.avatar
          };

          setUser(userProfile);
        } catch (error) {
          console.error('Impossible de récupérer l\'utilisateur connecté:', error);
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();        
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
