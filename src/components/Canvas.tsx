
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
    
    // More advanced shapes configuration
    const shapes: {
      x: number;
      y: number;
      size: number;
      dx: number;
      dy: number;
      opacity: number;
      type: 'circle' | 'square' | 'triangle' | 'hexagon' | 'star' | 'diamond' | 'wave' | 'grid';
      rotation: number;
      rotationSpeed: number;
      color: string;
      strokeWidth: number;
      pulsePhase: number;
      pulseSpeed: number;
      detail: number;
    }[] = [];
    
    const colors = ['#111', '#222', '#333', '#444', '#555'];
    
    // Create shapes
    const createShapes = () => {
      shapes.length = 0;
      const shapeCount = Math.max(15, Math.floor(width / 120));
      
      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 120 + 40,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.15 + 0.03,
          type: ['circle', 'square', 'triangle', 'hexagon', 'star', 'diamond', 'wave', 'grid'][Math.floor(Math.random() * 8)] as any,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.006,
          color: colors[Math.floor(Math.random() * colors.length)],
          strokeWidth: Math.random() * 2 + 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          detail: Math.floor(Math.random() * 3) + 2
        });
      }
    };
    
    createShapes();
    window.addEventListener('resize', createShapes);
    
    // Draw a shape with more complexity
    const drawShape = (shape: typeof shapes[0], timestamp: number) => {
      ctx.save();
      
      // Apply pulsing effect to opacity
      const pulsingOpacity = shape.opacity * (0.8 + 0.4 * Math.sin(timestamp * 0.001 * shape.pulseSpeed + shape.pulsePhase));
      ctx.globalAlpha = pulsingOpacity;
      
      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.strokeWidth;
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      
      switch (shape.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          
          // Add an inner circle for complexity
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 3, 0, Math.PI * 2);
          ctx.stroke();
          break;
          
        case 'square':
          ctx.beginPath();
          ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          ctx.stroke();
          
          // Add an inner square
          const innerSize = shape.size * 0.7;
          ctx.beginPath();
          ctx.rect(-innerSize / 2, -innerSize / 2, innerSize, innerSize);
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
          
          // Add an inner triangle
          const innerH = (Math.sqrt(3) / 2) * (shape.size * 0.6);
          ctx.beginPath();
          ctx.moveTo(0, -innerH / 2);
          ctx.lineTo((shape.size * 0.6) / 2, innerH / 2);
          ctx.lineTo(-(shape.size * 0.6) / 2, innerH / 2);
          ctx.closePath();
          ctx.stroke();
          break;
          
        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = shape.size / 2 * Math.cos(angle);
            const y = shape.size / 2 * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          
          // Inner hexagon
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = shape.size / 3 * Math.cos(angle);
            const y = shape.size / 3 * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          break;
          
        case 'star':
          ctx.beginPath();
          const spikes = 5;
          const outerRadius = shape.size / 2;
          const innerRadius = shape.size / 4;
          
          for (let i = 0; i < spikes * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI / spikes) * i;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          break;
          
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, 0);
          ctx.lineTo(0, shape.size / 2);
          ctx.lineTo(-shape.size / 2, 0);
          ctx.closePath();
          ctx.stroke();
          
          // Inner diamond
          ctx.beginPath();
          const innerDiamondSize = shape.size * 0.5;
          ctx.moveTo(0, -innerDiamondSize / 2);
          ctx.lineTo(innerDiamondSize / 2, 0);
          ctx.lineTo(0, innerDiamondSize / 2);
          ctx.lineTo(-innerDiamondSize / 2, 0);
          ctx.closePath();
          ctx.stroke();
          break;

        case 'wave':
          // Drawing a sinusoidal wave pattern
          ctx.beginPath();
          const amplitude = shape.size / 4;
          const frequency = shape.detail / 20;
          
          for (let x = -shape.size / 2; x <= shape.size / 2; x += 2) {
            const y = amplitude * Math.sin(x * frequency + timestamp * 0.001);
            if (x === -shape.size / 2) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          
          // Second wave with different phase
          ctx.beginPath();
          for (let x = -shape.size / 2; x <= shape.size / 2; x += 2) {
            const y = amplitude * Math.sin(x * frequency + Math.PI + timestamp * 0.001);
            if (x === -shape.size / 2) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          break;
          
        case 'grid':
          // Drawing a grid pattern
          const gridSize = shape.size / (2 + shape.detail);
          ctx.beginPath();
          
          // Vertical lines
          for (let x = -shape.size / 2; x <= shape.size / 2; x += gridSize) {
            ctx.moveTo(x, -shape.size / 2);
            ctx.lineTo(x, shape.size / 2);
          }
          
          // Horizontal lines
          for (let y = -shape.size / 2; y <= shape.size / 2; y += gridSize) {
            ctx.moveTo(-shape.size / 2, y);
            ctx.lineTo(shape.size / 2, y);
          }
          
          ctx.stroke();
          break;
      }
      
      ctx.restore();
    };
    
    // Animation loop with timestamp
    const animate = (timestamp: number) => {
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
        
        // Draw shape with timestamp for animations
        drawShape(shape, timestamp);
      });
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
    
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
