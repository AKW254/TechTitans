// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Add the CSS import
import Routers from "./components/Routers";
import { AuthProvider } from "./context/AuthContext";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routers />
        <ToastContainer /> {/* Make sure it's here */}
      </Router>
    </AuthProvider>
  );
};

export default App;
