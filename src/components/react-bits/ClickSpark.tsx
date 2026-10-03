import { useEffect, useRef, type ReactNode } from 'react';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface ClickSparkProps {
  children?: ReactNode;
  sparkColor?: string | string[];
  sparkCount?: number;
  sparkSize?: number;
  duration?: number;
}

const DEFAULT_COLORS = ['#22c55e', '#38bdf8', '#4ade80', '#ffffff'];

export function ClickSpark({
  children,
  sparkColor = DEFAULT_COLORS,
  sparkCount = 8,
  sparkSize = 2.5,
  duration = 320,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to window
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const colors = Array.isArray(sparkColor) ? sparkColor : [sparkColor];

    const handleClick = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const clickX = e.clientX;
      const clickY = e.clientY;

      const newSparks: Spark[] = [];
      const angleStep = (Math.PI * 2) / sparkCount;

      for (let i = 0; i < sparkCount; i++) {
        const baseAngle = i * angleStep;
        const angle = baseAngle + (Math.random() - 0.5) * 0.4;
        const speed = 2.2 + Math.random() * 2.4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const maxLife = duration / 16; // ~20 frames

        newSparks.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: sparkSize * (0.8 + Math.random() * 0.5),
          color,
          alpha: 1,
          life: 0,
          maxLife,
        });
      }

      sparksRef.current.push(...newSparks);

      if (!animFrameRef.current) {
        animate();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const remaining: Spark[] = [];

      for (const spark of sparksRef.current) {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vx *= 0.94;
        spark.vy *= 0.94;
        spark.life += 1;
        spark.alpha = Math.max(0, 1 - spark.life / spark.maxLife);

        if (spark.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = spark.alpha;
          ctx.fillStyle = spark.color;
          ctx.shadowColor = spark.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, spark.size * spark.alpha, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          remaining.push(spark);
        }
      }

      sparksRef.current = remaining;

      if (remaining.length > 0) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        animFrameRef.current = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [sparkColor, sparkCount, sparkSize, duration]);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        aria-hidden="true"
      />
      {children}
    </>
  );
}
