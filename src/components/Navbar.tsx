import React from 'react';
import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onSectionClick?: (id: string) => void;
  showNavLinks?: boolean;
}

export default function Navbar({ onSectionClick, showNavLinks = true }: NavbarProps) {
  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-yellow-500" />
            <span className="text-2xl font-bold text-white">TaxiBoy</span>
          </Link>
          {showNavLinks && onSectionClick && (
            <div className="flex space-x-8">
              <button onClick={() => onSectionClick('about')} className="text-white hover:text-yellow-500 transition">
                About
              </button>
              <button onClick={() => onSectionClick('services')} className="text-white hover:text-yellow-500 transition">
                Services
              </button>
              <button onClick={() => onSectionClick('booking')} className="text-white hover:text-yellow-500 transition">
                Book Now
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}