import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface CanvasProps {
  className?: string;
}

const Canvas: React.FC<CanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [currentColorScheme, setCurrentColorScheme] = useState<string[]>([]);
  
  // Setup theme colors
  useEffect(() => {
    // Get the primary color from CSS variables
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary').trim() || '#6366f1';
    
    // Get background color to determine light/dark mode
    const backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--background').trim() || '#ffffff';
    
    // Calculate luminance to determine if we're in dark or light mode
    const getHexColor = (cssVar: string) => {
      // Handle rgba format
      if (cssVar.startsWith('rgba')) {
        const values = cssVar.match(/\d+(\.\d+)?/g);
        if (values && values.length >= 3) {
          return `#${[0, 1, 2].map(i => {
            const val = Math.round(Number(values[i]));
            return val.toString(16).padStart(2, '0');
          }).join('')}`;
        }
      }
      
      // Handle hex format with or without #
      if (cssVar.startsWith('#')) return cssVar;
      return `#${cssVar}`;
    };
    
    const isDark = () => {
      const hex = getHexColor(backgroundColor).substring(1);
      const r = parseInt(hex.substring(0, 2), 16) / 255;
      const g = parseInt(hex.substring(2, 4), 16) / 255;
      const b = parseInt(hex.substring(4, 6), 16) / 255;
      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luminance < 0.5;
    };
    
    // Create theme-specific color schemes
    const createColorScheme = () => {
      const hexPrimary = getHexColor(primaryColor);
      let colors: string[] = [];
      
      // Generate color schemes based on theme
      switch (theme) {
        case 'light':
          colors = [
            hexPrimary,
            shadeColor(hexPrimary, 25),
            shadeColor(hexPrimary, 50),
            '#555',
            '#333'
          ];
          break;
        case 'dark':
          colors = [
            hexPrimary,
            shadeColor(hexPrimary, -15),
            shadeColor(hexPrimary, -30),
            '#AAA',
            '#CCC'
          ];
          break;
        case 'forest':
          colors = [
            '#2D4F3A', // Forest green
            '#507255', // Medium green
            '#78936F', // Sage green
            '#9CAF88', // Light sage
            '#CED7C3'  // Very light sage
          ];
          break;
        case 'ocean':
          colors = [
            '#1A3A54', // Deep ocean blue
            '#2A5D7C', // Sea blue
            '#3C7FA6', // Medium blue
            '#65A0C8', // Light ocean blue
            '#C2DEEF'  // Sky blue
          ];
          break;
        default:
          // Default to primary color based
          if (isDark()) {
            colors = [
              hexPrimary,
              shadeColor(hexPrimary, -15),
              shadeColor(hexPrimary, -30),
              '#AAA',
              '#CCC'
            ];
          } else {
            colors = [
              hexPrimary,
              shadeColor(hexPrimary, 25),
              shadeColor(hexPrimary, 50),
              '#555',
              '#333'
            ];
          }
      }
      
      setCurrentColorScheme(colors);
    };
    
    createColorScheme();
    
    // Helper to shade a hex color
    function shadeColor(color: string, percent: number) {
      let R = parseInt(color.substring(1, 3), 16);
      let G = parseInt(color.substring(3, 5), 16);
      let B = parseInt(color.substring(5, 7), 16);
      
      R = Math.floor(R * (100 + percent) / 100);
      G = Math.floor(G * (100 + percent) / 100);
      B = Math.floor(B * (100 + percent) / 100);
      
      R = R < 255 ? R : 255;
      G = G < 255 ? G : 255;
      B = B < 255 ? B : 255;
      
      R = R > 0 ? R : 0;
      G = G > 0 ? G : 0;
      B = B > 0 ? B : 0;
      
      const RR = R.toString(16).padStart(2, '0');
      const GG = G.toString(16).padStart(2, '0');
      const BB = B.toString(16).padStart(2, '0');
      
      return `#${RR}${GG}${BB}`;
    }
  }, [theme]);
  
  useEffect(() => {
    if (currentColorScheme.length === 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // High DPI display support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
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
    
    // Create shapes
    const createShapes = () => {
      shapes.length = 0;
      // Adjust shape count based on screen size
      const scaleFactor = Math.min(width, height) / 1000; // Reference size
      const baseCount = 12;
      const shapeCount = Math.max(baseCount, Math.floor(baseCount * scaleFactor));
      
      // Make sure we have colors available
      if (currentColorScheme.length === 0) return;
      
      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 120 + 40,
          dx: (Math.random() - 0.5) * 0.3,
          dy: (Math.random() - 0.5) * 0.3,
          // Adjust opacity based on theme
          opacity: Math.random() * 0.15 + 0.05,
          type: ['circle', 'square', 'triangle', 'hexagon', 'star', 'diamond', 'wave', 'grid'][Math.floor(Math.random() * 8)] as any,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.006,
          color: currentColorScheme[Math.floor(Math.random() * currentColorScheme.length)],
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
      
      // Apply pulsing effect to opacity - adjust for theme contrast
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
        
        // Boundary check with buffer
        const buffer = shape.size * 1.5;
        if (shape.x < -buffer) shape.x = width + buffer;
        if (shape.x > width + buffer) shape.x = -buffer;
        if (shape.y < -buffer) shape.y = height + buffer;
        if (shape.y > height + buffer) shape.y = -buffer;
        
        // Draw shape with timestamp for animations
        drawShape(shape, timestamp);
      });
      
      requestAnimationFrame(animate);
    };
    
    // Start the animation
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', createShapes);
      cancelAnimationFrame(animationId);
    };
  }, [currentColorScheme]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 transition-opacity duration-1000 ${className}`}
      style={{ opacity: currentColorScheme.length ? 1 : 0 }}
    />
  );
};

export default Canvas;
