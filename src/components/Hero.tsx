import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import { 
  ArrowRight, 
  MousePointer, 
  Code, 
  Layers, 
  Layout, 
  Cpu, 
  Zap,
  Database,
  Server,
  Globe,
  Terminal,
  PenTool,
  Smartphone
} from 'lucide-react';

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

// Icon component with optional glowing effect
const SkillIcon = ({ icon: Icon, label, glowing = false }) => {
  return (
    <div className="flex flex-col items-center group">
      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center 
        bg-primary/5 mb-2 transition-all duration-300 group-hover:bg-primary/10 
        group-hover:scale-110 backdrop-blur-sm ${glowing ? 'border border-primary/10' : ''}`}>
        {glowing && (
          <div className="absolute inset-0 rounded-full bg-primary/5 blur-md 
            group-hover:blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
        )}
        <Icon className="h-5 w-5 text-primary relative z-10" />
      </div>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pb-20 pt-28 overflow-hidden"
    >
      <Canvas className="opacity-70" />
      
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/0 via-background/0 to-background z-[1]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="glass-badge px-4 py-2 rounded-full mb-6 inline-flex items-center space-x-2 backdrop-blur-md bg-white/10 border border-white/20">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium tracking-wider uppercase">Portfolio</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
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
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Fortement passionné par le développement et les nouvelles technologies, je suis à la recherche d'un poste me permettant de mettre en œuvre mes compétences techniques avec rigueur et engagement.
          </p>
          
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <a 
              href="#projects" 
              className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full overflow-hidden"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-primary/80 to-primary/40 transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative z-10 flex items-center">
                Voir Projets
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
            
            <a 
              href="#contact" 
              className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-secondary hover:bg-secondary/80 rounded-full backdrop-blur-sm"
            >
              <span className="absolute inset-0 w-0 bg-white/5 transition-all duration-500 ease-out group-hover:w-full"></span>
              <span className="relative z-10">Me Contacter</span>
            </a>
          </div>
          
          <div className="mt-12 space-y-8 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            {/* Frontend Skills */}
            <div>
              <h3 className="text-sm uppercase font-semibold text-muted-foreground/70 mb-3 tracking-wider">Frontend</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                <SkillIcon icon={Code} label="Frontend" glowing={true} />
                <SkillIcon icon={Layout} label="UI/UX" />
                <SkillIcon icon={Smartphone} label="Responsive" />
                <SkillIcon icon={MousePointer} label="Interactive" />
                <SkillIcon icon={PenTool} label="Design" />
                <SkillIcon icon={Zap} label="Dynamique" glowing={true} />
              </div>
            </div>
            
            {/* Backend Skills */}
            <div>
              <h3 className="text-sm uppercase font-semibold text-muted-foreground/70 mb-3 tracking-wider">Backend</h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                <SkillIcon icon={Server} label="Serveurs" glowing={true} />
                <SkillIcon icon={Database} label="Databases" glowing={true} />
                <SkillIcon icon={Globe} label="API" />
                <SkillIcon icon={Terminal} label="CLI" />
                <SkillIcon icon={Cpu} label="Architecture" />
                <SkillIcon icon={Layers} label="Microservices" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating glowing orb for ambient effect */}
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-slow opacity-50 z-0 hidden md:block"></div>
      
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
