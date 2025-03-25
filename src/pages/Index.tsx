
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import Experience from '../components/Experience';

const Index: React.FC = () => {
  // Add smooth scroll effect on mount
  useEffect(() => {
    // Ensure smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.href.includes(window.location.pathname)) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100, // Offset for fixed header
            behavior: 'smooth'
          });
          
          // Update URL without causing a page jump
          history.pushState({}, '', anchor.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    // Add a subtle grain animation for texture
    const grainOverlay = document.createElement('div');
    grainOverlay.className = 'grain-overlay';
    document.body.appendChild(grainOverlay);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.body.removeChild(grainOverlay);
    };
  }, []);

  return (
    <Layout>
      <div className="relative overflow-hidden">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </div>
    </Layout>
  );
};

export default Index;
