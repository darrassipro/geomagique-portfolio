
import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Hexagon } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navItems = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Projets', href: '#projects' },
    { name: 'À Propos', href: '#about' },
    { name: 'Expérience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="font-bold text-lg flex items-center group">
            <div className="w-10 h-10 flex items-center justify-center mr-3 bg-primary/10 rounded-lg transition-all duration-500 group-hover:bg-primary/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Hexagon className="h-5 w-5 text-primary relative z-10 transition-transform duration-500 group-hover:scale-110" />
            </div>
            <span className="relative overflow-hidden group-hover:text-primary transition-colors duration-300">
              YOUNES DARRASSI
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
            </span>
          </a>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <a 
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 font-medium text-muted-foreground hover:text-primary transition-colors duration-300 rounded-md hover:bg-primary/5 group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">
                  {item.name}
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </a>
            ))}
          </nav>
          
          <button 
            className="md:hidden focus:outline-none bg-transparent w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/5 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu with staggered animation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/10">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="font-medium py-3 px-4 text-muted-foreground hover:text-primary transition-all duration-300 rounded-lg hover:bg-primary/5 opacity-0 animate-fade-in"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
