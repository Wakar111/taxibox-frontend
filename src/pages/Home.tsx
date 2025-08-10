import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Shield, Star, Clock, ChevronDown, Phone } from 'lucide-react';
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
const rentalCarRates = [
  { type: 'Mietwagen normal (4 Personen)', price: '1.60€/km' },
  { type: 'Mietwagen Großraum (6 Personen)', price: '1.80€/km' },
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
      <div className="h-[70vh] relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-zinc-900">
          <img 
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80"
            alt="Mercedes Luxury Car"
            className="w-full h-full object-cover opacity-50"
            style={{ maxHeight: '70vh' }}
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative text-center space-y-8 px-4 max-w-6xl mx-auto">
          <div 
            className="space-y-6 transform transition-all duration-1000 ease-out"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Taxi-Service in <span className="text-yellow-500">Mainz</span> & <span className="text-yellow-500">Wiesbaden</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Schnell, sicher und zuverlässig an Ihr Ziel - rund um die Uhr, 365 Tage im Jahr
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('booking')}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Jetzt Fahrt buchen
              </button>
              <a 
                href="tel:+4961311234567" 
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 border border-white/20 backdrop-blur-sm"
              >
                <span className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  06131 1234567
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('services')}
        >
          <ChevronDown className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-white/80 hover:text-yellow-500 transition-colors" />
        </div>
      </div>

      {/* Premium Fleet Section */}
      <section id="fleet" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-zinc-900 to-zinc-950 overflow-hidden">
        <div className="container mx-auto px-4">
          <div 
            className="text-center mb-10 sm:mb-12 md:mb-16"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="inline-block mb-3">
              <div className="h-1 w-12 bg-yellow-500 mx-auto"></div>
              <h3 className="text-yellow-500 font-semibold tracking-wider mt-2 text-sm sm:text-base">PREMIUM FAHRZEUGE</h3>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Unsere Exklusive Flotte</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2">Erleben Sie erstklassigen Komfort und Zuverlässigkeit mit unserer modernen Mercedes-Benz Fahrzeugflotte</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
            {[
              {
                img: "/Taxi-Boy-5.jpeg",
                title: "Premium Fahrzeuge",
                desc: "Luxus und Komfort auf höchstem Niveau",
                icon: "✓ Klimaautomatik"
              },
              {
                img: "/Taxi-Boy-3.jpeg",
                title: "Flughafentransfer",
                desc: "Pünktlich und zuverlässig zum Flughafen",
                icon: "✓ Gepäckservice"
              },
              {
                img: "/Taxi-Boy-4.jpeg",
                title: "Business Class",
                desc: "Professioneller Service für Geschäftsreisende",
                icon: "✓ WLAN & Ladestation"
              },
              {
                img: "/Taxi-Boy-2.jpeg",
                title: "24/7 Service",
                desc: "Rund um die Uhr für Sie im Einsatz",
                icon: "✓ Sofortige Verfügbarkeit"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="group bg-zinc-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-zinc-700/30 transform transition-all duration-500 hover:-translate-y-1 hover:shadow-yellow-500/10"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="600"
              >
                <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                  <img 
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {item.desc}
                  </p>
                  <div className="text-sm text-yellow-400 font-medium">
                    {item.icon}
                  </div>
                </div>
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-0">
                  <button 
                    onClick={() => scrollToSection('booking')}
                    className="w-full bg-zinc-700 hover:bg-yellow-500 text-white hover:text-black font-medium py-2 px-3 sm:px-4 rounded text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Jetzt buchen
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          

        </div>
      </section>

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
      <section className="py-12 bg-zinc-800">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">Standardtaxitarife</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {standardTaxiRates.map((rate, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-6 bg-zinc-900 rounded-xl hover:bg-zinc-700 transition-colors duration-300 shadow-lg"
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

      {/* Mietwagentarife Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">Mietwagentarife</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rentalCarRates.map((rate, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center p-4 sm:p-5 md:p-6 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors duration-300 shadow-lg"
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
              * Alle Preise inkl. MwSt. Mindestfahrstrecke und zusätzliche Konditionen können anfallen. Die Mietwagen haben keinen Grundpreis.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-10 sm:py-12 bg-zinc-800">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-center">Jetzt buchen</h2>
          <div className="max-w-2xl mx-auto bg-zinc-900 p-4 sm:p-6 md:p-8 rounded-xl shadow-xl">
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}