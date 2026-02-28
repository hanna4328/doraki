import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';

// Assets
import doroyakiImg from '../../assets/images/hero-dorayaki.png';

gsap.registerPlugin(ScrollTrigger);

const CinematicHero: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  // State to track if the user is at the top of the page
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle logo visibility based on initial scroll
      setIsIntro(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main Cinematic Timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        }
      });

      gsap.defaults({ ease: "power2.inOut" });

      // PHASE 1: Assembly
      mainTl.fromTo(".doro", { x: "-30vw", opacity: 0 }, { x: "0", opacity: 1, duration: 2 })
            .fromTo(".yaki", { x: "30vw", opacity: 0 }, { x: "0", opacity: 1, duration: 2 }, "<")
            
      // PHASE 2: Pivot & Shift
      .to(brandingRef.current, {
        rotate: -90,
        x: "-38vw",
        duration: 3,
        delay: 0.5
      })

      // PHASE 3: Image Entrance
      .fromTo(imageRef.current, 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 2 }, 
        "-=1.5"
      )

      // PHASE 4: Story Reveal
      .fromTo(storyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 2 },
        "+=0.2"
      )
      
      // PHASE 5: Button Appearance
      .fromTo(".lab-cta", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        "+=0.5"
      );

      // Subtle Hover/Breathing Loop
      gsap.to(".floating-wrap", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main style={{ width: '100%', backgroundColor: '#F4E6D5', minHeight: '100vh' }}>
      
      {/* STAGE 0: Initial Cover Section */}
      <section style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F4E6D5'
      }}>
        {/* Centered Brand Title */}
        <div style={{ 
          fontFamily: 'Rafika', 
          fontSize: '4rem', 
          color: '#5A2E1F', 
          letterSpacing: '0.2em',
          opacity: isIntro ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}>
          DORAKI
        </div>
        
        {/* Exact Tagline Styling */}
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center',
          opacity: 0.8 
        }}>
          <h1 style={{ 
            color: '#5A2E1F', 
            fontWeight: 300, 
            letterSpacing: '0.1em' 
          }}>
            A Memory Between Two Layers.
          </h1>
          <p style={{ color: '#D89A4F', fontStyle: 'italic' }}>
            Scroll to begin the journey
          </p>
        </div>
      </section>

      {/* STAGE 1: Cinematic Animation Stage */}
      <div ref={containerRef} className="hero-viewport">
        <div className="canvas">
          
          <div ref={brandingRef} className="branding-container">
            <span className="brand-part doro">DORO</span>
            <span className="brand-part yaki">YAKI</span>
          </div>

          <div ref={storyRef} className="story-block">
            <p className="story-text">
              Dorayaki traces its origins to Japan, where two golden, fluffy pancakes gently embrace a sweet red bean filling, creating a dessert that feels like warmth folded into a circle — its name inspired by the shape of a “dora,” or gong. Over time, it became a symbol of simple joy, famously cherished by Doraemon, whose love for dorayaki turned it into a nostalgic icon. Inspired by that same comforting sweetness, our company strives to bring you the taste Doraemon loves most — soft, perfectly balanced, and crafted with care — so every bite feels magical, familiar, and delightfully heartwarming, evoking childhood wonder and timeless Japanese tradition in every bite.
            </p>
          </div>

          <div ref={imageRef} className="image-stage">
            <div className="floating-wrap">
              <img src={doroyakiImg} alt="Doroyaki" className="doroyaki-hero-img" />
            </div>
          </div>

          <button className="lab-cta" onClick={() => navigate('/collection')}>
            View Collection
          </button>
        </div>
      </div>

      <style>{`
        .lab-cta {
          position: absolute;
          left: 65%;
          bottom: 15%;
          padding: 1rem 2.5rem;
          background: #5A2E1F;
          color: #F4E6D5;
          border: none;
          border-radius: 20px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          opacity: 0;
          z-index: 100;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        .lab-cta:hover {
          background: #D89A4F;
          transform: scale(1.05);
        }
        .hero-viewport {
          height: 100vh;
          width: 100%;
          background: #F4E6D5;
          overflow: hidden;
          position: relative;
        }
        .canvas {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .branding-container {
          position: absolute;
          font-family: 'Rafika', serif;
          font-size: clamp(4rem, 10vw, 10rem);
          color: #5A2E1F;
          display: flex;
          z-index: 20;
          pointer-events: none;
          letter-spacing: -0.02em;
        }
        .brand-part { display: inline-block; }
        .story-block {
          position: absolute;
          left: 25%;
          max-width: 270px;
          z-index: 15;
          pointer-events: none;
        }
        .story-text {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          line-height: 1.8;
          color: #5A2E1F;
          text-align: left;
          opacity: 0.9;
        }
        .image-stage {
          position: absolute;
          left: 50%;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .doroyaki-hero-img {
          width: clamp(700px, 45vw, 600px);
          height: auto;
          filter: drop-shadow(0 30px 50px rgba(90, 46, 31, 0.25)); 
        }
        @media (max-width: 768px) {
          .branding-container { font-size: 5rem; }
          .story-block { position: relative; left: 0; margin: 2rem 0; padding: 0 10%; }
          .story-text { text-align: center; font-size: 0.9rem; }
          .image-stage { position: relative; left: 0; }
          .doroyaki-hero-img { width: 80vw; }
          .canvas { flex-direction: column; }
        }
      `}</style>
    </main>
  );
};

// Explicit default export for App.tsx
export default CinematicHero;