import { skills } from '../../data/portfolio';
import { SpotlightCard, DecryptedText } from '../react-bits';
import './Skills.css';

function CodeBracketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  );
}

const categoryMeta = {
  frontend: {
    title: 'Frontend Engineering',
    desc: 'Crafting responsive, high-performance web applications with modern frameworks.',
    icon: CodeBracketIcon,
    accent: 'emerald',
    spotlight: 'rgba(34, 197, 94, 0.14)',
  },
  backend: {
    title: 'Backend & Systems',
    desc: 'Scalable APIs, database architectures, and distributed microservices.',
    icon: ServerIcon,
    accent: 'sky',
    spotlight: 'rgba(56, 189, 248, 0.14)',
  },
  tools: {
    title: 'DevOps & Tooling',
    desc: 'Automated CI/CD pipelines, containerization, and cloud infrastructure.',
    icon: WrenchIcon,
    accent: 'amber',
    spotlight: 'rgba(245, 158, 11, 0.14)',
  },
};

export function Skills() {
  const categories = Object.keys(skills) as Array<keyof typeof skills>;

  return (
    <section id="capabilities" className="skills-section" aria-label="Capabilities and Tech Stack">
      <div id="skills" className="visually-hidden" />
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">
            <DecryptedText text="// capabilities" speed={28} />
          </span>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="section-desc">
            A comprehensive overview of programming languages, frameworks, and developer tools I utilize to build production software.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="skills-categories-grid">
          {categories.map((catKey) => {
            const meta = categoryMeta[catKey];
            const list = skills[catKey];
            const Icon = meta.icon;

            return (
              <SpotlightCard
                key={catKey}
                className={`skill-category-card skill-category--${meta.accent}`}
                spotlightColor={meta.spotlight}
                spotlightSize={320}
              >
                <div className="skill-cat-header">
                  <div className="skill-cat-icon">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="skill-cat-title">{meta.title}</h3>
                    <p className="skill-cat-desc">{meta.desc}</p>
                  </div>
                </div>

                <div className="skills-list">
                  {list.map((skill) => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-info">
                        <span className="skill-name">{skill.name}</span>
                        <div className="skill-meta">
                          <span className="skill-years">{skill.years}y exp</span>
                          <span className="skill-percent">{skill.level}%</span>
                        </div>
                      </div>
                      <div className="skill-bar-track">
                        <div
                          className="skill-bar-fill"
                          style={{ transform: `scaleX(${skill.level / 100})` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

