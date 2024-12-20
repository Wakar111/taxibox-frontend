import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pricingTiers = [
  { service: 'Hourly Rate', price: '35€/hour' },
  { service: 'Half Day (4 hours)', price: '130€' },
  { service: 'Full Day (8 hours)', price: '250€' },
  { service: 'Airport Transfer', price: 'From 40€' },
  { service: 'Corporate Events', price: 'Custom Rate' },
  { service: 'Multi-City Travel', price: 'Custom Rate' },
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Business Travel Services</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Premium transportation solutions for business professionals. Fixed rates and hourly services available.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {pricingTiers.map((tier) => (
              <div key={tier.service} className="bg-zinc-800 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg">{tier.service}</span>
                  <span className="text-2xl font-bold text-yellow-500">{tier.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleBookNow}
              className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
            >
              Book Now
            </button>
          </div>

          <div className="mt-12 bg-zinc-800 p-8 rounded-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Business Travel Benefits</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Professional chauffeurs in business attire</li>
              <li>• Premium Mercedes-Benz fleet</li>
              <li>• Wi-Fi equipped vehicles</li>
              <li>• Corporate billing available</li>
              <li>• Priority booking</li>
              <li>• 24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}