import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ExternalLink, Github, ArrowUpRight, Box, Layout, Server, Database, 
  Layers, Code, FileCode, FileJson, Globe, Shuffle, BarChart3, 
  Brush, Cpu, Package, Shield, Table, Zap, Brackets, Leaf, Coffee
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

// Technology icon mapping
const getTechIcon = (techName: string): React.ElementType => {
  const iconMap: Record<string, React.ElementType> = {
    // Frameworks & Libraries
    "React": Layers,
    "Vue": Layers,
    "Angular": Layers,
    "Symfony": FileCode,
    "Express": Server,
    "Spring Boot": Leaf,
    "Spring Security": Shield,
    "Node.js": Server,
    "Vite": Zap,
    ".NET": Code,
    
    // Languages
    "JavaScript": Code,
    "TypeScript": Code,
    "PHP": Code,
    "C#": Brackets,
    "Java": Coffee,
    "Python": Code,
    
    // Databases
    "MongoDB": Database,
    "MySQL": Database,
    "PostgreSQL": Database,
    "SQL Server": Database,
    "Doctrine": Database,
    "JPA Repository": Database,
    "Entity Framework 6": Database,
    "Code First": Code,
    
    // Tools & Technologies
    "TailwindCSS": Brush,
    "CSS": Brush,
    "SASS": Brush,
    "Twig": FileJson,
    "Symfony CLI": Server,
    "phpMyAdmin": Layout,
    "Vercel": Globe,
    "ETL": Shuffle,
    "Talend": Shuffle,
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
