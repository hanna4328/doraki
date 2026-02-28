import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import logo from '../../assets/brand/logo-doraki.png';
import kimonoImg from '../../assets/images/Untitled49_20260227222939.png';

gsap.registerPlugin(ScrollTrigger);

const CeremonialLanding: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ISOLATED TIMELINE: Only for the guards falling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top", // Finishes when this section is scrolled past
          scrub: 1.2,
        }
      });

      // Left Guards: Fall Left (-90deg)
      tl.to(".kimono-left", {
        rotation: 90,
        opacity: 0,
        transformOrigin: "bottom center",
        ease: "none"
      }, 0);

      // Right Guards: Fall Right (90deg)
      tl.to(".kimono-right", {
        rotation: 90,
        opacity: 0,
        transformOrigin: "bottom center",
        ease: "none"
      }, 0);

    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="landing-section">
      {/* 4 KIMONO GUARDS (2 Left, 2 Right) */}
      <div className="guards-layer">
        <div className="guard-pair left-pair">
          <img src={kimonoImg} className="kimono-left k-back" alt="" />
          <img src={kimonoImg} className="kimono-left k-front" alt="" />
        </div>
        <div className="guard-pair right-pair">
          <img src={kimonoImg} className="kimono-right k-back" alt="" />
          <img src={kimonoImg} className="kimono-right k-front" alt="" />
        </div>
      </div>

      {/* CENTER CONTENT: Logo & Tagline */}
      <div className="center-content">
        <img src={logo} alt="Doraki Logo" className="landing-logo" />
        <h1 className="landing-tagline">A Memory Between Two Layers.</h1>
        <p className="landing-sub">Scroll to begin the journey</p>
      </div>

      <style>{`
        .landing-section {
          height: 100vh;
          width: 100%;
          background: var(--color-cream-bg);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .guards-layer {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 5;
        }
        .guard-pair {
          position: absolute;
          bottom: 0;
          left: 110%;
          height: 70vh;
          display: flex;
        }
        .left-pair { left: -10%; }
        .right-pair { right: 2%; flex-direction: row-reverse; }

        .kimono-left, .kimono-right {
          height: 150%;
          width: auto;
          object-fit: contain;
          position: absolute;
          bottom: 0;
        }
        .k-back { scale: 0.9; opacity: 0.8; margin-bottom: 20px; }
        .k-front { scale: 1; }
        .right-pair img { transform: scaleX(-1); }

        .center-content {
          text-align: center;
          z-index: 10;
        }
        .landing-logo { width: 180px; margin-bottom: 2rem; }
        .landing-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 2.5rem;
          font-weight: 300;
          color: var(--color-cocoa-brown);
          letter-spacing: 0.05em;
        }
        .landing-sub { color: var(--color-caramel); font-style: italic; margin-top: 1rem; }

        @media (max-width: 768px) {
          .guards-layer { display: none; }
          .landing-tagline { font-size: 1.5rem; }
        }
      `}</style>
    </section>
  );
};

export default CeremonialLanding;