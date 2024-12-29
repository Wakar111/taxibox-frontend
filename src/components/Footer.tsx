import React from 'react';
import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
          <Car className="h-6 w-6 text-yellow-500" />
          <span className="text-xl font-bold text-white">TaxiBoy</span>
        </Link>
        <div className="flex justify-center space-x-4 mb-4">
          <Link to="/cookie-policy" className="hover:text-yellow-500">Cookie-Richtlinien</Link>
          <Link to="/privacy-policy" className="hover:text-yellow-500">Datenschutz</Link>
        </div>
        <p> 2024 TaxiBoy. All rights reserved.</p>
      </div>
    </footer>
  );
}