// Loader.js
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GiLotus , GiByzantinTemple } from 'react-icons/gi';
import { FaOm } from 'react-icons/fa';

const Loader = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const INACTIVITY_TIME = 10 * 60 * 1000; // 10 minutes
    
    // Check conditions
    const hasVisited = sessionStorage.getItem('hasVisited');
    const lastActivity = localStorage.getItem('lastActivity');
    const now = Date.now();
    
    // Show loader if first visit OR inactive for 10+ minutes
    if (!hasVisited || (lastActivity && (now - parseInt(lastActivity)) > INACTIVITY_TIME)) {
      setIsLoading(true);
      sessionStorage.setItem('hasVisited', 'true');
      
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    }

    // Track activity
    const updateActivity = () => {
      localStorage.setItem('lastActivity', Date.now().toString());
    };

    const activities = ['click', 'scroll', 'keypress', 'mousemove'];
    activities.forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });

    // Set initial activity
    updateActivity();

    return () => {
      activities.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 z-50"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 text-6xl text-gold">
              <GiLotus />
            </div>
            <div className="absolute top-20 right-16 text-4xl text-saffron">
              <FaOm />
            </div>
            <div className="absolute bottom-20 left-20 text-5xl text-gold">
              <GiByzantinTemple/>
            </div>
            <div className="absolute bottom-16 right-10 text-6xl text-saffron">
              <GiLotus />
            </div>
          </div>

          <div className="text-center relative z-10">

            {/* Decorative Elements */}
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="text-2xl text-gold mr-4"
              >
                <GiLotus/>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-gold text-4xl font-bold tracking-wider"
              >
                Welcome
              </motion.h2>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                className="text-2xl text-gold ml-4"
              >
                <GiLotus/>
              </motion.div>
            </div>

            {/* Temple Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <GiByzantinTemple className="text-saffron text-xl mr-2" />
              <p className="text-white text-2xl font-medium tracking-wide">
                Hare Krishna Marwar Mandir
              </p>
              <GiByzantinTemple className="text-saffron text-2xl ml-2" />
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center mt-8 space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 bg-gold rounded-full"
                />
              ))}
            </motion.div>
          </div>

          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-saffron/5 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
