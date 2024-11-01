import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './components/Routers';



const App = () => {
  return (
    <Router>
   <Routers />
    </Router>
 
  );};

export default App;
