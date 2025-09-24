import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface CanvasProps {
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ className }) => {
  const { theme } = useTheme();

  // Define the corners with precise transform classes for positioning and rotation
 const corners = [ { position: 'bottom-0 left-0', rotation: '-rotate-180', origin: 'transform-origin-top-left', },
                  { position: 'top-0 left-0',   rotation: 'rotate-0 scale-x-[-1]', 
  origin: 'transform-origin-top-left', },
                  { position: 'top-0 right-0', rotation: 'rotate-0', origin: 'transform-origin-top-left', },
                  { position: 'bottom-0 right-0', rotation: 'rotate-90', origin: 'transform-origin-top-right', }, 
                 
                 ];

  return (
    <div className={cn("relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[350px] aspect-square", className)}>
      {/* Border with padding */}
      <div className="absolute inset-3 sm:inset-4 rounded-lg overflow-hidden shadow-2xl shadow-primary/10 border-2 border-primary/30">
        <img
          src="/younes.jpeg"
          alt="Younes Darrassi"
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            theme === 'dark' ? 'brightness-90' : 'brightness-100'
          )}
        />
      </div>

      {/* Decorative corners */}
      {corners.map(({ position, rotation, origin }, index) => (
        <div
          key={index}
          className={cn(
            "absolute w-[40%] h-[40%]",
            position,
            "opacity-0 animate-corner-enter"
          )}
          style={{ animationDelay: `${0.8 + index * 0.15}s` }}
        >
          <img
            src="/corner-img.png"
            alt={`Decorative ${position} corner`}
            className={cn(
              "w-full h-full object-contain",
              rotation,
              origin,
              theme === 'dark' ? 'opacity-50' : 'opacity-80'
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default Canvas;
