
import React, { useEffect, useRef } from 'react';

interface CanvasProps {
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    
    // Shapes configuration
    const shapes: {
      x: number;
      y: number;
      size: number;
      dx: number;
      dy: number;
      opacity: number;
      type: 'circle' | 'square' | 'triangle';
      rotation: number;
      rotationSpeed: number;
    }[] = [];
    
    // Create shapes
    const createShapes = () => {
      shapes.length = 0;
      const shapeCount = Math.max(5, Math.floor(width / 250));
      
      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 80 + 40,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.08 + 0.02,
          type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01
        });
      }
    };
    
    createShapes();
    window.addEventListener('resize', createShapes);
    
    // Draw a shape
    const drawShape = (shape: typeof shapes[0]) => {
      ctx.save();
      ctx.globalAlpha = shape.opacity;
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      
      switch (shape.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'square':
          ctx.beginPath();
          ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          ctx.stroke();
          break;
        case 'triangle':
          const h = (Math.sqrt(3) / 2) * shape.size;
          ctx.beginPath();
          ctx.moveTo(0, -h / 2);
          ctx.lineTo(shape.size / 2, h / 2);
          ctx.lineTo(-shape.size / 2, h / 2);
          ctx.closePath();
          ctx.stroke();
          break;
      }
      
      ctx.restore();
    };
    
    // Animation loop
    const animate = () => {
      // Clear canvas with slight fade effect
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw each shape
      shapes.forEach(shape => {
        // Update position
        shape.x += shape.dx;
        shape.y += shape.dy;
        shape.rotation += shape.rotationSpeed;
        
        // Boundary check
        if (shape.x < -shape.size) shape.x = width + shape.size;
        if (shape.x > width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = height + shape.size;
        if (shape.y > height + shape.size) shape.y = -shape.size;
        
        // Draw shape
        drawShape(shape);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', createShapes);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
    />
  );
};

export default Canvas;
