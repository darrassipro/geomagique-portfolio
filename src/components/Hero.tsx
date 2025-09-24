import React, { useState, useEffect } from 'react';
import { ArrowRight, Code, Layers, Layout, Cpu, Zap, Database, Server } from 'lucide-react';
import Canvas from './Canvas';
import { cn } from '@/lib/utils';

// Skills data
const SKILLS = [
  { icon: Code, label: 'Frontend' },
  { icon: Server, label: 'Backend' },
  { icon: Database, label: 'Database' },
  { icon: Layout, label: 'UI/UX' },
  { icon: Layers, label: 'Responsive' },
  { icon: Cpu, label: 'Modern' },
  { icon: Zap, label: 'Dynamique' }
] as const;

// TypewriterText component with proper typing
interface TypewriterProps {
  text: string;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterProps> = ({ text, delay = 80 }) => {
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

// SkillIcon component with proper typing
interface SkillIconProps {
  Icon: React.ElementType;
  label: string;
}

const SkillIcon: React.FC<SkillIconProps> = ({ Icon, label }) => (
  <div className="flex flex-col items-center group">
    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/5 mb-3 
      transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 
      group-hover:shadow-lg group-hover:shadow-primary/10 backdrop-blur-sm">
      <Icon className="h-6 w-6 text-primary group-hover:animate-pulse" />
    </div>
    <span className="text-sm text-muted-foreground group-hover:text-foreground 
      transition-colors duration-300">{label}</span>
  </div>
);

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col lg:flex-row items-start pb-20 pt-28 overflow-hidden">
      {/* Canvas component positioned at top for mobile, right for desktop */}
      <Canvas className="opacity-90 z-10" />

      {/* Main content container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 lg:max-w-[60%]">
        <div className="max-w-2xl">
          {/* Portfolio Badge */}
          <div className="inline-block animate-fade-in opacity-0" 
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="glass-badge px-4 py-2 rounded-full mb-6 inline-flex items-center 
              space-x-2 backdrop-blur-md bg-white/10 border border-white/20 
              hover:border-white/30 transition-all duration-300">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium tracking-wider uppercase">Portfolio</span>
            </div>
          </div>
          
          {/* Name */}
          <h1 className={cn(
            "font-bold tracking-tight mb-2 opacity-0 animate-fade-in",
            "text-4xl md:text-6xl lg:text-7xl"
          )} style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r 
              from-foreground via-foreground/90 to-foreground/60">
              YOUNES DARRASSI
            </span>
          </h1>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6 opacity-0 
            animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <span className="relative inline-block group">
              <TypewriterText text="Ingénieur logiciel" />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r 
                from-primary/0 via-primary/80 to-primary/0 transform scale-x-0 
                transition-transform duration-500 group-hover:scale-x-100"></span>
            </span>
          </h2>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 opacity-0 animate-fade-in 
            leading-relaxed" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Fortement passionné par le développement et les nouvelles technologies, 
            je suis à la recherche d'un poste me permettant de mettre en œuvre 
            mes compétences techniques avec rigueur et expertise.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" 
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <a href="#projects" className="btn-primary">
              <span>Voir Projets</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#contact" className="btn-secondary">
              Me Contacter
            </a>
          </div>
          
          {/* Skills Grid */}
          <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 
            opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            {SKILLS.map(({ icon: Icon, label }) => (
              <SkillIcon key={label} Icon={Icon} label={label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
