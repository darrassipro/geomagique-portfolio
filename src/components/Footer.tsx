import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUp, Clock, User, RefreshCw, Code,
  Mail, Phone, MapPin, ArrowRight, Sparkles,
  Braces, Globe2, Command, Copy, Check, Scan, Shield,
  Zap, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Define types for social links
type SocialIconProps = {
  className?: string;
};

type SocialLink = {
  label: string;
  url: string;
  icon: React.ComponentType<SocialIconProps>;
  color: string;
};

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [visibleSection, setVisibleSection] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [encryptionStatus, setEncryptionStatus] = useState('secure');
  
  const footerRef = useRef<HTMLElement>(null);
  const systemTime = "2025-03-25 04:56:40"; // Updated with provided time
  const systemUser = "darrassipro";
  
  // Random values for visual elements
  const responseTime = `${Math.floor(Math.random() * 40 + 15)}ms`;
  const systemVersion = "1.7.0";
  
  // Navigation items with metadata
  const navigationItems = [
    { href: "#hero", label: "Accueil", icon: <ArrowUp className="h-3 w-3" />, section: "hero" },
    { href: "#projects", label: "Projets", icon: <Code className="h-3 w-3" />, section: "projects" },
    { href: "#about", label: "À Propos", icon: <User className="h-3 w-3" />, section: "about" },
    { href: "#experience", label: "Expérience", icon: <Braces className="h-3 w-3" />, section: "experience" },
    { href: "#contact", label: "Contact", icon: <Mail className="h-3 w-3" />, section: "contact" }
  ];
  
  // Contact data
  const contactInfo = [
    { label: "Email", value: "younes.darrassi@usmba.ac.ma", icon: <Mail className="h-3.5 w-3.5" />, copyable: true },
    { label: "Téléphone", value: "+212 629 419 616", icon: <Phone className="h-3.5 w-3.5" />, copyable: true },
    { label: "Localisation", value: "Fès, Maroc", icon: <MapPin className="h-3.5 w-3.5" />, copyable: false }
  ];
  
  // Define SVG components separately
  const LinkedInIcon: React.FC<SocialIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
  
  const GitHubIcon: React.FC<SocialIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
  
  const DribbbleIcon: React.FC<SocialIconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/>
    </svg>
  );
  
  // Social links with properly typed icon components
  const socialLinks: SocialLink[] = [
    { 
      label: "LinkedIn", 
      url: "#",
      icon: LinkedInIcon,
      color: "#0077B5"
    },
    { 
      label: "GitHub", 
      url: "#",
      icon: GitHubIcon,
      color: "#333"
    },
    { 
      label: "Dribbble", 
      url: "#",
      icon: DribbbleIcon,
      color: "#ea4c89"
    }
  ];
  
  // Determine which section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) setVisibleSection(id);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    
    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);
  
  // Set current year
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Handle copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };
  
  return (
    <footer 
      ref={footerRef}
      className="relative pt-12 pb-8 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background -z-10">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute -bottom-10 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl opacity-50 pointer-events-none"></div>
      </div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main content */}
          <div className="md:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight">
                  YOUNES DARRASSI
                </h3>
                <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] text-primary/90 font-medium hidden sm:block">
                  v{systemVersion}
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm md:max-w-xs">
                Web Designer passionné par la création d'expériences numériques intuitives et attrayantes.
              </p>
              
              {/* System status indicator */}
              <div className="mt-6 inline-flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-border/40 rounded-lg p-1.5 px-3 text-xs font-mono text-muted-foreground/70">
                <div className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full mr-1.5 bg-green-500 animate-pulse"></span>
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="mr-1">{systemTime}</span>
                </div>
                <span className="hidden md:inline-block text-muted-foreground/30">|</span>
                <div className="hidden md:flex items-center">
                  <User className="h-3 w-3 mr-1.5" />
                  <span>{systemUser}</span>
                </div>
                <span className="hidden md:inline-block text-muted-foreground/30">|</span>
                <div className="hidden md:flex items-center">
                  <Scan className="h-3 w-3 mr-1.5" />
                  <span>{encryptionStatus}</span>
                </div>
                <span className="hidden md:inline-block text-muted-foreground/30">|</span>
                <div className="hidden md:flex items-center">
                  <RefreshCw className="h-3 w-3 mr-1.5" />
                  <span>{responseTime}</span>
                </div>
              </div>
            </div>
            
            {/* Social links */}
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Réseaux Sociaux</h4>
                <div className="h-px flex-1 mx-3 bg-border"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map((social, idx) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={idx}
                      href={social.url}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-lg",
                        "hover:bg-primary/5 transition-all group",
                        "border border-border/30 bg-background/50 backdrop-blur-sm"
                      )}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-background/80 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Navigation section */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center">
              <Command className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
              Navigation
            </h4>
            
            <nav>
              <ul className="space-y-1">
                {navigationItems.map((item, idx) => (
                  <li key={idx} className="group">
                    <a 
                      href={item.href}
                      className={cn(
                        "flex items-center py-1.5 text-sm relative group",
                        visibleSection === item.section ? "text-primary" : "text-muted-foreground",
                        "hover:text-foreground transition-colors"
                      )}
                      onMouseEnter={() => setHoveredLink(item.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      <span className={cn(
                        "absolute left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300",
                        visibleSection === item.section ? "w-5" : "w-0"
                      )}></span>
                      
                      <span className="flex items-center">
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {item.icon}
                        </span>
                        <span className={cn(
                          "ml-1.5 transition-all",
                          hoveredLink === item.href ? "ml-3" : ""
                        )}>
                          {item.label}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Security status - matching Contact component style */}
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="px-3 py-2 bg-background/60 backdrop-blur-sm rounded-lg border border-border/30">
                <div className="flex items-center text-xs mb-2">
                  <Lock className="h-3 w-3 text-primary mr-1.5" />
                  <span className="font-medium">Sécurité</span>
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    <span>TLS 1.3</span>
                  </span>
                  <span className="flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    <span>Ping: {Math.floor(Math.random() * 10) + 15}ms</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact section */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-primary/70" />
              Contact
            </h4>
            
            <ul className="space-y-3">
              {contactInfo.map((info, idx) => (
                <li 
                  key={idx} 
                  className={cn(
                    "flex items-center justify-between py-2 px-3 rounded-lg group",
                    "hover:bg-primary/5 transition-all",
                    "border border-border/30 bg-background/50 backdrop-blur-sm"
                  )}
                >
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center mr-3 bg-primary/10">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-0.5">{info.label}</p>
                      <p className="text-muted-foreground text-xs">{info.value}</p>
                    </div>
                  </div>
                  
                  {info.copyable && (
                    <button 
                      onClick={() => handleCopy(info.value)}
                      className="h-6 w-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80"
                      aria-label={`Copier ${info.label}`}
                    >
                      {copiedText === info.value ? (
                        <Check className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Newsletter/Contact button */}
            <div className="mt-6">
              <a 
                href="#contact"
                className={cn(
                  "flex items-center justify-between py-3 px-4 rounded-lg w-full",
                  "bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20",
                  "group relative overflow-hidden"
                )}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-primary mr-3" />
                  <span className="text-sm font-medium">Me contacter</span>
                </div>
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer bottom bar */}
        <div className="border-t border-border/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-muted-foreground flex items-center">
            <span className="mr-2">&copy; {currentYear} Younes Darrassi</span>
            <span className="hidden md:inline-block">•</span>
            <span className="hidden md:block ml-2">Tous droits réservés</span>
            
            <div className="ml-3 h-4 pl-3 hidden sm:block border-l border-border/50">
              <span className="font-mono text-[10px] text-muted-foreground/60 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{systemTime}</span>
              </span>
            </div>
          </div>
          
          {/* Privacy and terms links */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0 text-xs">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Mentions légales
            </a>
            <span className="text-border/50">|</span>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Confidentialité
            </a>
            <a 
              href="#hero" 
              className="ml-4 flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
