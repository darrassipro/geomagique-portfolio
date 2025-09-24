import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface CanvasProps {
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ className }) => {
  const { theme } = useTheme();

  return (
    <div className={cn(
      'absolute inset-0 w-full h-full transition-opacity duration-300',
      className
    )}>
      <div className="relative w-full h-full max-w-[500px] max-h-[500px] mx-auto
        sm:w-[400px] sm:h-[400px] 
        md:w-[500px] md:h-[500px]
        lg:w-[500px] lg:h-[500px]
        px-4 sm:px-0"
      >
        {/* Center profile image */}
        <img 
          src="/younes.jpg" 
          alt="Younes Darrassi" 
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]",
            "object-cover rounded-lg shadow-xl",
            "transition-all duration-300",
            theme === 'dark' ? 'brightness-90' : 'brightness-100'
          )}
        />
        
        {/* Corner frame images - Hidden on mobile, visible on tablets and up */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
          <img 
            key={position}
            src="/cadre.png" 
            alt={`Frame ${position}`} 
            className={cn(
              "absolute hidden sm:block",
              "w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px]",
              "object-contain transition-all duration-300",
              position === 'top-left' && "top-0 left-0 -rotate-45",
              position === 'top-right' && "top-0 right-0 rotate-45",
              position === 'bottom-left' && "bottom-0 left-0 rotate-[225deg]",
              position === 'bottom-right' && "bottom-0 right-0 rotate-[135deg]",
              theme === 'dark' ? 'opacity-70' : 'opacity-100'
            )}
          />
        ))}

        {/* Decorative gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/5 to-background/20 rounded-lg" />
        {theme === 'dark' && (
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50" />
        )}
      </div>
    </div>
  );
};

export default Canvas;
