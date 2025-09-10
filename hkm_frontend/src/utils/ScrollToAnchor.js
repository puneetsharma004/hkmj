import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToAnchor() {
  const location = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // Remove the '#' symbol
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        const element = document.getElementById(lastHash.current);
        if (element) {
          // Scroll with offset if you have a fixed header
          const navbarHeight = 80; // Adjust this value based on your header height
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: 'smooth'
          });
        }
        lastHash.current = '';
      }, 100);
    }
  }, [location]);

  return null;
}

export default ScrollToAnchor;
