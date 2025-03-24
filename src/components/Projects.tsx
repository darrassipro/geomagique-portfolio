import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ExternalLink, Github, ArrowUpRight, Box, Layout, Server, Database, 
  Layers, Code, FileCode, FileJson, Globe, Shuffle, BarChart3, 
  Cpu, Package, Shield, Table, Zap, Brackets, Leaf, 
  Infinity, LayoutGrid, CircleOff, Gitlab, BookOpen,
  PanelLeft, Hammer, Terminal, Folder, FolderTree, Sparkles
} from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: Array<{
    name: string;
    icon: React.ElementType;
    color?: string;
  }>;
  github?: string;
  live?: string;
  icon?: React.ElementType;
}

// Technology icon mapping - more accurate icons for each technology
const getTechIcon = (techName: string): React.ElementType => {
  const iconMap: Record<string, React.ElementType> = {
    // Frameworks & Libraries
    "React": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 21.21c-3.72 0-7.25-1.47-9.75-3.75-2.32-2.12-3.24-4.31-2.74-6.24.5-1.93 2.23-3.35 4.88-4.27 1.97-.69 4.16-.93 6.09-.93s4.12.24 6.09.93c2.65.92 4.38 2.34 4.88 4.27.5 1.93-.42 4.12-2.74 6.24-2.5 2.28-6.03 3.75-9.75 3.75z" />
        <path d="M12 2.79c3.72 0 7.25 1.47 9.75 3.75 2.32 2.12 3.24 4.31 2.74 6.24-.5 1.93-2.23 3.35-4.88 4.27-1.97.69-4.16.93-6.09.93s-4.12-.24-6.09-.93c-2.65-.92-4.38-2.34-4.88-4.27-.5-1.93.42-4.12 2.74-6.24C4.75 4.26 8.28 2.79 12 2.79z" />
      </svg>
    ),
    "Vue": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M12 2.69l5.66 9.93 5.66-9.93H12z" />
        <path d="M12 2.69L6.34 12.62 0.68 2.69H12z" />
      </svg>
    ),
    "Angular": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M12 2L4 5.4V18.2L12 22L20 18.2V5.4L12 2Z" />
        <path d="M12 22V14" />
        <path d="M20 5.4L12 14L4 5.4" />
      </svg>
    ),
    "Symfony": FileCode,
    "Express": Server,
    "Spring Boot": Leaf,
    "Spring Security": Shield,
    "Node.js": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M12 21.8C6.8 21.8 3 19.5 3 12C3 4.5 6.8 2.2 12 2.2C17.2 2.2 21 4.5 21 12C21 19.5 17.2 21.8 12 21.8Z" />
        <path d="M12 15.5V17.7" />
        <path d="M10.3 15.5L8.8 17.7" />
        <path d="M13.7 15.5L15.2 17.7" />
        <path d="M6.3 13.2L8.2 13.7" />
        <path d="M17.7 13.2L15.8 13.7" />
        <path d="M8.8 8L10.3 10.2" />
        <path d="M15.2 8L13.7 10.2" />
        <path d="M12 6.3V8.5" />
      </svg>
    ),
    "Vite": Zap,
    ".NET": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M18 12.5V10a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v1.4" />
        <path d="M14 11.5a2 2 0 0 0 4 0" />
        <path d="M6 8v8" />
        <path d="M10 8v8" />
        <path d="M6 12h4" />
      </svg>
    ),
    
    // Languages
    "JavaScript": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M7 5.5v14c0 .8.5 1.5 1.3 1.5s1.3-.7 1.3-1.5v-7M12.5 5.5v14c0 .8.5 1.5 1.3 1.5s1.3-.7 1.3-1.5v-7M18 12h-6.5" />
      </svg>
    ),
    "TypeScript": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M16.5 9.5v-2H7.5v2M12 7.5v9M16.5 16.5v-2h-9v2" />
      </svg>
    ),
    "PHP": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M12 12m-10 0a10 9 0 1 0 20 0a10 9 0 1 0 -20 0" />
        <path d="M5.5 15l.395 -1.974l.605 -3.026h1.32a1 1 0 0 1 .986 1.164l-.167 1a1 1 0 0 1 -.986 .836h-1.653" />
        <path d="M15.5 15l.395 -1.974l.605 -3.026h1.32a1 1 0 0 1 .986 1.164l-.167 1a1 1 0 0 1 -.986 .836h-1.653" />
        <path d="M12 7.5l-1 5.5m-1.5 0h5" />
      </svg>
    ),
    "C#": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M10 9a3 3 0 0 0 -3 -3h-.5a3.5 3.5 0 0 0 -3.5 3.5v5a3.5 3.5 0 0 0 3.5 3.5h.5a3 3 0 0 0 3 -3" />
        <path d="M16 21v-12a4 4 0 1 1 8 0v12" />
        <path d="M16 13h8" />
      </svg>
    ),
    "Java": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M10 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-3" />
        <path d="M17 3.35L12 8M17 3.35V8h4.65" />
        <path d="M22 12v2.5a2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1 0-5z" />
      </svg>
    ),
    "Python": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M12 9H7.5a2.5 2.5 0 0 1 0-5h8a2.5 2.5 0 0 0 0-5h-8a2.5 2.5 0 0 0 0 5H12v10" />
        <path d="M12 15v3.5a2.5 2.5 0 1 1-5 0v-8a2.5 2.5 0 1 0-5 0v8a2.5 2.5 0 0 0 5 0V15" />
      </svg>
    ),
    
    // Databases
    "MongoDB": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M12 3v19" />
        <path d="M18 8.5V3H6v5.5a5.5 5.5 0 0 0 11 0z" />
      </svg>
    ),
    "MySQL": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M13 2v10h7a3 3 0 0 0 0-6h-3M13 12v3a6 6 0 0 0 6 6h1a6 6 0 0 0 5-3" />
        <path d="M9 22V2" />
        <path d="M9 16H5a3 3 0 0 1 0-6h4" />
      </svg>
    ),
    "PostgreSQL": Database,
    "SQL Server": Database,
    "Doctrine": Database,
    "JPA Repository": Database,
    "Entity Framework 6": Database,
    "Code First": Code,
    
    // Tools & Technologies
    "TailwindCSS": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M11.67 22c9.9 0 11.25-9 6.67-13.5C13.73 3.45 13.73 8.66 11.67 11 7.28 15.31 5.5 22 11.67 22Z" />
        <path d="M11.67 11C9.61 8.66 9.61 3.45 5 3c0 0-3 1-1 8.5 3 12 15 8 15 7-5.98 1.2-9.3-1.89-7.33-7.5Z" />
      </svg>
    ),
    "CSS": LayoutGrid,
    "SASS": Sparkles,
    "Twig": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M12 22c5.5 0 10-4.5 10-10 0-4-3-7-7-8l-3-1h-2C7 9 7 12 7 12c0 3 3 4 8 5.5 1 .5 1.5 2.5.5 3.5-1.5 1.5-4 1.5-5 1z" />
        <path d="M12 8c0-3-1-4-2.5-4C8 4 7 5.5 7 7c0 .5.5 3.5 2 3.5z" />
      </svg>
    ),
    "Symfony CLI": Terminal,
    "phpMyAdmin": PanelLeft,
    "Vercel": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M12 2L2 19.5h20z" />
      </svg>
    ),
    "ETL": Shuffle,
    "Talend": () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
        <path d="M12 3v4" />
        <path d="m18 7-3 2" />
        <path d="m9 9-3-2" />
        <path d="M7 14a5 5 0 0 0 10 0" />
      </svg>
    ),
    "Power BI": BarChart3,
    "Data Visualization": BarChart3,
  };
  
  return iconMap[techName] || Cpu; // Default to Cpu icon if not found
};

