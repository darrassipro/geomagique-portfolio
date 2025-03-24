
import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 glass' : 'py-5 bg-transparent'}`}>
      <nav className="container flex justify-between items-center px-4 md:px-6">
        <a 
          href="#" 
          className="font-medium text-lg md:text-xl tracking-tight transition-colors hover:text-primary/80"
        >
          Portfolio<span className="text-primary">.</span>
        </a>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="text-sm tracking-wide link-underline py-2"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Toggle */}
        <button 
          aria-label="Toggle Menu"
          className="md:hidden p-2 rounded-full hover:bg-primary/5 transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background z-40 transition-transform duration-500 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container flex flex-col h-full justify-center items-center">
          <ul className="flex flex-col space-y-8 text-center">
            {navLinks.map((link) => (
              <li key={link.name} className="animate-fade-in">
                <a 
                  href={link.href}
                  className="text-xl font-medium tracking-wide"
                  onClick={() => {
                    toggleMenu();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
