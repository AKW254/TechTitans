import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Cards from './components/Cards';
import Footer from './components/Footer';



const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="container">
    <Header />
    <Breadcrumb />
    <Cards />
    <Footer />
  
  </div>
  );};

export default App;
