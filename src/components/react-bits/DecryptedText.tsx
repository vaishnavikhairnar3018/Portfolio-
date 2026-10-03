import { useState, useEffect, useRef, useCallback } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  className?: string;
  characters?: string;
  triggerOn?: 'view' | 'hover' | 'both';
}

const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function DecryptedText({
  text,
  speed = 35,
  maxIterations = 10,
  sequential = true,
  className = '',
  characters = DEFAULT_CHARS,
  triggerOn = 'both',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  const startAnimation = useCallback(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayText(text);
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    const charArray = text.split('');

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() =>
        charArray
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (sequential) {
              const settledThreshold = Math.floor((iteration / (maxIterations * charArray.length)) * charArray.length);
              if (index < settledThreshold) {
                return text[index];
              }
            } else {
              if (iteration > maxIterations) {
                return text[index];
              }
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iteration += 1;
      const totalRequired = sequential ? maxIterations * charArray.length : maxIterations + 1;
      if (iteration >= totalRequired) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  }, [text, speed, maxIterations, sequential, characters]);

  // View intersection trigger
  useEffect(() => {
    if (triggerOn === 'hover') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredRef.current) {
            hasTriggeredRef.current = true;
            startAnimation();
          }
        });
      },
      { threshold: 0.2 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAnimation, triggerOn]);

  const handleMouseEnter = () => {
    if (triggerOn === 'view') return;
    setIsHovering(true);
    startAnimation();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <span
      ref={containerRef}
      className={`decrypted-text ${className} ${isHovering ? 'decrypted-text--active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
      style={{ display: 'inline-block' }}
    >
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}
