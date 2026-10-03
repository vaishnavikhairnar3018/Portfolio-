import { useRef, useEffect, useState, type ReactNode } from 'react';
import './VariableProximity.css';

interface VariableProximityProps {
  children: ReactNode;
  className?: string;
  radius?: number;
}

export function VariableProximity({
  children,
  className = '',
  radius = 160,
}: VariableProximityProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handlePointerMove = (e: PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerLeave = () => {
      setMousePos(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (el) el.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`variable-proximity-container ${className}`}>
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <ProximityItem key={idx} mousePos={mousePos} radius={radius}>
              {child}
            </ProximityItem>
          ))
        : <ProximityItem mousePos={mousePos} radius={radius}>{children}</ProximityItem>}
    </div>
  );
}

function ProximityItem({
  children,
  mousePos,
  radius,
}: {
  children: ReactNode;
  mousePos: { x: number; y: number } | null;
  radius: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [proximity, setProximity] = useState(0);

  useEffect(() => {
    if (!itemRef.current || !mousePos) {
      setProximity(0);
      return;
    }

    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dist = Math.hypot(mousePos.x - centerX, mousePos.y - centerY);
    if (dist < radius) {
      const factor = 1 - dist / radius;
      setProximity(Math.max(0, Math.min(1, factor)));
    } else {
      setProximity(0);
    }
  }, [mousePos, radius]);

  return (
    <div
      ref={itemRef}
      className="proximity-item"
      style={
        {
          '--proximity': proximity,
          transform: `translate3d(0, -${proximity * 3}px, 0) scale(${1 + proximity * 0.04})`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
