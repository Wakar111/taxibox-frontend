import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BusinessTravel from './pages/BusinessTravel';
import AboutUs from './pages/About';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BookingOverview from './pages/BookingOverview';
import CookieBanner from './components/CookieBanner';
import Imprint from './pages/Imprint';
import { GoogleMapsProvider } from './contexts/GoogleMapsContext';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

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