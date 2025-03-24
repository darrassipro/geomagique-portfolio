
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    title: "Application Web de Gestion des Stages",
    description: "Conception d'une interface utilisateur attrayante et fonctionnelle.",
    technologies: ["Twig", "Doctrine", "Symfony CLI", "phpMyAdmin"],
  },
  {
    title: "Application Web pour Salons de Spa",
    description: "Développement d'un design axé sur l'expérience utilisateur.",
    technologies: ["Spring Boot", "Spring Security", "JPA Repository", "MySQL"],
  },
  {
    title: "Système d'Analyse de Matchs de Football",
    description: "Conception de l'interface pour la visualisation des statistiques de match.",
    technologies: ["Flask", "Python"],
  },
  {
    title: "Application Single Page pour Plateforme d'E-Learning",
    description: "Création d'un design moderne et responsive.",
    technologies: ["Angular", "Node.js", "Express", "MySQL"],
    github: "#",
  },
  {
    title: "Application BI avec Power BI",
    description: "Design d'interfaces pour une analyse de données efficace.",
    technologies: ["Talend", "Power BI"],
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
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="animate-reveal project-card group backdrop-blur-sm bg-background/50 border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary/80 to-primary/40 group-hover:w-full transition-all duration-700"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                  {project.title}
                  <span className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </span>
                </h3>
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
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Github size={16} className="mr-1" />
                      Code Source
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink size={16} className="mr-1" />
                      Voir le Projet
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-[1]"></div>
    </section>
  );
};

export default Projects;
