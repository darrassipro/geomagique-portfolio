
import React from 'react';
import Canvas from './Canvas';
import { ArrowRight, MousePointer, Code, Layers, Layout } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center pb-20 pt-28 overflow-hidden"
    >
      <Canvas className="opacity-60" />
      
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background/0 via-background/0 to-background z-[1]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="glass-badge px-4 py-2 rounded-full mb-6 inline-flex items-center space-x-2 backdrop-blur-md bg-white/10 border border-white/20">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium tracking-wider uppercase">Portfolio</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight mb-2 opacity-0 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            YOUNES DARRASSI
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-6 opacity-0 animate-fade-in flex items-center" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <span className="mr-3">Web Designer</span>
            <div className="h-px flex-grow max-w-[120px] bg-gradient-to-r from-primary/50 to-transparent"></div>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            Passionné par le design web et les nouvelles technologies, je recherche un poste qui me permettra de mettre en pratique mes compétences en design tout en continuant à apprendre.
          </p>
          
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            <a 
              href="#projects" 
              className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Voir Projets
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            
            <a 
              href="#contact" 
              className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-secondary hover:bg-secondary/80 rounded-full backdrop-blur-sm"
            >
              <span className="relative z-10">Me Contacter</span>
              <span className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 mb-2">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Frontend Dev</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 mb-2">
                <Layout className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">UI/UX Design</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 mb-2">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Responsive</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 mb-2">
                <MousePointer className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Interactive</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
