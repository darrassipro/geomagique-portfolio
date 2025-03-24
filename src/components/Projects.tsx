
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';

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
    <section id="projects" className="py-24">
      <div className="container px-4 md:px-6">
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
              className="animate-reveal project-card overflow-hidden border border-border/40 hover:border-border transition-all duration-300"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-medium bg-secondary rounded-full">
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
    </section>
  );
};

export default Projects;
