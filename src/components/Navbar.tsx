import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import taxiBoyLogo from '../taxiBoyLogo.png';

interface NavbarProps {
  onSectionClick?: (id: string) => void;
  showNavLinks?: boolean;
}

const navigationItems = [
  { path: '/', label: 'Startseite' },
  { path: '/about', label: 'Über uns' }
];

const scrollItems = [
  { id: 'services', label: 'Angebote' },
  { id: 'booking', label: 'Jetzt buchen' }
];

export default function Navbar({ onSectionClick, showNavLinks = true }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <img 
                src={taxiBoyLogo} 
                alt="TaxiBoy Mainz Logo" 
                className="h-12 w-13"
              />
            <span className="text-2xl font-bold text-white">TaxiBoy</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {/* Navigation Items */}
            {navigationItems.map((item) => (
              item.path === '/' ? (
                <a
                  key={item.path}
                  href={item.path}
                  className={`text-white hover:text-yellow-500 transition ${
                    location.pathname === item.path ? 'text-yellow-500' : ''
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-white hover:text-yellow-500 transition ${
                    location.pathname === item.path ? 'text-yellow-500' : ''
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}

            {/* Scroll Items (only on homepage) */}
            {isHomePage && showNavLinks && onSectionClick && (
              <>
                {scrollItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSectionClick(item.id)}
                    className="text-white hover:text-yellow-500 transition"
                  >
                    {item.label}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-white hover:text-yellow-500 transition"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {/* Navigation Items */}
              {navigationItems.map((item) => (
                item.path === '/' ? (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-white hover:text-yellow-500 transition ${
                      location.pathname === item.path ? 'text-yellow-500' : ''
                    }`}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-white hover:text-yellow-500 transition ${
                      location.pathname === item.path ? 'text-yellow-500' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}

              {/* Scroll Items (only on homepage) */}
              {isHomePage && showNavLinks && onSectionClick && (
                <>
                  {scrollItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSectionClick(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-white hover:text-yellow-500 transition text-left"
                    >
                      {item.label}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}