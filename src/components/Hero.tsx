import React, { useState } from "react";
import Canvas from "./Canvas";
import { ArrowRight, MousePointer, Code, Layers, Layout, Cpu, Zap, Server, Database, Globe, Smartphone, Palette, Users, Settings, Cloud, Shield, GitBranch, Box } from "lucide-react";

const Hero: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const frontendSubIcons = [
    { icon: Palette, label: "UI Design", color: "text-pink-400" },
    { icon: Users, label: "UX", color: "text-blue-400" },
    { icon: Globe, label: "CX", color: "text-green-400" },
    { icon: MousePointer, label: "Interactive", color: "text-purple-400" },
    { icon: Smartphone, label: "Mobile", color: "text-orange-400" },
    { icon: Layout, label: "Responsive", color: "text-cyan-400" }
  ];

  const backendSubIcons = [
    { icon: Settings, label: "API", color: "text-blue-400" },
    { icon: Database, label: "Database", color: "text-green-400" },
    { icon: Cloud, label: "Cloud", color: "text-sky-400" },
    { icon: Shield, label: "Security", color: "text-red-400" },
    { icon: GitBranch, label: "DevOps", color: "text-orange-400" },
    { icon: Box, label: "Microservices", color: "text-indigo-400" }
  ];

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
          <div className="flex-1 relative">
            
            {/* Sub Icons Circle - Frontend */}
            {hoveredCategory === 'frontend' && (
              <div className="absolute inset-0 flex items-center justify-center">
                {frontendSubIcons.map((item, index) => {
                  const angle = (index / frontendSubIcons.length) * 2 * Math.PI;
                  const radius = 120;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const IconComponent = item.icon;
                  
                  return (
                    <div
                      key={index}
                      className="absolute transition-all duration-500 ease-out animate-in fade-in slide-in-from-center"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex flex-col items-center group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 mb-1 
                                        transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:shadow-lg">
                          <IconComponent className={`h-4 w-4 ${item.color}`} />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Sub Icons Circle - Backend */}
            {hoveredCategory === 'backend' && (
              <div className="absolute inset-0 flex items-center justify-center">
                {backendSubIcons.map((item, index) => {
                  const angle = (index / backendSubIcons.length) * 2 * Math.PI;
                  const radius = 120;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const IconComponent = item.icon;
                  
                  return (
                    <div
                      key={index}
                      className="absolute transition-all duration-500 ease-out animate-in fade-in slide-in-from-center"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex flex-col items-center group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 mb-1 
                                        transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:shadow-lg">
                          <IconComponent className={`h-4 w-4 ${item.color}`} />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{item.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Main Icons Grid */}
            <div className="grid grid-cols-3 gap-6 relative z-10">
              
              {/* Frontend */}
              <div 
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredCategory('frontend')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                                group-hover:shadow-[0_0_12px_rgba(255,100,100,0.5)] relative
                                ${hoveredCategory === 'frontend' ? 'ring-2 ring-primary/50 bg-primary/10 scale-110' : ''}`}>
                  <Layout className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <span className="text-sm text-muted-foreground">Frontend</span>
              </div>

              {/* Backend */}
              <div 
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setHoveredCategory('backend')}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                                group-hover:shadow-[0_0_12px_rgba(0,150,255,0.5)] relative
                                ${hoveredCategory === 'backend' ? 'ring-2 ring-primary/50 bg-primary/10 scale-110' : ''}`}>
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
      </div>
    </section>
  );
};

export default Hero;
