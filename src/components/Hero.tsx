import React, { useState } from "react";
import Canvas from "./Canvas";
import { ArrowRight, MousePointer, Code, Layers, Layout, Cpu, Zap, Server, Database, Globe, Smartphone, Palette, Users, Settings, Cloud, Shield, GitBranch, Box } from "lucide-react";

const Hero: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const frontendSubCategories = [
    { name: "UI Design", icon: Palette, color: "text-pink-500" },
    { name: "UX Research", icon: Users, color: "text-blue-500" },
    { name: "CX Strategy", icon: Globe, color: "text-green-500" },
    { name: "Interactive", icon: MousePointer, color: "text-purple-500" },
    { name: "Mobile UI", icon: Smartphone, color: "text-orange-500" },
    { name: "Responsive", icon: Layout, color: "text-cyan-500" }
  ];

  const backendSubCategories = [
    { name: "API Design", icon: Settings, color: "text-blue-600" },
    { name: "Database", icon: Database, color: "text-green-600" },
    { name: "Cloud", icon: Cloud, color: "text-sky-500" },
    { name: "Security", icon: Shield, color: "text-red-500" },
    { name: "DevOps", icon: GitBranch, color: "text-orange-600" },
    { name: "Microservices", icon: Box, color: "text-indigo-500" }
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
          <div className="flex-1 space-y-8">
            
            {/* Main Categories */}
            <div className="grid grid-cols-3 gap-6">
              
              {/* Frontend */}
              <div 
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setActiveCategory('frontend')}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                                group-hover:shadow-[0_0_12px_rgba(255,100,100,0.5)]">
                  <Layout className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <span className="text-sm text-muted-foreground">Frontend</span>
              </div>

              {/* Backend */}
              <div 
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setActiveCategory('backend')}
                onMouseLeave={() => setActiveCategory(null)}
              >
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

              {/* Other Skills */}
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

            {/* Frontend Subcategories */}
            {activeCategory === 'frontend' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-center">Frontend Specializations</h3>
                <div className="grid grid-cols-3 gap-4">
                  {frontendSubCategories.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex flex-col items-center group">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 mb-2 
                                        transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                          <IconComponent className={`h-4 w-4 ${item.color}`} />
                        </div>
                        <span className="text-xs text-muted-foreground text-center">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Backend Subcategories */}
            {activeCategory === 'backend' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-center">Backend Specializations</h3>
                <div className="grid grid-cols-3 gap-4">
                  {backendSubCategories.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex flex-col items-center group">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 mb-2 
                                        transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                          <IconComponent className={`h-4 w-4 ${item.color}`} />
                        </div>
                        <span className="text-xs text-muted-foreground text-center">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
