import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ExternalLink, Github, ArrowUpRight, Box, Layout, 
  Server, Database, Layers, Code, FileCode, 
  ChevronRight, Star, Clock, GitFork, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Project {
  title: string;
  description: string;
  technologies: Array<{
    name: string;
    color?: string;
  }>;
  github?: string;
  live?: string;
  icon?: React.ElementType;
  featured?: boolean;
  stats?: {
    stars?: number;
    forks?: number;
    views?: number;
  };
  image?: string;
}

const projects: Project[] = [
  {
    title: "Application Web de Gestion des Stages",
    description: "Gestion de Stagiaires - Projet Symfony pour l'Université privée de Fès, permettant de programmer les soutenances et suivre le progrès des étudiants.",
    technologies: [
      { name: "Twig", color: "blue" },
      { name: "Doctrine", color: "orange" },
      { name: "Symfony CLI", color: "green" },
      { name: "phpMyAdmin", color: "purple" }
    ],
    github: "https://github.com/darrassi1/GestionDesStGES",
    icon: Database,
    featured: true,
    stats: {
      stars: 12,
      forks: 5,
      views: 347
    },
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2532&auto=format&fit=crop"
  },
  {
    title: "Application Web pour Salons de Spa",
    description: "Développement d'une application Maven avec Thymeleaf et Spring JPA pour la gestion des salons, services, clients et rendez-vous. Interface intuitive et sécurisée.",
    technologies: [
      { name: "Spring Boot", color: "green" },
      { name: "Spring Security", color: "red" },
      { name: "JPA Repository", color: "blue" },
      { name: "MySQL", color: "orange" }
    ],
    github: "https://github.com/darrassi1/Gestion_SPA",
    live: "https://spa-demo.vercel.app",
    icon: Layout,
    stats: {
      stars: 8,
      forks: 3,
      views: 219
    },
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Gestion de Pylône Électrique",
    description: "Conception et développement d'une application C# pour la gestion de pylônes électriques avec Entity Framework 6 et approche Code First. Optimisée pour la maintenance industrielle.",
    technologies: [
      { name: "C#", color: "purple" },
      { name: "Entity Framework 6", color: "blue" },
      { name: "Code First", color: "cyan" },
      { name: ".NET", color: "teal" }
    ],
    github: "https://github.com/darrassi1/GestionDePyloneElectrique",
    icon: Server,
    stats: {
      stars: 15,
      forks: 7,
      views: 432
    },
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "TeethSeg Frontend",
    description: "Interface utilisateur moderne pour un système de segmentation dentaire, développée avec React, Vite et TailwindCSS. Algorithmique avancée pour la reconnaissance d'image.",
    technologies: [
      { name: "React", color: "cyan" },
      { name: "Vite", color: "purple" },
      { name: "TailwindCSS", color: "blue" },
      { name: "Vercel", color: "black" }
    ],
    github: "https://github.com/darrassi1/SegTeeth",
    live: "https://segteeth.vercel.app",
    icon: Code,
    featured: true,
    stats: {
      stars: 24,
      forks: 9,
      views: 786
    },
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2574&auto=format&fit=crop"
  },
  {
    title: "Application BI avec Talend et Power BI",
    description: "Développement d'une solution BI pour l'analyse de données, avec des visualisations permettant de prendre des décisions éclairées. ETL optimisé pour les grands volumes.",
    technologies: [
      { name: "Talend", color: "green" },
      { name: "Power BI", color: "gold" },
      { name: "ETL", color: "blue" },
      { name: "Data Visualization", color: "purple" }
    ],
    github: "https://github.com/darrassi1/Projet-BI-Talend-PowerBI",
    icon: Layers,
    stats: {
      stars: 18,
      forks: 6,
      views: 521
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Barbershop Application",
    description: "Application complète de salon de coiffure avec frontend React et backend Node.js/Express. Réservation en temps réel et gestion du calendrier pour les professionnels.",
    technologies: [
      { name: "React", color: "cyan" },
      { name: "Node.js", color: "green" },
      { name: "Express", color: "gray" },
      { name: "MongoDB", color: "green" }
    ],
    github: "https://github.com/darrassi1/Barbershop",
    live: "https://barbershop-demo.vercel.app",
    icon: FileCode,
    stats: {
      stars: 14,
      forks: 4,
      views: 375
    },
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2670&auto=format&fit=crop"
  },
];

// Map colors to Tailwind classes
const getColorClass = (color?: string) => {
  switch (color) {
    case 'blue': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'green': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    case 'purple': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    case 'orange': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
    case 'red': return 'bg-red-500/10 text-red-600 border-red-500/20';
    case 'cyan': return 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20';
    case 'teal': return 'bg-teal-500/10 text-teal-600 border-teal-500/20';
    case 'gold': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    case 'gray': return 'bg-neutral-500/10 text-neutral-600 border-neutral-500/20';
    case 'black': return 'bg-neutral-900/10 text-neutral-700 border-neutral-900/20';
    default: return 'bg-primary/10 text-primary border-primary/20';
  }
};

const Projects: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Extract unique tech categories
  const categories = Array.from(
    new Set(projects.flatMap(p => p.technologies.map(t => t.name)))
  ).sort();
  
  const filteredProjects = activeCategory 
    ? projects.filter(p => p.technologies.some(t => t.name === activeCategory))
    : projects;
    
  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const cards = document.querySelectorAll('.project-card');
      
      cards.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const offset = index % 2 === 0 ? scrollY * 0.03 : scrollY * -0.03;
        cardElement.style.transform = `translateY(${offset}px)`;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent z-10"></div>
      
      {/* Decorative grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container px-4 md:px-6 relative z-20" ref={containerRef}>
        <div className="animate-reveal text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block transform hover:rotate-1 transition-transform duration-300">
            <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block backdrop-blur-sm border border-primary/10">
              MES CRÉATIONS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Projets Académiques
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Une sélection de projets sur lesquels j'ai travaillé pendant mon parcours académique,
            reflétant ma passion pour la création d'expériences numériques exceptionnelles.
          </p>
        </div>
        
        {/* Filter categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-reveal">
          <button 
            onClick={() => setActiveCategory(null)}
            className={cn(
              "px-4 py-2 text-sm rounded-full transition-all duration-300 backdrop-blur-sm border border-border/30 hover:border-primary/30",
              !activeCategory ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary text-foreground"
            )}
          >
            Tout
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category === activeCategory ? null : category)}
              className={cn(
                "px-4 py-2 text-sm rounded-full transition-all duration-300 backdrop-blur-sm border border-border/30 hover:border-primary/30",
                category === activeCategory ? "bg-primary/10 text-primary border-primary/20" : "bg-secondary text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProjects.slice(0, visibleCount).map((project, index) => {
            const Icon = project.icon || Box;
            const isHovered = hoveredCard === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={cn(
                    "project-card group backdrop-blur-sm bg-card/90 border border-border/40 transition-all duration-500 overflow-hidden h-full",
                    "hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]",
                    project.featured ? "ring-2 ring-primary/20 hover:ring-primary/30" : "hover:border-primary/20",
                    isHovered ? "transform scale-[1.02]" : ""
                  )}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Gradient top border */}
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium backdrop-blur-sm border border-primary/20">
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Card content */}
                  <CardContent className="p-6 relative flex flex-col h-full">
                    {/* Project header */}
                    <div className="flex items-start mb-4 gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-all duration-500",
                        "before:absolute before:inset-0 before:rounded-lg before:bg-primary/0 before:group-hover:bg-primary/5 before:scale-0 group-hover:before:scale-100 before:origin-bottom before:transition-all before:duration-500 overflow-hidden"
                      )}>
                        <Icon className="h-6 w-6 text-primary relative z-10 transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      
                      <h3 className="text-xl font-bold flex-1 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                        <div className="h-0.5 w-0 bg-primary/50 group-hover:w-full transition-all duration-700 mt-0.5"></div>
                      </h3>
                    </div>
                    
                    {/* Project description */}
                    <p className="text-muted-foreground mb-6 line-clamp-3">{project.description}</p>
                    
                    {/* Technology badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className={cn(
                            "px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300 border",
                            "hover:scale-105",
                            getColorClass(tech.color)
                          )}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                    
                    {/* Project stats */}
                    {project.stats && (
                      <div className="flex gap-3 mb-6 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          <span>{project.stats.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          <span>{project.stats.forks}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>{project.stats.views}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Links */}
                    <div className="flex space-x-4 mt-auto">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group/link"
                        >
                          <Github size={16} className="mr-1.5 transition-transform duration-300 group-hover/link:rotate-12" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a 
                          href={project.live} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group/link"
                        >
                          <ExternalLink size={16} className="mr-1.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:translate-y-[-2px]" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                    
                    {/* Background glow effect */}
                    <div className={cn(
                      "absolute -inset-2 bg-primary/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10",
                      isHovered ? "scale-100" : "scale-90"
                    )}></div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
        
        {/* Show more button */}
        {filteredProjects.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="group px-6 py-2.5 rounded-full bg-primary/5 hover:bg-primary/10 text-primary transition-all duration-300 flex items-center gap-2 border border-primary/10 hover:border-primary/20"
            >
              <span>Voir plus de projets</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>
      
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </section>
  );
};

export default Projects;
