import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, Code, Globe, Cpu, Sparkles, 
  Timer, Calendar, MapPin, ChevronRight, ArrowRight,
  Monitor, Radio, Braces, Bot, Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'data' | 'ai';
}

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: Skill[];
  color: string;
  icon: React.ReactNode;
}

const experiences: ExperienceItem[] = [
  {
    title: "Développement d'un Chatbot Multi-Agent avec IHM",
    company: "3D Smart Factory",
    location: "Mohammedia",
    period: "Février 2024 - Juin 2024",
    description: [
      "Conception d'une interface utilisateur intuitive basée sur des principes de design conversationnel",
      "Implémentation d'une architecture multi-agent avec un routage intelligent des requêtes",
      "Développement d'animations et micro-interactions pour améliorer l'expérience utilisateur",
      "Intégration de visualisations de données pour présenter les résultats des analyses"
    ],
    skills: [
      { name: "React", level: 85, category: 'frontend' },
      { name: "UI/UX", level: 90, category: 'design' },
      { name: "NLP", level: 75, category: 'ai' },
      { name: "Node.js", level: 80, category: 'backend' }
    ],
    color: "#4361ee",
    icon: <Bot className="h-5 w-5" />
  },
  {
    title: "Application Web de Segmentation des Arcades 3D",
    company: "3D Smart Factory",
    location: "Mohammedia",
    period: "Juillet 2023 - Septembre 2023",
    description: [
      "Création d'une interface de visualisation 3D interactive avec WebGL et Three.js",
      "Développement d'algorithmes de segmentation automatique pour les modèles dentaires",
      "Conception d'outils de manipulation et d'annotation pour les professionnels dentaires",
      "Optimisation des performances pour le traitement de maillages 3D complexes"
    ],
    skills: [
      { name: "Three.js", level: 80, category: 'frontend' },
      { name: "WebGL", level: 75, category: 'frontend' },
      { name: "3D Modeling", level: 85, category: 'design' },
      { name: "Python", level: 70, category: 'backend' }
    ],
    color: "#3a86ff",
    icon: <Cpu className="h-5 w-5" />
  },
  {
    title: "Application Web de Gestion de Parapharmacie",
    company: "FSDM",
    location: "Fès",
    period: "2020",
    description: [
      "Design et développement d'une interface utilisateur efficace pour la gestion des stocks",
      "Création d'un tableau de bord analytique pour visualiser les ventes et tendances",
      "Implémentation d'un système de notifications pour les stocks bas et expirations",
      "Optimisation pour les appareils mobiles avec une approche responsive design"
    ],
    skills: [
      { name: "JavaScript", level: 80, category: 'frontend' },
      { name: "CSS3", level: 85, category: 'frontend' },
      { name: "SQL", level: 75, category: 'data' },
      { name: "UX Design", level: 80, category: 'design' }
    ],
    color: "#4cc9f0",
    icon: <Monitor className="h-5 w-5" />
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'frontend':
      return <Globe className="h-3 w-3" />;
    case 'backend':
      return <Terminal className="h-3 w-3" />;
    case 'design':
      return <Monitor className="h-3 w-3" />;
    case 'data':
      return <Braces className="h-3 w-3" />;
    case 'ai':
      return <Bot className="h-3 w-3" />;
    default:
      return <Code className="h-3 w-3" />;
  }
};

// Animated skill tag with visual level indicator
const SkillTag = ({ skill }: { skill: Skill }) => {
  return (
    <div className="inline-flex items-center rounded-full border border-border/40 bg-background/70 backdrop-blur-sm px-2 py-1 text-xs mr-2 mb-2 group hover:border-primary/40 transition-colors overflow-hidden relative">
      <div 
        className="absolute bottom-0 left-0 h-full bg-gradient-to-r from-primary/10 to-primary/5 transition-all duration-500 -z-10" 
        style={{ width: `${skill.level}%` }}
      ></div>
      <span className="flex items-center gap-1">
        {getCategoryIcon(skill.category)}
        <span>{skill.name}</span>
      </span>
      <span className="ml-1.5 text-muted-foreground/70 group-hover:text-primary transition-colors">{skill.level}%</span>
    </div>
  );
};

