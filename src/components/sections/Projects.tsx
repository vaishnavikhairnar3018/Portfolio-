import { useState } from 'react';
import './Projects.css';

export type CreatieProject = {
  id: string;
  name: string;
  category: string;
  summary: string;
  metric: string;
  tags: string[];
  image: string;
  tilt: number;
  clipColor: 'blue' | 'green' | 'yellow' | 'pink' | 'purple';
  liveUrl: string;
  githubUrl: string;
};

const CREATIE_PROJECTS: CreatieProject[] = [
  {
    id: 'loom',
    name: 'Loom AI Studio',
    category: 'AI Architecture · Full Stack',
    summary: 'Intelligent writing companion with local-first vector memory and sub-200ms streaming inference.',
    metric: '⚡ 180ms P99 Latency',
    tags: ['Next.js 15', 'Vercel AI SDK', 'pgvector', 'TypeScript'],
    image: 'https://cdn.dribbble.com/userupload/46128964/file/b92b9d268dd928642ca94bd49e32923a.jpg?resize=752x497&vertical=center',
    tilt: -2,
    clipColor: 'blue',
    liveUrl: 'https://loom-ai.dev',
    githubUrl: 'https://github.com/vaishnavi/loom-ai',
  },
  {
    id: 'atlas',
    name: 'Atlas 3D Engine',
    category: 'Creative Tech · Three.js & WebGL',
    summary: 'Procedural 3D planetary terrain generator rendering 100k+ instanced particles at solid 60 FPS.',
    metric: '🎮 60 FPS on Mobile',
    tags: ['Three.js', 'WebGL 2.0', 'GLSL Shaders', 'React 19'],
    image: 'https://cdn.dribbble.com/userupload/24599416/file/original-1ae5075dcd129aebb16bdbca24b41ac7.png?resize=1024x768&vertical=center',
    tilt: 1.5,
    clipColor: 'green',
    liveUrl: 'https://atlas-3d.dev',
    githubUrl: 'https://github.com/vaishnavi/atlas-engine',
  },
  {
    id: 'rhythm',
    name: 'Rhythm Stream DB',
    category: 'Distributed Systems · Go & Timescale',
    summary: 'High-throughput time-series telemetry pipeline processing 40M+ sensor events per day.',
    metric: '📊 40M Events / Day',
    tags: ['Go', 'TimescaleDB', 'Redis Streams', 'Docker'],
    image: 'https://cdn.dribbble.com/userupload/47357856/file/75841fa59f32f05ca6c5ddf02d08dfe6.png?resize=1024x768&vertical=center',
    tilt: -1.2,
    clipColor: 'yellow',
    liveUrl: 'https://rhythm-db.dev',
    githubUrl: 'https://github.com/vaishnavi/rhythm-db',
  },
  {
    id: 'fieldnote',
    name: 'Fieldnote Studio',
    category: 'Frontend Engineering · Offline PWA',
    summary: 'Collaborative offline-first workspace with peer-to-peer CRDT state sync and IndexedDB caching.',
    metric: '🔄 Realtime CRDT Sync',
    tags: ['React 19', 'Yjs / CRDT', 'IndexedDB', 'Web Workers'],
    image: 'https://cdn.dribbble.com/userupload/30310902/file/original-621e7fe47be9d11ee14544456c693bec.png?resize=1024x768&vertical=center',
    tilt: 2.2,
    clipColor: 'pink',
    liveUrl: 'https://fieldnote.dev',
    githubUrl: 'https://github.com/vaishnavi/fieldnote-pwa',
  },
  {
    id: 'talkback',
    name: 'Talkback AI Voice',
    category: 'AI Infrastructure · Realtime Audio',
    summary: 'Low-latency bidirectional voice agent with edge speech-to-text and streaming WebSocket synthesis.',
    metric: '🎙️ <220ms Speech RTT',
    tags: ['Python', 'FastAPI', 'WebSockets', 'Transformers'],
    image: 'https://cdn.dribbble.com/userupload/16560717/file/original-c6f745d50302d66609bfe080f99f5396.png?resize=1024x768&vertical=center',
    tilt: -1.8,
    clipColor: 'purple',
    liveUrl: 'https://talkback-voice.dev',
    githubUrl: 'https://github.com/vaishnavi/talkback-ai',
  },
  {
    id: 'groove',
    name: 'Groove Flow SaaS',
    category: 'Product Engineering · Payments & API',
    summary: 'Multi-tenant usage-metered subscription billing engine handling automated invoicing and webhooks.',
    metric: '💳 99.99% Uptime',
    tags: ['Node.js', 'Stripe Connect', 'PostgreSQL', 'Tailwind'],
    image: 'https://cdn.dribbble.com/userupload/43955214/file/original-d4cde1de803e84b97d8892e3444c04b0.png?resize=1024x768&vertical=center',
    tilt: 1.2,
    clipColor: 'blue',
    liveUrl: 'https://grooveflow.dev',
    githubUrl: 'https://github.com/vaishnavi/groove-flow',
  },
];

export function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="creatie-projects-section" id="projects" aria-label="Selected Engineering Work">
      <div className="creatie-container">
        {/* ── Section Header with Paperclip Sticker ── */}
        <div className="creatie-section-header">
          <div className="section-sticker-pill sticker-pill--blue">
            <span className="section-paperclip section-paperclip--blue" aria-hidden="true" />
            <span className="section-sticker-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M4 6h16v12H4z" />
                <path d="M8 2v4M16 2v4" />
              </svg>
            </span>
            <span className="section-sticker-label">Selected Work</span>
          </div>

          <h2 className="creatie-section-title">
            CODE THAT POWERS<br />PRODUCTION APPS
          </h2>
        </div>

        {/* ── Paperclip Tilted Browser Cards ── */}
        <div className="creatie-cards-layout">
          {CREATIE_PROJECTS.map((project) => {
            const isHovered = hoveredId === project.id;
            return (
              <article
                key={project.id}
                className="paperclip-browser-card"
                style={{
                  transform: isHovered ? 'translateY(-8px) rotate(0deg) scale(1.02)' : `rotate(${project.tilt}deg)`,
                }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Physical Paperclip clipped over top edge */}
                <span className={`card-top-paperclip paperclip--${project.clipColor}`} aria-hidden="true" />

                {/* Browser Window Header */}
                <div className="browser-card-header">
                  <div className="browser-dots" aria-hidden="true">
                    <span className="dot dot--red" />
                    <span className="dot dot--yellow" />
                    <span className="dot dot--green" />
                  </div>
                  <div className="browser-url-bar">
                    <span className="url-lock">&#128274;</span>
                    <span className="url-text">{project.id}.vaishnavi.dev</span>
                  </div>
                  <span className="browser-metric-pill">{project.metric}</span>
                </div>

                {/* Mockup Visual */}
                <div className="browser-image-wrapper">
                  <img
                    src={project.image}
                    alt={`${project.name} Architecture`}
                    loading="lazy"
                    className="browser-mockup-img"
                  />
                </div>

                {/* Card Meta Body & Footer */}
                <div className="browser-card-body">
                  <div className="card-brand-group">
                    <h3 className="card-project-name">{project.name}</h3>
                    <span className="card-project-cat">{project.category}</span>
                  </div>

                  <p className="card-project-summary">{project.summary}</p>

                  <div className="card-tags-group">
                    {project.tags.map((tag) => (
                      <span key={tag} className="card-mini-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <footer className="card-actions-bar">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-action-btn card-action-btn--demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Demo ↗
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-action-btn card-action-btn--code"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Code ↗
                    </a>
                  </footer>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
