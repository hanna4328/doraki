import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CollectionPage from './pages/CollectionPage';
import CartPage from './pages/CartPage';
import CinematicHero from './components/cinema/CinematicStory';
import AuthPage from './pages/AuthPage';

function App() {
  return (
   <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<CinematicHero />} />
        
        {/* The Missing Route! */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected Pages */}
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/cart" element={<CartPage />} />
        
        {/* Redirect any unknown routes back home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;