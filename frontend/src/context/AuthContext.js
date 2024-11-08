import React, { createContext, useState, useContext, useEffect } from "react";

// Create context
const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to manage the state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

 const login = (user) => {
   if (user) {
     setIsAuthenticated(true);
     setUsername(user.username);
     localStorage.setItem("authState", JSON.stringify(user)); // Persist user data in localStorage
   } else {
     console.error("Invalid user data");
   }
 };
useEffect(() => {
  const savedAuthState = localStorage.getItem("authState");
  if (savedAuthState) {
    const user = JSON.parse(savedAuthState); // Parse user data
    setIsAuthenticated(true);
    setUsername(user.username); // Update state with user data
  }
}, []);


  // Logout function
  const logout = () => {
     setIsAuthenticated(false);
     setUsername("");
     localStorage.removeItem("authState");
    
  };

  
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
