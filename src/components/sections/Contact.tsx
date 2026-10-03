import { useState } from 'react';
import './Contact.css';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const email = 'vaishnavi@email.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="creatie-contact-section" id="contact" aria-label="Contact & Hire Me">
      <div className="creatie-container">
        {/* Section Header with Paperclip Sticker */}
        <div className="creatie-section-header">
          <div className="section-sticker-pill sticker-pill--purple">
            <span className="section-paperclip section-paperclip--purple" aria-hidden="true" />
            <span className="section-sticker-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </span>
            <span className="section-sticker-label">Engineering Inquiries</span>
          </div>

          <h2 className="creatie-section-title">
            LET’S DISCUSS<br />YOUR NEXT BUILD
          </h2>

          <p className="creatie-contact-sub">
            Looking for a senior full-stack engineer to lead architecture, ship a high-performance 3D WebGL experience, or scale your distributed backend? Let's connect.
          </p>
        </div>

        {/* Papercraft Contact Card */}
        <div className="contact-paper-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group-row">
              <div className="form-field">
                <label htmlFor="name" className="field-label">YOUR NAME / COMPANY</label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Jane Doe (Tech Lead / Founder)"
                  className="creatie-input"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="field-label">WORK EMAIL ADDRESS</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="creatie-input"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="services" className="field-label">PROJECT SCOPE OR INQUIRY</label>
              <select id="services" className="creatie-input creatie-select">
                <option value="fullstack">Full-Stack Web App (Next.js 15 / React 19 / TypeScript)</option>
                <option value="3d-webgl">Creative Tech & 3D WebGL (Three.js / Custom GLSL Shaders)</option>
                <option value="backend">Backend & Distributed Systems (Go / PostgreSQL / Redis)</option>
                <option value="ai-agents">AI & Agentic Workflows (Vercel AI SDK / Vector RAG)</option>
                <option value="audit">Performance & Web Vitals Audit (LCP / INP / Memory Profiling)</option>
                <option value="role">Full-Time Senior / Staff Engineering Role</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="message" className="field-label">PROJECT OR ROLE DETAILS</label>
              <textarea
                id="message"
                rows={4}
                required
                placeholder="Share your architecture goals, tech stack, timeline, or team requirements..."
                className="creatie-input creatie-textarea"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="creatie-submit-btn">
                {submitted ? 'Message Sent! ✓' : 'Send Message ↗'}
              </button>

              <button
                type="button"
                onClick={copyEmail}
                className="creatie-copy-email-btn"
                aria-label="Copy email address"
              >
                {copied ? 'Copied to Clipboard! ✓' : 'Copy Email Address'}
              </button>
            </div>
          </form>

          {/* Direct Social Channels */}
          <div className="contact-social-bar">
            <span className="social-bar-label">ENGINEERING PROFILES & CONNECT:</span>
            <div className="social-pill-group">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                GitHub ↗
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill">
                LinkedIn ↗
              </a>
              <a href="mailto:vaishnavi@email.com" className="social-pill">
                Email ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
