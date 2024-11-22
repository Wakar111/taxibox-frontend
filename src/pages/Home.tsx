import React, { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, Star, Clock, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';

export default function Home() {
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari
  }, []);

  useEffect(() => {
    if (location.state?.scrollToBooking) {
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-white">
      <Navbar onSectionClick={scrollToSection} />

      {/* Hero Section */}
      <div className="h-screen relative flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&q=80"
            alt="Mercedes Luxury Car"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative text-center space-y-6 px-4">
          <h1 className="text-6xl font-bold">Premium Taxi Service</h1>
          <p className="text-xl max-w-2xl mx-auto">Experience luxury transportation with our fleet vehicles</p>
          <button 
            onClick={() => scrollToSection('booking')}
            className="bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
          >
            Book Your Ride
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
          <h2 className="text-4xl font-bold mb-12 text-center">About Us</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-300">Professional drivers with years of experience and fully insured vehicles.</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
              <p className="text-gray-300">Luxury Mercedes-Benz fleet maintained to the highest standards.</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-semibold mb-2">24/7 Available</h3>
              <p className="text-gray-300">Round-the-clock service for all your transportation needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/airport-transfers" className="relative h-64 rounded-xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80"
                alt="Airport Transfer"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-bold">Airport Transfers</h3>
              </div>
            </Link>
            <Link to="/business-travel" className="relative h-64 rounded-xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1611448746128-7c39e03b71e4?auto=format&fit=crop&q=80"
                alt="Business Travel"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-bold">Business Travel</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-zinc-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">Book Your Ride</h2>
          <div className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-xl shadow-xl">
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}