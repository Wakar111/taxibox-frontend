import React from 'react';
import { Link } from 'react-router-dom';
import taxiBoyLogo from '../taxiBoyLogo.png';

export default function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
          <img 
            src={taxiBoyLogo} 
            alt="TaxiBoy Mainz Logo" 
            className="h-10 w-13"
          />
          <span className="text-xl font-bold text-white">TaxiBoy</span>
        </Link>
        <div className="flex justify-center space-x-4 mb-4">
          <Link to="/privacy-policy" className="hover:text-yellow-500">Datenschutz</Link>
          <Link to="/cookie-policy" className="hover:text-yellow-500">Cookie-Richtlinien</Link>
          <Link to="/imprint" className="hover:text-yellow-500">Impressum</Link>
        </div>
        <p className="mt-2">
          Designed by{' '}
          <a 
            href="https://innovativ-tech.de" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-yellow-500 hover:text-yellow-400"
          >
            innovativ-tech
          </a>
        </p>
      </div>
    </footer>
  );
}