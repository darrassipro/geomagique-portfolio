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
      'absolute right-0 w-1/2 h-full transition-opacity duration-300',
      'hidden lg:block', // Only show on large screens
      className
    )}>
      <div className="relative w-full h-full max-w-[500px] max-h-[500px] 
        lg:w-[500px] lg:h-[500px]
        px-4 sm:px-0"
      >
        {/* Center profile image */}
        <img 
          src="/younes.jpg" 
          alt="Younes Darrassi" 
          className={cn(
            "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            "w-[400px] h-[400px]",
            "object-cover rounded-lg shadow-xl",
            "transition-all duration-300",
            theme === 'dark' ? 'brightness-90' : 'brightness-100'
          )}
        />
        
        {/* Corner frame images */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
          <img 
            key={position}
            src="/cadre.png" 
            alt={`Frame ${position}`} 
            className={cn(
              "absolute",
              "w-[150px] h-[150px]",
              "object-contain transition-all duration-300",
              position === 'top-left' && "top-0 left-0 -rotate-45",
              position === 'top-right' && "top-0 right-0 rotate-45",
              position === 'bottom-left' && "bottom-0 left-0 rotate-[225deg]",
              position === 'bottom-right' && "bottom-0 right-0 rotate-[135deg]",
              theme === 'dark' ? 'opacity-70' : 'opacity-100'
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
