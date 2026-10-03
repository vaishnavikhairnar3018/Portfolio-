import { experience } from '../../data/portfolio';
import { DecryptedText } from '../react-bits';
import './Experience.css';

function LocationPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}

export function Experience() {
  return (
    <section id="experience" className="experience-section" aria-label="Work Experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">
            <DecryptedText text="// career history" speed={28} />
          </span>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-desc">
            A track record of engineering scalable frontend architectures, leading developer teams, and delivering measurable business impact.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          {experience.map((job, index) => (
            <div key={job.id} className="timeline-card">
              <div className="timeline-marker">
                <div className="timeline-node">
                  <div className="timeline-node-inner" />
                </div>
                {index !== experience.length - 1 && <div className="timeline-connector" />}
              </div>

              <div className="timeline-body">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{job.role}</h3>
                    <div className="timeline-company-row">
                      <span className="timeline-company">{job.company}</span>
                      <span className="timeline-dot">•</span>
                      <span className="timeline-location">
                        <LocationPinIcon />
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <span className="timeline-period-badge">{job.period}</span>
                </div>

                <ul className="timeline-bullets">
                  {job.description.map((bullet, i) => (
                    <li key={i} className="timeline-bullet-item">
                      <span className="bullet-dash">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {job.tech && (
                  <div className="timeline-tech-row">
                    {job.tech.map((t) => (
                      <span key={t} className="timeline-tech-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
