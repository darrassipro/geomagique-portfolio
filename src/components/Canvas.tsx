import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface CanvasProps {
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ className }) => {
  const { theme } = useTheme();

  // Corrected corner transformations for a symmetrical frame
  const corners = [
    { position: 'top-left', transform: 'top-0 left-0 rotate-0' },
    { position: 'top-right', transform: 'top-0 right-0 rotate-90' },
    { position: 'bottom-right', transform: 'bottom-0 right-0 rotate-180' },
    { position: 'bottom-left', transform: 'bottom-0 left-0 -rotate-90' },
  ];

  return (
    <div className={cn("relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] aspect-square", className)}>
      {/* Container for the main image with padding to make space for the corners */}
      <div className="absolute inset-4 sm:inset-6 rounded-lg overflow-hidden shadow-2xl shadow-primary/10">
        <img
          src="/younes.jpeg"
          alt="Younes Darrassi"
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            theme === 'dark' ? 'brightness-90' : 'brightness-100'
          )}
        />
      </div>

      {/* The corner pieces are now positioned relative to the outer container */}
      {corners.map(({ position, transform }, index) => (
        <div
          key={position}
          className={cn(
            "absolute w-[35%] h-[35%]", // Adjusted size for better fit
            transform, // Apply the correct rotation and position
            "opacity-0 animate-corner-enter"
          )}
          style={{ animationDelay: `${0.8 + index * 0.15}s` }}
        >
          <img
            src="/corner-img.png"
            alt={`Decorative ${position} corner`}
            className={cn(
              "w-full h-full object-contain",
              theme === 'dark' ? 'opacity-50' : 'opacity-80',
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default Canvas;
