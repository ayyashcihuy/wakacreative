'use client';

import { CSSProperties, useEffect, useRef } from 'react';

interface WaterGradientBgProps {
  children?: React.ReactNode;
  className?: string;
}

export default function WaterGradientBg({ children, className = '' }: WaterGradientBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Enhanced color palette that matches #242424
    const colors = ['#242424', '#2d2d2d', '#353535', '#1a1a1a', '#0d0d0d'];

    // Array to store wave data
    const waves = Array.from({ length: 4 }, () => ({
      offset: Math.random() * 360,
      speed: 0.2 + Math.random() * 0.3,
      amplitude: 12 + Math.random() * 8,
      frequency: 0.015 + Math.random() * 0.01,
      colorIndex: Math.floor(Math.random() * colors.length),
    }));

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.016; // ~60fps
      
      let gradient = 'linear-gradient(135deg, ';
      
      waves.forEach((wave, index) => {
        const xShift = Math.sin((time * wave.frequency + index) * Math.PI) * wave.amplitude;
        const color = colors[wave.colorIndex];
        const position = (index * 25 + xShift) % 100;
        
        if (index === 0) {
          gradient += `${color} ${position}%`;
        } else {
          gradient += `, ${color} ${position}%`;
        }
      });
      
      gradient += ')';
      container.style.background = gradient;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-screen h-screen overflow-hidden bg-gradient-to-br from-[#242424] via-[#2d2d2d] to-black ${className}`}
      style={{
        willChange: 'background',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
      } as CSSProperties}
    >
      {/* Subtle 3D depth layer - using opacity only, no transforms */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(53,53,53,0.15) 0%, transparent 60%)',
          animation: 'breathe 8s ease-in-out infinite',
          willChange: 'opacity',
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 60% 70%, rgba(13,13,13,0.2) 0%, transparent 60%)',
          animation: 'breathe2 10s ease-in-out infinite',
          willChange: 'opacity',
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* CSS Animations - using opacity instead of transforms to prevent overflow */}
      <style>{`
        @keyframes breathe {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.35;
          }
        }

        @keyframes breathe2 {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.28;
          }
        }
      `}</style>
    </div>
  );
}
