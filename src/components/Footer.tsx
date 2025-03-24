
import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="py-12 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between pb-8 border-b border-border">
          <a
            href="#"
            className="text-xl font-semibold tracking-tight mb-6 md:mb-0"
          >
            Portfolio<span className="text-primary">.</span>
          </a>
          
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          
          <nav className="space-x-6">
            <a href="#" className="text-sm hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm hover:text-primary transition-colors">
              Cookies Policy
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
