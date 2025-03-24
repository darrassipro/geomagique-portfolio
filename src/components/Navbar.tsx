import React, { useState, useEffect } from 'react';
import { Menu, X, Hexagon, Code, ExternalLink, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { ThemeControls } from '@/components/ui/ThemeControls';
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Add debugging function to test theme changes directly from console
  useEffect(() => {
    // Expose a global function to test themes directly from the console
    (window as any).testTheme = (themeName: string) => {
      console.log("Testing theme:", themeName);
      document.documentElement.classList.remove('theme-default', 'theme-dark', 'theme-light', 'theme-forest', 'theme-ocean');
      document.documentElement.classList.add(`theme-${themeName}`);
      localStorage.setItem('geomagique-theme', themeName);
      return `Theme applied: ${themeName}`;
    };
    
    // Clean up function when component unmounts
    return () => {
      delete (window as any).testTheme;
    };
  }, []);
  
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

  // Create a wrapper component for ThemeControls to help with debugging
  const ThemeControlsWrapper = () => {
    useEffect(() => {
      console.log("ThemeControlsWrapper mounted");
      return () => console.log("ThemeControlsWrapper unmounted");
    }, []);
    
    return (
      <div className="relative">
        <ThemeControls />
      </div>
    );
  };

  // Desktop navigation with sophisticated design
  const DesktopNav = () => (
    <div className="hidden md:flex items-center space-x-1">
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          {navItems.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink 
                href={item.href}
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  "bg-transparent hover:bg-primary/5 hover:text-primary",
                  "focus:bg-primary/5 focus:text-primary focus:outline-none",
                  "data-[active]:bg-primary/5 data-[active]:text-primary",
                  "relative overflow-hidden"
                )}
              >
                <span className="relative z-10">
                  {item.name}
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
                <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Professional design enhancement */}
      <div className="h-10 w-px bg-gradient-to-b from-transparent via-muted-foreground/20 to-transparent mx-3"></div>
      
      <a 
        href="#contact"
        className="relative overflow-hidden group rounded-md bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-300 px-4 py-2 text-sm font-medium flex items-center gap-2"
      >
        <span className="relative z-10">Discutons</span>
        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </a>

      {/* Add Theme Controls and Fullscreen Button */}
      <div className="ml-3">
        <ThemeControlsWrapper />
      </div>
    </div>
  );
  
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
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_center,_var(--primary)_0%,_transparent_70%)] transition-opacity duration-500"></div>
              <Hexagon className="h-5 w-5 text-primary relative z-10 transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex flex-col items-start">
              <span className="relative overflow-hidden group-hover:text-primary transition-colors duration-300 font-semibold">
                YOUNES DARRASSI
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
              </span>
              <span className="text-xs text-muted-foreground tracking-wider">WEB DESIGNER</span>
            </div>
          </a>
          
          {!isMobile && <DesktopNav />}
          
          {/* Show Theme Controls on mobile */}
          {isMobile && (
            <div className="flex items-center">
              <ThemeControlsWrapper />
              <button 
                className="ml-2 focus:outline-none bg-transparent w-10 h-10 flex items-center justify-center rounded-lg hover:bg-primary/5 transition-colors"
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
          )}
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
      
      {/* Additional professional design elements - only visible on scroll and on larger screens */}
      {isScrolled && !isMobile && (
        <div className="hidden md:block h-0.5 w-full bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      )}
    </header>
  );
};

export default Navbar;
