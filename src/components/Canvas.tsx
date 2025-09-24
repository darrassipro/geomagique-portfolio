import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface CanvasProps {
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ className }) => {
  const { theme } = useTheme();

  // Define the corners with precise transform classes for positioning and rotation
  const corners = [
    {
      // Top-Left Corner
      position: 'bottom-0 left-0',
      rotation: '-rotate-180',
      origin: 'transform-origin-top-left',
    },
    {
      // Top-Right Corner
      position: 'top-0 left-0',
      rotation: 'rotate-90',
            origin: 'transform-origin-buttom-left',
     
    },
    {
      // Bottom-Right Corner
      position: 'top-0 right-0',
      rotation: 'rotate-0',
      origin: 'transform-origin-top-left',

    },
    {
      // Bottom-Left Corner
      position: 'bottom-0 right-0',
      rotation: 'rotate-90',
      origin: 'transform-origin-top-right',

    },
  ];

  return (
    <div className={cn("relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] aspect-square", className)}>
      {/* The main image container now has padding to create the space for the corners */}
      <div className="absolute inset-[15%] rounded-lg overflow-hidden shadow-2xl shadow-primary/10">

        <img
          src="/younes.jpeg"
          alt="Younes Darrassi"
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            theme === 'dark' ? 'brightness-90' : 'brightness-100'
          )}
        />
      </div>

      {/* This container will hold the corner pieces, aligned with the padded image */}
      <div className="absolute inset-[15%]">
        {corners.map(({ position, rotation, origin }, index) => (
          <div
            key={position}









            className={cn(
              "absolute w-1/2 h-1/2", // Each corner takes up a 50% quadrant
              position, // Positions the div in the corner of the container
              "opacity-0 animate-corner-enter"
            )}
            style={{ animationDelay: `${0.8 + index * 0.15}s` }}
          >
            <img
              src="/corner-img.png"
              alt={`Decorative corner`}
              className={cn(
                "absolute w-full h-full object-contain",
                origin, // Sets the rotation point
                rotation, // Applies the rotation
                theme === 'dark' ? 'opacity-50' : 'opacity-80'
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
