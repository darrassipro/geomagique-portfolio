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
      'absolute right-0 w-full lg:w-1/2 h-full transition-opacity duration-300',
      'flex items-center justify-center',
      className
    )}>
      <div className="relative w-full h-full max-w-[300px] max-h-[300px] 
        sm:max-w-[400px] sm:max-h-[400px] 
        lg:max-w-[500px] lg:max-h-[500px] mx-auto">
        
        {/* Main profile image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          w-[240px] h-[240px] 
          sm:w-[320px] sm:h-[320px]
          lg:w-[400px] lg:h-[400px] 
          rounded-lg overflow-hidden">
          <img 
            src="/younes.jpeg" 
            alt="Younes Darrassi"
            className={cn(
              "w-full h-full object-cover",
              "transition-all duration-300",
              theme === 'dark' ? 'brightness-90' : 'brightness-100'
            )}
          />
        </div>
        
        {/* Corner decorative images */}
        {[
          { position: 'top-left', rotation: '-rotate-45' },
          { position: 'top-right', rotation: 'rotate-45' },
          { position: 'bottom-left', rotation: 'rotate-[225deg]' },
          { position: 'bottom-right', rotation: 'rotate-[135deg]' }
        ].map(({ position, rotation }) => (
          <div
            key={position}
            className={cn(
              "absolute",
              "w-[100px] h-[100px]",
              "sm:w-[120px] sm:h-[120px]",
              "lg:w-[150px] lg:h-[150px]",
              position === 'top-left' && "top-0 left-0",
              position === 'top-right' && "top-0 right-0",
              position === 'bottom-left' && "bottom-0 left-0",
              position === 'bottom-right' && "bottom-0 right-0"
            )}
          >
            <img 
              src="/corner-img.png"
              alt={`Decorative ${position} corner`}
              className={cn(
                "w-full h-full object-contain",
                "transition-all duration-300",
                rotation,
                theme === 'dark' ? 'opacity-70' : 'opacity-100'
              )}
            />
          </div>
        ))}

        {/* Overlay effects */}
        <div className="absolute inset-0 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/5 to-background/20" />
          {theme === 'dark' && (
            <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
