import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CinematicStory from './components/cinema/CinematicStory';
import CollectionPage from './pages/CollectionPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* The Hero content ONLY lives here */}
        <Route path="/" element={<CinematicStory />} />
        
        {/* These pages will now be clean and only show their own content */}
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;