import React from 'react';

const Canvas: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <div className="relative w-[500px] h-[500px] mx-auto">
        {/* Center profile image */}
        <img 
          src="/younes.jpg" 
          alt="Younes Darrassi" 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] object-cover rounded-lg"
        />
        
        {/* Corner frame images */}
        <img 
          src="/cadre.png" 
          alt="Frame Top Left" 
          className="absolute top-0 left-0 w-[150px] h-[150px] object-contain transform -rotate-45"
        />
        <img 
          src="/cadre.png" 
          alt="Frame Top Right" 
          className="absolute top-0 right-0 w-[150px] h-[150px] object-contain transform rotate-45"
        />
        <img 
          src="/cadre.png" 
          alt="Frame Bottom Left" 
          className="absolute bottom-0 left-0 w-[150px] h-[150px] object-contain transform rotate-[225deg]"
        />
        <img 
          src="/cadre.png" 
          alt="Frame Bottom Right" 
          className="absolute bottom-0 right-0 w-[150px] h-[150px] object-contain transform rotate-[135deg]"
        />
      </div>
    </div>
  );
};

export default Canvas;
