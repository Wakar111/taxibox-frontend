import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusinessTravel from './pages/BusinessTravel';
import AboutUs from './pages/About';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BookingOverview from './pages/BookingOverview';
import Imprint from './pages/Imprint';
import CookieBanner from './components/CookieBanner';
import { GoogleMapsProvider } from './contexts/GoogleMapsContext';

function App() {
  return (
    <GoogleMapsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business-travel" element={<BusinessTravel />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/booking-overview" element={<BookingOverview />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/imprint" element={<Imprint />} />
      </Routes>
      <CookieBanner />
    </GoogleMapsProvider>
  );
}

export default App;