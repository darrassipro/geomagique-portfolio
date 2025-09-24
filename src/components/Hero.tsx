import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import { ArrowRight } from 'lucide-react';

const TypewriterText = ({ text, delay = 80 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay]);

  return displayText;
};

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center py-28 px-4 overflow-hidden"
    >
      {/* Background decorative gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/0 via-background/10 to-background z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-primary/5 to-transparent z-0 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-radial from-primary/5 to-transparent z-0 blur-3xl"></div>

      {/* Main content grid */}
      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-8">
        {/* Left side: Text content */}
        <div className="max-w-2xl text-center md:text-left">
          {/* Portfolio badge */}
          <div
            className="inline-block animate-fade-in opacity-0"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <div className="glass-badge px-4 py-2 rounded-full mb-6 inline-flex items-center space-x-2 backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg shadow-primary/5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium tracking-wider uppercase">Portfolio</span>
            </div>
          </div>

          {/* 👇 Canvas below Portfolio on mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            <Canvas />
          </div>

          {/* Name */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60">
              YOUNES DARRASSI
            </span>
          </h1>

          {/* Title with typewriter */}
          <div className="relative inline-block md:block">
            <h2
              className="text-2xl md:text-3xl text-muted-foreground mb-6 opacity-0 animate-fade-in flex items-center justify-center md:justify-start"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              <span className="mr-3">
                <TypewriterText text="Ingénieur logiciel" delay={60} />
              </span>
              <div className="h-px flex-grow max-w-[120px] bg-gradient-to-r from-primary/50 to-transparent"></div>
            </h2>
          </div>

          {/* Description */}
          <p
            className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 mb-8 opacity-0 animate-fade-in leading-relaxed"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            Fortement passionné par le développement et les nouvelles technologies, je suis à la
            recherche d'un poste me permettant de mettre en œuvre mes compétences techniques avec
            rigueur et expertise.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-wrap justify-center md:justify-start gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              <span className="relative z-10 flex items-center">
                Voir Projets
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-secondary hover:bg-secondary/80 rounded-full shadow-lg shadow-secondary/10 hover:shadow-secondary/20"
            >
              <span className="relative z-10">Me Contacter</span>
            </a>
          </div>
        </div>

        {/* Right side: Canvas (desktop only) */}
        <div
          className="hidden md:flex justify-center items-center opacity-0 animate-fade-in"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <Canvas />
        </div>
      </div>
    </section>
  );
};

export default Hero;