// Technology color mapping
const getTechColor = (techName: string): string => {
  const colorMap: Record<string, string> = {
    "React": "sky",
    "Vue": "emerald",
    "Angular": "red",
    "Symfony": "purple",
    "Express": "neutral",
    "Spring Boot": "green",
    "Spring Security": "red",
    "Node.js": "green",
    "Vite": "purple",
    "TailwindCSS": "cyan",
    "MongoDB": "green",
    "MySQL": "blue",
    "TypeScript": "blue",
    "JavaScript": "yellow",
    "PHP": "indigo",
    "C#": "purple",
    ".NET": "blue",
    "Power BI": "yellow",
    "Talend": "red",
    "ETL": "blue",
    "Data Visualization": "indigo",
    "Doctrine": "orange",
    "Twig": "amber",
    "Symfony CLI": "purple",
    "phpMyAdmin": "blue",
    "JPA Repository": "blue",
    "Entity Framework 6": "blue",
    "Code First": "teal",
    "Vercel": "black",
  };
  
  return colorMap[techName] || "gray"; // Default to gray if not found
};

// Map colors to Tailwind classes
const getColorClass = (color: string): string => {
  switch (color) {
    case 'blue': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'sky': return 'bg-sky-500/10 text-sky-600 border-sky-500/20';
    case 'green': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    case 'purple': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    case 'amber': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'indigo': return 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20';
    case 'orange': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
    case 'red': return 'bg-red-500/10 text-red-600 border-red-500/20';
    case 'cyan': return 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20';
    case 'teal': return 'bg-teal-500/10 text-teal-600 border-teal-500/20';
    case 'yellow': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    case 'neutral': return 'bg-neutral-500/10 text-neutral-600 border-neutral-500/20';
    case 'black': return 'bg-neutral-900/10 text-neutral-700 border-neutral-900/20';
    default: return 'bg-primary/10 text-primary border-primary/20';
  }
};

