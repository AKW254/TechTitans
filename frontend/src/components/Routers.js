import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Singlepost from '../Pages/Single_post';
import CreatePost from '../Pages/Create_Post';
import ManagePost from '../Pages/Manage_Post';
import Home from '../Pages/Home';
import Profile from '../Pages/Profile';
function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Singlepost/:id" element={<Singlepost />} />
      <Route path="/Create-Post" element={<CreatePost />} />
      <Route path="/Manage-Post" element={<ManagePost />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default Routers