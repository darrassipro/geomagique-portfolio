import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import { ArrowRight, MousePointer, Code, Layers, Layout, Cpu, Zap, Database, Server } from 'lucide-react';

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
      className="relative min-h-screen flex items-center pb-20 pt-28 overflow-hidden"
    >
      <Canvas className="opacity-70" />
      
      {/* Enhanced gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/0 via-background/10 to-background z-[1]"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-radial from-primary/5 to-transparent z-[1] blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-radial from-primary/5 to-transparent z-[1] blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="glass-badge px-4 py-2 rounded-full mb-6 inline-flex items-center space-x-2 backdrop-blur-md bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300 shadow-lg shadow-primary/5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium tracking-wider uppercase">Portfolio</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60 animate-gradient">
              YOUNES DARRASSI
            </span>
          </h1>
          
          <div className="relative">
            <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6 opacity-0 animate-fade-in flex items-center" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
              <span className="mr-3 relative overflow-hidden group inline-block">
                <TypewriterText text="Ingénieur logiciel" delay={60} />
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/80 to-primary/0 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
              </span>
              <div className="h-px flex-grow max-w-[120px] bg-gradient-to-r from-primary/50 to-transparent"></div>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 opacity-0 animate-fade-in leading-relaxed" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Fortement passionné par le développement et les nouvelles technologies, je suis à la recherche d'un poste me permettant de mettre en œuvre mes compétences techniques avec rigueur et expertise.
          </p>
          
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <a 
              href="#projects" 
              className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary/80 to-primary/40 transition-all duration-500 ease-out group-hover:w-full rounded-full overflow-hidden"></span>
              <span className="relative z-10 flex items-center">
                Voir Projets
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
            
            <a 
              href="#contact" 
              className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-secondary hover:bg-secondary/80 rounded-full backdrop-blur-sm shadow-lg shadow-secondary/10 hover:shadow-secondary/20"
            >
              <span className="absolute inset-0 w-0 bg-white/5 transition-all duration-500 ease-out group-hover:w-full rounded-full overflow-hidden"></span>
              <span className="relative z-10">Me Contacter</span>
            </a>
          </div>
          
          {/* Enhanced skills grid with Backend icon */}
          <div className="mt-16 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 max-w-3xl opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/5 mb-3 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 backdrop-blur-sm">
                <Code className="h-6 w-6 text-primary group-hover:animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Frontend</span>
            </div>
            
            {/* Backend icon */}
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/5 mb-3 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 backdrop-blur-sm relative overflow-hidden">
                <Server className="h-6 w-6 text-primary group-hover:animate-pulse" />
                <span className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Backend</span>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/5 mb-3 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 backdrop-blur-sm">
                <Database className="h-6 w-6 text-primary group-hover:animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Database</span>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/5 mb-3 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 backdrop-blur-sm">
                <Layout className="h-6 w-6 text-primary group-hover:animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">UI/UX</span>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/5 mb-3 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 backdrop-blur-sm">
                <Layers className="h-6 w-6 text-primary group-hover:animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Responsive</span>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/5 mb-3 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 backdrop-blur-sm">
                <Cpu className="h-6 w-6 text-primary group-hover:animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Modern</span>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/5 mb-3 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/10 backdrop-blur-sm">
                <Zap className="h-6 w-6 text-primary group-hover:animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">Dynamique</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
