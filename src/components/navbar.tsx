import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: '25px 8%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      background: 'linear-gradient(to bottom, rgba(244, 230, 213, 0.9), rgba(244, 230, 213, 0))',
      backdropFilter: 'blur(5px)'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => navigate('/')} 
        style={{ 
          fontFamily: 'Rafika', 
          fontSize: '1.8rem', 
          color: '#5A2E1F', 
          cursor: 'pointer',
          letterSpacing: '2px' 
        }}
      >
        DORAKI
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <button 
          onClick={() => navigate('/collection')} 
          style={{ background: 'none', border: 'none', color: '#5A2E1F', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em' }}
        >
          COLLECTION
        </button>

        <button 
          onClick={() => navigate('/cart')} 
          style={{ background: 'none', border: 'none', color: '#5A2E1F', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.1em' }}
        >
          CART
        </button>

        {/* The Logout Button */}
        <button 
          onClick={handleLogout}
          style={{ 
            backgroundColor: '#5A2E1F', 
            color: '#F4E6D5', 
            border: 'none', 
            padding: '10px 22px', 
            borderRadius: '30px', 
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 700,
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;