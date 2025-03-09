import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Collage from './pages/collage';
import Config from './pages/config';
import Header from './components/global/header';
import Dashboard from './pages/dashboard';
import SpotifyCallback from './pages/spotify-callback';
import Footer from './components/global/footer';

const App = () => {
  return (
    <div className="lg:container mx-auto min-h-screen">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/collage" element={<Collage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/config" element={<Config />} />
          <Route path="/spotify-callback" element={<SpotifyCallback />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
