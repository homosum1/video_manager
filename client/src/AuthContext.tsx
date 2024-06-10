import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const initialAuthContext: AuthContextType = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => { 

    setIsLoggedIn(true);
  };

  const logout = () => setIsLoggedIn(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/isLoggedIn', {
          credentials: 'include'
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
          // console.log('heree!');
        } else {
          setIsLoggedIn(false);
          navigate('/')
          // console.log('heree :(');
        }
      } catch (error) {
        setIsLoggedIn(false);
        navigate('/')
      }
    };

    checkLoginStatus();
  }, []);
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
