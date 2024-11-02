import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const login = (user) => {
    setIsAuthenticated(true);
    setUsername(user.username); // set the username after login
    // Optionally store user info in localStorage/sessionStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    // Optionally clear user info from localStorage/sessionStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
