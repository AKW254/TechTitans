import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Index from '../Pages/Index';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Single_post from '../Pages/Single_post';
import Create_Post from '../Pages/Create_Post';
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Single Post" element={<Single_post />} />
      <Route path="/Create Post" element={<Create_Post />} />
    </Routes>
  );
}

export default Routers