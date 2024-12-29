import React, { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Shield, Star, Clock, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';

const standardTaxiRates = [
  { type: 'Taxi Grundpreis', price: '4.00€' },
  { type: 'bis 4. Kilometer', price: '2.50€' },
  { type: 'Je weiteren Kilometer', price: '1.80€' },
  { type: 'Wartezeit pro Stunde', price: '40.00€' },
  { type: 'Großraum (4€ Grundpreis + 5€ Umschlag)', price: '9.00€' },
];

export default function Home() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Check for both state and URL parameter
    if (location.state?.scrollToBooking || searchParams.get('booking') === 'true') {
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state, searchParams]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <Navbar onSectionClick={scrollToSection} showNavLinks={true} />

      {/* Hero Section */}
      <div className="h-screen relative flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80"
            alt="Mercedes Luxury Car"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative text-center space-y-6 px-4">
          <h1 className="text-6xl font-bold">Ihr zuverlässiger Partner für Taxifahrten</h1>
          <p className="text-xl max-w-2xl mx-auto">Professioneller Service, erfahrene Fahrer und komfortable Fahrzeuge für Ihre sichere Reise</p>
          <button 
            onClick={() => scrollToSection('booking')}
            className="bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
          >
            Jetzt buchen
          </button>
        </div>
        <ChevronDown 
          className="absolute bottom-8 w-8 h-8 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('about')}
        />
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-zinc-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Über uns</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Sicherheit zuerst</h3>
              <p className="text-gray-300">Professionelle Fahrer mit langjähriger Erfahrung und vollversicherte Fahrzeuge.</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Pünktlichkeit</h3>
              <p className="text-gray-300">Zuverlässiger Service rund um die Uhr, damit Sie pünktlich an Ihrem Ziel ankommen.</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Komfort</h3>
              <p className="text-gray-300">Moderne, gepflegte Fahrzeuge für eine angenehme und komfortable Fahrt.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Unsere Angebote</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/about" className="relative h-64 rounded-xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1512978748615-0bfcbdc57bc3?auto=format&fit=crop&q=80"
                alt="Flughafentransfer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-bold">Unsere Leistungen</h3>
              </div>
            </Link>
            <Link to="/business-travel" className="relative h-64 rounded-xl overflow-hidden group">
              <img 
                src="https://plus.unsplash.com/premium_photo-1664478072478-549adcf0d953?auto=format&fit=crop&q=80"
                alt="Geschäftsreisen"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-bold">Geschäftsreisen</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Standard Taxitarife Section */}
      <section className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Standard Taxitarife</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {standardTaxiRates.map((rate, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-6 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors duration-300 shadow-lg"
                >
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-4"></div>
                    <span className="text-lg text-gray-100">{rate.type}</span>
                  </div>
                  <span className="text-xl font-semibold text-yellow-500 ml-4">{rate.price}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-center mt-8 text-sm">
              * Alle Preise inkl. MwSt. Preise können je nach Uhrzeit und Strecke variieren.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-zinc-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Jetzt buchen</h2>
          <div className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-xl shadow-xl">
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}