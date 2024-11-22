import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AirportTransfers from './pages/AirportTransfers';
import BusinessTravel from './pages/BusinessTravel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/airport-transfers" element={<AirportTransfers />} />
      <Route path="/business-travel" element={<BusinessTravel />} />
    </Routes>
  );
}

export default App;