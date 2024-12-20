import React, { createContext, useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken.userId;  
    }
    return null;
  };

  useEffect(() => {
    const id = getUserIdFromToken();
    setUserId(id);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwt_decode(token);
    setUserId(decodedToken.userId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, SignIn, Signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
