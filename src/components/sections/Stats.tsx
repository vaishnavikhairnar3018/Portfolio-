import './Stats.css';

type StatCard = {
  value: string;
  label: string;
  desc: string;
  cornerColor: 'lime' | 'cyan' | 'orange' | 'purple';
};

const STATS_DATA: StatCard[] = [
  {
    value: '6+',
    label: 'Years of Production Code',
    desc: 'Building high-scale web apps, distributed microservices, and 60 FPS WebGL graphics systems.',
    cornerColor: 'lime',
  },
  {
    value: '50+',
    label: 'Zero-Downtime Releases',
    desc: 'Shipped mission-critical enterprise features and open-source packages with 99.98% uptime SLA.',
    cornerColor: 'cyan',
  },
  {
    value: '10M+',
    label: 'Monthly Requests Handled',
    desc: 'Engineered resilient caching layers, connection pools, and database schemas under high throughput.',
    cornerColor: 'orange',
  },
  {
    value: '< 50ms',
    label: 'Median API Response',
    desc: 'Obsessively profiled network round-trips, bundle payloads, and edge worker functions to minimize latency.',
    cornerColor: 'purple',
  },
];

const TECH_STACK_GROUPS = [
  {
    category: 'Languages & Core',
    items: ['TypeScript', 'JavaScript (ESNext)', 'Go (Golang)', 'Python', 'SQL (PostgreSQL)', 'GLSL / WebGL'],
    accent: '#039cfb',
  },
  {
    category: 'Frontend & 3D WebGL',
    items: ['React 19', 'Next.js 15 (App Router)', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion'],
    accent: '#34c75a',
  },
  {
    category: 'Backend & Cloud Systems',
    items: ['Node.js & Fastify', 'Go Fiber & Gin', 'PostgreSQL & Timescale', 'Redis & BullMQ', 'Docker & K8s', 'AWS & Cloudflare'],
    accent: '#fac900',
  },
  {
    category: 'AI & Testing Tooling',
    items: ['Vercel AI SDK', 'LangChain', 'pgvector & Pinecone', 'Vitest & Playwright', 'Git / GitHub CI/CD', 'Chrome DevTools'],
    accent: '#ec68fd',
  },
];

export function Stats() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="creatie-about-section" id="about" aria-label="About & Engineering Track Record">
      <div className="creatie-container">
        {/* Section Header with Paperclip Sticker */}
        <div className="creatie-section-header">
          <div className="section-sticker-pill sticker-pill--cyan">
            <span className="section-paperclip section-paperclip--cyan" aria-hidden="true" />
            <span className="section-sticker-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </span>
            <span className="section-sticker-label">Engineering Philosophy</span>
          </div>

          <h2 className="creatie-section-title">
            PRAGMATIC CODE.<br />MEASURABLE SCALE.
          </h2>

          <p className="creatie-about-sub">
            From zero-to-one prototypes to high-scale production systems, I write clean, maintainable,
            and tested code that engineering teams love to build on and ship with confidence.
          </p>

          <button onClick={scrollToContact} className="creatie-about-cta">
            Hire Me / Start a Project
          </button>
        </div>

        {/* 4 Folded Paper / Sticky Note Stat Cards */}
        <div className="creatie-stats-grid">
          {STATS_DATA.map((stat, i) => (
            <article key={i} className="sticky-stat-card">
              {/* Folded Color Corner Tab */}
              <div className={`folded-corner-tab tab--${stat.cornerColor}`} aria-hidden="true" />

              <div className="stat-card-inner">
                <span className="stat-number">{stat.value}</span>
                <h3 className="stat-label">{stat.label}</h3>
                <p className="stat-description">{stat.desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Tech Stack & Arsenal Showcase */}
        <div className="creatie-stack-showcase">
          <span className="stack-top-paperclip" aria-hidden="true" />
          <div className="stack-showcase-header">
            <h3 className="stack-showcase-title">TECHNICAL ARSENAL & TOOLKIT</h3>
            <span className="stack-showcase-subtitle">
              Production technologies used across full-stack architecture, 3D graphics, and distributed systems.
            </span>
          </div>

          <div className="stack-categories-grid">
            {TECH_STACK_GROUPS.map((group) => (
              <div key={group.category} className="stack-group-card">
                <h4 className="stack-group-title" style={{ borderLeftColor: group.accent }}>
                  {group.category}
                </h4>
                <div className="stack-chips-wrap">
                  {group.items.map((tech) => (
                    <span key={tech} className="stack-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
