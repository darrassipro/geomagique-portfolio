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
      'absolute right-0 transition-opacity duration-300',
      // Responsive positioning and spacing
      'w-full h-[50px] w-[50px] top-[200px]', // Mobile: below text
      'sm:w-[100px] sm:h-[100px] sm:top-[200px] sm:right-4', // Tablet: side position
      'lg:w-[300px] lg:h-[300px] lg:top-32 lg:right-8', // Desktop: larger side position
      className
    )}>
      {/* Container for image and corners */}
      <div className="relative w-full h-full">
        {/* Main profile image container */}
        <div className="absolute inset-0">
          <img 
            src="/younes.jpeg" 
            alt="Younes Darrassi"
            className={cn(
              "w-full h-full object-cover rounded-lg",
              "transition-all duration-300",
              theme === 'dark' ? 'brightness-90' : 'brightness-100'
            )}
          />
        </div>
        
        {/* Corner shapes - contained within image bounds */}
        {[
          { position: 'top-left', rotation: '-rotate+25' },
          { position: 'top-right', rotation: 'rotate-25' },
          { position: 'bottom-left', rotation: 'rotate-[200deg]' },
          { position: 'bottom-right', rotation: 'rotate-[110deg]' }
        ].map(({ position, rotation }) => (
          <div
            key={position}
            className={cn(
              "absolute",
              // Responsive corner sizes
              "w-[60px] h-[60px]",
              "sm:w-[80px] sm:h-[80px]",
              "lg:w-[100px] lg:h-[100px]",
              // Position corners inside image bounds
              position === 'top-left' && "top-2 left-2",
              position === 'top-right' && "top-2 right-2",
              position === 'bottom-left' && "bottom-2 left-2",
              position === 'bottom-right' && "bottom-2 right-2"
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
