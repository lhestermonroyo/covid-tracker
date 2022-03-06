import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Provinces from './pages/Provinces';
import Regions from './pages/Regions';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regions" element={<Regions />} />
      <Route path="/provinces" element={<Provinces />} />
    </Routes>
  );
};

export default AppRoutes;
