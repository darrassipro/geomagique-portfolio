import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, ArrowUp, Clock, User, Cpu, RefreshCw, Code,
  Mail, Phone, MapPin, ExternalLink, ArrowRight, Sparkles,
  Braces, Globe2, Bot, Command, Copy, Check
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
  const [bootSequence, setBootSequence] = useState(true);
  const [terminalState, setTerminalState] = useState('online');
  const [terminalCommands, setTerminalCommands] = useState<string[]>([]);
  
  const footerRef = useRef<HTMLElement>(null);
  const systemTime = "2025-03-25 02:45:26";
  const systemUser = "darrassipro";
  
  // Random values for visual elements
  const uniqueId = `session-${Math.random().toString(36).substring(2, 10)}`;
  const uptime = `${Math.floor(Math.random() * 60)}d ${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m`;
  const responseTime = `${Math.floor(Math.random() * 40 + 15)}ms`;
  const systemVersion = "1.6.0";
  
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
      label: "Portfolio", 
      url: "#",
      icon: Globe2,
      color: "#4361EE"
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
  
  // Boot sequence animation
  useEffect(() => {
    if (bootSequence) {
      // Simulate terminal boot sequence
      const bootMessages = [
        "Initializing portfolio interface...",
        "Loading component data...",
        "Establishing secure connection...",
        "Verifying user credentials...",
        "System ready."
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < bootMessages.length) {
          setTerminalCommands(prev => [...prev, bootMessages[i]]);
          i++;
        } else {
          clearInterval(interval);
          setBootSequence(false);
        }
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [bootSequence]);

  // Handle copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };
  
  // Add a new command to the terminal
  const addTerminalCommand = (command: string) => {
    setTerminalCommands(prev => [...prev, command]);
  };
  
  return (
    <footer 
      ref={footerRef}
      className="relative pt-12 pb-8 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background -z-10">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
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
              
              {/* Terminal interface */}
              <div className="mt-4 border border-border rounded-md overflow-hidden bg-background/50 backdrop-blur-sm">
                <div className="flex items-center justify-between px-3 py-1.5 bg-background/70 border-b border-border/80">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground/70 flex items-center">
                    <Terminal className="h-3 w-3 mr-1" />
                    <span>terminal@{systemUser}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      terminalState === 'online' ? "bg-green-500 animate-pulse" : "bg-amber-500"
                    )}></div>
                  </div>
                </div>
                
                <div className="p-2 h-32 overflow-y-auto font-mono text-[10px] sm:text-xs">
                  {terminalCommands.map((cmd, idx) => (
                    <div key={idx} className="text-muted-foreground">
                      {idx === terminalCommands.length - 1 ? (
                        <div className="animate-typewriter overflow-hidden whitespace-nowrap">
                          <span className="text-primary/80">$</span> {cmd}
                        </div>
                      ) : (
                        <div>
                          <span className="text-primary/80">$</span> {cmd}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {!bootSequence && (
                    <div className="flex items-center mt-2">
                      <span className="text-primary/80">$</span>
                      <span className="ml-1.5 animate-cursor w-2 h-4 bg-foreground opacity-70"></span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* System status */}
              <div className="flex items-center justify-between text-[10px] mt-2 flex-wrap gap-y-2">
                <div className="flex items-center text-muted-foreground/70">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{systemTime}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-muted-foreground/70">
                    <User className="h-3 w-3 mr-1" />
                    <span>{systemUser}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground/70">
                    <Cpu className="h-3 w-3 mr-1" />
                    <span>{uniqueId}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-muted-foreground/70">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    <span>{uptime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social & AI interaction */}
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Réseaux & IA</h4>
                <div className="h-px flex-1 mx-3 bg-border"></div>
                <div className="text-[10px] text-muted-foreground/70">
                  <span>RT: {responseTime}</span>
                </div>
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
                      onMouseEnter={() => addTerminalCommand(`Connecting to ${social.label}...`)}
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
                
                <div 
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer",
                    "border border-primary/20 bg-background/50 backdrop-blur-sm",
                    "hover:bg-primary/5 transition-all group"
                  )}
                  onClick={() => addTerminalCommand("Initializing AI assistant...")}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-primary/10 group-hover:scale-110 transition-transform relative">
                    <Bot className="h-4 w-4 text-primary" />
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-background"></span>
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    AI Assistant
                  </span>
                </div>
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
            
            {/* Live activity indicator */}
            <div className="mt-6 pt-4 border-t border-border/30">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-xs font-medium">Activité</h5>
                <span className="text-[10px] text-muted-foreground/70">live</span>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Sections parcourues</span>
                  <div className="w-24 h-1.5 bg-background/80 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary/60 rounded-full" 
                      style={{ width: `${(navigationItems.findIndex(item => item.section === visibleSection) + 1) / navigationItems.length * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Page actuelle</span>
                  <span className="text-primary text-[10px]">{visibleSection || 'hero'}.vue</span>
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
                  "group"
                )}
                onClick={() => addTerminalCommand("Redirecting to contact section...")}
              >
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
                <Terminal className="h-3 w-3 mr-1" />
                <span>
                  <span className="text-primary/70">{systemUser}</span>@
                  <span className="text-foreground/70">interface</span>
                </span>
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
              onClick={() => addTerminalCommand("Scrolling to top...")}
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
