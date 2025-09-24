import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface CanvasProps {
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ className }) => {
  const { theme } = useTheme();

  // This structure is now much simpler and more direct.
  const corners = [
    { position: 'top-0 left-0', rotation: 'rotate-0' },      // Top-Left
    { position: 'top-0 right-0', rotation: 'rotate-90' },     // Top-Right
    { position: 'bottom-0 right-0', rotation: 'rotate-180' },  // Bottom-Right
    { position: 'bottom-0 left-0', rotation: '-rotate-90' },   // Bottom-Left
  ];

  return (
    <div className={cn("relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] aspect-square", className)}>
      
      {/* The main profile image is now padded from the edge of the container */}
      <div className="absolute inset-[12%] rounded-lg overflow-hidden shadow-2xl shadow-primary/10">
        <img
          src="/younes.jpeg"
          alt="Younes Darrassi"
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            theme === 'dark' ? 'brightness-90' : 'brightness-100'
          )}
        />
      </div>

      {/* The corner images are positioned at the very edges of the main container */}
      {corners.map(({ position, rotation }, index) => (
        <div
          key={position}
          className={cn(
            'absolute w-[45%] h-[45%]', // Size of the corner image container
            position, // Pins the container to the corner (top-0 left-0, etc.)
            'opacity-0 animate-corner-enter'
          )}
          style={{ animationDelay: `${0.8 + index * 0.15}s` }}
        >
          <img
            src="/corner-img.png"
            alt={`Decorative corner`}
            className={cn(
              'w-full h-full object-contain',
              rotation // Applies the correct rotation to the image itself
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default Canvas;
