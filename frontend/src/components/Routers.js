import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Index from '../Pages/Index';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={< Index />} />
     
    </Routes>
  );
}

export default Routers