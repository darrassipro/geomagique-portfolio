
import React, { useState, useRef, useEffect } from 'react';
import { 
  Calendar, Code, MoveRight, Github, Globe2 as Globe, 
  Filter, Monitor, ArrowUpRight, X, RotateCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Project data
const projectsData = [
  {
    title: "DutyEng - Assistant AI Autonome",
    description: "Interface utilisateur élégante pour agent IA autonome avec terminal, éditeur de code, navigateur et chat intégrés.",
    categories: ["UI/UX", "Frontend"],
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    date: "2023",
    liveUrl: "http://dutyeng.vercel.app",
    repoUrl: null,
    image: "https://i.imgur.com/JKcKqWm.png"
  },
  {
    title: "MarketSpace - Plateforme E-Commerce",
    description: "Application e-commerce complète avec navigation par catégories, panier d'achat et système de recommandation.",
    categories: ["UI/UX", "Frontend", "E-commerce"],
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    date: "2023",
    liveUrl: "https://marketspace-gilt.vercel.app",
    repoUrl: null,
    image: "https://i.imgur.com/irbYBP3.png"
  },
  {
    title: "VSP - Plateforme de Streaming Vidéo",
    description: "Plateforme full-stack de streaming vidéo avec lecture vidéo et recommandations personnalisées.",
    categories: ["Full Stack", "UI/UX", "Multimédia"],
    technologies: ["Angular 19", "Tailwind CSS", "Node.js", "Express", "MySQL"],
    date: "2023",
    liveUrl: "http://vspfront.vercel.app",
    repoUrl: null,
    image: "https://i.imgur.com/XoMy9ik.png"
  },
  {
    title: "FlowVentory - Gestion d'Inventaire",
    description: "Application de gestion d'inventaire avec tableaux de bord analytiques et interface moderne.",
    categories: ["UI/UX", "Frontend", "Dashboard"],
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    date: "2023",
    liveUrl: "https://flowventory-gateway.vercel.app/",
    repoUrl: null,
    image: "https://i.imgur.com/VcZ1xMF.png"
  },
  {
    title: "Dragon Ball Z - Expérience Interactive",
    description: "Site web interactif avec carousel, épisodes, et lecteur vidéo personnalisé sur le thème DBZ.",
    categories: ["UI/UX", "Frontend", "Multimédia"],
    technologies: ["Angular 19", "Tailwind CSS", "Font Awesome"],
    date: "2022",
    liveUrl: "https://dragon-ball-z-lilac.vercel.app/",
    repoUrl: null,
    image: "https://i.imgur.com/eWAqG2g.png"
  },
  {
    title: "SMedia - Gestion Marketing Digital",
    description: "Interface utilisateur pour la gestion de campagnes marketing digitales et l'analyse de données.",
    categories: ["UI/UX", "Frontend", "Dashboard"],
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    date: "2022",
    liveUrl: "http://smedia-omega.vercel.app",
    repoUrl: null,
    image: "https://i.imgur.com/yPpQIJA.png"
  },
  {
    title: "SkipSilenceAds - Extension YouTube",
    description: "Outils pour supprimer les publicités des vidéos YouTube et ignorer les silences automatiquement.",
    categories: ["UI/UX", "Frontend", "Multimédia"],
    technologies: ["Angular 19", "Tailwind CSS", "Font Awesome"],
    date: "2022",
    liveUrl: "https://skipsilenceads.vercel.app/",
    repoUrl: null,
    image: "https://i.imgur.com/lXnbGXh.png"
  },
  {
    title: "KingsLeaque - Actualités TV",
    description: "Lecteur TV et site d'actualités avec interface moderne et expérience utilisateur immersive.",
    categories: ["UI/UX", "Frontend", "Multimédia"],
    technologies: ["Angular", "Tailwind CSS", "Font Awesome"],
    date: "2021",
    liveUrl: "https://kingsleaque.vercel.app",
    repoUrl: null,
    image: "https://i.imgur.com/QXyNUmQ.png"
  },
  {
    title: "SightSpace - Site Entreprise",
    description: "Site d'entreprise avec présentation des produits, services et équipe dans un design élégant.",
    categories: ["UI/UX", "Frontend", "Corporate"],
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    date: "2021",
    liveUrl: "http://sightspace.vercel.app",
    repoUrl: null,
    image: "https://i.imgur.com/33gBnAW.png"
  },
  {
    title: "CocoPark Hub - Portail RH & Marketing",
    description: "Portail intégré pour RH, marketing et communication d'entreprise avec design moderne.",
    categories: ["UI/UX", "Frontend", "Corporate", "Dashboard"],
    technologies: ["React", "Tailwind CSS", "shadcn/ui"],
    date: "2021",
    liveUrl: "http://cocopark-hub.vercel.app",
    repoUrl: null,
    image: "https://i.imgur.com/cGqHQmH.png"
  }
];

// Academic project data
const academicProjectsData = [
  {
    title: "Application Web de Gestion des Stages",
    description: "Projet Symfony pour l'Université privée de Fès facilitant la gestion des stages étudiants et des entreprises partenaires.",
    technologies: ["Symfony", "Twig", "Doctrine", "Symfony CLI", "phpMyAdmin"],
    date: "2023",
    repoUrl: "https://github.com/darrassi1/GestionDesStGES",
    image: "https://i.imgur.com/NkKkSzr.png"
  },
  {
    title: "Application Web pour Salons de Spa",
    description: "Application Maven avec Thymeleaf et Spring JPA pour la gestion complète de salons de spa et réservations.",
    technologies: ["Spring Boot", "Spring Security", "JPA Repository", "MySQL"],
    date: "2023",
    repoUrl: "https://github.com/darrassi1/Gestion_SPA",
    image: "https://i.imgur.com/9DpLQWD.png"
  },
  {
    title: "Gestion de Pylône Électrique",
    description: "Application C# pour la gestion de pylônes électriques utilisant Entity Framework 6 et approche Code First.",
    technologies: ["C#", "Entity Framework 6", "Code First", ".NET"],
    date: "2022",
    repoUrl: "https://github.com/darrassi1/GestionDePyloneElectrique",
    image: "https://i.imgur.com/rIkB1s5.png"
  },
  {
    title: "TeethSeg Frontend",
    description: "Interface utilisateur pour système de segmentation dentaire avec visualisation interactive des résultats.",
    technologies: ["React", "Vite", "TailwindCSS", "Vercel"],
    date: "2022",
    repoUrl: "https://github.com/darrassi1/SegTeeth",
    image: "https://i.imgur.com/Nfj9uQ3.png"
  },
  {
    title: "Application BI avec Talend et Power BI",
    description: "Solution BI complète pour l'analyse de données avec visualisations avancées et traitement ETL.",
    technologies: ["Talend", "Power BI", "ETL", "Data Visualization"],
    date: "2022",
    repoUrl: "https://github.com/darrassi1/Projet-BI-Talend-PowerBI",
    image: "https://i.imgur.com/Nfj9uQ3.png"
  },
  {
    title: "Barbershop Application",
    description: "Application complète de barbershop avec frontend React et backend Node.js/Express pour la gestion de rendez-vous.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    date: "2021",
    repoUrl: "https://github.com/darrassi1/Barbershop",
    liveUrl: "https://barbershop-pearl-seven.vercel.app",
    image: "https://i.imgur.com/ZsDFGKt.png"
  }
];

// Professional experience data
const experienceData = [
  {
    title: "Web Designer & Développeur UI/UX",
    company: "Freelance",
    location: "Fès, Maroc",
    period: "2023 - Présent",
    description: "Conception et développement d'interfaces utilisateur modernes et intuitives pour diverses applications web et mobiles. Spécialisation dans la création d'expériences utilisateur exceptionnelles et accessibles.",
    responsibilities: [
      "Création de maquettes et prototypes interactifs avec Figma",
      "Développement frontend avec React, Angular et TailwindCSS",
      "Optimisation de l'expérience utilisateur et de l'accessibilité",
      "Collaboration avec des équipes de développement backend"
    ]
  },
  {
    title: "Stage en Développement Web",
    company: "Université Privée de Fès",
    location: "Fès, Maroc",
    period: "2023",
    description: "Développement d'une application web complète pour la gestion des stages et l'organisation des soutenances pour l'université.",
    responsibilities: [
      "Développement full-stack avec Symfony et JavaScript",
      "Mise en place d'une base de données MySQL normalisée",
      "Implémentation d'un système d'authentification sécurisé",
      "Documentation technique complète du projet"
    ]
  },
  {
    title: "Stage en Développement BI",
    company: "Data Consult",
    location: "Fès, Maroc",
    period: "2022",
    description: "Conception et mise en œuvre d'une solution BI complète pour l'analyse des ventes et le reporting commercial.",
    responsibilities: [
      "Création de workflows ETL avec Talend",
      "Développement de tableaux de bord interactifs avec Power BI",
      "Modélisation dimensionnelle de données",
      "Automatisation de rapports périodiques"
    ]
  }
];

// Categories for filtering
const allCategories = ["Tous", ...new Set(projectsData.flatMap(project => project.categories))];

// Technology image mapping function
const getTechIcon = (tech) => {
  switch (tech.toLowerCase()) {
    case 'react':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg';
    case 'angular':
    case 'angular 19':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg';
    case 'tailwind css':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg';
    case 'node.js':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg';
    case 'express':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg';
    case 'mysql':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg';
    case 'mongodb':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg';
    case 'c#':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg';
    case '.net':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg';
    case 'symfony':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg';
    case 'spring boot':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg';
    case 'power bi':
      return 'https://i.imgur.com/wa1TKFM.png';
    case 'talend':
      return 'https://i.imgur.com/Qp2F6Pf.png';
    default:
      return 'https://i.imgur.com/wt0QcZF.png'; // Default tech icon
  }
};

// Project card component
const ProjectCard = ({ project, isAcademic = false }) => {
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={cardRef} 
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-500 ease-out",
        "bg-card border border-border/40 shadow-sm hover:shadow-md",
        "opacity-0 translate-y-8 h-full"
      )}
    >
      {/* Project image with overlay */}
      <div className="relative overflow-hidden h-48 w-full">
        <img 
          ref={imageRef}
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/0"></div>
        
        {/* Tech badges */}
        <div className="absolute top-0 left-0 w-full p-4 flex flex-wrap gap-2 justify-end">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <div 
              key={idx} 
              className="size-7 rounded-full bg-background/70 backdrop-blur-sm p-1.5 border border-border/30 transition-transform hover:scale-110"
              title={tech}
            >
              <img 
                src={getTechIcon(tech)} 
                alt={tech} 
                className="size-full object-contain"
              />
            </div>
          ))}
          {project.technologies.length > 3 && (
            <div className="size-7 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center border border-border/30 text-xs font-medium text-muted-foreground">
              +{project.technologies.length - 3}
            </div>
          )}
        </div>
      </div>
      
      {/* Project info */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold leading-tight text-lg">{project.title}</h3>
          <div className="text-xs font-medium bg-primary/10 px-2 py-0.5 rounded-full text-primary flex items-center">
            <Calendar className="size-3 mr-1" />
            {project.date}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        
        {!isAcademic && project.categories && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.categories.map((category, idx) => (
              <span 
                key={idx} 
                className="text-xs px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        
        <div className="pt-2 flex items-center justify-between mt-auto">
          <div className="flex space-x-3">
            {project.repoUrl && (
              <a 
                href={project.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="size-4" />
                <span>Repo</span>
              </a>
            )}
            
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe className="size-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
          
          <span className="text-primary size-6 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
    </div>
  );
};

// Experience item component
const ExperienceItem = ({ experience, isLast }) => {
  const itemRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={itemRef} className="opacity-0 translate-y-8 transition-all duration-500 ease-out">
      <div className="flex">
        <div className="flex flex-col items-center mr-4">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          {!isLast && <div className="w-0.5 h-full bg-border/60 mt-2"></div>}
        </div>
        
        <div className={cn(
          "mb-8 bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border/40 shadow-sm",
          "hover:border-primary/30 hover:shadow-md transition-all duration-300 ease-out relative",
          "hover:translate-x-0.5 hover:translate-y-[-2px]"
        )}>
          <div className="flex justify-between items-start flex-wrap mb-2">
            <h3 className="font-semibold text-lg">{experience.title}</h3>
            <div className="text-xs font-medium bg-primary/10 px-2 py-0.5 rounded-full text-primary">
              {experience.period}
            </div>
          </div>
          
          <div className="flex items-center mb-3 text-sm">
            <span className="text-foreground/90 font-medium">{experience.company}</span>
            <span className="mx-2 text-foreground/30">•</span>
            <span className="text-muted-foreground flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {experience.location}
            </span>
          </div>
          
          <p className="text-muted-foreground mb-4 text-sm">
            {experience.description}
          </p>
          
          <div className="space-y-1.5">
            {experience.responsibilities.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="h-4 w-4 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center mt-0.5 mr-2">
                  <div className="h-1 w-1 rounded-full bg-primary"></div>
                </div>
                <p className="text-xs text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [isFiltering, setIsFiltering] = useState(false);
  const projectsContainerRef = useRef(null);
  const filterContainerRef = useRef(null);
  const categoriesRef = useRef(null);
  
  // Filter projects when category changes
  useEffect(() => {
    setIsFiltering(true);
    
    // Use a short timeout to allow for a visual transition
    const timer = setTimeout(() => {
      if (selectedCategory === 'Tous') {
        setFilteredProjects(projectsData);
      } else {
        setFilteredProjects(
          projectsData.filter(project => project.categories.includes(selectedCategory))
        );
      }
      setIsFiltering(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategory]);
  
  // Handle filter change without scrolling
  const handleCategoryChange = (category) => {
    // Store current scroll position
    const scrollPosition = window.scrollY;
    
    // Change the category
    setSelectedCategory(category);
    
    // Restore scroll position after state update
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'auto'
      });
    }, 0);
  };
  
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary/5 to-primary/0 blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-primary/5 to-primary/0 blur-3xl"></div>
      </div>
      
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent z-10"></div>
      
      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 animate-reveal">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium tracking-wider bg-primary/10 rounded-full mb-4 inline-block backdrop-blur-sm border border-primary/20">
              <span className="text-primary mr-1.5 animate-pulse">•</span>
              EXPÉRIENCE
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Parcours professionnel & 
            <span className="text-primary inline-block relative">
              projets<span className="absolute -top-1 -right-1 w-2 h-2 bg-primary/30 rounded-full animate-ping"></span>
            </span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Découvrez mon expérience professionnelle et les projets que j'ai réalisés, combinant design intuitif et développement technique.
          </p>
        </div>
        
        {/* Experience Timeline */}
        <div className="mb-20 max-w-3xl mx-auto animate-reveal" style={{ animationDelay: '100ms' }}>
          <div className="inline-block mb-8">
            <h3 className="text-xl font-semibold flex items-center px-4">
              <Monitor className="h-5 w-5 text-primary mr-2" />
              Expérience Professionnelle
            </h3>
          </div>
          
          <div className="pl-4">
            {experienceData.map((experience, index) => (
              <ExperienceItem 
                key={index} 
                experience={experience} 
                isLast={index === experienceData.length - 1}
              />
            ))}
          </div>
        </div>
        
        {/* Academic Projects */}
        <div className="mb-20 animate-reveal" style={{ animationDelay: '200ms' }}>
          <div className="inline-block mb-8">
            <h3 className="text-xl font-semibold flex items-center px-4">
              <Code className="h-5 w-5 text-primary mr-2" />
              Projets Académiques
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {academicProjectsData.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project}
                isAcademic={true}
              />
            ))}
          </div>
        </div>
        
        {/* Personal Projects */}
        <div className="animate-reveal" style={{ animationDelay: '300ms' }}>
          <div className="inline-block mb-8">
            <h3 className="text-xl font-semibold flex items-center px-4">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              Projets Personnels
            </h3>
          </div>
          
          {/* Categories filter */}
          <div 
            ref={filterContainerRef} 
            className="mb-6 flex items-center space-x-2 px-4 overflow-x-auto scrollbar-none pb-2"
          >
            <Filter className="h-4 w-4 text-primary mr-1" />
            
            <div ref={categoriesRef} className="flex space-x-2">
              {allCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "px-3 py-1.5 text-xs rounded-full border transition-all whitespace-nowrap",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/30"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {isFiltering && (
              <div className="flex items-center text-muted-foreground text-xs">
                <RotateCw className="h-3 w-3 animate-spin mr-2" />
                Filtrage...
              </div>
            )}
          </div>
          
          {/* Projects grid */}
          <div 
            ref={projectsContainerRef}
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity",
              isFiltering ? "opacity-60" : "opacity-100"
            )}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={project}
              />
            ))}
            
            {filteredProjects.length === 0 && !isFiltering && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
                <X className="h-10 w-10 mb-3 opacity-50" />
                <p>Aucun projet ne correspond à cette catégorie.</p>
                <button
                  onClick={() => handleCategoryChange('Tous')}
                  className="mt-4 flex items-center text-primary text-sm hover:underline"
                >
                  <RotateCw className="h-3 w-3 mr-2" />
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Experience;
