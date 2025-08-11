import React from "react";
import Canvas from "./Canvas";
import { ArrowRight, MousePointer, Code, Layers, Layout, Cpu, Zap, Server } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pb-20 pt-28 overflow-hidden"
    >
      <Canvas className="opacity-30 absolute inset-0" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Ingénieur Logiciel
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Conception et Développement de Solutions Digitales
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              Je conçois des applications modernes et performantes en utilisant les technologies les plus récentes.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Me Contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-muted-foreground/20 hover:border-primary/50 transition-colors"
              >
                Voir mes Projets
              </a>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 grid grid-cols-3 gap-6">
            
            {/* Frontend */}
            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                              transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                              group-hover:shadow-[0_0_12px_rgba(255,100,100,0.5)]">
                <Layout className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground">Frontend</span>
            </div>

            {/* Backend */}
            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                              transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                              group-hover:shadow-[0_0_12px_rgba(0,150,255,0.5)]">
                <Server className="h-5 w-5 text-primary animate-pulse" />
              </div>
              <span className="text-sm text-muted-foreground">Backend</span>
            </div>

            {/* Dynamique */}
            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                              transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Dynamique</span>
            </div>

            {/* Autres compétences */}
            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                              transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm">
                <MousePointer className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">UI/UX</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                              transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Propreté du Code</span>
            </div>

            <div className="flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                              transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Architecture</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
