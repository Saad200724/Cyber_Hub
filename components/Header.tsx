import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { Bars3Icon, XMarkIcon } from './Icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="text-2xl font-bold font-orbitron text-cyan-400 text-glow-cyan">
            Cyber Hub
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-cyan-400 transition-colors duration-300">
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a href="#join" className="bg-cyan-500 text-white font-bold py-2 px-4 rounded-full hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/30">
              Join The Revolution
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none">
              {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-900/95 backdrop-blur-sm`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
            <a href="#join" className="bg-cyan-500 text-white font-bold my-4 py-2 px-4 rounded-full hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/30" onClick={() => setIsOpen(false)}>
              Join The Revolution
            </a>
        </div>
      </div>
    </header>
  );
};

export default Header;