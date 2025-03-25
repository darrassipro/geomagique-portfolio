import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, Code, Globe, Cpu, Sparkles, 
  Timer, Calendar, MapPin, ChevronRight, ArrowRight,
  Monitor, Radio, Braces, Bot, Terminal, Laptop, 
  Video, ShoppingCart, Tv, Film, Folder, Workflow, 
  Presentation, LayoutGrid, Eye, Scissors, Database,
  CircleCheck, Layers
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

interface PersonalProject {
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  technologies: string[];
  period: string;
  category: 'frontend' | 'fullstack' | 'ui' | 'tools';
  color: string;
  icon: React.ReactNode;
  features?: string[];
}

// Professional experiences
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

// Personal projects
const personalProjects: PersonalProject[] = [
  {
    title: "DutyEng - Assistant AI Autonome",
    description: "Interface utilisateur pour agent AI autonome avec terminal, éditeur de code, navigateur et espace de chat",
    url: "http://dutyeng.vercel.app",
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    period: "2025",
    category: "ui",
    color: "#6d28d9",
    icon: <Terminal className="h-5 w-5" />,
    features: [
      "Environnement de développement intégré",
      "Interface de terminal interactive",
      "Assistant AI conversationnel",
      "Navigation web intégrée"
    ]
  },
  {
    title: "MarketSpace - Plateforme E-Commerce",
    description: "Application e-commerce complète avec navigation par catégories, panier d'achat et système de recommandation",
    url: "https://marketspace-gilt.vercel.app",
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    period: "2024",
    category: "frontend",
    color: "#0ea5e9",
    icon: <ShoppingCart className="h-5 w-5" />,
    features: [
      "Interface utilisateur moderne et réactive",
      "Système de panier et checkout",
      "Visualisation de produits optimisée",
      "Expérience utilisateur fluide et intuitive"
    ]
  },
  {
    title: "VSP - Plateforme de Streaming Vidéo",
    description: "Plateforme de streaming full-stack avec lecture vidéo, système de comptes utilisateurs et recommandations personnalisées",
    url: "http://vspfront.vercel.app",
    technologies: ["Angular 19", "Tailwind CSS", "Node.js", "Express", "MySQL"],
    period: "2024",
    category: "fullstack",
    color: "#dc2626",
    icon: <Video className="h-5 w-5" />,
    features: [
      "Architecture full-stack complète",
      "Système de streaming optimisé",
      "Backend Node.js avec API RESTful",
      "Base de données relationnelle MySQL"
    ]
  },
  {
    title: "FlowVentory - Gestion d'Inventaire",
    description: "Application de gestion d'inventaire avec tableaux de bord analytiques et suivi en temps réel",
    url: "https://flowventory-gateway.vercel.app/",
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    period: "2024",
    category: "frontend",
    color: "#0891b2",
    icon: <Database className="h-5 w-5" />,
    features: [
      "Visualisation de données en temps réel",
      "Interfaces d'inventaire intuitives",
      "Rapports analytiques détaillés",
      "Système de notifications"
    ]
  },
  {
    title: "Dragon Ball Z - Expérience Interactive",
    description: "Site web interactif avec carrousel, épisodes et lecteur vidéo personnalisé",
    url: "https://dragon-ball-z-lilac.vercel.app/",
    technologies: ["Angular 19", "Tailwind CSS", "Font Awesome"],
    period: "2023",
    category: "frontend",
    color: "#f59e0b",
    icon: <Film className="h-5 w-5" />,
    features: [
      "Lecteur vidéo intégré",
      "Navigation d'épisodes fluide",
      "Carrousel d'images optimisé",
      "Expérience utilisateur immersive"
    ]
  },
  {
    title: "SMedia - Gestion Marketing Digital",
    description: "Interface utilisateur pour la gestion de campagnes marketing digital et analyse de données",
    url: "http://smedia-omega.vercel.app",
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    period: "2023",
    category: "ui",
    color: "#2dd4bf",
    icon: <Presentation className="h-5 w-5" />,
    features: [
      "Tableaux de bord marketing avancés",
      "Visualisation des données sociales",
      "Planification de campagnes",
      "Analyses et rapports détaillés"
    ]
  },
  {
    title: "SkipSilenceAds - Extension YouTube",
    description: "Outils pour supprimer les publicités des vidéos YouTube et ignorer les silences",
    url: "https://skipsilenceads.vercel.app/",
    technologies: ["Angular 19", "Tailwind CSS", "Font Awesome"],
    period: "2023",
    category: "tools",
    color: "#ec4899",
    icon: <Scissors className="h-5 w-5" />,
    features: [
      "Détection intelligente des publicités",
      "Reconnaissance des segments silencieux",
      "Interface utilisateur minimaliste",
      "Amélioration de l'expérience YouTube"
    ]
  },
  {
    title: "KingsLeaque - Actualités TV",
    description: "Site web de lecteur TV et actualités avec interface moderne et fonctionnalités de streaming en direct",
    url: "https://kingsleaque.vercel.app",
    technologies: ["Angular", "Tailwind CSS", "Font Awesome"],
    period: "2023",
    category: "frontend",
    color: "#7c3aed",
    icon: <Tv className="h-5 w-5" />,
    features: [
      "Diffusion de contenu en direct",
      "Aggrégation d'actualités",
      "Lecteur TV intégré",
      "Interface utilisateur moderne"
    ]
  },
  {
    title: "SightSpace - Site Entreprise",
    description: "Site vitrine d'entreprise avec sections produits, services et présentation de l'équipe",
    url: "http://sightspace.vercel.app",
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    period: "2022",
    category: "frontend",
    color: "#0284c7",
    icon: <LayoutGrid className="h-5 w-5" />,
    features: [
      "Présentation d'entreprise moderne",
      "Navigation fluide et intuitive",
      "Optimisation SEO",
      "Expérience utilisateur raffinée"
    ]
  },
  {
    title: "CocoPark Hub - Portail RH & Marketing",
    description: "Portail intégré pour les fonctions RH, marketing et communication d'entreprise",
    url: "http://cocopark-hub.vercel.app",
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    period: "2022",
    category: "ui",
    color: "#16a34a",
    icon: <Workflow className="h-5 w-5" />,
    features: [
      "Intégration des fonctions RH et marketing",
      "Outils de communication interne",
      "Tableaux de bord analytiques",
      "Gestion de documents centralisée"
    ]
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

const getProjectCategoryIcon = (category: string) => {
  switch (category) {
    case 'frontend':
      return <Globe className="h-4 w-4" />;
    case 'fullstack':
      return <Laptop className="h-4 w-4" />;
    case 'ui':
      return <Eye className="h-4 w-4" />;
    case 'tools':
      return <Workflow className="h-4 w-4" />;
    default:
      return <Folder className="h-4 w-4" />;
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

// Technology tag for projects
const TechTag = ({ name }: { name: string }) => {
  return (
    <div className="inline-flex items-center rounded-full border border-border/40 bg-background/50 backdrop-blur-sm px-2 py-0.5 text-xs mr-1.5 mb-1.5 group hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
      <Code className="h-2.5 w-2.5 mr-1 text-primary/70" />
      <span className="text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
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
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showProjects, setShowProjects] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // System info for futuristic UI element
  const currentTime = "2025-03-25 06:00:23";
  const currentUser = "darrassipro";

  // Filter projects by category
  const filteredProjects = selectedCategory 
    ? personalProjects.filter(p => p.category === selectedCategory)
    : personalProjects;

  // Project categories for filter
  const projectCategories = [
    { id: "frontend", label: "Frontend", icon: <Globe className="h-3.5 w-3.5" />, color: "#0ea5e9" },
    { id: "fullstack", label: "Full Stack", icon: <Laptop className="h-3.5 w-3.5" />, color: "#dc2626" },
    { id: "ui", label: "UI Design", icon: <Eye className="h-3.5 w-3.5" />, color: "#6d28d9" },
    { id: "tools", label: "Outils", icon: <Workflow className="h-3.5 w-3.5" />, color: "#ec4899" }
  ];

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
            
            // Check if it's the projects section
            if (entry.target === projectsRef.current) {
              setShowProjects(true);
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
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

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

  // Toggle expanded state for a project
  const toggleExpandProject = (index: number) => {
    setExpandedProjects(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

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
            Parcours professionnel
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

        {/* Professional Experience Section */}
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
        
        {/* Projects Section */}
        <div 
          ref={projectsRef}
          className="mt-24 max-w-6xl mx-auto animate-fade-in-up" 
          style={{ 
            opacity: showProjects ? 1 : 0,
            transform: showProjects ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out' 
          }}
        >
          <div className="text-center mb-16">
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block relative overflow-hidden border border-primary/20">
                <span className="relative flex items-center gap-1">
                  <Layers className="h-3 w-3 text-primary/80" />
                  PROJETS PERSONNELS
                </span>
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Explorations créatives
              <span className="text-primary">.</span>
            </h2>
            
            {/* Project category filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  "border backdrop-blur-sm",
                  selectedCategory === null 
                    ? "bg-primary/20 border-primary/30 text-foreground" 
                    : "bg-background/40 border-border/40 text-muted-foreground hover:bg-background/60"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <Folder className="h-3 w-3" />
                  Tous les projets
                </span>
              </button>
              
              {projectCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    "border backdrop-blur-sm",
                    selectedCategory === category.id 
                      ? "bg-primary/20 border-primary/30 text-foreground" 
                      : "bg-background/40 border-border/40 text-muted-foreground hover:bg-background/60"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {category.icon}
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const isProjectExpanded = expandedProjects.includes(idx);
              
              return (
                <div 
                  key={project.title}
                  className={cn(
                    "group bg-background/70 rounded-xl border border-border/40 backdrop-blur-md overflow-hidden",
                    "hover:border-primary/30 hover:shadow-md transition-all duration-300",
                    "flex flex-col"
                  )}
                  style={{ 
                    animationDelay: `${idx * 100}ms`,
                    boxShadow: isProjectExpanded ? `0 5px 20px -5px ${project.color}30` : ''
                  }}
                >
                  {/* Project Header */}
                  <div className="p-5 border-b border-border/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${project.color}20`, color: project.color }}
                        >
                          {project.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg group-hover:text-primary transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {project.period}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-border/70"></span>
                            <span 
                              className="text-xs flex items-center gap-1"
                              style={{ color: project.color }}
                            >
                              {getProjectCategoryIcon(project.category)}
                              {projectCategories.find(c => c.id === project.category)?.label}
                            </span>
                          </div>
                        </div>
                      </div>
                      <a 
                        href={project.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Visiter ${project.title}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Technologies */}
                  <div className="px-5 py-3 border-b border-border/30 bg-background/40">
                    <div className="flex flex-wrap">
                      {project.technologies.map((tech, i) => (
                        <TechTag key={i} name={tech} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Features */}
                  <div 
                    className="px-5 overflow-hidden flex-grow flex flex-col justify-between"
                    style={{
                      maxHeight: isProjectExpanded ? '200px' : '0px',
                      transition: 'max-height 400ms ease-in-out'
                    }}
                  >
                    {project.features && (
                      <div className="py-3">
                        <p className="text-xs font-medium mb-2 text-foreground/80">Fonctionnalités</p>
                        <ul className="space-y-1.5">
                          {project.features.map((feature, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start">
                              <CircleCheck className="h-3 w-3 mr-1.5 mt-0.5 text-primary/70" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Toggle Features Button */}
                  <button
                    onClick={() => toggleExpandProject(idx)}
                    className={cn(
                      "w-full p-2 text-xs font-medium flex items-center justify-center",
                      "transition-colors border-t border-border/30",
                      isProjectExpanded ? "bg-primary/5" : "bg-background/50",
                      "hover:bg-primary/10"
                    )}
                  >
                    <span>{isProjectExpanded ? 'Masquer détails' : 'Voir fonctionnalités'}</span>
                    <ArrowRight 
                      className={cn(
                        "h-3 w-3 ml-1.5 transition-transform",
                        isProjectExpanded ? "rotate-90" : ""
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* Message when no projects match filter */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-10 bg-background/40 rounded-xl border border-border/30 backdrop-blur-sm">
              <Folder className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">Aucun projet ne correspond à cette catégorie</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="mt-4 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
              >
                Voir tous les projets
              </button>
            </div>
          )}
          
          {/* Latest System Update Marker */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-border/40 bg-background/40 backdrop-blur-sm text-xs text-muted-foreground/70">
              <Clock className="h-3 w-3 mr-1.5 text-primary/70" />
              <span>Dernière mise à jour: {currentTime}</span>
              <span className="mx-2 text-border/50">|</span>
              <User className="h-3 w-3 mr-1.5 text-primary/70" />
              <span>{currentUser}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