const projects: Project[] = [
  {
    title: "Application Web de Gestion des Stages",
    description: "Gestion de Stagiaires - Projet Symfony pour l'Université privée de Fès, permettant de programmer les soutenances.",
    technologies: [
      { name: "Twig", icon: getTechIcon("Twig"), color: getTechColor("Twig") },
      { name: "Doctrine", icon: getTechIcon("Doctrine"), color: getTechColor("Doctrine") },
      { name: "Symfony CLI", icon: getTechIcon("Symfony CLI"), color: getTechColor("Symfony CLI") },
      { name: "phpMyAdmin", icon: getTechIcon("phpMyAdmin"), color: getTechColor("phpMyAdmin") }
    ],
    github: "https://github.com/darrassi1/GestionDesStGES",
    icon: Database
  },
  {
    title: "Application Web pour Salons de Spa",
    description: "Développement d'une application Maven avec Thymeleaf et Spring JPA pour la gestion des salons, services, clients et rendez-vous.",
    technologies: [
      { name: "Spring Boot", icon: getTechIcon("Spring Boot"), color: getTechColor("Spring Boot") },
      { name: "Spring Security", icon: getTechIcon("Spring Security"), color: getTechColor("Spring Security") },
      { name: "JPA Repository", icon: getTechIcon("JPA Repository"), color: getTechColor("JPA Repository") },
      { name: "MySQL", icon: getTechIcon("MySQL"), color: getTechColor("MySQL") }
    ],
    github: "https://github.com/darrassi1/Gestion_SPA",
    icon: Layout
  },
  {
    title: "Gestion de Pylône Électrique",
    description: "Conception et développement d'une application C# pour la gestion de pylônes électriques avec Entity Framework 6 et approche Code First.",
    technologies: [
      { name: "C#", icon: getTechIcon("C#"), color: getTechColor("C#") },
      { name: "Entity Framework 6", icon: getTechIcon("Entity Framework 6"), color: getTechColor("Entity Framework 6") },
      { name: "Code First", icon: getTechIcon("Code First"), color: getTechColor("Code First") },
      { name: ".NET", icon: getTechIcon(".NET"), color: getTechColor(".NET") }
    ],
    github: "https://github.com/darrassi1/GestionDePyloneElectrique",
    icon: Server
  },
  {
    title: "TeethSeg Frontend",
    description: "Interface utilisateur moderne pour un système de segmentation dentaire, développée avec React, Vite et TailwindCSS.",
    technologies: [
      { name: "React", icon: getTechIcon("React"), color: getTechColor("React") },
      { name: "Vite", icon: getTechIcon("Vite"), color: getTechColor("Vite") },
      { name: "TailwindCSS", icon: getTechIcon("TailwindCSS"), color: getTechColor("TailwindCSS") },
      { name: "Vercel", icon: getTechIcon("Vercel"), color: getTechColor("Vercel") }
    ],
    github: "https://github.com/darrassi1/SegTeeth",
    icon: Code
  },
  {
    title: "Application BI avec Talend et Power BI",
    description: "Développement d'une solution BI pour l'analyse de données, avec des visualisations permettant de prendre des décisions éclairées.",
    technologies: [
      { name: "Talend", icon: getTechIcon("Talend"), color: getTechColor("Talend") },
      { name: "Power BI", icon: getTechIcon("Power BI"), color: getTechColor("Power BI") },
      { name: "ETL", icon: getTechIcon("ETL"), color: getTechColor("ETL") },
      { name: "Data Visualization", icon: getTechIcon("Data Visualization"), color: getTechColor("Data Visualization") }
    ],
    github: "https://github.com/darrassi1/Projet-BI-Talend-PowerBI",
    icon: Layers
  },
  {
    title: "Barbershop Application",
    description: "Application complète de salon de coiffure avec frontend React et backend Node.js/Express.",
    technologies: [
      { name: "React", icon: getTechIcon("React"), color: getTechColor("React") },
      { name: "Node.js", icon: getTechIcon("Node.js"), color: getTechColor("Node.js") },
      { name: "Express", icon: getTechIcon("Express"), color: getTechColor("Express") },
      { name: "MongoDB", icon: getTechIcon("MongoDB"), color: getTechColor("MongoDB") }
    ],
    github: "https://github.com/darrassi1/Barbershop",
    live: "https://barbershop-pearl-seven.vercel.app",
    icon: FileCode
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-[1]"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="animate-reveal text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block">
              PROJETS
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Projets Académiques
          </h2>
          <p className="text-muted-foreground text-lg">
            Une sélection de projets sur lesquels j'ai travaillé pendant mon parcours académique.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon || Box;
            
            return (
              <Card 
                key={index} 
                className="animate-reveal project-card group backdrop-blur-sm bg-background/50 border border-border/40 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,0,0,0.06)] overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary/80 to-primary/40 group-hover:w-full transition-all duration-700"></div>
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/5 mr-4 group-hover:bg-primary/10 transition-all duration-300">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold flex-1">
                      {project.title}
                    </h3>
                    <span className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => {
                      const TechIcon = tech.icon;
                      return (
                        <span 
                          key={i} 
                          className={`px-3 py-1 text-xs font-medium backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-1.5 border ${getColorClass(tech.color)}`}
                        >
                          <TechIcon className="h-3 w-3" />
                          {tech.name}
                        </span>
                      );
                    })}
                  </div>
                  
                  <div className="flex space-x-4 mt-auto">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
                        <Github size={16} className="mr-1.5 transition-transform duration-300 group-hover:scale-110" />
                        Code Source
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
                        <ExternalLink size={16} className="mr-1.5 transition-transform duration-300 group-hover:scale-110" />
                        Voir le Projet
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-[1]"></div>
    </section>
  );
};

export default Projects;
