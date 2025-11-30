// ✅ Announcements.jsx (Dynamic JavaScript Version - Works with Supabase)
// Replace your current front-end Announcements.jsx with this file

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { supabase } from '../../lib/supabase';


// Initialize Supabase client (ensure your environment variables are set)


export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch announcements dynamically from Supabase
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('isActive', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching announcements:', error);
      } else {
        setAnnouncements(data || []);
      }
    };

    fetchAnnouncements();
  }, []);

  // Auto-rotate announcements
  useEffect(() => {
    if (announcements.length > 1 && !isPaused) {
      const timer = setInterval(() => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [announcements.length, isPaused]);

  if (!announcements.length) return null;

  const currentItem = announcements[currentAnnouncement];

  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-30 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-saffron/10 via-gold/5 to-orange-500/10 backdrop-blur-sm" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center justify-between py-2 px-4 sm:px-6 lg:px-8">
            {/* Left Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <motion.button
                onClick={() => setCurrentAnnouncement((prev) => (prev === 0 ? announcements.length - 1 : prev - 1))}
                className="p-2 rounded-full text-gold/70 hover:text-saffron hover:bg-saffron/10 transition-all duration-300 outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous announcement"
              >
                <FaChevronLeft className="w-3 h-3" />
              </motion.button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center min-h-[40px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAnnouncement}
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -30, rotateX: 90 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 text-center"
                >

                  {/* Text */}
                  <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <motion.span
                      className="font-bold text-white text-base sm:text-lg lg:text-xl leading-tight tracking-wide"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentItem.title}
                    </motion.span>

                    {currentItem.link && (
                      <motion.a
                        href={currentItem.link}
                        className="hidden group relative md:inline-flex items-center font-bold text-sm text-white bg-saffron-gradient px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        />
                        <span className="relative z-10 mr-2">{currentItem.linkText}</span>
                        <motion.span
                          className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <motion.button
                onClick={() => setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)}
                className="hidden sm:block p-2 rounded-full text-gold/70 hover:text-saffron hover:bg-saffron/10 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next announcement"
              >
                <FaChevronRight className="w-3 h-3" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Accent Line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-saffron to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-saffron blur-sm opacity-60" />
      </div>
    </motion.section>
  );
}