import React, { useState } from "react";
import Canvas from "./Canvas";
import { ArrowRight, MousePointer, Code, Layers, Layout, Cpu, Zap, Server, Database, Globe, Smartphone, Palette, Users, Settings, Cloud, Shield, GitBranch, Box } from "lucide-react";

const Hero: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const frontendSubSkills = [
    { icon: Palette, name: "UI Design", color: "text-pink-400" },
    { icon: Users, name: "UX Research", color: "text-blue-400" },
    { icon: Globe, name: "CX Strategy", color: "text-green-400" },
    { icon: MousePointer, name: "Interactive", color: "text-purple-400" },
    { icon: Smartphone, name: "Mobile UI", color: "text-orange-400" },
    { icon: Layout, name: "Responsive", color: "text-cyan-400" }
  ];

  const backendSubSkills = [
    { icon: Settings, name: "API Design", color: "text-blue-400" },
    { icon: Database, name: "Database", color: "text-green-400" },
    { icon: Cloud, name: "Cloud Services", color: "text-sky-400" },
    { icon: Shield, name: "Security", color: "text-red-400" },
    { icon: GitBranch, name: "DevOps", color: "text-orange-400" },
    { icon: Box, name: "Microservices", color: "text-indigo-400" }
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
            
            {/* Skills Grid */}
            <div className="grid grid-cols-3 gap-6 relative z-10">
              
              {/* Frontend */}
              <div 
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setActiveSkill('frontend')}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                                group-hover:shadow-[0_0_12px_rgba(255,100,100,0.5)] relative
                                ${activeSkill === 'frontend' ? 'ring-2 ring-pink-400/50 scale-110' : ''}`}>
                  <Layout className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <span className="text-sm text-muted-foreground">Frontend</span>
              </div>

              {/* Backend */}
              <div 
                className="flex flex-col items-center group cursor-pointer"
                onMouseEnter={() => setActiveSkill('backend')}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                                group-hover:shadow-[0_0_12px_rgba(0,150,255,0.5)] relative
                                ${activeSkill === 'backend' ? 'ring-2 ring-blue-400/50 scale-110' : ''}`}>
                  <Server className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <span className="text-sm text-muted-foreground">Backend</span>
              </div>

              {/* Dynamique */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                                group-hover:shadow-[0_0_12px_rgba(255,215,0,0.5)]">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Dynamique</span>
              </div>

              {/* UI/UX */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                                group-hover:shadow-[0_0_12px_rgba(147,51,234,0.5)]">
                  <MousePointer className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">UI/UX</span>
              </div>

              {/* Code Quality */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                                group-hover:shadow-[0_0_12px_rgba(34,197,94,0.5)]">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Propreté du Code</span>
              </div>

              {/* Architecture */}
              <div className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary/5 mb-2 
                                transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110 backdrop-blur-sm
                                group-hover:shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Architecture</span>
              </div>

            </div>

            {/* Floating Sub-Skills for Frontend */}
            {activeSkill === 'frontend' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {frontendSubSkills.map((skill, index) => {
                  const angle = (index / frontendSubSkills.length) * 2 * Math.PI;
                  const radius = 140;
                  const x = Math.cos(angle - Math.PI / 2) * radius;
                  const y = Math.sin(angle - Math.PI / 2) * radius;
                  const SkillIcon = skill.icon;
                  
                  return (
                    <div
                      key={skill.name}
                      className="absolute animate-in fade-in zoom-in duration-500 pointer-events-auto"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex flex-col items-center group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 mb-2
                                        transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:shadow-lg">
                          <SkillIcon className={`h-4 w-4 ${skill.color}`} />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">{skill.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Floating Sub-Skills for Backend */}
            {activeSkill === 'backend' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {backendSubSkills.map((skill, index) => {
                  const angle = (index / backendSubSkills.length) * 2 * Math.PI;
                  const radius = 140;
                  const x = Math.cos(angle - Math.PI / 2) * radius;
                  const y = Math.sin(angle - Math.PI / 2) * radius;
                  const SkillIcon = skill.icon;
                  
                  return (
                    <div
                      key={skill.name}
                      className="absolute animate-in fade-in zoom-in duration-500 pointer-events-auto"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex flex-col items-center group">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 mb-2
                                        transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:shadow-lg">
                          <SkillIcon className={`h-4 w-4 ${skill.color}`} />
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">{skill.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
