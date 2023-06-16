import axios from 'axios';
import { createContext } from 'react';
import { useEffect, useState } from 'react';
import { addRequest } from '../axios';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = async (loginInput) => {
    const res = await addRequest.post('/auth/login', loginInput, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, login }}>{children}</AuthContext.Provider>;
};
