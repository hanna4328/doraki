import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

// Data & Logic Imports
import { auth, db } from '../lib/firebase';
import { SIGNATURE_COLLECTION } from '../data/flavors';
import { useCart } from '../hooks/useCart';

// Styling
import '../styles/collection.css';

gsap.registerPlugin(ScrollTrigger);

const CollectionPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- STATE ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cartCount, setCartCount] = useState(0);

  // 1. AUTH & CART LISTENER
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Real-time Firestore sync for the cart count bubble
        const unsubCart = onSnapshot(doc(db, "carts", user.uid), (docSnap) => {
          if (docSnap.exists()) {
            setCartCount(docSnap.data().items?.length || 0);
          }
        });
        return () => unsubCart();
      } else {
        setCartCount(0);
      }
    });
    return () => unsubAuth();
  }, []);

  // 2. SCROLL RESET
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 3. GSAP: Bidirectional Scroll Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.collection-section');

      sections.forEach((section: any, i) => {
        const imageWrapper = section.querySelector('.flavor-image-wrapper');
        const info = section.querySelector('.flavor-info');
        const isEven = i % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          }
        });

        tl.fromTo(imageWrapper, 
          { scale: 0.9, opacity: 0, x: isEven ? 60 : -60 },
          { scale: 1, opacity: 1, x: 0, duration: 1.4, ease: "power4.out" }
        )
        .fromTo(info,
          { opacity: 0, x: isEven ? -60 : 60 },
          { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" },
          "-=1"
        );

        // Background color transition based on section
        const colors = ["#F4E6D5", "#EAD7C2", "#E5D1B8"];
        gsap.to(containerRef.current, {
          backgroundColor: colors[i % colors.length],
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div ref={containerRef} className="collection-container" style={{ transition: 'background-color 0.8s ease' }}>
      
      {/* --- THE COMPLETE NAVBAR --- */}
      <nav className="collection-nav">
        <div className="nav-left" onClick={() => navigate('/')}>
          <span className="nav-logo">DORAKI</span>
        </div>
        
        <div className="nav-right">
          <div className="nav-links-group">
            <button className="nav-link-text" onClick={() => navigate('/')}>HOME</button>
            <button className="nav-link-text" onClick={() => navigate('/collection')}>DELICACIES</button>
            
            {currentUser && (
              <button className="nav-link-text" onClick={() => navigate('/cart')}>
                CART <span className="cart-count">{cartCount}</span>
              </button>
            )}
          </div>

          <div className="nav-auth-group">
            {currentUser ? (
              <div className="user-section">
                <span className="user-greeting">Hi, {currentUser.email?.split('@')[0]}</span>
                <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
              </div>
            ) : (
              <button className="login-btn" onClick={() => navigate('/auth')}>LOGIN</button>
            )}
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <main style={{ paddingTop: '140px' }}>
        {SIGNATURE_COLLECTION.map((flavor, index) => (
          <section key={flavor.id} className="collection-section">
            <div 
              className="collection-grid" 
              style={{ direction: index % 2 === 0 ? 'ltr' : 'rtl' }}
            >
              {/* Content Panel */}
              <div className="flavor-info" style={{ direction: 'ltr' }}>
                <p className="flavor-subtitle">SIGNATURE {index + 1}</p>
                <h2 className="flavor-name">{flavor.name}</h2>
                <p className="flavor-description">{flavor.description}</p>
                
                <div style={{ marginTop: '20px' }}>
                  <button 
                    className="preorder-btn" 
                    onClick={() => addToCart(flavor.id)}
                  >
                    Add to Pre-Order
                  </button>
                </div>
              </div>

              {/* Visual Panel */}
              <div className="flavor-image-wrapper">
                <img 
                  src={flavor.image} 
                  alt={flavor.name} 
                  className="flavor-image" 
                />
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default CollectionPage;