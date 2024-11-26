import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusinessTravel from './pages/BusinessTravel';
import AirportTransfers from './pages/AirportTransfers';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/business-travel" element={<BusinessTravel />} />
      <Route path="/airport-transfers" element={<AirportTransfers />} />
    </Routes>
  );
}

export default App;