import { useEffect, useRef, useState, type CSSProperties } from 'react';
import goldStar from '../../assets/real_gold_star.png';
import './Hero.css';

const SPLASH_KEY = 'vk-splash-seen';
const SPLASH_FIRST = 'Oh, hello world!';
const SPLASH_SECOND = 'You found me ✿';
const NAME = 'VAISHNAVI';

// Show the terminal intro once per browser session.
function shouldShowSplash() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (sessionStorage.getItem(SPLASH_KEY)) return false;
    sessionStorage.setItem(SPLASH_KEY, '1');
  } catch {
    // storage blocked: still show the intro
  }
  return true;
}

function typed(text: string, startMs: number, stepMs: number) {
  return [...text].map((ch, i) => (
    <span key={i} className="vk-type-char" style={{ animationDelay: `${startMs + i * stepMs}ms` }}>
      {ch === ' ' ? ' ' : ch}
    </span>
  ));
}

const delay = (s: number) => ({ '--d': `${s}s` }) as CSSProperties;

// Inverting selection box that follows the cursor while it is over the name block.
function useInspectLens() {
  const groupRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const group = groupRef.current;
    const lens = lensRef.current;
    if (!group || !lens || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const wide = window.matchMedia('(min-width: 1024px)');
    const hide = () => group.classList.remove('vk-name-group--lens');

    const onMove = (e: PointerEvent) => {
      if (!wide.matches) return;
      const rect = group.getBoundingClientRect();
      lens.style.left = `${e.clientX - rect.left}px`;
      lens.style.top = `${e.clientY - rect.top}px`;
      group.classList.add('vk-name-group--lens');
    };

    group.addEventListener('pointermove', onMove);
    group.addEventListener('pointerleave', hide);
    window.addEventListener('scroll', hide, { passive: true });
    return () => {
      group.removeEventListener('pointermove', onMove);
      group.removeEventListener('pointerleave', hide);
      window.removeEventListener('scroll', hide);
    };
  }, []);

  return { groupRef, lensRef };
}

export function Hero() {
  const [showSplash, setShowSplash] = useState(shouldShowSplash);
  const { groupRef, lensRef } = useInspectLens();

  return (
    <section
      className={`vk-hero ${showSplash ? 'vk-hero--intro' : ''}`}
      id="hero"
      aria-label="Introduction"
    >

      {showSplash && (
        <div
          className="vk-splash"
          aria-hidden="true"
          onAnimationEnd={(e) => {
            if (e.animationName === 'vk-splash-out') setShowSplash(false);
          }}
        >
          <div className="vk-chat">
            <p className="vk-chat-bubble vk-chat-bubble--first">{typed(SPLASH_FIRST, 150, 45)}</p>
            <p className="vk-chat-bubble vk-chat-bubble--second">{typed(SPLASH_SECOND, 950, 45)}</p>
          </div>
        </div>
      )}

      {/* ── Floating décor ── */}
      <div className="vk-decor" aria-hidden="true">
        <img src={goldStar} alt="" className="vk-star vk-pop" style={delay(1.3)} />
        <span className="vk-curly vk-pop" style={delay(1.4)}>{'{ }'}</span>
      </div>

      <div className="vk-hero-inner">
        {/* Name block: the inspect lens only works in here */}
        <div ref={groupRef} className="vk-name-group">
          <span ref={lensRef} className="vk-lens" aria-hidden="true">
            <i /><i /><i /><i />
          </span>

          <p className="vk-hello vk-pop" style={delay(0.1)}>
            hello world, i&apos;m
            <svg viewBox="0 0 120 14" className="vk-scribble" aria-hidden="true">
              <path d="M3 9 C 25 3, 55 3, 80 7 S 110 10, 117 5" />
              <path d="M18 12 C 40 9, 70 9, 98 11" />
            </svg>
          </p>

          <div className="vk-name-stage">
            <span className="vk-sticker vk-sticker--mint vk-pop" style={delay(0.7)}>
              console.log(&apos;hi&apos;)
            </span>
            <span className="vk-sticker vk-sticker--yellow vk-pop" style={delay(0.8)}>
              git commit -m &quot;ship it&quot;
            </span>

            <h1 className="vk-name">
              <span className="visually-hidden">Vaishnavi Khairnar</span>
              <span className="vk-name-letters" aria-hidden="true">
                {[...NAME].map((ch, i) => (
                  <span key={i} className="vk-letter" style={delay(0.25 + i * 0.08)}>{ch}</span>
                ))}
                <span className="vk-name-cursor" />
              </span>
            </h1>

            <div className="vk-note vk-note--yellow vk-pop" style={delay(0.9)}>
              <span className="vk-clip" aria-hidden="true" />
              Full Stack Developer
              <svg className="vk-arrow vk-arrow--left" viewBox="0 0 50 40" aria-hidden="true">
                <path d="M4 36 C 18 30, 30 20, 42 6 M30 7 L42 6 L41 18" />
              </svg>
            </div>
            <div className="vk-note vk-note--mint vk-pop" style={delay(1.0)}>
              <span className="vk-clip vk-clip--pink" aria-hidden="true" />
              India · remote ok
              <svg className="vk-arrow vk-arrow--right" viewBox="0 0 50 40" aria-hidden="true">
                <path d="M46 36 C 32 30, 20 20, 8 6 M20 7 L8 6 L9 18" />
              </svg>
            </div>
          </div>
        </div>

        <p className="vk-status vk-pop" style={delay(1.0)}>
          <span className="vk-status-dot" aria-hidden="true" />
          status 200 · open to new work &amp; good bugs
        </p>

        <h2 className="vk-headline vk-pop" style={delay(1.15)}>
          I build software that
          <span className="vk-ring" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="vk-ring-path" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
              </defs>
              <text><textPath href="#vk-ring-path">ship · debug · repeat · ship · debug · repeat ·</textPath></text>
            </svg>
            <b>&lt;/&gt;</b>
          </span>
          <br />
          <em>thinks</em> before it speaks.
          <span className="vk-flower" aria-hidden="true">✿</span>
        </h2>

        <div className="vk-ctas vk-pop" style={delay(1.3)}>
          <a href="#contact" className="vk-btn vk-btn--dark">
            <span className="vk-btn-icon" aria-hidden="true">$</span>
            say-hello
          </a>
          <a href="#projects" className="vk-btn vk-btn--ghost">
            view my work ↓
          </a>
        </div>
      </div>
    </section>
  );
}
