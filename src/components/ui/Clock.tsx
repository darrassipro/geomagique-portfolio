import React, { useState, useEffect } from 'react';

const CLOCK_SIZE = 96; // px, matches w-24 h-24
const CENTER = CLOCK_SIZE / 2;
const RADIUS = CENTER - 6;
const NUMBERS_RADIUS = RADIUS - 14;
const TICK_RADIUS = RADIUS - 4;

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondHandRotation = (seconds / 60) * 360;
  const minuteHandRotation = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourHandRotation = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  // SVG numbers and ticks
  const numbers = Array.from({ length: 12 }).map((_, i) => {
    const angle = ((i + 1) * 30 - 90) * (Math.PI / 180);
    const x = CENTER + NUMBERS_RADIUS * Math.cos(angle);
    const y = CENTER + NUMBERS_RADIUS * Math.sin(angle) + 4; // +4 for vertical optical alignment
    return (
      <text
        key={i}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Inter', 'Segoe UI', Arial, sans-serif"
        fontSize="15"
        fill="hsl(var(--foreground))"
        style={{
          fontWeight: 600,
          paintOrder: 'stroke',
          stroke: 'hsl(var(--background))',
          strokeWidth: 2,
        }}
      >
        {i + 1}
      </text>
    );
  });

  const ticks = Array.from({ length: 60 }).map((_, i) => {
    const angle = (i * 6 - 90) * (Math.PI / 180);
    const x1 = CENTER + (TICK_RADIUS - (i % 5 === 0 ? 6 : 0)) * Math.cos(angle);
    const y1 = CENTER + (TICK_RADIUS - (i % 5 === 0 ? 6 : 0)) * Math.sin(angle);
    const x2 = CENTER + TICK_RADIUS * Math.cos(angle);
    const y2 = CENTER + TICK_RADIUS * Math.sin(angle);
    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={i % 5 === 0 ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))'}
        strokeWidth={i % 5 === 0 ? 2 : 1}
        strokeLinecap="round"
        opacity={i % 5 === 0 ? 0.8 : 0.5}
      />
    );
  });

  // SVG custom frame (ornate, iconic)
  // You can replace the path below with a more iconic/ornate SVG if desired
  const frame = (
    <ellipse
      cx={CENTER}
      cy={CENTER}
      rx={CENTER - 2}
      ry={CENTER - 2}
      fill="url(#clockGradient)"
      stroke="hsl(var(--primary))"
      strokeWidth="3"
      filter="url(#frameShadow)"
    />
  );

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <svg
        width={CLOCK_SIZE}
        height={CLOCK_SIZE}
        viewBox={`0 0 ${CLOCK_SIZE} ${CLOCK_SIZE}`}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <radialGradient id="clockGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#f3f3f3" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e2e2e2" stopOpacity="1" />
          </radialGradient>
          <filter id="frameShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.12" />
          </filter>
        </defs>
        {frame}
        {ticks}
        {numbers}
        {/* Center dot background for clarity */}
        <circle cx={CENTER} cy={CENTER} r={7} fill="#fff" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      </svg>
      {/* Hands above SVG for clarity */}
      <div
        className="absolute left-1/2 top-1/2 z-10"
        style={{ width: 0, height: 0 }}
      >
        {/* Hour hand */}
        <div
          className="origin-bottom absolute left-1/2 top-1/2 bg-foreground rounded"
          style={{
            width: 6,
            height: 28,
            marginLeft: -3,
            marginTop: -28,
            transform: `rotate(${hourHandRotation}deg)`,
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.10)',
          }}
        />
        {/* Minute hand */}
        <div
          className="origin-bottom absolute left-1/2 top-1/2 bg-foreground rounded"
          style={{
            width: 4,
            height: 38,
            marginLeft: -2,
            marginTop: -38,
            transform: `rotate(${minuteHandRotation}deg)`,
            boxShadow: '0 1px 4px 0 rgba(0,0,0,0.08)',
          }}
        />
        {/* Second hand */}
        <div
          className="origin-bottom absolute left-1/2 top-1/2 bg-primary"
          style={{
            width: 2,
            height: 44,
            marginLeft: -1,
            marginTop: -44,
            transform: `rotate(${secondHandRotation}deg)`,
            borderRadius: 2,
            boxShadow: '0 0.5px 2px 0 rgba(0,0,0,0.10)',
          }}
        />
        {/* Center cap */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 14,
            height: 14,
            marginLeft: -7,
            marginTop: -7,
            background: 'radial-gradient(circle, #fff 60%, hsl(var(--primary)) 100%)',
            border: '2px solid hsl(var(--primary))',
            borderRadius: '50%',
            zIndex: 20,
          }}
        />
      </div>
    </div>
  );
};

export default Clock;
