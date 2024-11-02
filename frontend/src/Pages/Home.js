import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import Cards from '../components/Cards'
import Footer from '../components/Footer'
import { AuthProvider } from '../context/AuthContext';
function Home() {
  return (
    <div className="container">
      <AuthProvider>
      <Header />
    <Breadcrumb />
    <Cards />
    <Footer />
      </AuthProvider>
    
  
  </div>
  )
}

export default Home