import React, { useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    title: "10+ Jahre Erfahrung",
    description: "Seit über einem Jahrzehnt bieten wir zuverlässige und professionelle Taxiservices in Mainz und Umgebung.",
    icon: "🏆"
  },
  {
    title: "Professionelle Fahrer",
    description: "Unsere erfahrenen und lizenzierten Fahrer sind bekannt für ihre Zuverlässigkeit und Professionalität.",
    icon: "👨‍✈️"
  },
  {
    title: "Premium Fahrzeugflotte",
    description: "Unsere Flotte besteht ausschließlich aus hochwertigen Mercedes-Benz Fahrzeugen für maximalen Komfort.",
    icon: "🚖"
  },
  {
    title: "24/7 Verfügbarkeit",
    description: "Rund um die Uhr für Sie da - egal ob Tag oder Nacht, wir sind immer erreichbar.",
    icon: "🕒"
  }
];

const vehicles = [
  {
    type: "Mercedes-Benz E-Klasse",
    description: "Komfortables Taxi für bis zu 4 Personen",
    image: "/Taxi-Boy-5.jpeg"
  },
  {
    type: "Mercedes-Benz V-Klasse",
    description: "Raumwunder für bis zu 7 Personen",
    image: "/Taxi-Boy-3.jpeg"
  },
  {
    type: "Krankenfahrten",
    description: "Sicherer Transport zu medizinischen Terminen",
    image: "/Taxi-Boy-8.jpeg"
  },
  {
    type: "Mercedes Vito Tourer",
    description: "Großraumtaxi für bis zu 9 Personen",
    image: "/Taxi-Boy-2.jpeg"
  }
];

export default function AboutUs() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookingClick = () => {
    navigate('/');
    setTimeout(() => {
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center px-4 bg-gradient-to-r from-zinc-900 to-zinc-800 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60">
            <img 
              src="/Taxi-Boy-1.jpeg" 
              alt="TaxiBoy Fahrzeugflotte"
              className="w-full h-full object-cover object-center"
              style={{
                opacity: 0.8,
                mixBlendMode: 'luminosity'
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/70 to-transparent"></div>
        </div>
        
        <div className="max-w-6xl w-full mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Willkommen bei <span className="text-yellow-400">TaxiBoy</span>
          </h1>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-800 to-transparent"></div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-14 md:py-16 px-4 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12">Warum TaxiBoy?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-zinc-700 p-4 sm:p-5 md:p-6 rounded-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Fleet Section */}
      <section className="py-12 sm:py-14 md:py-16 px-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4">Unsere Fahrzeugflotte</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">Entdecken Sie unsere moderne Mercedes-Benz Flotte für jeden Anlass</p>
          </div>
          
          <div className="flex flex-nowrap gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {/* Add padding to allow full scroll on mobile */}
            <div className="flex-shrink-0 w-4"></div>
            {vehicles.map((vehicle, index) => (
              <div 
                key={index}
                className="group bg-zinc-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-zinc-700/30 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-yellow-500/10 flex-shrink-0 w-72 sm:w-80 snap-start"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="600"
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                    <img 
                      src={vehicle.image}
                      alt={vehicle.type}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {vehicle.type}
                      </h3>
                      <p className="text-gray-300">
                        {vehicle.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-4">
                      {vehicle.type === "Krankenfahrten" ? (
                        <Link 
                          to="/krankenfahrten"
                          className="w-full bg-zinc-700 hover:bg-yellow-500 text-white hover:text-black font-medium py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Mehr Infos
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      ) : (
                        <button 
                          onClick={handleBookingClick}
                          className="w-full bg-zinc-700 hover:bg-yellow-500 text-white hover:text-black font-medium py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Jetzt buchen
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Add padding to allow full scroll on mobile */}
            <div className="flex-shrink-0 w-4"></div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-12 sm:py-14 md:py-16 px-4 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-1 sm:mb-2">10+</div>
              <div className="text-sm sm:text-base text-gray-300">Jahre Erfahrung</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-1 sm:mb-2">15+</div>
              <div className="text-sm sm:text-base text-gray-300">Professionelle Fahrer</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-1 sm:mb-2">10k+</div>
              <div className="text-sm sm:text-base text-gray-300">Zufriedene Kunden</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-1 sm:mb-2">24/7</div>
              <div className="text-sm sm:text-base text-gray-300">Verfügbarkeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-14 md:py-16 px-4 bg-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">Bereit für Ihre Fahrt?</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-7 md:mb-8 px-2">
            Kontaktieren Sie uns jetzt für eine Buchung oder weitere Informationen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/?booking=true"
              className="bg-yellow-500 text-black px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-yellow-400 transition text-center"
            >
              Jetzt Buchen
            </Link>
            <a 
              href="https://wa.me/4915259606727"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-green-500 transition text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}