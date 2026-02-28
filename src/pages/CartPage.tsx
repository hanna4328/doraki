import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { SIGNATURE_COLLECTION } from '../data/flavors';
import Navbar from '../components/navbar';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false);
  const navigate = useNavigate();

  // 1. AUTH & DATA SYNC: Listen for user and their specific cart
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Sync with Firestore document based on user UID
        const unsubCart = onSnapshot(doc(db, "carts", user.uid), (docSnap) => {
          if (docSnap.exists()) {
            const itemIds = docSnap.data().items || [];
            
            // Map IDs back to full flavor data objects
            const fullItems = itemIds.map((id: string) => 
              SIGNATURE_COLLECTION.find(f => f.id === id)
            ).filter(Boolean); // Clean up any undefined matches
            
            setCartItems(fullItems);
          }
          setLoading(false);
        });
        return () => unsubCart();
      } else {
        // Not logged in? Go to Auth
        navigate('/auth');
      }
    });
    return () => unsubAuth();
  }, [navigate]);

  // 2. REMOVE ITEM: Deletes only the specific instance clicked (handles duplicates)
  const removeItem = async (indexToRemove: number) => {
    if (!auth.currentUser) return;
    
    const userRef = doc(db, "carts", auth.currentUser.uid);
    // Convert current objects back to a simple array of IDs
    const currentItemIds = cartItems.map(item => item.id);
    
    // Filter out ONLY the item at the specific index
    const updatedIds = currentItemIds.filter((_, index) => index !== indexToRemove);
    
    try {
      await updateDoc(userRef, { items: updatedIds });
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // 3. PLACE ORDER: Simulates a checkout success
  const handlePlaceOrder = async () => {
    if (!auth.currentUser || cartItems.length === 0) return;
    
    setIsOrdering(true);
    try {
      const userRef = doc(db, "carts", auth.currentUser.uid);
      
      // Clear the cart in Firestore
      await updateDoc(userRef, { items: [] });
      
      alert("Order Confirmed! Your Dorayaki will be ready for pickup soon.");
      navigate('/collection');
    } catch (error) {
      alert("Checkout failed. Please try again.");
      console.error(error);
    } finally {
      setIsOrdering(false);
    }
  };

  // 4. CALCULATION: Sum up the selection
  const total = cartItems.reduce((acc, item) => {
    const priceNum = parseInt(item.price.replace('₹', '')) || 0;
    return acc + priceNum;
  }, 0);

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4E6D5', color: '#5A2E1F', fontFamily: 'Rafika' }}>
      SYNCING YOUR BOX...
    </div>
  );

  return (
    <div style={{ backgroundColor: '#F4E6D5', minHeight: '100vh', paddingBottom: '100px' }}>
      <Navbar />

      <main style={{ paddingTop: '140px', maxWidth: '850px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        <h1 style={{ fontFamily: 'Rafika', fontSize: '3.5rem', color: '#5A2E1F', marginBottom: '10px' }}>Your Box</h1>
        <p style={{ color: '#8B5E3C', marginBottom: '50px', letterSpacing: '0.05em' }}>Hand-picked delicacies for your nostalgia.</p>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p style={{ color: '#8B5E3C', fontSize: '1.2rem', marginBottom: '30px' }}>Your selection box is currently empty.</p>
            <button 
              onClick={() => navigate('/collection')}
              style={{ padding: '15px 40px', backgroundColor: '#5A2E1F', color: '#F4E6D5', border: 'none', borderRadius: '30px', fontWeight: 700, cursor: 'pointer' }}
            >
              BROWSE COLLECTION
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {/* List of Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                  padding: '15px 25px', 
                  borderRadius: '20px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ color: '#5A2E1F', margin: '0 0 5px 0', fontSize: '1.1rem' }}>{item.name}</h4>
                      <p style={{ color: '#D89A4F', margin: 0, fontWeight: 700 }}>{item.price}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(index)}
                    style={{ background: 'none', border: 'none', color: '#8B5E3C', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}
                  >
                    REMOVE
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Footer */}
            <div style={{ marginTop: '50px', padding: '40px', backgroundColor: '#5A2E1F', borderRadius: '30px', color: '#F4E6D5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <span style={{ fontSize: '1.2rem', opacity: 0.8 }}>Subtotal</span>
                <span style={{ fontSize: '2rem', fontFamily: 'Rafika' }}>₹{total}</span>
              </div>
              
              <button 
                onClick={handlePlaceOrder}
                disabled={isOrdering}
                style={{ 
                  width: '100%', 
                  padding: '20px', 
                  backgroundColor: '#F4E6D5', 
                  color: '#5A2E1F', 
                  border: 'none', 
                  borderRadius: '15px', 
                  fontWeight: 800, 
                  fontSize: '1rem',
                  cursor: isOrdering ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => !isOrdering && (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {isOrdering ? 'PROCESSING ORDER...' : 'PLACE PRE-ORDER'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;