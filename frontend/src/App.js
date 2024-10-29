import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="container">
    <Header />
    <Breadcrumb />
  
  </div>
  );};

export default App;
