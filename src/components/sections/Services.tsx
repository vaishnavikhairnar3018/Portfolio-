import { useState, type ReactNode } from 'react';
import './Services.css';

type ServiceItem = {
  id: string;
  title: string;
  colorClass: string;
  bgHex: string;
  accentHex: string;
  iconSvg: ReactNode;
  description: string;
  deliverables: string[];
};

const SERVICES: ServiceItem[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web Engineering',
    colorClass: 'service-pill--pink',
    bgHex: '#fedcdd',
    accentHex: '#fd5d5c',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    description: 'Modern Next.js & React frontends connected to robust, type-safe APIs. Clean architectures designed to scale gracefully under heavy user load.',
    deliverables: ['Next.js 15 & React 19', 'TypeScript End-to-End', 'State Management & Caching', 'Edge Deployment & SSR'],
  },
  {
    id: 'webgl-3d',
    title: 'Creative Tech & 3D WebGL',
    colorClass: 'service-pill--blue',
    bgHex: '#bbdafe',
    accentHex: '#039cfb',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    description: 'Interactive 3D scenes, custom GLSL vertex & fragment shaders, and GPU-accelerated micro-animations running at solid 60 FPS across desktop and mobile.',
    deliverables: ['Three.js & WebGL', 'Custom GLSL Shaders', 'GSAP & Motion Physics', 'Canvas & SVG Interactive'],
  },
  {
    id: 'backend-cloud',
    title: 'Backend & Cloud Architecture',
    colorClass: 'service-pill--yellow',
    bgHex: '#f3ea9a',
    accentHex: '#fac900',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    description: 'Distributed microservices, resilient background queue workers, optimized SQL/NoSQL schemas, and fault-tolerant cloud setups that never miss an event.',
    deliverables: ['Node.js & Go Services', 'PostgreSQL & Redis Caching', 'Docker & CI/CD Pipelines', 'REST & GraphQL APIs'],
  },
  {
    id: 'ai-agents',
    title: 'AI & Agentic Workflows',
    colorClass: 'service-pill--mint',
    bgHex: '#c7f8d9',
    accentHex: '#34c75a',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M5 2h14v7h-7l7 7H5V9h7L5 2z" />
      </svg>
    ),
    description: 'Integrating LLM agents, vector retrieval (RAG), tool calling, and low-latency bidirectional WebSockets streaming into production products.',
    deliverables: ['LLM Orchestration & RAG', 'Vector DBs (Pinecone, pgvector)', 'Realtime WebSockets', 'Structured Outputs & Tools'],
  },
  {
    id: 'performance',
    title: 'Performance & Architecture Audits',
    colorClass: 'service-pill--lime',
    bgHex: '#e0fd72',
    accentHex: '#93ba06',
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    description: 'Eliminating render bottlenecks, diagnosing complex memory leaks, optimizing Core Web Vitals (LCP/INP), and refactoring bloated codebases.',
    deliverables: ['Core Web Vitals (LCP/INP)', 'Bundle Size Optimization', 'Memory Leak Profiling', 'Automated Test Suites'],
  },
];

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>('fullstack');

  const toggleService = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="creatie-services-section" id="capabilities" aria-label="Engineering Capabilities">
      {/* Decorative Doodles */}
      <svg className="services-doodle-spiral" viewBox="0 0 80 60" fill="none" aria-hidden="true">
        <path d="M10,45 C5,30 20,10 35,15 C50,20 55,40 40,50 C25,55 18,35 30,25" stroke="#fac900" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <svg className="services-doodle-shapes" viewBox="0 0 60 60" fill="none" aria-hidden="true">
        <path d="M10,15 C10,5 50,5 50,15 C50,25 10,25 10,15 Z" stroke="#c8ea1d" strokeWidth="3" />
        <path d="M15,22 C15,40 45,40 45,22" stroke="#c8ea1d" strokeWidth="3" />
      </svg>

      <div className="creatie-container">
        {/* Section Header */}
        <div className="creatie-section-header">
          <div className="section-sticker-pill sticker-pill--yellow">
            <span className="section-paperclip section-paperclip--yellow" aria-hidden="true" />
            <span className="section-sticker-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
              </svg>
            </span>
            <span className="section-sticker-label">Core Capabilities</span>
          </div>

          <h2 className="creatie-section-title">
            HOW I SHIP<br />PRODUCTION VALUE
          </h2>
        </div>

        {/* Expandable Pastel Capsule Pills */}
        <div className="services-accordion-stack">
          {SERVICES.map((service) => {
            const isExpanded = expandedId === service.id;
            return (
              <div
                key={service.id}
                className={`service-capsule-card ${service.colorClass} ${isExpanded ? 'service-capsule--expanded' : ''}`}
                style={{ backgroundColor: service.bgHex }}
              >
                <button
                  type="button"
                  className="service-capsule-bar"
                  onClick={() => toggleService(service.id)}
                  aria-expanded={isExpanded}
                >
                  <span className="service-title-text">{service.title}</span>

                  <span className="service-action-icon" style={{ backgroundColor: service.accentHex }}>
                    {service.iconSvg}
                  </span>
                </button>

                {isExpanded && (
                  <div className="service-expanded-content">
                    <p className="service-desc">{service.description}</p>
                    <div className="service-tags-row">
                      {service.deliverables.map((del) => (
                        <span key={del} className="service-tag-pill">
                          ✓ {del}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
