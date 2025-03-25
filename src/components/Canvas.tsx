import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface CanvasProps {
  className?: string;
}

interface Vector2D {
  x: number;
  y: number;
}

interface Particle {
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  size: number;
  mass: number;
  opacity: number;
  type: 'circle' | 'square' | 'triangle' | 'hexagon' | 'star' | 'diamond' | 'wave' | 'grid' | 
         'atom' | 'spiral' | 'flower' | 'dna' | 'compass' | 'neural' | 'circuit' | 'fractal' | 
         'molecule' | 'crystal' | 'glyph' | 'quantum' | 'binary';
  rotation: number;
  rotationSpeed: number;
  color: string;
  strokeWidth: number;
  pulsePhase: number;
  pulseSpeed: number;
  detail: number;
  lifespan: number;
  age: number;
  colliding: boolean;
  collidingWith: Set<number>;
  attractionStrength: number;
  repulsionRadius: number;
  id: number;
  lastCollision: number;
  trailPositions: Vector2D[];
  trailMaxLength: number;
  energyLevel: number;
  behaviorMode: 'wander' | 'seek' | 'avoid' | 'follow' | 'cluster';
  behaviorTimer: number;
  hue: number;
  hueShift: number;
  customProps: Record<string, any>;
}

const Canvas: React.FC<CanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [currentColorScheme, setCurrentColorScheme] = useState<string[]>([]);
  const mousePositionRef = useRef<Vector2D>({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const particleIdCounterRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const fpsRef = useRef<number[]>([]);
  const particleGenerationTimerRef = useRef<number>(0);
  const currentDateRef = useRef<string>("2025-03-24");
  const currentTimeRef = useRef<string>("23:09:00");
  const currentUserRef = useRef<string>("darrassipro");
  
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
            shadeColor(hexPrimary, 75),
            '#555',
            '#333'
          ];
          break;
        case 'dark':
          colors = [
            hexPrimary,
            shadeColor(hexPrimary, -15),
            shadeColor(hexPrimary, -30),
            shadeColor(hexPrimary, 15),
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
            '#4A775A', // Deep forest
            '#85A17D'  // Moss
          ];
          break;
        case 'ocean':
          colors = [
            '#1A3A54', // Deep ocean blue
            '#2A5D7C', // Sea blue
            '#3C7FA6', // Medium blue
            '#65A0C8', // Light ocean blue
            '#1D6A96', // Teal blue
            '#87CEEB'  // Sky blue
          ];
          break;
        default:
          // Default to primary color based
          if (isDark()) {
            colors = [
              hexPrimary,
              shadeColor(hexPrimary, -15),
              shadeColor(hexPrimary, -30),
              shadeColor(hexPrimary, 15),
              '#AAA',
              '#CCC'
            ];
          } else {
            colors = [
              hexPrimary,
              shadeColor(hexPrimary, 25),
              shadeColor(hexPrimary, 50),
              shadeColor(hexPrimary, 75),
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
  
  // Vector operations
  const vectorOps = {
    add: (v1: Vector2D, v2: Vector2D): Vector2D => ({ x: v1.x + v2.x, y: v1.y + v2.y }),
    subtract: (v1: Vector2D, v2: Vector2D): Vector2D => ({ x: v1.x - v2.x, y: v1.y - v2.y }),
    multiply: (v: Vector2D, scalar: number): Vector2D => ({ x: v.x * scalar, y: v.y * scalar }),
    divide: (v: Vector2D, scalar: number): Vector2D => ({ x: v.x / scalar, y: v.y / scalar }),
    magnitude: (v: Vector2D): number => Math.sqrt(v.x * v.x + v.y * v.y),
    normalize: (v: Vector2D): Vector2D => {
      const mag = Math.sqrt(v.x * v.x + v.y * v.y);
      if (mag === 0) return { x: 0, y: 0 };
      return { x: v.x / mag, y: v.y / mag };
    },
    limit: (v: Vector2D, max: number): Vector2D => {
      const mag = Math.sqrt(v.x * v.x + v.y * v.y);
      if (mag > max) {
        const normalized = vectorOps.normalize(v);
        return vectorOps.multiply(normalized, max);
      }
      return { ...v };
    },
    distance: (v1: Vector2D, v2: Vector2D): number => {
      const dx = v2.x - v1.x;
      const dy = v2.y - v1.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    lerp: (v1: Vector2D, v2: Vector2D, t: number): Vector2D => ({
      x: v1.x + (v2.x - v1.x) * t,
      y: v1.y + (v2.y - v1.y) * t
    })
  };
  
  // HSL to RGB conversion for smooth color transitions
  const hslToRgb = (h: number, s: number, l: number): string => {
    const hue = h % 360;
    s = Math.max(0, Math.min(1, s));
    l = Math.max(0, Math.min(1, l));
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r, g, b;
    if (hue < 60) {
      [r, g, b] = [c, x, 0];
    } else if (hue < 120) {
      [r, g, b] = [x, c, 0];
    } else if (hue < 180) {
      [r, g, b] = [0, c, x];
    } else if (hue < 240) {
      [r, g, b] = [0, x, c];
    } else if (hue < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    
    const toHex = (v: number) => {
      const hex = Math.round((v + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Main Canvas Animation
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
    
    // Set current date, time, and user
    currentDateRef.current = "2025-03-24";
    currentTimeRef.current = "23:09:00";
    currentUserRef.current = "darrassipro";
    
    // Setup mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: -1000, y: -1000 };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
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
    
    // Shape types
    const shapeTypes: Particle['type'][] = [
      'circle', 'square', 'triangle', 'hexagon', 'star', 
      'diamond', 'wave', 'grid', 'atom', 'spiral', 'flower',
      'dna', 'compass', 'neural', 'circuit', 'fractal', 
      'molecule', 'crystal', 'glyph', 'quantum', 'binary'
    ];
    
    // Behavior modes
    const behaviorModes: Particle['behaviorMode'][] = [
      'wander', 'seek', 'avoid', 'follow', 'cluster'
    ];
    
    // Create particles
    const createParticles = () => {
      particlesRef.current = [];
      // Adjust particle count based on screen size and performance
      const scaleFactor = Math.min(width, height) / 1000; // Reference size
      const baseCount = 15;
      const particleCount = Math.max(baseCount, Math.floor(baseCount * scaleFactor));
      
      for (let i = 0; i < particleCount; i++) {
        // Create particles at the top of the screen
        addParticle({
          position: { 
            x: Math.random() * width, 
            y: -Math.random() * 100 - 50 // Start above the screen
          },
          velocity: {
            x: (Math.random() - 0.5) * 1,
            y: Math.random() * 1 + 0.5 // Positive Y velocity (downward)
          }
        });
      }
    };
    
    // Add a single particle with unique ID
    const addParticle = (options: Partial<Particle> = {}) => {
      const id = particleIdCounterRef.current++;
      const size = options.size ?? (Math.random() * 80 + 40);
      const mass = (size / 40) ** 2; // Mass proportional to area
      
      const randomBehaviorMode = behaviorModes[Math.floor(Math.random() * behaviorModes.length)];
      // Favor more complex shapes
      const complexShapeWeight = 0.7; // 70% chance for complex shapes
      let randomShapeType: Particle['type'];
      
      if (Math.random() < complexShapeWeight) {
        // Select from more complex shapes
        const complexShapes: Particle['type'][] = [
          'dna', 'compass', 'neural', 'circuit', 'fractal',
          'molecule', 'crystal', 'glyph', 'atom', 'star', 
          'spiral', 'flower', 'quantum', 'binary'
        ];
        randomShapeType = complexShapes[Math.floor(Math.random() * complexShapes.length)];
      } else {
        // Select from basic shapes
        const basicShapes: Particle['type'][] = [
          'circle', 'square', 'triangle', 'hexagon', 'diamond', 'wave', 'grid'
        ];
        randomShapeType = basicShapes[Math.floor(Math.random() * basicShapes.length)];
      }
      
      // Random HSL color near the theme colors for smooth transitions
      const baseHue = Math.random() * 360;
      
      const particle: Particle = {
        position: options.position ?? {
          x: Math.random() * width,
          y: -Math.random() * 100 - 50 // Start above the screen
        },
        velocity: options.velocity ?? {
          x: (Math.random() - 0.5) * 1,
          y: Math.random() * 1 + 0.5 // Positive Y velocity (downward)
        },
        acceleration: { x: 0, y: 0 },
        size,
        mass,
        opacity: options.opacity ?? (Math.random() * 0.2 + 0.1),
        type: options.type ?? randomShapeType,
        rotation: options.rotation ?? (Math.random() * Math.PI * 2),
        rotationSpeed: options.rotationSpeed ?? ((Math.random() - 0.5) * 0.02),
        color: options.color ?? currentColorScheme[Math.floor(Math.random() * currentColorScheme.length)],
        strokeWidth: options.strokeWidth ?? (Math.random() * 2 + 0.5),
        pulsePhase: options.pulsePhase ?? (Math.random() * Math.PI * 2),
        pulseSpeed: options.pulseSpeed ?? (Math.random() * 0.02 + 0.01),
        detail: options.detail ?? (Math.floor(Math.random() * 3) + 2),
        lifespan: options.lifespan ?? (Math.random() * 15000 + 15000), // 15-30 seconds
        age: 0,
        colliding: false,
        collidingWith: new Set<number>(),
        attractionStrength: options.attractionStrength ?? (Math.random() * 0.1 + 0.01),
        repulsionRadius: options.repulsionRadius ?? (size * 2),
        id,
        lastCollision: 0,
        trailPositions: [],
        trailMaxLength: options.trailMaxLength ?? Math.floor(Math.random() * 10 + 5),
        energyLevel: options.energyLevel ?? (Math.random() * 0.8 + 0.2),
        behaviorMode: options.behaviorMode ?? randomBehaviorMode,
        behaviorTimer: options.behaviorTimer ?? (Math.random() * 5000 + 3000),
        hue: options.hue ?? baseHue,
        hueShift: options.hueShift ?? (Math.random() * 0.2 - 0.1),
        customProps: options.customProps ?? {}
      };
      
      // Add custom properties based on shape type
      switch (particle.type) {
        case 'dna':
          particle.customProps.strandCount = Math.floor(Math.random() * 2) + 1;
          particle.customProps.baseSpacing = Math.random() * 5 + 5;
          break;
        case 'neural':
          particle.customProps.neuralNodeCount = Math.floor(Math.random() * 5) + 3;
          particle.customProps.connectionDensity = Math.random() * 0.5 + 0.3;
          break;
        case 'circuit':
          particle.customProps.circuitComplexity = Math.random() * 0.7 + 0.3;
          particle.customProps.componentCount = Math.floor(Math.random() * 6) + 4;
          break;
        case 'fractal':
          particle.customProps.iterations = Math.floor(Math.random() * 3) + 2;
          particle.customProps.angle = Math.random() * Math.PI * 0.5;
          break;
        case 'crystal':
          particle.customProps.faces = Math.floor(Math.random() * 4) + 3;
          particle.customProps.layers = Math.floor(Math.random() * 2) + 1;
          break;
        case 'molecule':
          particle.customProps.atomCount = Math.floor(Math.random() * 5) + 3;
          particle.customProps.bondCount = Math.floor(Math.random() * 6) + 2;
          break;
        case 'quantum':
          particle.customProps.stateCount = Math.floor(Math.random() * 3) + 2;
          particle.customProps.uncertainty = Math.random() * 0.5 + 0.1;
          break;
        case 'glyph':
          particle.customProps.glyphComplexity = Math.floor(Math.random() * 3) + 2;
          particle.customProps.symmetry = Math.random() < 0.7;
          break;
        case 'binary':
          particle.customProps.digitCount = Math.floor(Math.random() * 8) + 8;
          particle.customProps.changing = Math.random() < 0.8;
          break;
      }
      
      particlesRef.current.push(particle);
      return particle;
    };
    
    // Check for shape collisions
    const checkCollision = (p1: Particle, p2: Particle): boolean => {
      // Basic circle collision detection for all shapes
      const distance = vectorOps.distance(p1.position, p2.position);
      const minDistance = (p1.size + p2.size) / 2;
      
      return distance < minDistance;
    };
    
    // Handle collision response with physics
    const handleCollision = (p1: Particle, p2: Particle) => {
      const distance = vectorOps.distance(p1.position, p2.position);
      
      // Avoid division by zero
      if (distance === 0) return;
      
      // Calculate collision normal
      const nx = (p2.position.x - p1.position.x) / distance;
      const ny = (p2.position.y - p1.position.y) / distance;
      
      // Calculate relative velocity
      const vx = p1.velocity.x - p2.velocity.x;
      const vy = p1.velocity.y - p2.velocity.y;
      
      // Calculate relative velocity in terms of the normal direction
      const relativeVelocity = vx * nx + vy * ny;
      
      // Do not resolve if velocities are separating
      if (relativeVelocity > 0) return;
      
      // Calculate restitution (bounciness)
      const restitution = 0.85;
      
      // Calculate impulse scalar
      const impulseScalar = -(1 + restitution) * relativeVelocity / (1/p1.mass + 1/p2.mass);
      
      // Apply impulse
      p1.velocity.x += impulseScalar * nx / p1.mass;
      p1.velocity.y += impulseScalar * ny / p1.mass;
      p2.velocity.x -= impulseScalar * nx / p2.mass;
      p2.velocity.y -= impulseScalar * ny / p2.mass;
      
      // Mark particles as colliding for visual effect
      p1.colliding = true;
      p2.colliding = true;
      p1.collidingWith.add(p2.id);
      p2.collidingWith.add(p1.id);
      p1.lastCollision = performance.now();
      p2.lastCollision = performance.now();
      
      // Slight energy increase on collision
      p1.energyLevel = Math.min(1, p1.energyLevel + 0.1);
      p2.energyLevel = Math.min(1, p2.energyLevel + 0.1);
      
      // Occasionally change behavior on collision
      if (Math.random() < 0.3) {
        p1.behaviorMode = behaviorModes[Math.floor(Math.random() * behaviorModes.length)];
        p1.behaviorTimer = Math.random() * 5000 + 3000;
      }
      
      if (Math.random() < 0.3) {
        p2.behaviorMode = behaviorModes[Math.floor(Math.random() * behaviorModes.length)];
        p2.behaviorTimer = Math.random() * 5000 + 3000;
      }
      
      // Color mixing effect
      p1.hue = (p1.hue + p2.hue) / 2 + (Math.random() * 20 - 10);
      p2.hue = p1.hue + (Math.random() * 20 - 10);
      
      // Slight position adjustment to prevent sticking
      const overlap = (p1.size + p2.size) / 2 - distance;
      const correctionX = overlap * nx * 0.5;
      const correctionY = overlap * ny * 0.5;
      
      p1.position.x -= correctionX;
      p1.position.y -= correctionY;
      p2.position.x += correctionX;
      p2.position.y += correctionY;
    };
    
    // Apply various forces to particles
    const applyForces = (particle: Particle, deltaTime: number) => {
      // Reset acceleration
      particle.acceleration = { x: 0, y: 0 };
      
      // Apply slight gravity
      particle.acceleration.y += 0.01;
      
      // Apply drag (air resistance)
      const dragForce = vectorOps.multiply(particle.velocity, -0.01);
      particle.acceleration = vectorOps.add(particle.acceleration, dragForce);
      
      // Apply mouse attraction/repulsion based on behavior mode
      const mousePos = mousePositionRef.current;
      const distanceToMouse = vectorOps.distance(particle.position, mousePos);
      
      if (distanceToMouse < 300) {
        const direction = vectorOps.subtract(mousePos, particle.position);
        const normalized = vectorOps.normalize(direction);
        let force = 0;
        
        switch (particle.behaviorMode) {
          case 'seek':
            // Attract to mouse
            force = 0.05 * (1 - distanceToMouse / 300);
            break;
          case 'avoid':
            // Repel from mouse
            force = -0.1 * (1 - distanceToMouse / 300);
            break;
          case 'follow':
            // Follow at a distance
            force = distanceToMouse < 100 ? -0.05 : 0.05;
            break;
          case 'wander':
            // Slight random influence
            force = (Math.random() - 0.5) * 0.01;
            break;
          case 'cluster':
            // Neutral to mouse but will cluster with others
            force = 0;
            break;
        }
        
        const mouseForce = vectorOps.multiply(normalized, force);
        particle.acceleration = vectorOps.add(particle.acceleration, mouseForce);
      }
      
      // Apply clustering/flocking behavior with other particles
      if (particle.behaviorMode === 'cluster' || Math.random() < 0.2) {
        // Find nearby particles
        const nearbyParticles = particlesRef.current.filter(p => 
          p.id !== particle.id && 
          vectorOps.distance(p.position, particle.position) < 150
        );
        
        if (nearbyParticles.length > 0) {
          // Cohesion - move toward center of nearby particles
          const center = nearbyParticles.reduce((acc, p) => {
            return vectorOps.add(acc, p.position);
          }, { x: 0, y: 0 });
          
          const centerOfMass = vectorOps.divide(center, nearbyParticles.length);
          const cohesion = vectorOps.subtract(centerOfMass, particle.position);
          const cohesionForce = vectorOps.multiply(vectorOps.normalize(cohesion), 0.01);
          
          // Alignment - align velocity with nearby particles
          const averageVelocity = nearbyParticles.reduce((acc, p) => {
            return vectorOps.add(acc, p.velocity);
          }, { x: 0, y: 0 });
          
          const alignment = vectorOps.divide(averageVelocity, nearbyParticles.length);
          const alignmentForce = vectorOps.multiply(vectorOps.normalize(alignment), 0.02);
          
          // Separation - avoid crowding
          let separation = { x: 0, y: 0 };
          nearbyParticles.forEach(p => {
            const d = vectorOps.distance(particle.position, p.position);
            if (d < (particle.size + p.size) * 0.75) {
              const diff = vectorOps.subtract(particle.position, p.position);
              const normalized = vectorOps.normalize(diff);
              const factor = 1 / Math.max(d, 0.1);
              separation = vectorOps.add(separation, vectorOps.multiply(normalized, factor));
            }
          });
          
          const separationForce = vectorOps.multiply(vectorOps.normalize(separation), 0.03);
          
          // Apply flocking forces based on behavior
          if (particle.behaviorMode === 'cluster') {
            particle.acceleration = vectorOps.add(particle.acceleration, cohesionForce);
            particle.acceleration = vectorOps.add(particle.acceleration, alignmentForce);
          }
          
          // Always apply separation for collision avoidance
          particle.acceleration = vectorOps.add(particle.acceleration, separationForce);
        }
      }
      
      // Apply random wander force for more natural movement
      if (particle.behaviorMode === 'wander' || Math.random() < 0.1) {
        const wanderForce = {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03
        };
        particle.acceleration = vectorOps.add(particle.acceleration, wanderForce);
      }
      
      // Energy decay over time
      particle.energyLevel *= 0.995;
      
      // Update velocity based on acceleration
      particle.velocity = vectorOps.add(
        particle.velocity, 
        vectorOps.multiply(particle.acceleration, deltaTime)
      );
      
      // Limit maximum velocity based on energy level
      const maxSpeed = 2 * (0.5 + particle.energyLevel);
      particle.velocity = vectorOps.limit(particle.velocity, maxSpeed);
    };
    
    // Update particle positions and states
    const updateParticles = (deltaTime: number, timestamp: number) => {
      // Generate new particles over time
      particleGenerationTimerRef.current += deltaTime;
      
      // Add new particles at a controlled rate
      if (particleGenerationTimerRef.current > 60) { // Every ~1 second
        particleGenerationTimerRef.current = 0;
        
        // Add 1-2 new particles at the top
        const particlesToAdd = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < particlesToAdd; i++) {
          addParticle({
            position: { 
              x: Math.random() * width, 
              y: -Math.random() * 50 - 10 // Start just above the screen
            },
            velocity: {
              x: (Math.random() - 0.5) * 1,
              y: Math.random() * 1 + 0.2 // Positive Y velocity (downward)
            }
          });
        }
      }
      
      // Update existing particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];
        
        // Apply forces
        applyForces(particle, deltaTime);
        
        // Update position
        particle.position = vectorOps.add(
          particle.position, 
          vectorOps.multiply(particle.velocity, deltaTime)
        );
        
        // Update rotation
        particle.rotation += particle.rotationSpeed * deltaTime;
        
        // Add position to trail
        if (vectorOps.magnitude(particle.velocity) > 0.5) {
          particle.trailPositions.push({ ...particle.position });
          if (particle.trailPositions.length > particle.trailMaxLength) {
            particle.trailPositions.shift();
          }
        }
        
        // Update age
        particle.age += deltaTime;
        
        // Reset collision state after a brief period
        if (performance.now() - particle.lastCollision > 200) {
          particle.colliding = false;
          particle.collidingWith.clear();
        }
        
        // Update behavior timer
        particle.behaviorTimer -= deltaTime;
        if (particle.behaviorTimer <= 0) {
          particle.behaviorMode = behaviorModes[Math.floor(Math.random() * behaviorModes.length)];
          particle.behaviorTimer = Math.random() * 5000 + 3000;
        }
        
        // Update hue
        particle.hue = (particle.hue + particle.hueShift) % 360;
        if (particle.hue < 0) particle.hue += 360;
        
        // Boundary check with bounce for sides
        if (particle.position.x < 0) {
          particle.position.x = 0;
          particle.velocity.x *= -0.8;
          particle.energyLevel *= 0.95;
        }
        if (particle.position.x > width) {
          particle.position.x = width;
          particle.velocity.x *= -0.8;
          particle.energyLevel *= 0.95;
        }
        
        // For top boundary, bounce gently
        if (particle.position.y < 0) {
          particle.position.y = 0;
          particle.velocity.y *= -0.5; // Gentler bounce at top
          particle.energyLevel *= 0.95;
        }
        
        // Remove particles that reach the bottom
        if (particle.position.y > height) {
          // Remove this particle
          particlesRef.current.splice(i, 1);
          continue;
        }
        
        // Particle lifetime check - older particles fade and eventually get removed
        if (particle.age > particle.lifespan) {
          // Gradually fade by reducing opacity
          particle.opacity *= 0.95;
          
          // Remove if nearly invisible
          if (particle.opacity < 0.02) {
            particlesRef.current.splice(i, 1);
            continue;
          }
        }
      }
      
      // Check for collisions using spatial partitioning (grid-based)
      const cellSize = 100; // Size of each grid cell
      const grid: Record<string, Particle[]> = {};
      
      // Assign particles to grid cells
      particlesRef.current.forEach(particle => {
        const cellX = Math.floor(particle.position.x / cellSize);
        const cellY = Math.floor(particle.position.y / cellSize);
        const cellKey = `${cellX},${cellY}`;
        
        if (!grid[cellKey]) grid[cellKey] = [];
        grid[cellKey].push(particle);
      });
      
      // Check collisions only within the same cell and adjacent cells
      particlesRef.current.forEach(particle => {
        const cellX = Math.floor(particle.position.x / cellSize);
        const cellY = Math.floor(particle.position.y / cellSize);
        
        // Check in current cell and 8 surrounding cells
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const checkCellKey = `${cellX + i},${cellY + j}`;
            const cellParticles = grid[checkCellKey];
            
            if (cellParticles) {
              cellParticles.forEach(otherParticle => {
                if (particle.id !== otherParticle.id && !particle.collidingWith.has(otherParticle.id)) {
                  if (checkCollision(particle, otherParticle)) {
                    handleCollision(particle, otherParticle);
                  }
                }
              });
            }
          }
        }
      });
    };
    
    // Draw a shape with more complexity
    const drawShape = (particle: Particle, timestamp: number) => {
      const { position, size, rotation, type, detail, trailPositions } = particle;
      
      ctx.save();
      
      // Apply pulsing effect to opacity
      const pulsingOpacity = particle.opacity * (0.8 + 0.2 * Math.sin(timestamp * 0.001 * particle.pulseSpeed + particle.pulsePhase));
      ctx.globalAlpha = pulsingOpacity;
      
      // Color based on particle energy and hue
      const saturation = 0.7 + particle.energyLevel * 0.3;
      const lightness = 0.5 + particle.energyLevel * 0.2;
      const color = particle.colliding ? "#ffffff" : hslToRgb(particle.hue, saturation, lightness);
      
      // Draw trail
      if (trailPositions.length > 1 && vectorOps.magnitude(particle.velocity) > 0.5) {
        ctx.beginPath();
        ctx.moveTo(trailPositions[0].x, trailPositions[0].y);
        
        for (let i = 1; i < trailPositions.length; i++) {
          ctx.lineTo(trailPositions[i].x, trailPositions[i].y);
        }
        
        ctx.strokeStyle = color;
        ctx.lineWidth = particle.strokeWidth * 0.5;
        ctx.globalAlpha = pulsingOpacity * 0.3;
        ctx.stroke();
      }
      
      // Reset opacity for main shape
      ctx.globalAlpha = pulsingOpacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = particle.strokeWidth;
      ctx.translate(position.x, position.y);
      ctx.rotate(rotation);
      
      const energyScale = 1 + particle.energyLevel * 0.2;
      const renderSize = size * energyScale;
      
      switch (type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, renderSize / 2, 0, Math.PI * 2);
          ctx.stroke();
          
          // Inner circles
          ctx.beginPath();
          ctx.arc(0, 0, renderSize / 3, 0, Math.PI * 2);
          ctx.stroke();
          
          if (particle.energyLevel > 0.6) {
            ctx.beginPath();
            ctx.arc(0, 0, renderSize / 5, 0, Math.PI * 2);
            ctx.stroke();
          }
          break;
          
        case 'square':
          ctx.beginPath();
          ctx.rect(-renderSize / 2, -renderSize / 2, renderSize, renderSize);
          ctx.stroke();
          
          // Inner square
          const innerSize = renderSize * 0.7;
          ctx.beginPath();
          ctx.rect(-innerSize / 2, -innerSize / 2, innerSize, innerSize);
          ctx.stroke();
          
          if (particle.energyLevel > 0.6) {
            const innerestSize = renderSize * 0.4;
            ctx.beginPath();
            ctx.rect(-innerestSize / 2, -innerestSize / 2, innerestSize, innerestSize);
            ctx.stroke();
          }
          break;
          
        case 'triangle':
          const h = (Math.sqrt(3) / 2) * renderSize;
          ctx.beginPath();
          ctx.moveTo(0, -h / 2);
          ctx.lineTo(renderSize / 2, h / 2);
          ctx.lineTo(-renderSize / 2, h / 2);
          ctx.closePath();
          ctx.stroke();
          
          // Inner triangle
          const innerH = (Math.sqrt(3) / 2) * (renderSize * 0.6);
          ctx.beginPath();
          ctx.moveTo(0, -innerH / 2);
          ctx.lineTo((renderSize * 0.6) / 2, innerH / 2);
          ctx.lineTo(-(renderSize * 0.6) / 2, innerH / 2);
          ctx.closePath();
          ctx.stroke();
          break;
          
        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = renderSize / 2 * Math.cos(angle);
            const y = renderSize / 2 * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          
          // Inner hexagon
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = renderSize / 3 * Math.cos(angle);
            const y = renderSize / 3 * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          break;
          
        case 'star':
          ctx.beginPath();
          const spikes = 5;
          const outerRadius = renderSize / 2;
          const innerRadius = renderSize / 4;
          
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
          
          if (particle.energyLevel > 0.7) {
            // Inner star
            ctx.beginPath();
            const innerOuterRadius = renderSize / 3;
            const innerInnerRadius = renderSize / 6;
            
            for (let i = 0; i < spikes * 2; i++) {
              const radius = i % 2 === 0 ? innerOuterRadius : innerInnerRadius;
              const angle = (Math.PI / spikes) * i + Math.PI / 5;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
          }
          break;
          
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -renderSize / 2);
          ctx.lineTo(renderSize / 2, 0);
          ctx.lineTo(0, renderSize / 2);
          ctx.lineTo(-renderSize / 2, 0);
          ctx.closePath();
          ctx.stroke();
          
          // Inner diamond
          ctx.beginPath();
          const innerDiamondSize = renderSize * 0.5;
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
          const amplitude = renderSize / 4;
          const frequency = detail / 20;
          
          for (let x = -renderSize / 2; x <= renderSize / 2; x += 2) {
            const y = amplitude * Math.sin(x * frequency + timestamp * 0.001);
            if (x === -renderSize / 2) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          
          // Second wave with different phase
          ctx.beginPath();
          for (let x = -renderSize / 2; x <= renderSize / 2; x += 2) {
            const y = amplitude * Math.sin(x * frequency + Math.PI + timestamp * 0.001);
            if (x === -renderSize / 2) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          break;
          
        case 'grid':
          // Drawing a grid pattern
          const cellSize = renderSize / (2 + detail);
          ctx.beginPath();
          
          // Vertical lines
          for (let x = -renderSize / 2; x <= renderSize / 2; x += cellSize) {
            ctx.moveTo(x, -renderSize / 2);
            ctx.lineTo(x, renderSize / 2);
          }
          
          // Horizontal lines
          for (let y = -renderSize / 2; y <= renderSize / 2; y += cellSize) {
            ctx.moveTo(-renderSize / 2, y);
            ctx.lineTo(renderSize / 2, y);
          }
          
          ctx.stroke();
          break;
          
        case 'atom':
          // Center nucleus
          ctx.beginPath();
          ctx.arc(0, 0, renderSize / 10, 0, Math.PI * 2);
          ctx.fill();
          
          // Electron orbits
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.save();
            ctx.rotate(i * Math.PI / 3 + timestamp * 0.0005);
            ctx.ellipse(0, 0, renderSize / 2, renderSize / 3, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // Electron
            const electronAngle = (timestamp * 0.001 * (i + 1) * 0.5) % (Math.PI * 2);
            const electronX = (renderSize / 2) * Math.cos(electronAngle);
            const electronY = (renderSize / 3) * Math.sin(electronAngle);
            ctx.beginPath();
            ctx.arc(electronX, electronY, renderSize / 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          break;
          
        case 'spiral':
          ctx.beginPath();
          const rotations = 2 + detail;
          const maxRadius = renderSize / 2;
          
          for (let angle = 0; angle < rotations * Math.PI * 2; angle += 0.1) {
            const radius = (angle / (rotations * Math.PI * 2)) * maxRadius;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            
            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          break;
          
        case 'flower':
          const petalCount = 5 + Math.floor(particle.energyLevel * 3);
          const petalLength = renderSize / 2;
          const flowerCenterRadius = renderSize / 6;
          
          // Draw petals
          ctx.beginPath();
          for (let i = 0; i < petalCount; i++) {
            const angle = (Math.PI * 2 / petalCount) * i;
            const controlAngle1 = angle + Math.PI / petalCount;
            const controlAngle2 = angle - Math.PI / petalCount;
            
            const tipX = petalLength * Math.cos(angle);
            const tipY = petalLength * Math.sin(angle);
            
            const control1X = petalLength * 0.7 * Math.cos(controlAngle1);
            const control1Y = petalLength * 0.7 * Math.sin(controlAngle1);
            
            const control2X = petalLength * 0.7 * Math.cos(controlAngle2);
            const control2Y = petalLength * 0.7 * Math.sin(controlAngle2);
            
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(control1X, control1Y, tipX, tipY);
            ctx.quadraticCurveTo(control2X, control2Y, 0, 0);
          }
          ctx.stroke();
          
          // Center circle
          ctx.beginPath();
          ctx.arc(0, 0, flowerCenterRadius, 0, Math.PI * 2);
          ctx.stroke();
          break;
          
        case 'dna':
          // Draw DNA helix
          const strandCount = particle.customProps.strandCount || 1;
          const baseSpacing = particle.customProps.baseSpacing || 8;
          const helixWidth = renderSize * 0.3;
          const helixHeight = renderSize;
          
          // Draw backbone strands
          for (let s = 0; s < strandCount; s++) {
            ctx.beginPath();
            const strand1X = -helixWidth / 2;
            const strand2X = helixWidth / 2;
            
            for (let y = -helixHeight / 2; y <= helixHeight / 2; y += 1) {
              // Sinusoidal backbone pattern
              const wave1X = strand1X + Math.sin(y * 0.1 + timestamp * 0.001) * helixWidth * 0.4;
              const wave2X = strand2X + Math.sin(y * 0.1 + timestamp * 0.001 + Math.PI) * helixWidth * 0.4;
              
              if (y === -helixHeight / 2) {
                ctx.moveTo(wave1X, y);
              } else {
                ctx.lineTo(wave1X, y);
              }
            }
            ctx.stroke();
            
            ctx.beginPath();
            for (let y = -helixHeight / 2; y <= helixHeight / 2; y += 1) {
              const wave2X = strand2X + Math.sin(y * 0.1 + timestamp * 0.001 + Math.PI) * helixWidth * 0.4;
              
              if (y === -helixHeight / 2) {
                ctx.moveTo(wave2X, y);
              } else {
                ctx.lineTo(wave2X, y);
              }
            }
            ctx.stroke();
            
            // Draw base pairs
            for (let y = -helixHeight / 2; y <= helixHeight / 2; y += baseSpacing) {
              const wave1X = strand1X + Math.sin(y * 0.1 + timestamp * 0.001) * helixWidth * 0.4;
              const wave2X = strand2X + Math.sin(y * 0.1 + timestamp * 0.001 + Math.PI) * helixWidth * 0.4;
              
              ctx.beginPath();
              ctx.moveTo(wave1X, y);
              ctx.lineTo(wave2X, y);
              ctx.stroke();
              
              // Draw small circles at the connection points
              ctx.beginPath();
              ctx.arc(wave1X, y, helixWidth * 0.05, 0, Math.PI * 2);
              ctx.fill();
              
              ctx.beginPath();
              ctx.arc(wave2X, y, helixWidth * 0.05, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          break;
          
        case 'compass':
          // Draw a compass rose
          const outerCircleRadius = renderSize / 2;
          const innerCircleRadius = renderSize / 3;
          
          // Outer circle
          ctx.beginPath();
          ctx.arc(0, 0, outerCircleRadius, 0, Math.PI * 2);
          ctx.stroke();
          
          // Inner circle
          ctx.beginPath();
          ctx.arc(0, 0, innerCircleRadius, 0, Math.PI * 2);
          ctx.stroke();
          
          // Main cardinal points
          const cardinalLength = outerCircleRadius;
          const directions = ['N', 'E', 'S', 'W'];
          
          for (let i = 0; i < 4; i++) {
            const angle = (Math.PI / 2) * i;
            const x = Math.cos(angle) * cardinalLength;
            const y = Math.sin(angle) * cardinalLength;
            
            // Draw line
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Draw arrowhead
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-5, -3);
            ctx.lineTo(-5, 3);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            
            // Draw direction letter
            ctx.save();
            ctx.translate(x * 1.15, y * 1.15);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = `${renderSize * 0.08}px sans-serif`;
            ctx.fillText(directions[i], 0, 0);
            ctx.restore();
          }
          
          // Intercardinal points (NE, SE, SW, NW)
          const intercardinalLength = outerCircleRadius * 0.8;
          
          for (let i = 0; i < 4; i++) {
            const angle = (Math.PI / 2) * i + Math.PI / 4;
            const x = Math.cos(angle) * intercardinalLength;
            const y = Math.sin(angle) * intercardinalLength;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          
          // Animated compass needle (rotates with time)
          const needleAngle = timestamp * 0.0005 % (Math.PI * 2);
          const needleLength = outerCircleRadius * 0.9;
          
          // North needle (usually red)
          ctx.save();
          ctx.rotate(needleAngle);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -needleLength);
          ctx.stroke();
          
          // North arrowhead
          ctx.beginPath();
          ctx.moveTo(0, -needleLength);
          ctx.lineTo(-3, -needleLength + 10);
          ctx.lineTo(3, -needleLength + 10);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          
          // South needle
          ctx.save();
          ctx.rotate(needleAngle + Math.PI);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -needleLength * 0.7);
          ctx.stroke();
          
          // South arrowhead
          ctx.beginPath();
          ctx.moveTo(0, -needleLength * 0.7);
          ctx.lineTo(-3, -needleLength * 0.7 + 10);
          ctx.lineTo(3, -needleLength * 0.7 + 10);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          
          // Center pin
          ctx.beginPath();
          ctx.arc(0, 0, renderSize * 0.05, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'neural':
          // Neural network visualization
          const neuralNodeCount = particle.customProps.neuralNodeCount || 5;
          const connectionDensity = particle.customProps.connectionDensity || 0.5;
          const nodeRadius = renderSize * 0.06;
          const nodes: {x: number, y: number}[] = [];
          
          // Create nodes in a circular pattern
          for (let i = 0; i < neuralNodeCount; i++) {
            const angle = (Math.PI * 2 * i) / neuralNodeCount;
            const distance = renderSize * 0.4 * (0.8 + Math.random() * 0.4);
            nodes.push({
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance
            });
          }
          
          // Add central node
          nodes.push({ x: 0, y: 0 });
          
          // Draw connections
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              if (Math.random() < connectionDensity) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                
                // Pulse animation along connections
                const pulsePos = (timestamp * 0.001 + i * 0.1 + j * 0.1) % 1;
                const midX = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
                const midY = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;
                
                ctx.stroke();
                
                // Draw pulse
                ctx.beginPath();
                ctx.arc(midX, midY, nodeRadius * 0.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
          
          // Draw nodes
          for (let i = 0; i < nodes.length; i++) {
            const pulseScale = 1 + 0.2 * Math.sin(timestamp * 0.003 + i * 0.5);
            
            ctx.beginPath();
            ctx.arc(nodes[i].x, nodes[i].y, nodeRadius * pulseScale, 0, Math.PI * 2);
            ctx.stroke();
            
            // Node fill with reduced opacity
            ctx.globalAlpha = pulsingOpacity * 0.3;
            ctx.fill();
            ctx.globalAlpha = pulsingOpacity;
          }
          break;
          
        case 'circuit':
          // Electronic circuit pattern
          const circuitComplexity = particle.customProps.circuitComplexity || 0.5;
          const componentCount = particle.customProps.componentCount || 6;
          const maxSize = renderSize / 2;
          
          const circuitGridSize = maxSize / 4;
          
          // Draw horizontal and vertical tracks
          ctx.beginPath();
          for (let x = -2; x <= 2; x++) {
            if (Math.random() < circuitComplexity) {
              ctx.moveTo(x * circuitGridSize, -maxSize);
              ctx.lineTo(x * circuitGridSize, maxSize);
            }
          }
          
          for (let y = -2; y <= 2; y++) {
            if (Math.random() < circuitComplexity) {
              ctx.moveTo(-maxSize, y * circuitGridSize);
              ctx.lineTo(maxSize, y * circuitGridSize);
            }
          }
          ctx.stroke();
          
          // Draw circuit components (resistors, capacitors, etc.)
          for (let i = 0; i < componentCount; i++) {
            const x = Math.floor(Math.random() * 5 - 2) * circuitGridSize;
            const y = Math.floor(Math.random() * 5 - 2) * circuitGridSize;
            const componentType = Math.floor(Math.random() * 3);
            
            ctx.save();
            ctx.translate(x, y);
            
            switch (componentType) {
              case 0: // Resistor
                ctx.beginPath();
                ctx.moveTo(-10, 0);
                ctx.lineTo(-6, 0);
                ctx.lineTo(-4, -5);
                ctx.lineTo(0, 5);
                ctx.lineTo(4, -5);
                ctx.lineTo(6, 0);
                ctx.lineTo(10, 0);
                ctx.stroke();
                break;
              case 1: // Capacitor
                ctx.beginPath();
                ctx.moveTo(-10, 0);
                ctx.lineTo(-3, 0);
                ctx.moveTo(-3, -7);
                ctx.lineTo(-3, 7);
                ctx.moveTo(3, -7);
                ctx.lineTo(3, 7);
                ctx.moveTo(3, 0);
                ctx.lineTo(10, 0);
                ctx.stroke();
                break;
              case 2: // IC Chip
                ctx.beginPath();
                ctx.rect(-10, -7, 20, 14);
                ctx.stroke();
                
                // Pins
                for (let p = -3; p <= 3; p += 2) {
                  ctx.beginPath();
                  ctx.moveTo(-14, p);
                  ctx.lineTo(-10, p);
                  ctx.stroke();
                  
                  ctx.beginPath();
                  ctx.moveTo(10, p);
                  ctx.lineTo(14, p);


                  ctx.stroke();
                }
                break;
            }
            
            ctx.restore();
          }
          
          // Draw some connection nodes
          for (let i = 0; i < componentCount / 2; i++) {
            const x = Math.floor(Math.random() * 5 - 2) * circuitGridSize;
            const y = Math.floor(Math.random() * 5 - 2) * circuitGridSize;
            
            ctx.beginPath();
            ctx.arc(x, y, renderSize * 0.03, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
          
        case 'fractal':
          // Recursive fractal pattern (simplified)
          const iterations = particle.customProps.iterations || 3;
          const branchAngle = particle.customProps.angle || Math.PI / 4;
          
          const drawBranch = (x: number, y: number, length: number, angle: number, depth: number) => {
            if (depth === 0) return;
            
            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Draw left branch
            drawBranch(endX, endY, length * 0.7, angle - branchAngle, depth - 1);
            // Draw right branch
            drawBranch(endX, endY, length * 0.7, angle + branchAngle, depth - 1);
          };
          
          // Start the fractal from the center
          drawBranch(0, 0, renderSize * 0.3, -Math.PI / 2, iterations);
          break;
          
        case 'molecule':
          // Molecule structure with atoms and bonds
          const atomCount = particle.customProps.atomCount || 5;
          const bondCount = particle.customProps.bondCount || 5;
          const atomRadius = renderSize * 0.08;
          
          // Generate atom positions
          const atoms: {x: number, y: number, size: number}[] = [];
          
          // Central atom
          atoms.push({ x: 0, y: 0, size: atomRadius * 1.2 });
          
          // Other atoms in a circular arrangement
          for (let i = 1; i < atomCount; i++) {
            const angle = (Math.PI * 2 * i) / (atomCount - 1);
            const distance = renderSize * 0.3;
            atoms.push({
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              size: atomRadius * (0.8 + Math.random() * 0.4)
            });
          }
          
          // Draw bonds between atoms
          for (let i = 0; i < bondCount; i++) {
            const atom1 = atoms[i % atoms.length];
            const atom2 = atoms[(i + 1) % atoms.length];
            
            ctx.beginPath();
            ctx.moveTo(atom1.x, atom1.y);
            ctx.lineTo(atom2.x, atom2.y);
            ctx.stroke();
            
            // Sometimes draw double bonds
            if (Math.random() < 0.3) {
              const dx = atom2.x - atom1.x;
              const dy = atom2.y - atom1.y;
              const perpX = -dy * 0.05;
              const perpY = dx * 0.05;
              
              ctx.beginPath();
              ctx.moveTo(atom1.x + perpX, atom1.y + perpY);
              ctx.lineTo(atom2.x + perpX, atom2.y + perpY);
              ctx.stroke();
            }
          }
          
          // Draw atoms
          atoms.forEach(atom => {
            ctx.beginPath();
            ctx.arc(atom.x, atom.y, atom.size, 0, Math.PI * 2);
            ctx.stroke();
            
            // Fill with reduced opacity
            ctx.globalAlpha = pulsingOpacity * 0.2;
            ctx.fill();
            ctx.globalAlpha = pulsingOpacity;
          });
          break;
          
        case 'crystal':
          // Crystal/gem structure
          const faces = particle.customProps.faces || 5;
          const layers = particle.customProps.layers || 2;
          
          // Draw outer shape
          ctx.beginPath();
          for (let i = 0; i < faces; i++) {
            const angle = (Math.PI * 2 * i) / faces;
            const nextAngle = (Math.PI * 2 * (i + 1)) / faces;
            
            const x1 = Math.cos(angle) * renderSize / 2;
            const y1 = Math.sin(angle) * renderSize / 2;
            const x2 = Math.cos(nextAngle) * renderSize / 2;
            const y2 = Math.sin(nextAngle) * renderSize / 2;
            
            // Draw face
            ctx.moveTo(0, 0);
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(0, 0);
          }
          ctx.stroke();
          
          // Draw inner layers
          for (let layer = 1; layer <= layers; layer++) {
            const layerSize = renderSize * (1 - layer / (layers + 1)) / 2;
            
            ctx.beginPath();
            for (let i = 0; i < faces; i++) {
              const angle = (Math.PI * 2 * i) / faces;
              const x = Math.cos(angle) * layerSize;
              const y = Math.sin(angle) * layerSize;
              
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
          }
          
          // Add some internal lines for facets
          for (let i = 0; i < faces; i++) {
            const angle = (Math.PI * 2 * i) / faces;
            const x = Math.cos(angle) * renderSize / 2;
            const y = Math.sin(angle) * renderSize / 2;
            
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          break;
          
        case 'glyph':
          // Abstract symbolic glyph
          const glyphComplexity = particle.customProps.glyphComplexity || 3;
          const symmetry = particle.customProps.symmetry !== undefined ? particle.customProps.symmetry : true;
          
          // Draw base circle
          ctx.beginPath();
          ctx.arc(0, 0, renderSize / 2, 0, Math.PI * 2);
          ctx.stroke();
          
          // Draw internal pattern
          const patternCount = glyphComplexity * 2;
          
          for (let i = 0; i < patternCount; i++) {
            const angle = (Math.PI * 2 * i) / patternCount;
            const distance = renderSize * 0.35;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            ctx.beginPath();
            
            // Create symmetrical or asymmetrical pattern
            if (symmetry) {
              // Symmetrical pattern
              ctx.moveTo(0, 0);
              ctx.lineTo(x, y);
              
              // Add some arcs
              if (i % 2 === 0) {
                const nextAngle = (Math.PI * 2 * (i + 1)) / patternCount;
                const nextX = Math.cos(nextAngle) * distance;
                const nextY = Math.sin(nextAngle) * distance;
                
                ctx.moveTo(x, y);
                ctx.quadraticCurveTo(0, 0, nextX, nextY);
              }
            } else {
              // Asymmetrical pattern
              const startAngle = angle;
              const endAngle = angle + Math.PI / (glyphComplexity + 1);
              
              ctx.arc(0, 0, distance, startAngle, endAngle);
              
              if (i % 2 === 0) {
                const pointX = Math.cos(endAngle) * distance;
                const pointY = Math.sin(endAngle) * distance;
                ctx.lineTo(0, 0);
                ctx.lineTo(pointX, pointY);
              }
            }
            
            ctx.stroke();
          }
          
          // Add central symbol
          ctx.beginPath();
          ctx.arc(0, 0, renderSize * 0.1, 0, Math.PI * 2);
          ctx.fill();
          
          // Add some dots around the perimeter
          for (let i = 0; i < patternCount / 2; i++) {
            const angle = (Math.PI * 2 * i) / (patternCount / 2);
            const x = Math.cos(angle) * (renderSize * 0.45);
            const y = Math.sin(angle) * (renderSize * 0.45);
            
            ctx.beginPath();
            ctx.arc(x, y, renderSize * 0.03, 0, Math.PI * 2);
            ctx.fill();
          }
          break;
          
        case 'quantum':
          // Quantum particle visualization
          const stateCount = particle.customProps.stateCount || 3;
          const uncertainty = particle.customProps.uncertainty || 0.3;
          
          // Draw probability cloud (multiple concentric circles with varying opacity)
          for (let i = 0; i < 5; i++) {
            const radius = renderSize * (0.3 + i * 0.15);
            const wavePhase = (timestamp * 0.001 + i * 0.5) % (Math.PI * 2);
            
            ctx.beginPath();
            ctx.globalAlpha = pulsingOpacity * (0.5 - i * 0.1) * Math.abs(Math.sin(wavePhase));
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.stroke();
          }
          
          // Reset opacity
          ctx.globalAlpha = pulsingOpacity;
          
          // Draw quantum states (orbital-like patterns)
          for (let i = 0; i < stateCount; i++) {
            const stateAngle = (timestamp * 0.0005 * (i + 1)) % (Math.PI * 2);
            const stateRadius = renderSize * (0.2 + i * 0.15);
            
            ctx.save();
            ctx.rotate(stateAngle);
            
            // Draw elliptical orbit
            ctx.beginPath();
            ctx.ellipse(0, 0, stateRadius, stateRadius * (0.5 + i * 0.1), 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // Draw particle at a position on the orbit
            const particleAngle = (timestamp * 0.001 * (i + 1)) % (Math.PI * 2);
            
            // Add uncertainty to position (quantum fuzziness)
            const uncertaintyFactor = Math.sin(timestamp * 0.003) * uncertainty;
            const particleX = Math.cos(particleAngle) * stateRadius * (1 + uncertaintyFactor);
            const particleY = Math.sin(particleAngle) * stateRadius * (0.5 + i * 0.1) * (1 + uncertaintyFactor);
            
            ctx.beginPath();
            ctx.arc(particleX, particleY, renderSize * 0.04, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
          }
          
          // Add central nucleus
          ctx.beginPath();
          ctx.arc(0, 0, renderSize * 0.08, 0, Math.PI * 2);
          ctx.fill();
          break;
          
        case 'binary':
          // Binary code pattern
          const digitCount = particle.customProps.digitCount || 16;
          const changing = particle.customProps.changing !== undefined ? particle.customProps.changing : true;
          
          // Draw circle container
          ctx.beginPath();
          ctx.arc(0, 0, renderSize / 2, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.font = `${renderSize * 0.1}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Calculate positions in a spiral pattern
          for (let i = 0; i < digitCount; i++) {
            const t = i / digitCount;
            const radius = t * renderSize * 0.4;
            const angle = t * Math.PI * 6; // Multiple rotations for spiral
            
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            // Generate binary digit (0 or 1)
            let digit;
            if (changing) {
              // Change based on time and position for animation effect
              digit = Math.round(Math.sin(timestamp * 0.001 + i * 0.5) + 0.5);
            } else {
              // Static pattern
              digit = Math.round(Math.random());
            }
            
            // Draw the binary digit
            ctx.fillText(digit.toString(), x, y);
          }
          
          // Draw some data flow lines
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const startAngle = (timestamp * 0.0002 * (i + 1)) % (Math.PI * 2);
            const endAngle = startAngle + Math.PI;
            
            const startX = Math.cos(startAngle) * (renderSize * 0.3);
            const startY = Math.sin(startAngle) * (renderSize * 0.3);
            const endX = Math.cos(endAngle) * (renderSize * 0.3);
            const endY = Math.sin(endAngle) * (renderSize * 0.3);
            
            ctx.moveTo(startX, startY);
            ctx.bezierCurveTo(0, startY * 0.5, 0, endY * 0.5, endX, endY);
          }
          ctx.stroke();
          break;
      }
      
      // Draw perimeter glow if particle is colliding
      if (particle.colliding) {
        ctx.beginPath();
        ctx.arc(0, 0, renderSize / 2 + 5, 0, Math.PI * 2);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
      }
      
      ctx.restore();
    };
    
    // Animation loop with timestamp and delta time
    let lastTimestamp = 0;
    const animate = (timestamp: number) => {
      // Calculate delta time in seconds (capped to prevent large jumps)
      const deltaTime = Math.min(30, timestamp - lastTimestamp) / 16;
      lastTimestamp = timestamp;
      
      // Track FPS
      const now = performance.now();
      const fps = 1000 / (now - lastFrameTimeRef.current);
      lastFrameTimeRef.current = now;
      
      fpsRef.current.push(fps);
      if (fpsRef.current.length > 60) fpsRef.current.shift();
      
      const avgFps = fpsRef.current.reduce((sum, value) => sum + value, 0) / fpsRef.current.length;
      
      // Update current time
    //  currentDateRef.current = "2025-03-24";
   //   currentTimeRef.current = "23:13:14";
   //   currentUserRef.current = "darrassipro";
      
      // Adjust particle count based on FPS if needed
      if (avgFps < 30 && particlesRef.current.length > 10 && Math.random() < 0.1) {
        particlesRef.current.pop();
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      updateParticles(deltaTime, timestamp);
      
      // Draw particles, sorting by size for better layering
      particlesRef.current
        .sort((a, b) => a.size - b.size)
        .forEach(particle => {
          drawShape(particle, timestamp);
        });
      
      // Add subtle debug info at the bottom corner (date, time, username)
      ctx.save();
      ctx.globalAlpha = 0.3;
  //   ctx.fillStyle = '#ffffff';
  //    ctx.font = '10px monospace';
 //     ctx.textAlign = 'right';
   //   ctx.textBaseline = 'bottom';
 //     ctx.fillText(`${currentDateRef.current} ${currentTimeRef.current} @${currentUserRef.current}`, width - 10, height - 10);
      ctx.restore();
      
      requestAnimationFrame(animate);
    };
    
    // Initialize and start animation
    createParticles();
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
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