// Timeline connector with animation
const TimelineConnector = ({ active = false, color = "#4361ee" }) => {
  return (
    <div className="absolute left-[30px] top-0 bottom-0 w-px bg-border/50 -z-10">
      <div 
        className={cn(
          "absolute top-0 w-px transition-all duration-1000 ease-out",
          active ? "h-full" : "h-0"
        )}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
};

const Experience: React.FC = () => {
  const [activeItem, setActiveItem] = useState(-1);
  const [expandedItems, setExpandedItems] = useState<number[]>([0]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  
  // System info for futuristic UI element
  const [currentTime, setCurrentTime] = useState('2025-03-25 02:09:41');
  const [currentUser] = useState('darrassipro');

  // Update time
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const formattedDate = '2025-03-25';
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      setCurrentTime(`${formattedDate} ${hours}:${minutes}:${seconds}`);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Set up intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveItem(index);
              setAnimatedItems(prev => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Toggle expanded state for an item
  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Background particles animation
  const [particles, setParticles] = useState<{x: number, y: number, size: number, speed: number}[]>([]);
  
  useEffect(() => {
    const particleCount = 30;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.1,
      });
    }
    
    setParticles(newParticles);
    
    const animateParticles = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y - p.speed) % 100,
      })));
    };
    
    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="experience" 
      className="py-24 relative overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background overflow-hidden">
        <div className="absolute top-1/3 -left-10 w-60 h-60 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-60 h-60 rounded-full bg-primary/5 blur-3xl"></div>
        
        {/* Animated particles */}
        {particles.map((particle, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: 0.2 + (particle.size - 1) / 3 * 0.3,
            }}
          />
        ))}
      </div>
      
      <div className="container px-4 md:px-6 pt-8 relative z-10">
        <div className="animate-reveal text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block relative overflow-hidden border border-primary/20">
              <span className="absolute top-0 left-0 w-full h-full bg-primary/5 translate-y-full animate-[wipe-in_1s_ease-out_forwards]"></span>
              <span className="relative flex items-center gap-1">
                <Timer className="h-3 w-3 text-primary/80" />
                EXPÉRIENCE
              </span>
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Mon parcours professionnel
            <span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez mes expériences dans la conception d'interfaces numériques intuitives et innovantes.
          </p>
          
          {/* Futuristic system info */}
          <div className="mt-6 bg-background/40 backdrop-blur-md border border-border/40 rounded-lg p-2 px-3 inline-flex items-center text-xs font-mono text-muted-foreground/70 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
            <span className="mr-2">{currentTime}</span>
            <span className="mr-2">|</span>
            <span className="flex items-center">
              <Terminal className="h-3 w-3 mr-1.5" />
              <span>usr:{currentUser}</span>
            </span>
          </div>
        </div>

        <div className="space-y-14 max-w-3xl mx-auto relative">
          {/* Vertical timeline track that connects the experiences */}
          <div className="absolute left-6 top-[60px] bottom-0 w-px bg-border/30 -z-10"></div>
          
          {experiences.map((exp, index) => {
            const isExpanded = expandedItems.includes(index);
            const isAnimated = animatedItems.includes(index);
            
            return (
              <div 
                key={index}
                ref={el => itemRefs.current[index] = el}
                data-index={index}
                className={cn(
                  "relative group",
                  activeItem === index ? "z-10" : ""
                )}
              >
                {/* Animated timeline connector */}
                <TimelineConnector 
                  active={isAnimated} 
                  color={exp.color}
                />
                
                {/* Experience year marker */}
                <div className="absolute left-0 top-0 flex items-center justify-center w-[60px] h-[60px] rounded-full border-2 border-border bg-background shadow-sm">
                  <div 
                    className={cn(
                      "w-[50px] h-[50px] rounded-full flex items-center justify-center transition-all duration-700",
                      "border bg-gradient-to-br from-background to-background/80",
                      isAnimated ? "opacity-100 border-primary/40" : "opacity-0 border-border/0"
                    )}
                    style={{ 
                      transitionDelay: '300ms',
                      boxShadow: isAnimated ? `0 0 15px 0 ${exp.color}30` : 'none'
                    }}
                  >
                    <div className="text-primary/90">{exp.icon}</div>
                  </div>
                </div>
                
                {/* Experience card */}
                <div 
                  className={cn(
                    "ml-20 bg-background/70 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-500 border shadow-md",
                    isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                    isExpanded ? "border-primary/30" : "border-border/40",
                    "hover:shadow-lg"
                  )}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    boxShadow: isExpanded ? `0 5px 20px -5px ${exp.color}40` : ''
                  }}
                >
                  {/* Card header */}
                  <div className="p-6 pb-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                          {exp.title}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="h-4 w-4 text-primary" />
                          </div>
                        </h3>
                        <p className="text-muted-foreground mt-1 flex flex-wrap items-center gap-2">
                          <span className="text-primary/80 font-medium">{exp.company}</span>
                          <span className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
                            {exp.location}
                          </span>
                        </p>
                      </div>
                      <div className="text-muted-foreground mt-2 md:mt-0 md:text-right flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 hidden md:inline" />
                        <span className="whitespace-nowrap text-sm">{exp.period}</span>
                      </div>
                    </div>
                    
                    {/* Skills tags */}
                    <div className="flex flex-wrap mt-4">
                      {exp.skills.map((skill, i) => (
                        <SkillTag key={i} skill={skill} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Card content */}
                  <div 
                    className="px-6 overflow-hidden"
                    style={{
                      maxHeight: isExpanded ? `${exp.description.length * 40 + 40}px` : '0px',
                      opacity: isExpanded ? 1 : 0,
                      transition: 'max-height 500ms ease-in-out, opacity 300ms ease-in-out'
                    }}
                  >
                    <div className="border-t border-border/30 pt-4 pb-1">
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start group/item">
                            <div className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/60 group-hover/item:scale-125 transition-transform"></div>
                            </div>
                            <span className="group-hover/item:text-foreground transition-colors">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Card footer */}
                      <div className="flex justify-end mt-4 pb-2 opacity-60 hover:opacity-100 transition-opacity">
                        <a href="#" className="text-xs flex items-center gap-1 text-primary hover:underline">
                          <span>Voir détails</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand/collapse button */}
                  <button
                    onClick={() => toggleExpand(index)}
                    className={cn(
                      "w-full p-2 text-xs font-medium flex items-center justify-center border-t",
                      "transition-colors",
                      isExpanded ? "bg-primary/5 border-primary/20" : "bg-background/50 border-border/30",
                      "hover:bg-primary/10"
                    )}
                  >
                    <span>{isExpanded ? 'Réduire' : 'Voir plus'}</span>
                    <ArrowRight 
                      className={cn(
                        "h-3 w-3 ml-1 transition-transform",
                        isExpanded ? "rotate-90" : ""
                      )} 
                    />
                  </button>
                </div>
              </div>
            );
          })}
          
          {/* Timeline end marker */}
          <div className="ml-20 text-center">
            <div className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-background/80 backdrop-blur-sm text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Continuellement en évolution
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
