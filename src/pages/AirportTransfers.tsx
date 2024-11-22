import React, { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pricingTiers = [
  { distance: '1-5 km', price: '4€' },
  { distance: '6-10 km', price: '12€' },
  { distance: '11-15 km', price: '18€' },
  { distance: '16-20 km', price: '24€' },
  { distance: '21-25 km', price: '30€' },
  { distance: '26+ km', price: 'Custom Rate' },
];

export default function AirportTransfers() {
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
            <h1 className="text-4xl font-bold mb-4">Airport Transfer Pricing</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Fixed rates for airport transfers starting from 4€. All prices include luggage handling and flight monitoring.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {pricingTiers.map((tier) => (
              <div key={tier.distance} className="bg-zinc-800 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg">{tier.distance}</span>
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
            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Base fare starts at 4€</li>
              <li>• 24/7 service available</li>
              <li>• Flight monitoring included</li>
              <li>• Free waiting time (60 minutes for airport pickups)</li>
              <li>• Professional chauffeurs</li>
              <li>• Meet & greet service</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}