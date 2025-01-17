import React, { ReactNode } from 'react';
import  AuthProvider  from '../../src/interceptors/AuthProvider'; 
import  { User }  from '../../src/services/interfaces/UserInterface'; 

interface MockAuthProviderProps {
  children: ReactNode;
  user?: User | null;
  loading?: boolean; 
}

const MockAuthProvider: React.FC<MockAuthProviderProps> = ({ children}) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default MockAuthProvider;

