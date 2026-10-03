import { useRef, useState, type PointerEvent, type ReactNode, type HTMLAttributes } from 'react';
import './SpotlightCard.css';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(34, 197, 94, 0.14)',
  spotlightSize = 340,
  style,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    setOpacity(1);
  };

  const handlePointerLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`spotlight-card ${className}`}
      style={
        {
          ...style,
          '--spotlight-x': `${position.x}px`,
          '--spotlight-y': `${position.y}px`,
          '--spotlight-color': spotlightColor,
          '--spotlight-size': `${spotlightSize}px`,
          '--spotlight-opacity': opacity,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="spotlight-card-glow" aria-hidden="true" />
      <div className="spotlight-card-content">{children}</div>
    </div>
  );
}
