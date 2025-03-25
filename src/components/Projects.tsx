import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ExternalLink, Github, ArrowUpRight, Box, Layout, Server, Database, 
  Layers, Code, FileCode, FileJson, Globe, Shuffle, BarChart3, 
  Brush, Cpu, Package, Shield, Table, Zap, Brackets, Leaf, Coffee
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

// Meaningful decorative SVG patterns for project borders
const getBorderDecoration = (index: number) => {
  const patterns = [
    // Stage Management Project (index 0) - Database and University themed
    {
      topLeft: (
        <svg className="absolute -top-5 -left-5 w-16 h-16 text-primary/40 transform rotate-6">
          <rect x="6" y="2" width="8" height="5" rx="1" stroke="currentColor" fill="none" strokeWidth="1" />
          <rect x="6" y="9" width="8" height="5" rx="1" stroke="currentColor" fill="none" strokeWidth="1" />
          <line x1="10" y1="7" x2="10" y2="9" stroke="currentColor" strokeWidth="1" />
          <circle cx="10" cy="11.5" r="0.5" fill="currentColor" />
          <text x="7.5" y="5" fontSize="2" fontFamily="monospace" fill="currentColor">ID</text>
          <text x="7.5" y="12" fontSize="2" fontFamily="monospace" fill="currentColor">FK</text>
        </svg>
      ),
      topRight: (
        <svg className="absolute -top-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M8,2 L12,2 L12,4 L14,4 L14,5 L12,5 L12,7 L8,7 L8,5 L6,5 L6,4 L8,4 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="10" cy="10" r="2" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M8,11 L12,11 L12,13 L8,13 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M9,13 L9,14 L11,14 L11,13" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <text x="8.5" y="12.5" fontSize="1.5" fontFamily="monospace" fill="currentColor">UPF</text>
        </svg>
      ),
      bottomLeft: (
        <svg className="absolute -bottom-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M5,5 L7,7 L9,5 L11,7 L13,5" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="1 0.5" />
          <circle cx="5" cy="5" r="1" fill="currentColor" />
          <circle cx="9" cy="5" r="1" fill="currentColor" />
          <circle cx="13" cy="5" r="1" fill="currentColor" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="11" cy="7" r="1" fill="currentColor" />
          <text x="4" y="12" fontSize="2" fontFamily="monospace" fill="currentColor">Doctrine</text>
        </svg>
      ),
      bottomRight: (
        <svg className="absolute -bottom-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M2,8 C5,3 9,3 12,8" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M2,8 C5,13 9,13 12,8" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <line x1="7" y1="2" x2="7" y2="14" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 0.5" />
          <circle cx="7" cy="8" r="1.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.5" />
          <text x="5" y="8.5" fontSize="1.8" fontFamily="monospace" fill="currentColor">S</text>
        </svg>
      ),
    },
    
    // Spa Application (index 1) - Spa & Spring Boot themed
    {
      topLeft: (
        <svg className="absolute -top-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M6,8 C12,4 12,12 6,8 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M10,8 C16,4 16,12 10,8 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M6,8 C6,11 10,11 10,8" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="0.5 0.5" />
          <circle cx="8" cy="8" r="0.5" fill="currentColor" />
          <text x="5" y="14" fontSize="2" fontFamily="serif" fill="currentColor">Wellness</text>
        </svg>
      ),
      topRight: (
        <svg className="absolute -top-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M8,2 C3,5 13,9 8,12" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M5,7 C6,4 10,4 11,7" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M5,7 C6,10 10,10 11,7" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="8" cy="7" r="2" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <text x="7" y="7.5" fontSize="1.5" fontFamily="monospace" fill="currentColor">JPA</text>
        </svg>
      ),
      bottomLeft: (
        <svg className="absolute -bottom-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M10,3 C6,3 6,7 8,8 C10,9 10,13 6,13" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="10" cy="3" r="0.5" fill="currentColor" />
          <circle cx="6" cy="13" r="0.5" fill="currentColor" />
          <path d="M4,11 L12,5" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.5 0.5" />
          <text x="3" y="7" fontSize="2" fontFamily="serif" fill="currentColor">Spring</text>
        </svg>
      ),
      bottomRight: (
        <svg className="absolute -bottom-5 -right-5 w-16 h-16 text-primary/40">
          <rect x="5" y="5" width="8" height="6" rx="1" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <line x1="5" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="7" cy="6" r="0.5" fill="currentColor" />
          <path d="M6,9 L12,9" stroke="currentColor" strokeWidth="0.5" />
          <path d="M6,10 L10,10" stroke="currentColor" strokeWidth="0.5" />
          <text x="5" y="13" fontSize="1.8" fontFamily="monospace" fill="currentColor">MySQL</text>
        </svg>
      ),
    },
    
    // Pylône Électrique project (index 2) - Electrical towers & .NET themed
    {
      topLeft: (
        <svg className="absolute -top-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M8,2 L4,14" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M8,2 L12,14" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M5,8 L11,8" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M6,5 L10,5" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M6,11 L10,11" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="8" cy="2" r="1" fill="currentColor" fillOpacity="0.3" />
          <text x="3" y="16" fontSize="2" fontFamily="monospace" fill="currentColor">Pylône</text>
        </svg>
      ),
      topRight: (
        <svg className="absolute -top-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M3,8 L13,8" stroke="currentColor" strokeWidth="0.5" />
          <path d="M3,6 L13,6" stroke="currentColor" strokeWidth="0.5" />
          <path d="M3,10 L13,10" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="5" cy="6" r="0.8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="5" cy="8" r="0.8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="5" cy="10" r="0.8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="8" cy="6" r="0.8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="8" cy="8" r="0.8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="8" cy="10" r="0.8" fill="currentColor" fillOpacity="0.3" />
          <text x="4" y="14" fontSize="2" fontFamily="monospace" fill="currentColor">C#.NET</text>
        </svg>
      ),
      bottomLeft: (
        <svg className="absolute -bottom-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M4,4 L12,4 L12,12 L4,12 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M6,6 L10,6 L10,10 L6,10 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M4,4 L6,6" stroke="currentColor" strokeWidth="0.5" />
          <path d="M12,4 L10,6" stroke="currentColor" strokeWidth="0.5" />
          <path d="M4,12 L6,10" stroke="currentColor" strokeWidth="0.5" />
          <path d="M12,12 L10,10" stroke="currentColor" strokeWidth="0.5" />
          <text x="3" y="15" fontSize="1.6" fontFamily="monospace" fill="currentColor">Entity</text>
        </svg>
      ),
      bottomRight: (
        <svg className="absolute -bottom-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M3,8 L8,3 L13,8 L8,13 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M5,8 L8,5 L11,8 L8,11 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M3,8 L5,8" stroke="currentColor" strokeWidth="0.5" />
          <path d="M8,3 L8,5" stroke="currentColor" strokeWidth="0.5" />
          <path d="M13,8 L11,8" stroke="currentColor" strokeWidth="0.5" />
          <path d="M8,13 L8,11" stroke="currentColor" strokeWidth="0.5" />
          <text x="6" y="8.5" fontSize="1.5" fontFamily="monospace" fill="currentColor">EF</text>
        </svg>
      ),
    },
    
    // TeethSeg Frontend project (index 3) - Teeth & React/UI themed
    {
      topLeft: (
        <svg className="absolute -top-5 -left-5 w-16 h-16 text-primary/40">
          <circle cx="8" cy="8" r="3" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="8" cy="8" r="6" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="0.5 0.5" />
          <circle cx="8" cy="8" r="1" fill="currentColor" fillOpacity="0.3" />
          <path d="M5,8 C5,9.7 6.3,11 8,11 C9.7,11 11,9.7 11,8" stroke="currentColor" strokeWidth="0.3" strokeDasharray="0.5 0.3" />
          <text x="5.5" y="15" fontSize="2" fontFamily="monospace" fill="currentColor">React</text>
        </svg>
      ),
      topRight: (
        <svg className="absolute -top-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M4,7 L8,3 L12,7" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M4,8 L8,12 L12,8" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M8,3 L8,12" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 0.5" />
          <text x="4" y="15" fontSize="1.8" fontFamily="monospace" fill="currentColor">TeethSeg</text>
        </svg>
      ),
      bottomLeft: (
        <svg className="absolute -bottom-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M7,4 C4,4 4,8 4,8 C4,12 7,12 7,12" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M9,4 C12,4 12,8 12,8 C12,12 9,12 9,12" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M7,8 L9,8" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="7" cy="8" r="0.5" fill="currentColor" />
          <circle cx="9" cy="8" r="0.5" fill="currentColor" />
          <text x="4" y="15" fontSize="1.8" fontFamily="monospace" fill="currentColor">TailwindCSS</text>
        </svg>
      ),
      bottomRight: (
        <svg className="absolute -bottom-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M5,4 C3,7 3,9 5,12" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M7,4 C9,7 9,9 7,12" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M9,4 C11,7 11,9 9,12" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <line x1="4" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="0.3" />
          <line x1="4" y1="8" x2="10" y2="8" stroke="currentColor" strokeWidth="0.3" />
          <line x1="4" y1="10" x2="10" y2="10" stroke="currentColor" strokeWidth="0.3" />
          <text x="6" y="15" fontSize="1.8" fontFamily="monospace" fill="currentColor">Vite</text>
        </svg>
      ),
    },
    
    // BI Application project (index 4) - Data visualization themed
    {
      topLeft: (
        <svg className="absolute -top-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M5,12 L5,5 L8,8 L11,4" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="5" cy="5" r="0.8" fill="currentColor" />
          <circle cx="8" cy="8" r="0.8" fill="currentColor" />
          <circle cx="11" cy="4" r="0.8" fill="currentColor" />
          <rect x="4" y="12" width="8" height="0.5" stroke="currentColor" fill="currentColor" />
          <text x="3" y="15" fontSize="2" fontFamily="monospace" fill="currentColor">Talend</text>
        </svg>
      ),
      topRight: (
        <svg className="absolute -top-5 -right-5 w-16 h-16 text-primary/40">
          <rect x="4" y="4" width="8" height="8" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M4,8 L12,8" stroke="currentColor" strokeWidth="0.5" />
          <path d="M8,4 L8,12" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="6" cy="6" r="1" fill="currentColor" fillOpacity="0.3" />
          <circle cx="10" cy="6" r="1.5" fill="currentColor" fillOpacity="0.3" />
          <circle cx="6" cy="10" r="0.8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="10" cy="10" r="1.2" fill="currentColor" fillOpacity="0.3" />
          <text x="3" y="15" fontSize="2" fontFamily="monospace" fill="currentColor">Power BI</text>
        </svg>
      ),
      bottomLeft: (
        <svg className="absolute -bottom-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M3,8 L5,6 L7,9 L9,5 L11,7 L13,4" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="5" cy="6" r="0.5" fill="currentColor" />
          <circle cx="7" cy="9" r="0.5" fill="currentColor" />
          <circle cx="9" cy="5" r="0.5" fill="currentColor" />
          <circle cx="11" cy="7" r="0.5" fill="currentColor" />
          <circle cx="13" cy="4" r="0.5" fill="currentColor" />
          <text x="5" y="13" fontSize="1.8" fontFamily="monospace" fill="currentColor">ETL</text>
        </svg>
      ),
      bottomRight: (
        <svg className="absolute -bottom-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M4,12 C4,6 12,12 12,6" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="4" cy="12" r="0.8" fill="currentColor" fillOpacity="0.3" />
          <circle cx="12" cy="6" r="0.8" fill="currentColor" fillOpacity="0.3" />
          <path d="M4,9 C4,6 12,9 12,6" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="0.5 0.5" />
          <text x="2" y="15" fontSize="1.8" fontFamily="monospace" fill="currentColor">Analytics</text>
        </svg>
      ),
    },
    
    // Barbershop project (index 5) - Barbershop themed
    {
      topLeft: (
        <svg className="absolute -top-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M4,12 C4,6 8,4 12,6" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M4,10 C4,5 8,3 12,5" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M4,8 C4,4 8,2 12,4" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="8" cy="8" r="2" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <text x="3" y="15" fontSize="1.8" fontFamily="monospace" fill="currentColor">MongoDB</text>
        </svg>
      ),
      topRight: (
        <svg className="absolute -top-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M5,8 L11,8 M5,12 L11,12" stroke="currentColor" strokeWidth="0.5" />
          <path d="M5,8 L5,12 M11,8 L11,12" stroke="currentColor" strokeWidth="0.5" />
          <path d="M5,8 C5,5 11,5 11,8" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M6,6 L10,6" stroke="currentColor" strokeWidth="0.3" />
          <path d="M7,4 L9,4" stroke="currentColor" strokeWidth="0.3" />
          <text x="4" y="15" fontSize="1.8" fontFamily="monospace" fill="currentColor">Barber</text>
        </svg>
      ),
      bottomLeft: (
        <svg className="absolute -bottom-5 -left-5 w-16 h-16 text-primary/40">
          <path d="M5,4 L5,12 L12,12" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M7,6 L7,10 L10,10" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <path d="M9,8 L9,9 L10,9" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <text x="5" y="15" fontSize="1.8" fontFamily="monospace" fill="currentColor">React</text>
        </svg>
      ),
      bottomRight: (
        <svg className="absolute -bottom-5 -right-5 w-16 h-16 text-primary/40">
          <path d="M4,9 L7,6 L10,9 L7,12 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
          <circle cx="7" cy="9" r="2" stroke="currentColor" fill="none" strokeWidth="0.5" strokeDasharray="0.5 0.5" />
          <path d="M7,4 L7,6" stroke="currentColor" strokeWidth="0.3" />
          <path d="M12,9 L10,9" stroke="currentColor" strokeWidth="0.3" />
          <path d="M7,14 L7,12" stroke="currentColor" strokeWidth="0.3" />
          <path d="M2,9 L4,9" stroke="currentColor" strokeWidth="0.3" />
          <text x="4" y="16" fontSize="1.8" fontFamily="monospace" fill="currentColor">Node.js</text>
        </svg>
      ),
    },
  ];
  
  return patterns[index % patterns.length];
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
            const decorations = getBorderDecoration(index);
            // Determine the target URL (live site or GitHub)
            const targetUrl = project.live || project.github || "#";
            
            return (
              <div key={index} className="relative animate-reveal" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Decorative border elements */}
                {decorations.topLeft}
                {decorations.topRight}
                {decorations.bottomLeft}
                {decorations.bottomRight}
                
                <Card 
                  className="project-card group backdrop-blur-sm bg-background/50 border border-border/40 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_0_25px_rgba(0,0,0,0.06)] overflow-hidden"
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
                      {/* Make the arrow icon clickable and navigate to the appropriate URL */}
                      <a 
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 rounded-full flex items-center justify-center bg-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:bg-primary/20"
                        aria-label={`Voir ${project.title}`}
                      >
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      </a>
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
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group/link">
                          <Github size={16} className="mr-1.5 transition-transform duration-300 group-hover/link:scale-110" />
                          Code Source
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group/link">
                          <ExternalLink size={16} className="mr-1.5 transition-transform duration-300 group-hover/link:scale-110" />
                          Voir le Projet
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
       
        
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-[1]"></div>
    </section>
  );
};

export default Projects;
