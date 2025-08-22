import React, { useLayoutEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pricingTiers = [
  { service: 'Frankfurt Flughafen', price: 'Ab 40€' },
  { service: 'Hahn Flughafen', price: 'Ab 120€' },
  { service: 'Halben Tag (4 Stunden)', price: 'Ab 150€' },
  { service: 'Ganzen Tag (8 Stunden)', price: 'Ab 250€' },
  { service: 'Krankenfahrten', price: 'Individueller Tarif' },
  { service: 'Multi-City Travel Fahrten', price: 'Ab 1,60€ pro Km' },
  { service: 'BusinessTravel', price: 'Ab 60€ pro Stunde' },
  { service: 'VIP Travel', price: 'Ab 80€ pro Stunde' }
];

export default function BusinessTravel() {
  const navigate = useNavigate();

  // Reset scroll position when component mounts
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari
  }, []);

  const handleBookNow = () => {
    navigate('/', { state: { scrollToBooking: true } });
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <Navbar showNavLinks={false} />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Business Travel Service</h1>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Premium Transportlösungen für Geschäftskunden. Feste Tarife und Stundensätze verfügbar.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.service} 
                className="flex justify-between items-center p-6 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors duration-300 shadow-lg"
              >
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full mr-4"></div>
                  <span className="text-lg text-gray-100">{tier.service}</span>
                </div>
                <span className="text-xl font-semibold text-yellow-500 ml-4">{tier.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                to="/?booking=true"
                className="bg-yellow-500 text-black px-10 py-4 rounded-full font-semibold hover:bg-yellow-400 transition text-center text-lg"
              >
                Jetzt Buchen
              </Link>
              <a 
                href="https://wa.me/4915259606727"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 px-10 py-4 rounded-full font-semibold hover:bg-green-500 transition text-center text-lg"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-16 bg-zinc-800 p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Ihre Vorteile</h2>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
                Professionelle Chauffeure in Business-Kleidung
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
                Premium Mercedes-Benz Flotte
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
                Fahrzeuge mit WLAN-Ausstattung
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
                Firmenabrechnung möglich
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
                Vorrangige Buchung
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-4"></div>
                24/7 Kundenservice
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}