import './Reviews.css';

type Review = {
  quote: string;
  body: string;
  name: string;
  role: string;
  avatar: string;
  paperColor: 'pink' | 'blue' | 'yellow';
};

const REVIEWS: Review[] = [
  {
    quote: '“The cleanest TypeScript architecture I’ve seen.”',
    body: 'Vaishnavi refactored our core ingestion pipeline, cutting bundle size by 48% and reducing API response latency from 450ms down to 68ms. Her pull requests are masterclasses in clean code, automated tests, and clear architecture.',
    name: 'Marcus Vance',
    role: 'VP of Engineering · CloudPulse',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    paperColor: 'pink',
  },
  {
    quote: '“Blazing fast WebGL running at solid 60 FPS.”',
    body: 'Her Three.js shaders and procedural animations are pure technical mastery. She consistently balances jaw-dropping visual fidelity with strict 60 FPS mobile performance, zero memory leaks, and elegant Web Worker offloading.',
    name: 'Elena Rostova',
    role: 'Staff Graphics Engineer · RenderForge 3D',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    paperColor: 'blue',
  },
  {
    quote: '“Shipped our production MVP weeks ahead of schedule.”',
    body: 'Vaishnavi is the rare engineer who anticipates edge cases before they happen, writes zero-fluff code, and communicates technical trade-offs with absolute clarity. Our platform has maintained 99.99% uptime since launch.',
    name: 'Devon Miller',
    role: 'Co-Founder & CTO · HyperScale Labs',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    paperColor: 'yellow',
  },
];

export function Reviews() {
  return (
    <section className="creatie-reviews-section" id="reviews" aria-label="Peer & Lead Endorsements">
      <div className="creatie-container">
        {/* Section Header with Paperclip Sticker */}
        <div className="creatie-section-header">
          <div className="section-sticker-pill sticker-pill--pink">
            <span className="section-paperclip section-paperclip--pink" aria-hidden="true" />
            <span className="section-sticker-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </span>
            <span className="section-sticker-label">Endorsements</span>
          </div>

          <h2 className="creatie-section-title">
            ENGINEERS & LEADS<br />VOUCH FOR MY CODE
          </h2>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="creatie-reviews-grid">
          {REVIEWS.map((review, i) => (
            <article key={i} className={`review-paper-card paper--${review.paperColor}`}>
              <div className="review-stars" aria-label="5 out of 5 stars">
                {'★'.repeat(5)}
              </div>

              <h3 className="review-headline">{review.quote}</h3>
              <p className="review-body">{review.body}</p>

              <footer className="review-author-bar">
                <img src={review.avatar} alt={review.name} className="review-avatar" />
                <div className="review-author-info">
                  <span className="author-name">{review.name}</span>
                  <span className="author-role">{review.role}</span>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
