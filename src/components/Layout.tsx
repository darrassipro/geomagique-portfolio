import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeProvider } from '@/hooks/use-theme';
import '@/styles/themes.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    // Reveal animation on scroll for elements with animate-reveal class
    const revealElements = document.querySelectorAll('.animate-reveal');
    
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          revealElements[i].classList.add('revealed');
        }
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check on load
    
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);
  
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <div className="grain-overlay"></div>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
