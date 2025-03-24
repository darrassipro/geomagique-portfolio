
import React from 'react';
import Canvas from './Canvas';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pb-20 pt-28 overflow-hidden"
    >
      <Canvas className="opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-6 inline-block">
              PORTFOLIO
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Creating digital experiences with purpose and precision
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            I design and build meaningful digital solutions that blend aesthetics with functionality, 
            focusing on intuitive interfaces and seamless user experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-colors bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-colors bg-secondary hover:bg-secondary/80 rounded-full"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
