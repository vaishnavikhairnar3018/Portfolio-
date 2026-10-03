import { useRef, useState, type ReactNode, type PointerEvent } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number; // 0 to 1, default ~0.25
  className?: string;
}

export function Magnetic({
  children,
  strength = 0.28,
  className = '',
}: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;

    setPosition({ x: dx, y: dy });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`magnetic-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        willChange: 'transform',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)'
          : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}
