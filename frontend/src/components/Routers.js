import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';

import Signin from '../Pages/Signin';

function Routers() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Signin />} />
  </Routes>
  )
}

export default Routers