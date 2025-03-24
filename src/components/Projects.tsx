
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github, ArrowUpRight, Box, Layout, Server, Database, Layers } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  icon?: React.ElementType;
}

const projects: Project[] = [
  {
    title: "Application Web de Gestion des Stages",
    description: "Conception d'une interface utilisateur attrayante et fonctionnelle.",
    technologies: ["Twig", "Doctrine", "Symfony CLI", "phpMyAdmin"],
    icon: Database
  },
  {
    title: "Application Web pour Salons de Spa",
    description: "Développement d'un design axé sur l'expérience utilisateur.",
    technologies: ["Spring Boot", "Spring Security", "JPA Repository", "MySQL"],
    icon: Layout
  },
  {
    title: "Système d'Analyse de Matchs de Football",
    description: "Conception de l'interface pour la visualisation des statistiques de match.",
    technologies: ["Flask", "Python"],
    icon: Box
  },
  {
    title: "Application Single Page pour Plateforme d'E-Learning",
    description: "Création d'un design moderne et responsive.",
    technologies: ["Angular", "Node.js", "Express", "MySQL"],
    github: "#",
    icon: Layers
  },
  {
    title: "Application BI avec Power BI",
    description: "Design d'interfaces pour une analyse de données efficace.",
    technologies: ["Talend", "Power BI"],
    icon: Server
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
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium bg-secondary/50 backdrop-blur-sm rounded-full transition-colors duration-300 hover:bg-secondary">
                        {tech}
                      </span>
                    ))}
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
