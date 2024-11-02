import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './components/Routers';
import { AuthProvider } from './context/AuthContext';


const App = () => {
  return (
    <AuthProvider>
 <Router>
   <Routers />
    </Router>
    </AuthProvider>
   
 
  );};

export default App;
