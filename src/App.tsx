import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusinessTravel from './pages/BusinessTravel';
import AirportTransfers from './pages/AirportTransfers';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business-travel" element={<BusinessTravel />} />
        <Route path="/airport-transfers" element={<AirportTransfers />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <CookieBanner />
    </>
  );
}

export default App;