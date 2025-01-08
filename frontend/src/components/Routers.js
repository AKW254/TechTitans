import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Index from '../Pages/Index';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Routers