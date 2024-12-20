import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusinessTravel from './pages/BusinessTravel';
import Taxirechner from './pages/Taxirechner';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BookingOverview from './pages/BookingOverview';
import CookieBanner from './components/CookieBanner';
import { GoogleMapsProvider } from './contexts/GoogleMapsContext';

function App() {
  return (
    <GoogleMapsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business-travel" element={<BusinessTravel />} />
        <Route path="/taxi-rechner" element={<Taxirechner />} />
        <Route path="/booking-overview" element={<BookingOverview />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <CookieBanner />
    </GoogleMapsProvider>
  );
}

export default App;