import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

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

  // Client-side login function
  const login = async (user) => {
    if (user) {
      setIsAuthenticated(true);
      setUsername(user.username);
      localStorage.setItem("authState", JSON.stringify(user)); // Persist user data in localStorage
    } else {
      console.error("Invalid user data");
    }
  };

  // Check session on mount using useEffect
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/auth/checksession",
          {
            withCredentials: true, // This ensures cookies are sent along with the request
          }
        );
        console.log("User is authenticated:", response.data.user);
      } catch (error) {
        console.error("No active session or invalid token", error);
      }
    };


    checkSession();
  }, []); // Only run on mount

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
