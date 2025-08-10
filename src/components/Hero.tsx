import React, { useState, useEffect } from 'react';
import { ArrowRight, MousePointer, Code, Layers, Layout, Cpu, Zap } from 'lucide-react';

// Mock Canvas component for demo
const Canvas = ({ className }) => (
  <div className={`absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/20 ${className}`}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
  </div>
);

const TypewriterText = ({ text, delay = 100, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Start typing after a small delay
    const startDelay = setTimeout(() => {
      setIsTyping(true);
    }, 500);

    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      // When typing is complete, show cursor for a bit longer then hide it
      const cursorTimeout = setTimeout(() => {
        setShowCursor(false);
      }, 1000);

      return () => clearTimeout(cursorTimeout);
    }
  }, [displayText, text, delay, isTyping]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span 
        className={`inline-block w-0.5 h-6 bg-primary ml-1 transition-opacity duration-100 ${
          showCursor ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ animation: isTyping ? 'none' : 'blink 1.2s infinite' }}
      >
        |
      </span>
    </span>
  );
};

const Hero: React.FC = () => {
  return (
    <>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .glass-badge {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
      
      <section     
        id="hero"     
        className="relative min-h-screen flex items-center pb-20 pt-28 overflow-hidden bg-gray-900 text-white"    
      >  
        <Canvas className="opacity-70" />  
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-gray-900 z-[1]"></div>      
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">    
          <div className="max-w-4xl">    
            <div className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>    
              <div className="glass-badge px-4 py-2 rounded-full mb-6 inline-flex items-center space-x-2 backdrop-blur-md bg-white/10 border border-white/20">    
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>    
                <span className="text-xs font-medium tracking-wider uppercase">Portfolio</span>    
              </div>    
            </div>    
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight md:leading-tight lg:leading-tight mb-2 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>    
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">    
                YOUNES DARRASSI    
              </span>    
            </h1>    
                
            <div className="relative">    
              <h2 className="text-2xl md:text-3xl text-gray-300 mb-6 opacity-0 animate-fade-in flex items-center" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>    
                <span className="mr-3 relative overflow-hidden group inline-block">    
                  <TypewriterText 
                    text="Ingénieur logiciel" 
                    delay={80}
                    className="font-medium"
                  />
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/80 to-transparent transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>    
                </span>    
                <div className="h-px flex-grow max-w-[120px] bg-gradient-to-r from-blue-500/50 to-transparent ml-4"></div>    
              </h2>    
            </div>    
                
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>    
              Fortement passionné par le développement et les nouvelles technologies, je suis à la recherche d'un poste me permettant de mettre en œuvre mes compétences techniques avec rigueur et engagement.    
            </p>    
                
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>    
              <a     
                href="#projects"     
                className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-blue-600 text-white hover:bg-blue-500 rounded-full overflow-hidden"    
              >    
                <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500/80 to-blue-400/40 transition-all duration-500 ease-out group-hover:w-full"></span>    
                <span className="relative z-10 flex items-center">    
                  Voir Projets    
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />    
                </span>    
              </a>    
                  
              <a     
                href="#contact"     
                className="group relative inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide transition-all duration-300 bg-gray-800 hover:bg-gray-700 text-white rounded-full backdrop-blur-sm border border-gray-700"    
              >    
                <span className="absolute inset-0 w-0 bg-white/5 transition-all duration-500 ease-out group-hover:w-full"></span>    
                <span className="relative z-10">Me Contacter</span>    
              </a>    
            </div>    
                
            <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-4 max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>    
              <div className="flex flex-col items-center group">    
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 mb-2 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:scale-110 backdrop-blur-sm border border-blue-500/20">    
                  <Code className="h-5 w-5 text-blue-400" />    
                </div>    
                <span className="text-sm text-gray-400">Frontend</span>    
              </div>    
              <div className="flex flex-col items-center group">    
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 mb-2 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:scale-110 backdrop-blur-sm border border-blue-500/20">    
                  <Layout className="h-5 w-5 text-blue-400" />    
                </div>    
                <span className="text-sm text-gray-400">UI/UX</span>    
              </div>    
              <div className="flex flex-col items-center group">    
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 mb-2 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:scale-110 backdrop-blur-sm border border-blue-500/20">    
                  <Layers className="h-5 w-5 text-blue-400" />    
                </div>    
                <span className="text-sm text-gray-400">Responsive</span>    
              </div>    
              <div className="flex flex-col items-center group">    
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 mb-2 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:scale-110 backdrop-blur-sm border border-blue-500/20">    
                  <MousePointer className="h-5 w-5 text-blue-400" />    
                </div>    
                <span className="text-sm text-gray-400">Interactive</span>    
              </div>    
              <div className="flex flex-col items-center group">    
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 mb-2 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:scale-110 backdrop-blur-sm border border-blue-500/20">    
                  <Cpu className="h-5 w-5 text-blue-400" />    
                </div>    
                <span className="text-sm text-gray-400">Modern</span>    
              </div>    
              <div className="flex flex-col items-center group">    
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500/10 mb-2 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:scale-110 backdrop-blur-sm border border-blue-500/20">    
                  <Zap className="h-5 w-5 text-blue-400" />    
                </div>    
                <span className="text-sm text-gray-400">Dynamique</span>    
              </div>    
            </div>    
          </div>
        </div>      
        
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>    
      </section>
    </>
  );
};

export default Hero;
