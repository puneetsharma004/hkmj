import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About';
import DarshanAndEvents from './pages/DarshanAndEvents';
import Gallery from './pages/Gallery';
import Donations from './pages/Donations';
import VisitorInfo from './pages/VisitorInfo';
import Contact from './pages/Contact';
import Loader from './components/common/Loader';
import Layout from './components/Layout.jsx';
import ReactLenis from 'lenis/react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ThankYouPage from './components/common/ThankYouPage.jsx';
import ScrollToAnchor from './utils/ScrollToAnchor.js';
import WhatsAppButton from './components/common/Whatsapp.jsx';

function App() {

  return (
    <Router>
      {/* Layout wraps everything - header, footer, announcement will show on all pages */}
      <ReactLenis 
      root 
        options={{ 
          lerp: 0.1,        // Smooth factor
          duration: 1.2,    // Animation duration
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          smoothTouch: true, // Keep mobile touch normal
          touchMultiplier: 2,
        }}>
      <ThemeProvider>
      <Layout>
        {/* Loader can be conditionally shown based on loading state */}
        <Loader />
        <WhatsAppButton/>
        <ScrollToAnchor /> {/* Add this component */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<DarshanAndEvents />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/visitor-info" element={<VisitorInfo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
      </Layout>
      </ThemeProvider>
      </ReactLenis>
    </Router>
  );
}

export default App;