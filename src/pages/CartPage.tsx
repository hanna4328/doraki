import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// Logic & Firebase Imports
import { auth, db } from '../lib/firebase';
import { SIGNATURE_COLLECTION } from '../data/flavors';
import { useCart } from '../hooks/useCart';

// Styling
import '../styles/cart.css';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { removeFromCart } = useCart(); // Access the delete logic

  useEffect(() => {
    // Listener for Auth State
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Redirect if not signed in
        navigate('/auth');
      } else {
        // Real-time Firestore Sync
        const unsubSnap = onSnapshot(doc(db, "carts", user.uid), (docSnap) => {
          if (docSnap.exists()) {
            const itemIds = docSnap.data().items || [];
            
            // Map Firestore IDs back to full Flavor Data
            const fullItems = itemIds.map((id: string) => 
              SIGNATURE_COLLECTION.find(f => f.id === id)
            ).filter(Boolean);
            
            setCartItems(fullItems);
          }
          setLoading(false);
        });
        return () => unsubSnap();
      }
    });

    return () => unsubAuth();
  }, [navigate]);

  // Calculate Subtotal dynamically
  const total = cartItems.reduce((acc, item) => {
    const priceValue = parseInt(item.price.replace('₹', '')) || 0;
    return acc + priceValue;
  }, 0);

  if (loading) {
    return (
      <div className="cart-loading">
        <h2 className="flavor-name">Gathering your flavors...</h2>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      {/* Minimal Navbar */}
      <nav className="minimal-nav" style={{ position: 'fixed', top: '40px', left: '10%' }}>
        <button onClick={() => navigate('/collection')} className="back-home-link">
          ← BACK TO COLLECTION
        </button>
      </nav>

      <div className="cart-content">
        <h1 className="flavor-name" style={{ fontSize: '3.5rem', marginBottom: '60px' }}>
          Your Selection
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <p>Your nostalgic journey hasn't started yet.</p>
            <button className="preorder-btn" onClick={() => navigate('/collection')}>
              Explore Flavors
            </button>
          </div>
        ) : (
          <div className="cart-grid">
            {/* List of Cart Items */}
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h3 className="flavor-name" style={{ fontSize: '1.5rem', marginBottom: '5px' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: '#D89A4F', fontWeight: 600 }}>{item.price}</p>
                  </div>
                  
                  {/* Remove Item Button */}
                  <button 
                    className="remove-item-btn" 
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Sticky Order Summary Sidebar */}
            <div className="cart-summary">
              <div className="summary-card">
                <h3 className="flavor-name" style={{ fontSize: '1.8rem', marginBottom: '25px' }}>
                  Summary
                </h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span style={{ color: '#D89A4F' }}>Calculated at next step</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                
                <button 
                  className="preorder-btn" 
                  style={{ width: '100%', marginTop: '30px', padding: '20px' }}
                >
                  Secure Pre-Order
                </button>
                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '15px', textAlign: 'center' }}>
                  By clicking, you agree to our Batch Delivery terms.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;