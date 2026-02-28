import React from 'react';
import logo from '../../assets/brand/logo-doraki.png';

interface NavbarLogoProps {
  isCentered?: boolean;
}

const NavbarLogo: React.FC<NavbarLogoProps> = ({ isCentered = false }) => {
  return (
    <div 
      className={`logo-container ${isCentered ? 'centered' : 'corner'}`}
      style={{
        display: 'flex',
        justifyContent: isCentered ? 'center' : 'flex-start',
        padding: '2rem',
        transition: 'var(--transition-smooth)'
      }}
    >
      <img 
        src={logo} 
        alt="Doraki Logo" 
        style={{
          width: isCentered ? '320px' : '120px',
          height: 'auto',
          objectFit: 'contain'
        }} 
      />
    </div>
  );
};

export default NavbarLogo;