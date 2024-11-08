import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Signin from '../Pages/Signin';
import Index from '../Pages/Index';
function Routers() {
  return (
    <Routes>
      <Route path="/" element={< Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signin />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default Routers