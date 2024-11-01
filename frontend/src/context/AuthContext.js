import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (user) => {
    setIsAuthenticated(true);
    // Optionally store user info in localStorage/sessionStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Optionally clear user info from localStorage/sessionStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
