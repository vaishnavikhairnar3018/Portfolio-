import { useState, useRef, useEffect, useCallback } from 'react';
import idPortrait from '../../assets/id_card_portrait.jpg';
import lilyFlower from '../../assets/real_lily_flower.png';
import pinkPostcardImg from '../../assets/real_pink_postcard.png';
import goldStarImg from '../../assets/real_gold_star.png';
import idHolder3dImg from '../../assets/real_id_holder_3d.png';
import './IdCard.css';

export function IdCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Physics & Animation State
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Internal mutable animation refs for 60fps raf loop
  const animState = useRef({
    currentAngle: 0,        // rotateZ (sway)
    targetAngle: 0,
    angleVelocity: 0,
    tiltX: 0,               // 3D face tilt X
    targetTiltX: 0,
    tiltY: 0,               // 3D face tilt Y
    targetTiltY: 0,
    sheenX: 50,             // percentage for glare reflection
    sheenY: 50,
    isHovered: false,
    dragStartX: 0,
    dragStartAngle: 0,
    lastScrollY: 0,
    lastScrollTime: Date.now(),
    scrollTiltTarget: 0,
    time: 0,
  });

  // Handle Dragging / Swiping
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasInteracted(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pivotX = rect.left + rect.width * 0.525;
    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = currentX - pivotX;
    const deltaY = Math.max(50, currentY - rect.top);

    // Initial drag angle
    const angleRad = Math.atan2(deltaX, deltaY);
    animState.current.dragStartX = e.clientX;
    animState.current.dragStartAngle = (angleRad * 180) / Math.PI;
    animState.current.angleVelocity = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (isDragging) {
      const pivotX = rect.left + rect.width * 0.525;
      const currentX = e.clientX;
      const currentY = e.clientY;
      const deltaX = currentX - pivotX;
      const deltaY = Math.max(60, currentY - (rect.top - 40));

      const angleRad = Math.atan2(deltaX, deltaY);
      const angleDeg = (angleRad * 180) / Math.PI;
      // Clamp drag angle between -35deg and 35deg
      const clampedAngle = Math.max(-35, Math.min(35, angleDeg));
      animState.current.currentAngle = clampedAngle;
      animState.current.targetAngle = clampedAngle;
      animState.current.angleVelocity = 0;
    } else {
      // Subtle 3D Hover tilt & specular sheen calculation (calm, stable)
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      animState.current.targetTiltX = (0.5 - y) * 4;
      animState.current.targetTiltY = (x - 0.5) * 4;
      animState.current.targetAngle = (x - 0.5) * 1.5;
      animState.current.sheenX = Math.round(x * 100);
      animState.current.sheenY = Math.round(y * 100);
      animState.current.isHovered = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore if already released
      }
      // Give initial impulse on release
      animState.current.angleVelocity = animState.current.currentAngle * -0.15;
    }
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      animState.current.isHovered = false;
      animState.current.targetTiltX = 0;
      animState.current.targetTiltY = 0;
      animState.current.targetAngle = 0;
    }
  };

  // Scroll Listener for Gentle, Controlled Inertia
  const handleScroll = useCallback(() => {
    const now = Date.now();
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - animState.current.lastScrollY;
    const deltaTime = Math.max(1, now - animState.current.lastScrollTime);
    
    animState.current.lastScrollY = currentScrollY;
    animState.current.lastScrollTime = now;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Only apply gentle inertia when the card is within the visible viewport
    if (rect.bottom > 0 && rect.top < viewportHeight) {
      const scrollVelocity = deltaY / deltaTime; // px per ms (positive when scrolling down)
      // Gentle inertia tilt strictly clamped to ±2.5 degrees max
      const tilt = Math.max(-2.5, Math.min(2.5, scrollVelocity * 1.8));
      animState.current.scrollTiltTarget = tilt;
    } else {
      animState.current.scrollTiltTarget = 0;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Main 60FPS Physics Simulation Loop
  useEffect(() => {
    let animId: number;
    const springK = 0.07;   // Clean spring for quick stabilization
    const damping = 0.88;   // High damping so it never rings or flaps repeatedly
    const state = animState.current;

    const tick = () => {
      state.time += 0.015;

      if (!isDragging) {
        // Smoothly decay scroll tilt target back to zero as scrolling pauses
        state.scrollTiltTarget *= 0.88;

        // When hovered: follow the calm hover target (normal hover kept intact!)
        // When scrolling/idle: follow the subtle scroll inertia tilt
        const target = state.isHovered
          ? state.targetAngle
          : state.scrollTiltTarget;

        const currentDamping = state.isHovered ? 0.82 : damping;

        // Pendulum equation: a = -k*(angle - target) - c*velocity
        const springForce = -springK * (state.currentAngle - target);
        state.angleVelocity = (state.angleVelocity + springForce) * currentDamping;
        state.currentAngle += state.angleVelocity;

        // Strict clamp: never exceeds ±3.5 degrees during page scrolling
        state.currentAngle = Math.max(-3.5, Math.min(3.5, state.currentAngle));

        // Smooth out 3D tilt with calm easing (kept normal hover tilt)
        state.tiltX += (state.targetTiltX - state.tiltX) * 0.08;
        state.tiltY += (state.targetTiltY - state.tiltY) * 0.08;
      } else {
        // Dragging dampens tilt
        state.tiltX += (0 - state.tiltX) * 0.2;
        state.tiltY += (0 - state.tiltY) * 0.2;
      }

      // Apply transforms to DOM
      if (cardRef.current) {
        const angle = state.currentAngle;
        const tx = state.tiltX;
        const ty = state.tiltY;
        cardRef.current.style.transform = `rotateZ(${angle.toFixed(2)}deg) rotateX(${tx.toFixed(2)}deg) rotateY(${ty.toFixed(2)}deg)`;
        cardRef.current.style.setProperty('--sheen-x', `${state.sheenX}%`);
        cardRef.current.style.setProperty('--sheen-y', `${state.sheenY}%`);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isDragging]);

  return (
    <section className="id-card-section" id="credentials" ref={containerRef} aria-label="Official Developer Credentials">
      {/* Background Texture & Soft Ambience */}
      <div className="id-card-stage">
        
        {/* Floating Interaction Hint */}
        <div className={`id-card-hint ${hasInteracted ? 'id-card-hint--fade' : ''}`} aria-hidden="true">
          <span className="hint-icon">✦</span>
          <span>Scroll to wave • Grab &amp; swing badge</span>
        </div>

        {/* ── Main Hanging Rig (Rotates as a physical pendulum from the clip) ── */}
        <div
          ref={cardRef}
          className={`id-hanging-rig ${isDragging ? 'id-hanging-rig--dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          role="region"
          aria-label="Interactive ID Badge - Click and drag to swing"
          tabIndex={0}
        >
          {/* 1. Behind-the-Badge Accents */}
          
          {/* Slanted Vintage Perforated Postcard from reference (Tucked behind top-left of card) */}
          <div className="ticket-stub-wrapper" aria-hidden="true">
            <img
              src={pinkPostcardImg}
              alt=""
              className="ticket-stub-bg-img"
              width={260}
              height={175}
              draggable={false}
            />
            <div className="ticket-overlay-text">
              <div className="ticket-tag">(VK, EST 2003)</div>
              <div className="ticket-services">SOFTWARE DEVELOPER</div>
              <div className="ticket-motto">YOUR RELIABLE TECH PARTNER</div>
            </div>
          </div>

          {/* Delicate Pink Lily Flower Blossom from reference (Tucked behind top-right of card) */}
          <div className="lily-accent" aria-hidden="true">
            <img
              src={lilyFlower}
              alt=""
              className="lily-img"
              width={240}
              height={225}
              draggable={false}
              loading="eager"
            />
          </div>

          {/* Sparkling Butterfly & Gemstone Charms */}
          <div className="charm-butterfly charm-butterfly--top" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4c.8-2 3-3 5-3s3 2 3 4c0 3-3 6-7 8 4 2 7 5 7 8 0 2-1 4-3 4s-4.2-1-5-3c-.8 2-3 3-5 3s-3-2-3-4c0-3 3-6 7-8-4-2-7-5-7-8 0-2 1-4 3-4s4.2 1 5 3z" />
            </svg>
          </div>
          <div className="charm-butterfly charm-butterfly--right" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4c.8-2 3-3 5-3s3 2 3 4c0 3-3 6-7 8 4 2 7 5 7 8 0 2-1 4-3 4s-4.2-1-5-3c-.8 2-3 3-5 3s-3-2-3-4c0-3 3-6 7-8-4-2-7-5-7-8 0-2 1-4 3-4s4.2 1 5 3z" />
            </svg>
          </div>
          {/* Sparkling Pink Gemstone Heart on Left Rim */}
          <div className="charm-gem-heart" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>



          {/* 2. Photorealistic 3D Rendered ID Card Holder PNG Component */}
          <div className="id-3d-holder-frame">
            <img
              src={idHolder3dImg}
              alt="3D ID Badge Holder with Spring Clip and Silver Chain Charms"
              className="id-holder-base-img"
              draggable={false}
            />

            {/* Specular Glass Sheen Overlay */}
            <div className="acrylic-glare" aria-hidden="true" />

            {/* 3. The Inner Printed ID Card Content */}
            <div className="inner-id-card-content">
              {/* Double Ring Rubber Stamp placed in middle between details and photo */}
              <div className="id-rubber-stamp" aria-hidden="true">
                <div className="stamp-ring stamp-ring--outer" />
                <div className="stamp-ring stamp-ring--inner" />
                <div className="stamp-text">
                  <span>(VK • EST</span>
                  <span className="stamp-year">2003)</span>
                </div>
              </div>

              {/* Left Column: Brand, Status, Details & Signature */}
              <div className="id-left-col">
                <header className="id-brand-header">
                  <h3 className="id-brand-title">Vaishnavi</h3>
                  <p className="id-brand-subtitle">
                    THE HOLDER OF THIS CARD<br />
                    IS DEVELOPER.
                  </p>
                </header>

                <div className="id-field-group">
                  <div className="id-field-row">
                    <span className="field-label">NAME:</span>
                    <span className="field-handwritten field-name">Vaishnavi Khairnar</span>
                  </div>
                  <div className="id-field-row">
                    <span className="field-label">BASED IN:</span>
                    <span className="field-handwritten field-location">India</span>
                  </div>
                  <div className="id-field-row">
                    <span className="field-label">TITLE:</span>
                    <span className="field-handwritten field-specialty">Developer</span>
                  </div>
                </div>

                <div className="id-card-motto">
                  <span className="motto-label">MOTTO:</span>
                  <span className="motto-text">BUILDING IDEAS INTO REALITY</span>
                </div>
              </div>

              {/* Right Column: ID Number, Portrait Photo & Barcode */}
              <div className="id-right-col">
                <div className="id-number" aria-hidden="true">ID NO. 001</div>
                {/* Photo Frame with Crop Mark Corners */}
                <div className="id-photo-frame">
                  <span className="crop-corner crop-tl" aria-hidden="true" />
                  <span className="crop-corner crop-tr" aria-hidden="true" />
                  <span className="crop-corner crop-bl" aria-hidden="true" />
                  <span className="crop-corner crop-br" aria-hidden="true" />
                  <img
                    src={idPortrait}
                    alt="Vaishnavi Khairnar ID Portrait"
                    className="id-photo-img"
                    width={125}
                    height={150}
                    draggable={false}
                  />
                </div>

                {/* Scanner Barcode */}
                <div className="id-barcode" aria-hidden="true">
                  <div className="barcode-stripes">
                    <span className="b-bar b-1" />
                    <span className="b-bar b-3" />
                    <span className="b-bar b-1" />
                    <span className="b-bar b-2" />
                    <span className="b-bar b-4" />
                    <span className="b-bar b-1" />
                    <span className="b-bar b-2" />
                    <span className="b-bar b-3" />
                    <span className="b-bar b-1" />
                    <span className="b-bar b-2" />
                    <span className="b-bar b-4" />
                    <span className="b-bar b-1" />
                    <span className="b-bar b-3" />
                    <span className="b-bar b-2" />
                    <span className="b-bar b-1" />
                    <span className="b-bar b-4" />
                    <span className="b-bar b-2" />
                    <span className="b-bar b-1" />
                    <span className="b-bar b-3" />
                    <span className="b-bar b-1" />
                    <span className="b-bar b-2" />
                    <span className="b-bar b-3" />
                    <span className="b-bar b-1" />
                    <span className="b-bar b-4" />
                  </div>
                  <span className="barcode-numbers">0 84920 18402 7</span>
                </div>
              </div>
            </div>

            {/* 3D Gold Star Charm on bottom-left corner of pouch */}
            <div className="gold-star-charm gold-star-charm--bottom" aria-hidden="true">
              <img
                src={goldStarImg}
                alt=""
                className="star-charm-img"
                width={38}
                height={36}
                draggable={false}
              />
            </div>

            {/* Gold Star Charm below the flower on the right */}
            <div className="gold-star-charm gold-star-charm--right" aria-hidden="true">
              <img
                src={goldStarImg}
                alt=""
                className="star-charm-img"
                width={32}
                height={30}
                draggable={false}
              />
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
