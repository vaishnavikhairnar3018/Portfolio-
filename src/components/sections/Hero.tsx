import { useState } from 'react';
import { Magnetic } from '../react-bits';
import heroBg from '../../assets/nature-hills-sky-clouds-dawn-grass-field-tree-green-landscap.jpg';
import './Hero.css';

export function Hero() {
  const [activeDock, setActiveDock] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="creatie-hero" id="hero" aria-label="Hero Section">
      {/* ── Background Meadow Image ── */}
      <div className="creatie-hero-bg" aria-hidden="true">
        <img
          src={heroBg}
          alt="Lush green rolling hills and clouds"
          className="creatie-hero-bg-img"
        />
        <div className="creatie-hero-overlay" />
      </div>

      {/* ── Floating SVG Doodles & Confetti ── */}
      <div className="creatie-doodles" aria-hidden="true">
        {/* Yellow Spiral Doodle */}
        <svg className="doodle-spiral" viewBox="0 0 100 80" fill="none">
          <path
            d="M20,60 C10,40 25,15 45,20 C65,25 70,55 50,65 C30,75 20,45 35,35 C50,25 65,40 55,50"
            stroke="#fac900"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        {/* Green Wireframe Geometry */}
        <svg className="doodle-bowl" viewBox="0 0 120 120" fill="none">
          <path
            d="M25,45 C25,25 95,25 95,45 C95,65 25,65 25,45 Z"
            stroke="#c8ea1d"
            strokeWidth="4"
          />
          <path
            d="M25,50 C25,85 95,85 95,50"
            stroke="#c8ea1d"
            strokeWidth="4"
          />
          <path
            d="M35,80 C35,105 85,105 85,80"
            stroke="#c8ea1d"
            strokeWidth="4"
          />
        </svg>

        {/* Confetti & Floating Shapes */}
        <div className="confetti-shape confetti-zigzag" />
        <div className="confetti-shape confetti-diamond" />
        <div className="confetti-shape confetti-mint" />

        {/* Floating Paperclips */}
        <div className="floating-paperclip paperclip-blue" />
        <div className="floating-paperclip paperclip-pink" />
        <div className="floating-paperclip paperclip-mint" />
      </div>

      {/* ── Centerpiece Headline with Developer Slanted Stickers ── */}
      <div className="creatie-hero-center">
        {/* Slanted Floating Code Sticker */}
        <div className="sticker-badge sticker-uiux">
          <span className="paperclip-icon paperclip-icon--blue" aria-hidden="true" />
          <span className="sticker-dot sticker-dot--blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </span>
          <span className="sticker-text">Code</span>
        </div>

        <h1 className="creatie-hero-title">
          <span className="title-line">FROM FIRST</span>
          <span className="title-line title-line--flex">
            COMMIT TO
            {/* Inline Slanted Eat Sticker */}
            <span className="sticker-badge sticker-illustration">
              <span className="paperclip-icon paperclip-icon--pink" aria-hidden="true" />
              <span className="sticker-dot sticker-dot--pink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
                  <path d="M15 11v11" />
                  <path d="M6 2v10a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2" />
                  <path d="M8 14v8" />
                  <line x1="6" y1="6" x2="10" y2="6" />
                </svg>
              </span>
              <span className="sticker-text">Eat</span>
            </span>
          </span>
          <span className="title-line title-line--flex">
            {/* Inline Slanted Sleep Sticker */}
            <span className="sticker-badge sticker-3d">
              <span className="paperclip-icon paperclip-icon--purple" aria-hidden="true" />
              <span className="sticker-dot sticker-dot--purple">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </span>
              <span className="sticker-text">Sleep</span>
            </span>
            LIVE IN
          </span>
          <span className="title-line">PRODUCTION</span>
        </h1>
      </div>

      {/* ── Bottom Section Bar: Manifesto, Mac Dock, and Case Study ── */}
      <footer className="creatie-hero-bottom">
        {/* Left Manifesto */}
        <div className="creatie-manifesto">
          <div className="manifesto-copy">
            <p className="manifesto-sub">I build reliable software with clean architecture, a smooth user experience, and code that&apos;s easy to maintain.</p>
          </div>
        </div>

        {/* Center Mac-Style Frosted Glass Dock */}
        <nav className="creatie-mac-dock" role="navigation" aria-label="Quick Dock Navigation">
          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToSection('about')}
              className="dock-item"
              aria-label="About Me"
              onMouseEnter={() => setActiveDock('About')}
              onMouseLeave={() => setActiveDock(null)}
            >
              <img
                src="https://framerusercontent.com/images/fzS4akadFPHws9AEuhq2dRMEBD8.png"
                alt="About"
                className="dock-icon"
                width={48}
                height={48}
              />
              {activeDock === 'About' && <span className="dock-tooltip">About</span>}
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToSection('projects')}
              className="dock-item"
              aria-label="Projects"
              onMouseEnter={() => setActiveDock('Projects')}
              onMouseLeave={() => setActiveDock(null)}
            >
              <img
                src="https://framerusercontent.com/images/fuyFscQ2e4cEmcASIC0c9KSsI.png"
                alt="Projects"
                className="dock-icon"
                width={48}
                height={48}
              />
              {activeDock === 'Projects' && <span className="dock-tooltip">Projects</span>}
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToSection('capabilities')}
              className="dock-item"
              aria-label="Services & Skills"
              onMouseEnter={() => setActiveDock('Skills')}
              onMouseLeave={() => setActiveDock(null)}
            >
              <img
                src="https://framerusercontent.com/images/8UW4wd69DBrZGI2hFpAtJfsRLs.png"
                alt="Skills"
                className="dock-icon"
                width={48}
                height={48}
              />
              {activeDock === 'Skills' && <span className="dock-tooltip">Skills</span>}
            </button>
          </Magnetic>

          <Magnetic strength={0.3}>
            <button
              onClick={() => scrollToSection('contact')}
              className="dock-item dock-item--badge"
              aria-label="Contact"
              onMouseEnter={() => setActiveDock('Contact')}
              onMouseLeave={() => setActiveDock(null)}
            >
              <img
                src="https://framerusercontent.com/images/e3MMo36Gb3GoSAC2U8QX2JiQY.png"
                alt="Contact"
                className="dock-icon"
                width={48}
                height={48}
              />
              {activeDock === 'Contact' && <span className="dock-tooltip">Contact</span>}
            </button>
          </Magnetic>
        </nav>

        {/* Right Balance Spacer */}
        <div className="creatie-bottom-spacer" aria-hidden="true" />
      </footer>
    </section>
  );
}
