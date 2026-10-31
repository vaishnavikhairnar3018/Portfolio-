import { useEffect, useRef, useState, type CSSProperties } from 'react';
import portrait from '../../assets/id_card_portrait.jpg';
import orchid from '../../assets/orchid_bloom.jpg';
import './AboutMe.css';

const SKILLS = [
  { label: 'Full Stack Apps', emoji: '🧩', color: 'yellow' },
  { label: 'AI Agents', emoji: '🤖', color: 'green' },
  { label: 'React & TypeScript', emoji: '⚛️', color: 'pink' },
  { label: 'Python & FastAPI', emoji: '🐍', color: 'blue' },
] as const;

export function AboutMe() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`vk-about ${visible ? 'vk-about--in' : ''}`}
      id="whoami"
      aria-labelledby="vk-about-title"
    >
      {/* Hand-drawn arc divider */}
      <div className="vk-about-arc" aria-hidden="true">
        <svg viewBox="0 0 1200 90" preserveAspectRatio="none">
          <path d="M0 80 C 300 10, 900 10, 1200 70" />
        </svg>
        <span>about me!</span>
      </div>

      <div className="vk-about-inner">
        <figure className="vk-polaroid vk-polaroid--left vk-reveal" style={{ '--d': '0.15s' } as CSSProperties}>
          <span className="vk-tape vk-tape--l" aria-hidden="true" />
          <span className="vk-tape vk-tape--r" aria-hidden="true" />
          <img src={portrait} alt="Vaishnavi smiling" />
          <figcaption>that&apos;s me ✿</figcaption>
        </figure>

        <figure className="vk-polaroid vk-polaroid--right vk-reveal" style={{ '--d': '0.3s' } as CSSProperties}>
          <span className="vk-tape vk-tape--l" aria-hidden="true" />
          <span className="vk-tape vk-tape--r" aria-hidden="true" />
          <img src={orchid} alt="A pink orchid in bloom" />
          <figcaption>bugs &amp; blooms</figcaption>
        </figure>

        <h2 id="vk-about-title" className="vk-about-title vk-reveal">
          <span aria-hidden="true">$</span> whoami
        </h2>

        <p className="vk-about-copy vk-reveal" style={{ '--d': '0.1s' } as CSSProperties}>
          I&apos;m a full stack developer who gets a little too excited about making AI
          tell the truth. <span className="vk-emoji">🔍</span> I love clean architecture,
          the tiny UI details nobody notices, and shipping things people actually use,
          from fact-checking agents to a space &amp; music explorer.
          <span className="vk-emoji">🌌</span> Powered by chai and console.logs.
          <span className="vk-emoji">☕</span>
        </p>

        <ul className="vk-tapes" aria-label="What I work on">
          {SKILLS.map((s, i) => (
            <li
              key={s.label}
              className={`vk-tape-label vk-tape-label--${s.color} vk-reveal`}
              style={{ '--d': `${0.25 + i * 0.1}s` } as CSSProperties}
            >
              <span className="vk-tape-text">{s.label}</span>
              <span className="vk-tape-chip" aria-hidden="true">{s.emoji}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
