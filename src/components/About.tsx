import React, { useEffect, useState, useRef } from 'react';
import { 
  Code, Layout, Database, Cpu, Hexagon, Zap, 
  Brain, Sparkles, Workflow, Globe, Award, 
  BookOpen, GitMerge, Bot, Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';

const skills = [
  { 
    category: 'Développement',
    icon: <Code className="h-4 w-4 text-primary" />,
    items: [
      { name: 'HTML5/CSS3', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'React/Next.js', level: 80 },
      { name: 'Angular', level: 75 }
    ] 
  },
  { 
    category: 'Design & UI',
    icon: <Layout className="h-4 w-4 text-primary" />,
    items: [
      { name: 'UX/UI Design', level: 85 },
      { name: 'Responsive Design', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Animation & Micro-interactions', level: 75 }
    ] 
  },
  { 
    category: 'Outils & Plateformes',
    icon: <Workflow className="h-4 w-4 text-primary" />,
    items: [
      { name: 'Figma/Adobe XD', level: 80 },
      { name: 'Talend ETL', level: 75 },
      { name: 'Power BI', level: 85 },
      { name: 'Git/GitHub', level: 80 }
    ] 
  },
  { 
    category: 'Technologies Émergentes',
    icon: <Brain className="h-4 w-4 text-primary" />,
    items: [
      { name: 'Intelligence Artificielle', level: 70 },
      { name: 'Data Visualization', level: 80 },
      { name: 'API Integration', level: 85 },
      { name: 'Cloud Computing', level: 75 }
    ] 
  },
];

const education = [
  {
    title: "Ingénieur d'État en Génie Informatique",
    institution: "Université Privée de Fès",
    period: "2022-2024",
    icon: <BookOpen className="h-3.5 w-3.5 text-primary" />,
    highlights: [
      "Spécialisation en développement web et applications cloud",
      "Projets en IA et visualisation de données",
      "Conception d'interfaces utilisateur avancées"
    ]
  },
  {
    title: "Technicien en Fabrication Mécanique",
    institution: "ISTA, Route Immouzer, Fès",
    period: "2020-2022",
    icon: <GitMerge className="h-3.5 w-3.5 text-primary" />,
    highlights: [
      "Maîtrise des processus de conception",
      "Modélisation et optimisation de systèmes",
      "Développement de solutions techniques innovantes"
    ]
  },
  {
    title: "Sciences Mathématiques et Informatiques",
    institution: "Faculté Dhar El Mahraz",
    period: "2016-2020",
    icon: <Lightbulb className="h-3.5 w-3.5 text-primary" />,
    highlights: [
      "Fondements en algorithmes et structures de données",
      "Résolution de problèmes complexes",
      "Analyse et modélisation mathématique"
    ]
  }
];

const certifications = [
  {
    name: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    icon: <Zap className="h-3.5 w-3.5 text-primary" />,
  },
  {
    name: "SQL (Advanced)",
    issuer: "HackerRank",
    icon: <Database className="h-3.5 w-3.5 text-primary" />,
  },
  {
    name: "Java (Basic)",
    issuer: "HackerRank",
    icon: <Cpu className="h-3.5 w-3.5 text-primary" />,
  },
  {
    name: "Front-end Development",
    issuer: "OpenClassrooms",
    icon: <Globe className="h-3.5 w-3.5 text-primary" />,
  }
];

// Customizable particles for the background
const BackgroundParticles = ({ theme = 'primary' }: { theme?: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-primary/10 to-primary/5 blur-3xl"></div>
    </div>
  );
};

// Animated progress bar component
const ProgressBar = ({ value, label, animated = true }: { value: number; label: string; animated?: boolean }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-1.5 group">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div 
        ref={progressRef}
        className="h-2 w-full rounded-full bg-primary/10 overflow-hidden"
      >
        <div 
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-1000 ease-out",
            animated && !isVisible ? "w-0" : "",
            "group-hover:from-primary/90 group-hover:to-primary"
          )}
          style={{ width: isVisible ? `${value}%` : '0%' }}
        >
          <div className="h-full w-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAEklEQVQImWNgYGD4z0AswK4SAFXuAf8EPy+xAAAAAElFTkSuQmCC')] bg-repeat opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

// Animated timeline node
const TimelineNode = ({ children, active }: { children: React.ReactNode; active: boolean }) => {
  return (
    <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full border-2 border-border bg-background flex items-center justify-center">
      <div className={cn(
        "w-2 h-2 rounded-full transition-all",
        active ? "bg-primary scale-150" : "bg-primary/50",
      )}></div>
      {children}
    </div>
  );
};

const About: React.FC = () => {
  const [activeEducation, setActiveEducation] = useState(0);
  const educationRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveEducation(index);
            }
          }
        });
      },
      { threshold: 0.7, rootMargin: "-10% 0px -10% 0px" }
    );

    educationRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Update current time every minute
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Format the timestamp in a specific way
  const formattedDate = "2025-03-25";
  const formattedTime = "01:47:48";
  const username = "darrassipro";

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <BackgroundParticles />
      
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-10"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          <div className="animate-reveal">
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block backdrop-blur-sm border border-primary/20">
                <span className="text-primary mr-1.5 animate-pulse">•</span>
                À PROPOS DE MOI
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Architecte d'expériences numériques 
              <span className="text-primary inline-block relative">
                innovantes<span className="absolute -top-1 -right-1 w-2 h-2 bg-primary/30 rounded-full animate-ping"></span>
              </span>
            </h2>
            
            <div className="space-y-4 mb-8">
              <p className="text-muted-foreground text-lg relative group">
                <span className="absolute left-0 w-1 h-full bg-primary/20 group-hover:bg-primary/40 transition-colors rounded-full -ml-3 hidden md:block"></span>
                Passionné par la convergence entre le design et les technologies émergentes, je crée des interfaces intuitives et attrayantes qui connectent les utilisateurs avec les possibilités du numérique.
              </p>
              
              <p className="text-muted-foreground text-lg relative group">
                <span className="absolute left-0 w-1 h-full bg-primary/20 group-hover:bg-primary/40 transition-colors rounded-full -ml-3 hidden md:block"></span>
                Mon approche combine principes esthétiques, données utilisateur et innovation technique pour façonner des expériences qui anticipent les besoins et inspirent l'engagement.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 mr-3 border border-primary/20">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  Parcours Éducatif
                </h3>
                
                <div className="text-xs text-muted-foreground bg-background/50 backdrop-blur-sm rounded-full px-3 py-1 border border-border/40">
                  <code className="font-mono">{formattedDate}</code>
                </div>
              </div>
              
              <div className="space-y-6 ml-4 border-l border-border/60 pl-8">
                {education.map((edu, index) => (
                  <div 
                    key={edu.title} 
                    className="relative" 
                    ref={el => educationRefs.current[index] = el}
                    data-index={index}
                  >
                    <TimelineNode active={activeEducation === index}>
                      <div className="absolute -top-8 -left-12 w-24 h-24 rounded-full bg-primary/5 blur-xl opacity-70 animate-pulse"></div>
                    </TimelineNode>
                    
                    <div className={cn(
                      "neo-card group backdrop-blur-sm border border-border/40 rounded-xl p-5 transition-all duration-500",
                      "hover:border-primary/30 hover:shadow-[0_0_25px_rgba(0,0,0,0.1)]",
                      "bg-gradient-to-br from-background/80 to-background/50"
                    )}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-lg flex items-center">
                            {edu.title}
                            <span className="inline-flex ml-2">{edu.icon}</span>
                          </p>
                          <p className="text-muted-foreground">{edu.institution}, {edu.period}</p>
                        </div>
                        <div className="hidden sm:block w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="font-mono text-xs text-primary/70">{parseInt(edu.period.split('-')[0])}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-1.5">
                        {edu.highlights.map((highlight, i) => (
                          <p key={i} className="text-sm text-muted-foreground flex items-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-1.5 mr-2 flex-shrink-0"></span>
                            <span className="group-hover:text-foreground/90 transition-colors">{highlight}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="animate-reveal" style={{ animationDelay: '100ms' }}>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center mb-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 mr-3 border border-primary/20 group">
                    <Hexagon className="h-4 w-4 text-primary group-hover:rotate-90 transition-transform duration-500" />
                  </div>
                  Compétences & Expertise
                </h3>
                
                <div className="text-xs text-muted-foreground bg-background/50 backdrop-blur-sm rounded-full px-3 py-1 border border-border/40">
                  <code className="font-mono">@{username}</code>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-8">
                {skills.map((skillGroup, idx) => (
                  <div key={skillGroup.category} className="relative">
                    <div className={cn(
                      "absolute -top-3 left-4 px-2 z-10",
                      "bg-background border border-border/40 rounded-full backdrop-blur-sm"
                    )}>
                      <h4 className="font-medium text-sm flex items-center">
                        <span className="mr-2">{skillGroup.icon}</span>
                        {skillGroup.category}
                      </h4>
                    </div>
                    
                    <div className={cn(
                      "border border-border/40 rounded-xl p-5 pt-6",
                      "bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm",
                      "hover:border-primary/20 transition-colors duration-300"
                    )}>
                      <div className="space-y-4 mt-2">
                        {skillGroup.items.map((skill) => (
                          <ProgressBar 
                            key={skill.name} 
                            label={skill.name} 
                            value={skill.level} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={cn(
                "mt-8 p-6 rounded-2xl relative overflow-hidden group",
                "bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm",
                "border border-border/40 hover:border-primary/20 transition-colors duration-300"
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-lg flex items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/10 mr-2 border border-primary/20">
                      <Award className="h-3 w-3 text-primary" />
                    </div>
                    Certifications
                  </h4>
                  
                  <div className="text-xs text-muted-foreground">
                    <code className="font-mono">{formattedTime}</code>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {certifications.map((cert, idx) => (
                    <div 
                      key={cert.name}
                      className={cn(
                        "p-3 rounded-lg flex items-start space-x-3",
                        "bg-gradient-to-br from-primary/5 to-transparent border border-primary/10",
                        "hover:from-primary/10 hover:border-primary/20 transition-all duration-300"
                      )}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20 flex-shrink-0">
                        {cert.icon}
                      </div>
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-xs text-muted-foreground">Certifié {cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="relative group/tech flex items-center">
                    <Sparkles className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">Technologies émergentes</span>
                    <div className="absolute left-0 -bottom-12 bg-background/80 backdrop-blur-md border border-border/40 p-2 rounded-lg text-xs w-48 opacity-0 invisible group-hover/tech:opacity-100 group-hover/tech:visible transition-all duration-300">
                      Intelligence artificielle, AR/VR, Cloud Native, Edge Computing
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">Collaboration:</span>
                    <div className="flex -space-x-1">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] border border-primary/10">
                        <Bot className="h-3 w-3 text-primary" />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] border border-primary/10">AI</div>
                      <div className="w-6 h-6 rounded-full bg-primary/5 flex items-center justify-center text-[10px] border border-primary/10">+3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default About;
