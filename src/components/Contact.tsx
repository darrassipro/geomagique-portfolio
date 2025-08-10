import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Phone, MapPin, ArrowRight, Loader, Sparkles, 
  MessageSquare, Send, User, Bot, RefreshCw, Scan, Terminal,
  Link as LinkIcon, CornerRightDown, Check, Globe2 as Globe,
  X, ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ChatBot Component
const ChatBot = ({ isOpen, onClose, currentUser, currentTime }) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // API configuration
  const apiKey = 'AIzaSyDuG7w7EtezIXePz1EQkmShlfQdhmZLf3I'; 
  const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  // Project information for AI context
  const projectContext = `
    # About Younes Darrassi
    - Web Designer focused on creating intuitive digital experiences
    - Email: younes.darrassi@usmba.ac.ma
    - Phone: +212 629 419 616
    - Location: Fès, Morocco

    # Academic Projects
    1. Application Web de Gestion des Stages (GitHub: https://github.com/darrassi1/GestionDesStGES)
       - Symfony project for Université privée de Fès for internship management
       - Technologies: Twig, Doctrine, Symfony CLI, phpMyAdmin

    2. Application Web pour Salons de Spa (GitHub: https://github.com/darrassi1/Gestion_SPA)
       - Maven application with Thymeleaf and Spring JPA for salon management
       - Technologies: Spring Boot, Spring Security, JPA Repository, MySQL

    3. Gestion de Pylône Électrique (GitHub: https://github.com/darrassi1/GestionDePyloneElectrique)
       - C# application for electric pylon management using Entity Framework 6
       - Technologies: C#, Entity Framework 6, Code First, .NET

    4. TeethSeg Frontend (GitHub: https://github.com/darrassi1/SegTeeth)
       - UI for dental segmentation system
       - Technologies: React, Vite, TailwindCSS, Vercel

    5. Application BI avec Talend et Power BI (GitHub: https://github.com/darrassi1/Projet-BI-Talend-PowerBI)
       - BI solution for data analysis with visualizations
       - Technologies: Talend, Power BI, ETL, Data Visualization

    6. Barbershop Application (GitHub: https://github.com/darrassi1/Barbershop, Live: https://barbershop-pearl-seven.vercel.app)
       - Complete barbershop app with React frontend and Node.js/Express backend
       - Technologies: React, Node.js, Express, MongoDB

    # Personal Projects
    1. DutyEng - Assistant AI Autonome (Live: http://dutyeng.vercel.app)
       - UI for autonomous AI agent with terminal, code editor, browser and chat
       - Technologies: React, Tailwind CSS, shadcn/ui

    2. MarketSpace - Plateforme E-Commerce (Live: https://marketspace-gilt.vercel.app)
       - E-commerce app with category navigation, shopping cart and recommendation system
       - Technologies: React, Tailwind CSS, shadcn/ui

    3. VSP - Plateforme de Streaming Vidéo (Live: http://vspfront.vercel.app)
       - Full-stack streaming platform with video playback and recommendations
       - Technologies: Angular 19, Tailwind CSS, Node.js, Express, MySQL

    4. FlowVentory - Gestion d'Inventaire (Live: https://flowventory-gateway.vercel.app/)
       - Inventory management app with analytical dashboards 
       - Technologies: React, Tailwind CSS, shadcn/ui

    5. Dragon Ball Z - Expérience Interactive (Live: https://dragon-ball-z-lilac.vercel.app/)
       - Interactive website with carousel, episodes, and custom video player
       - Technologies: Angular 19, Tailwind CSS, Font Awesome

    6. SMedia - Gestion Marketing Digital (Live: http://smedia-omega.vercel.app)
       - UI for digital marketing campaign management and data analysis
       - Technologies: React, Tailwind CSS, shadcn/ui

    7. SkipSilenceAds - Extension YouTube (Live: https://skipsilenceads.vercel.app/)
       - Tools to remove ads from YouTube videos and skip silences
       - Technologies: Angular 19, Tailwind CSS, Font Awesome

    8. KingsLeaque - Actualités TV (Live: https://kingsleaque.vercel.app)
       - TV player and news website with modern interface
       - Technologies: Angular, Tailwind CSS, Font Awesome

    9. SightSpace - Site Entreprise (Live: http://sightspace.vercel.app)
       - Company website with products, services, and team presentation
       - Technologies: React, Tailwind CSS, shadcn/ui

    10. CocoPark Hub - Portail RH & Marketing (Live: http://cocopark-hub.vercel.app)
        - Integrated portal for HR, marketing, and company communication
        - Technologies: React, Tailwind CSS, shadcn/ui
  `;

  // Initialize with welcome message
  useEffect(() => {
    // Check for saved messages in localStorage
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // Add initial welcome message
      addBotMessage("👋 Bonjour ! Je suis l'assistant IA de Younes Darrassi. Je peux vous renseigner sur ses projets, compétences et expériences. Comment puis-je vous aider aujourd'hui ?");
    }
  }, []);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Add bot message
  const addBotMessage = (text) => {
    const newMessage = {
      text,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    localStorage.setItem('chatMessages', JSON.stringify([...messages, newMessage]));
  };

  // Add user message
  const addUserMessage = (text) => {
    const newMessage = {
      text,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    localStorage.setItem('chatMessages', JSON.stringify([...messages, newMessage]));
  };

  // Send message to AI API
  const getAIResponse = async (userQuery) => {
  try {
    const prompt = `You are Younes Darrassi's personal AI assistant. 
Your mission is to present Younes as a highly capable, trustworthy, and forward-thinking professional, while always providing helpful, original, and plagiarism-free responses.

About Younes Darrassi:
- Skilled Software Engineer (Ingénieur Logiciel) who graduated in 2024 from the Université Privée de Fès.
- Known for delivering innovative, efficient, and reliable solutions.
- Strong expertise in full-stack development, desktop applications, and advanced web technologies.
- Excellent at adapting to challenges and translating complex problems into practical, elegant solutions.

When responding:
1. Always be professional, articulate, and confident — your tone should inspire trust.
2. Highlight Younes’s achievements, skills, and experience in a way that feels authentic and human.
3. When discussing projects, focus on value, impact, and the quality of the solutions delivered.
4. Provide relevant links when available, and describe the technologies used clearly.
5. All responses must be written in an original way, ensuring they pass plagiarism checks.
6. Be concise when needed, but detailed enough to leave a strong, positive impression.

Here's detailed information about Younes and his projects:
${projectContext}

User query: ${userQuery}`;

      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "Désolé, je n'ai pas pu générer une réponse. Veuillez réessayer plus tard.";
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      return "Je rencontre des difficultés techniques. Veuillez réessayer dans un instant.";
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (currentMessage.trim() === '') return;
    
    addUserMessage(currentMessage);
    const userQuery = currentMessage;
    setCurrentMessage('');
    setIsLoading(true);
    
    try {
      const response = await getAIResponse(userQuery);
      addBotMessage(response);
    } catch (error) {
      addBotMessage("Désolé, je rencontre des problèmes de connexion. Veuillez réessayer plus tard.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="w-80 h-96 bg-background rounded-lg shadow-2xl flex flex-col border border-border/40 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary/80 to-primary/50 p-4 text-primary-foreground rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold">Assistant IA</h3>
                <div className="text-xs opacity-90">Répondez à vos questions</div>
              </div>
            </div>
            <button onClick={onClose} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-3 bg-background/90">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={cn(
                "max-w-[85%] p-3 rounded-xl break-words",
                message.isUser 
                  ? "self-end ml-auto bg-primary/10 text-foreground rounded-br-sm border border-primary/30" 
                  : "self-start bg-secondary/30 text-foreground rounded-bl-sm border border-border/40"
              )}
            >
              <div 
                className="message-content text-sm" 
                dangerouslySetInnerHTML={{ 
                  __html: message.text
                    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>')
                }}
              />
              <div className="text-[10px] opacity-70 text-right mt-1 font-mono">
                {formatTime(message.timestamp)}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="self-start bg-secondary/30 text-foreground p-3 rounded-xl flex space-x-1 border border-border/40">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-300"></div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-background flex border-t border-border/30">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Posez-moi une question..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
            className="flex-1 p-2 rounded-full bg-secondary/20 text-foreground placeholder-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary/50 border border-border/40"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || currentMessage.trim() === ''}
            className={cn(
              "ml-3 w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground",
              "bg-primary hover:bg-primary/90 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        {/* System info footer */}
        <div className="px-3 py-1.5 bg-background text-[10px] text-muted-foreground/50 flex justify-between items-center border-t border-border/30">
          <div className="flex items-center">
            <Terminal className="h-3 w-3 mr-1" />
            <span>{currentTime}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-1">Status:</span>
            <span className="text-green-500 flex items-center">
              <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [typingField, setTypingField] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState('2025-03-25 06:39:12');
  const [currentUser] = useState('darrassipro');
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [encryptionStatus, setEncryptionStatus] = useState('secure');
  const [responseTime, setResponseTime] = useState('35ms');
  const [liveTypingPreview, setLiveTypingPreview] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update system time
  useEffect(() => {
    const timer = setInterval(() => {
      // Keep the date from the requirement but update seconds
      const now = new Date();
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      
      // Update only time part (hours:minutes:seconds)
      const timeParts = currentDate.split(' ');
      timeParts[1] = `${hours}:${minutes}:${seconds}`;
      setCurrentDate(timeParts.join(' '));
      
      // Simulate random response time variations
      if (Math.random() > 0.7) {
        setResponseTime(`${Math.floor(Math.random() * 40 + 20)}ms`);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentDate]);
  
  // Canvas animation for data visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    setSize();
    window.addEventListener('resize', setSize);
    
    // Network nodes for animation
    const nodes: {x: number, y: number, vx: number, vy: number, size: number, connections: number[]}[] = [];
    
    // Create nodes
    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        size: Math.random() * 3 + 1,
        connections: []
      });
    }
    
    // For each node, connect to 2-3 other nodes
    nodes.forEach((node, i) => {
      const connectionCount = Math.floor(Math.random() * 2) + 2;
      for (let j = 0; j < connectionCount; j++) {
        let targetIndex;
        do {
          targetIndex = Math.floor(Math.random() * nodes.length);
        } while (targetIndex === i || node.connections.includes(targetIndex));
        
        node.connections.push(targetIndex);
      }
    });
    
    // Animation
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw connections
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;
        
        // Boundary check
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Draw connections
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          
          const dx = target.x - node.x;
          const dy = target.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw connections within a reasonable distance
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            
            // Opacity based on distance
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(100, 100, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 100, 255, 0.2)';
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // For message field, show live typing preview
    if (name === 'message') {
      setLiveTypingPreview(value.slice(0, 25) + (value.length > 25 ? '...' : ''));
    }
    
    setTypingField(name);
    const typingTimeout = setTimeout(() => {
      setTypingField(null);
    }, 1000);
    
    return () => clearTimeout(typingTimeout);
  };
  
  // Handle focus states
  const handleFocus = (field: string) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  // Simulate form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Random "processing" messages for a futuristic feel
    const messages = [
      'Encrypting message',
      'Establishing secure connection',
      'Verifying identity',
      'Analyzing message content',
      'Processing request'
    ];
    
    let currentMessage = 0;
    const messageInterval = setInterval(() => {
      setConnectionStatus(messages[currentMessage]);
      currentMessage = (currentMessage + 1) % messages.length;
    }, 300);
    
    // Simulate form submission
    setTimeout(() => {
      clearInterval(messageInterval);
      setConnectionStatus('connected');
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setLiveTypingPreview('');
      
      // Reset success message after 6 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    }, 2200);
  };
  
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: 'younes.darrassi@usmba.ac.ma',
      link: 'mailto:younes.darrassi@usmba.ac.ma',
      color: '#4361ee',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: '+212 629 419 616',
      link: 'tel:+212629419616',
      color: '#3a86ff',
    },
    {
      icon: MapPin,
      title: 'Localisation',
      details: 'Fès, Maroc',
      link: 'https://maps.google.com/?q=Fes+Morocco',
      color: '#4cc9f0',
    },
  ];
  
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: (props: any) => (
        <svg className={props.className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      url: 'https://linkedin.com',
      color: '#0077B5'
    },
    {
      name: 'GitHub',
      icon: (props: any) => (
        <svg className={props.className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com',
      color: '#333'
    },
    {
      name: 'Dribbble',
      icon: (props: any) => (
        <svg className={props.className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z"/>
        </svg>
      ),
      url: 'https://dribbble.com',
      color: '#ea4c89'
    }
  ];
  
  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
  
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Gradient background with animated particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background -z-10 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
      </div>
      
      <div className="container px-4 md:px-6 pt-8 relative z-10">
        <div className="animate-reveal text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block">
            <span className="px-3 py-1 text-xs font-medium tracking-wider rounded-full mb-4 inline-block
                  bg-primary/10 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
              <span className="relative flex items-center gap-1.5">
                <MessageSquare className="h-3 w-3 text-primary animate-pulse" />
                CONTACT
              </span>
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
            Connectons-nous<span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Vous avez un projet innovant ? Collaborons pour créer des expériences numériques exceptionnelles.
          </p>
          
          {/* System status indicator */}
          <div className="mt-6 inline-flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-border/40 rounded-lg p-1.5 px-3 text-xs font-mono text-muted-foreground/70">
            <div className="flex items-center">
              <span className={cn(
                "h-1.5 w-1.5 rounded-full mr-1.5",
                connectionStatus === 'connected' ? "bg-green-500 animate-pulse" : "bg-amber-500 animate-pulse"
              )}></span>
              <Terminal className="h-3 w-3 mr-1" />
              <span className="mr-1">{currentDate}</span>
            </div>
            <span className="hidden md:inline-block text-muted-foreground/30">|</span>
            <div className="hidden md:flex items-center">
              <User className="h-3 w-3 mr-1.5" />
              <span>{currentUser}</span>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <div className="animate-reveal relative">
            <div className={cn(
              "rounded-2xl overflow-hidden transition-all duration-300 h-full",
              "bg-background/70 backdrop-blur-md border border-border/40",
              "hover:shadow-lg hover:border-primary/20"
            )}>
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 relative">
                    <Check className="h-6 w-6 text-primary" />
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Message Transmis !</h3>
                  <div className="flex justify-center mb-4">
                    <div className="text-muted-foreground/70 inline-flex bg-secondary/40 rounded-full px-3 py-1 text-xs items-center">
                      <Terminal className="h-3 w-3 mr-1.5" />
                      <span>Référence: MSG-{Math.floor(Math.random() * 90000) + 10000}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Votre message a été envoyé avec succès. Je vous répondrai dans les meilleurs délais.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <ArrowRight className="h-3 w-3 mr-1.5" />
                    <span>Envoyer un autre message</span>
                  </button>
                </div>
              ) : (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold flex items-center">
                      <Send className="h-5 w-5 mr-2 text-primary" />
                      <span>Envoyez votre message</span>
                    </h3>
                    
                    {/* Live typing indicator */}
                    {typingField && (
                      <div className="text-xs text-muted-foreground bg-background/50 rounded-full px-2 py-1 border border-border/40 flex items-center animate-fadeIn">
                        <span className="animate-pulse mr-1.5">●</span>
                        <span className="font-mono">typing...</span>
                      </div>
                    )}
                  </div>
                  
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div 
                      className={cn(
                        "transition-all duration-300 rounded-xl overflow-hidden",
                        focusedField === 'name' ? "ring-2 ring-primary/20" : ""
                      )}
                    >
                      <label 
                        htmlFor="name" 
                        className={cn(
                          "block text-sm font-medium px-4 py-2",
                          "bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-sm border-b border-border/40",
                          focusedField === 'name' ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        <span className="flex items-center">
                          <User className={cn(
                            "h-3.5 w-3.5 mr-2 transition-transform",
                            focusedField === 'name' ? "text-primary scale-110" : ""
                          )} />
                          Nom
                        </span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus('name')}
                        onBlur={handleBlur}
                        required
                        className="w-full px-4 py-3 bg-background/30 focus:outline-none transition-all border-border/10"
                        placeholder="Votre nom complet"
                      />
                    </div>
                    
                    <div 
                      className={cn(
                        "transition-all duration-300 rounded-xl overflow-hidden",
                        focusedField === 'email' ? "ring-2 ring-primary/20" : ""
                      )}
                    >
                      <label 
                        htmlFor="email" 
                        className={cn(
                          "block text-sm font-medium px-4 py-2",
                          "bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-sm border-b border-border/40",
                          focusedField === 'email' ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        <span className="flex items-center">
                          <Mail className={cn(
                            "h-3.5 w-3.5 mr-2 transition-transform",
                            focusedField === 'email' ? "text-primary scale-110" : ""
                          )} />
                          Email
                        </span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus('email')}
                        onBlur={handleBlur}
                        required
                        className="w-full px-4 py-3 bg-background/30 focus:outline-none transition-all border-border/10"
                        placeholder="votre.email@exemple.com"
                      />
                    </div>
                    
                    <div 
                      className={cn(
                        "transition-all duration-300 rounded-xl overflow-hidden",
                        focusedField === 'message' ? "ring-2 ring-primary/20" : ""
                      )}
                    >
                      <label 
                        htmlFor="message" 
                        className={cn(
                          "block text-sm font-medium px-4 py-2",
                          "bg-gradient-to-r from-background/80 to-background/40 backdrop-blur-sm border-b border-border/40",
                          focusedField === 'message' ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center">
                            <MessageSquare className={cn(
                              "h-3.5 w-3.5 mr-2 transition-transform",
                              focusedField === 'message' ? "text-primary scale-110" : ""
                            )} />
                            Message
                          </span>
                          
                          {liveTypingPreview && (
                            <span className="text-xs text-muted-foreground/60 font-mono">
                              "{liveTypingPreview}"
                            </span>
                          )}
                        </div>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={handleBlur}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-background/30 focus:outline-none transition-all border-border/10 resize-none"
                        placeholder="Décrivez votre projet ou votre message..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full inline-flex items-center justify-center h-12 px-6 font-medium",
                        "transition-all duration-300 rounded-xl relative overflow-hidden group",
                        "bg-primary text-primary-foreground hover:bg-primary/90",
                        isSubmitting ? "cursor-not-allowed opacity-90" : ""
                      )}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                      
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground/90 rounded-full animate-spin mr-3"></div>
                          <span>{connectionStatus}...</span>
                        </div>
                      ) : (
                        <div className="flex items-center relative">
                          <span className="mr-2">Envoyer</span>
                          <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
            
            {/* Glowing effect in corner */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          </div>
          
          {/* Contact Information */}
          <div className="animate-reveal space-y-8" style={{ animationDelay: '100ms' }}>
            <h3 className="text-xl font-semibold flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              <span>Canaux de Communication</span>
            </h3>
            
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group flex items-start p-5 rounded-xl",
                    "bg-background/70 backdrop-blur-md transition-all border",
                    "hover:bg-background/90 hover:border-primary/20 hover:shadow-md"
                  )}
                  style={{ borderColor: `${item.color}20` }}
                >
                  <div 
                    className="mr-4 p-3 rounded-lg border relative"
                    style={{ 
                      backgroundColor: `${item.color}10`,
                      borderColor: `${item.color}30`
                    }}
                  >
                    <item.icon className="h-5 w-5" style={{ color: item.color }} />
                    <div 
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ 
                        boxShadow: `0 0 15px 0 ${item.color}40`,
                        transitionDuration: '500ms' 
                      }}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <LinkIcon className="h-3.5 w-3.5 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors">{item.details}</p>
                    
                    {/* Micro-animation for URL highlight */}
                    <div 
                      className="h-0.5 w-0 bg-gradient-to-r group-hover:w-full transition-all duration-500 mt-1 rounded-full"
                      style={{ 
                        backgroundImage: `linear-gradient(to right, ${item.color}30, ${item.color}10)`
                      }}
                    ></div>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="pt-6 mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  <span>Mes réseaux</span>
                </h3>
                
                <div className="text-xs text-muted-foreground flex items-center gap-1.5 bg-background/50 backdrop-blur-sm rounded-full px-3 py-1 border border-border/40">
                  <CornerRightDown className="h-3 w-3" />
                  <span>Cliquez pour me suivre</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex flex-col items-center justify-center p-4 rounded-xl",
                      "bg-background/70 backdrop-blur-md transition-all border border-border/40",
                      "hover:bg-background/90 hover:border-primary/20 hover:shadow-md"
                    )}
                    style={{ 
                      backgroundColor: `${social.color}05` 
                    }}
                  >
                    <div 
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                        "bg-background/50 border border-border/40 transition-all duration-300",
                        "group-hover:scale-110 group-hover:border-primary/30"
                      )}
                    >
                      <social.icon 
                        className="h-5 w-5 text-foreground/70 group-hover:text-primary transition-colors" 
                      />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="pt-6 mt-8">
              <div className={cn(
                "p-5 rounded-xl",
                "bg-background/70 backdrop-blur-md border border-border/40",
                "hover:border-primary/20 hover:shadow-md transition-all duration-300"
              )}>
                <div className="flex items-start mb-4">
                  <div className="mr-4 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 border border-primary/30">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Assistant IA</h4>
                    <p className="text-sm text-muted-foreground">
                      Mon assistant est disponible 24/7 pour répondre à vos questions initiales.
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs flex items-center text-muted-foreground/70">
                    <RefreshCw className="h-3 w-3 mr-1.5" />
                    <span>Mis à jour: 2025-03-24</span>
                  </div>
                  <button 
                    className="text-xs flex items-center text-primary hover:text-primary/80 transition-colors group"
                    onClick={toggleChatbot}
                  >
                    <span>Discuter</span>
                    <ArrowUpRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ChatBot component */}
      {isChatbotOpen && (
        <ChatBot
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          currentUser={currentUser}
          currentTime={currentDate}
        />
      )}
      
      {/* Chat toggle button for mobile */}
      <div className="fixed bottom-5 right-5 z-50 lg:hidden">
        {!isChatbotOpen && (
          <button
            onClick={toggleChatbot}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/80 to-primary/90 flex items-center justify-center shadow-lg text-white text-2xl hover:scale-105 transition transform"
            aria-label="Ouvrir l'assistant IA"
          >
            <Bot className="h-6 w-6" />
          </button>
        )}
      </div>
    </section>
  );
};

export default Contact;
