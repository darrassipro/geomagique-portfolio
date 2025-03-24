
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Digital Experience Platform',
    description: 'A comprehensive platform designed to enhance customer engagement through intuitive interfaces and seamless interactions.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['UX Design', 'React', 'Node.js'],
    link: '#',
  },
  {
    id: 2,
    title: 'Financial Analytics Dashboard',
    description: 'An intuitive dashboard that visualizes complex financial data through elegant charts and actionable insights.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Data Visualization', 'Vue.js', 'D3.js'],
    link: '#',
  },
  {
    id: 3,
    title: 'E-commerce Mobile App',
    description: 'A minimalist yet powerful mobile shopping experience focused on simplicity and conversion optimization.',
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Mobile Design', 'React Native', 'Firebase'],
    link: '#',
  },
  {
    id: 4,
    title: 'Content Management System',
    description: 'A flexible CMS built for creators that simplifies content publishing while offering powerful customization options.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Systems Design', 'TypeScript', 'GraphQL'],
    link: '#',
  }
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="animate-reveal mb-12 md:mb-16">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block">
              MY WORK
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A selection of my recent work that demonstrates my approach to design and development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="animate-reveal project-card overflow-hidden group"
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-4 right-4">
                    <a 
                      href={project.link} 
                      className="bg-white/90 text-black h-10 w-10 rounded-full flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} project`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={`${project.id}-${tag}`} 
                      className="inline-block px-3 py-1 text-xs font-medium bg-primary/5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
