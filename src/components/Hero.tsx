import React from "react";
import Canvas from "./Canvas";
import { ArrowRight, MousePointer, Code, Layers, Layout, Cpu, Zap, Server, Database, Globe, Smartphone, Palette, Users, Settings, Cloud, Shield, GitBranch, Box } from "lucide-react";

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
          <div className="flex-1 space-y-6">
            
            {/* Main Skills Grid */}
            <div className="grid grid-cols-3 gap-6">
              
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

              {/* UI/UX */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm">
                  <MousePointer className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">UI/UX</span>
              </div>

              {/* Code Quality */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Propreté du Code</span>
              </div>

              {/* Architecture */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Architecture</span>
              </div>
            </div>

            {/* Frontend Subcategories */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h4 className="text-sm font-medium mb-3 text-center text-muted-foreground">Frontend Specializations</h4>
              <div className="grid grid-cols-3 gap-3">
                
                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Palette className="h-3 w-3 text-pink-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">UI Design</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Users className="h-3 w-3 text-blue-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">UX</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Globe className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">CX</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <MousePointer className="h-3 w-3 text-purple-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Interactive</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Smartphone className="h-3 w-3 text-orange-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Mobile</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Layout className="h-3 w-3 text-cyan-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Responsive</span>
                </div>

              </div>
            </div>

            {/* Backend Subcategories */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h4 className="text-sm font-medium mb-3 text-center text-muted-foreground">Backend Specializations</h4>
              <div className="grid grid-cols-3 gap-3">
                
                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Settings className="h-3 w-3 text-blue-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">API</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Database className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Database</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Cloud className="h-3 w-3 text-sky-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Cloud</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Shield className="h-3 w-3 text-red-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Security</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <GitBranch className="h-3 w-3 text-orange-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">DevOps</span>
                </div>

                <div className="flex flex-col items-center group">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 mb-1 
                                  transition-all duration-300 group-hover:bg-white/10 group-hover:scale-110">
                    <Box className="h-3 w-3 text-indigo-400" />
                  </div>
                  <span className="text-xs text-muted-foreground">Microservices</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
