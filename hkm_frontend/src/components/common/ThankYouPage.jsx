import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaHeart, 
  FaPrayingHands, 
  FaHome,
  FaChevronRight
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function ThankYouPage() {
  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Beautiful Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 rounded-full opacity-40 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 rounded-full opacity-30 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto z-10 text-center">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 text-sm">
            <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors duration-300 flex items-center space-x-1">
              <FaHome className="text-xs" />
              <span>Home</span>
            </a>
            <FaChevronRight className="text-gray-500 text-xs" />
            <span className="text-saffron font-medium">Thank You</span>
          </div>
        </motion.nav>

        {/* Main Gratitude Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-20 bg-saffron rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <FaPrayingHands className="text-white text-3xl" />
          </motion.div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold gradient-text-saffron-gold mb-6">
            धन्यवाद! Thank You!
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Your generous contribution has been received with heartfelt gratitude. 
            May Krishna bless you abundantly for your selfless seva.
          </p>
        </motion.div>

        {/* Sanskrit Blessing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-saffron/20 dark:to-gold/20 rounded-2xl p-8 max-w-3xl mx-auto border border-saffron/40 shadow-lg mb-12"
        >
          <div className="text-6xl mb-4">🙏</div>
          <p className="text-gray-800 dark:text-white text-lg italic mb-4">
            "दानं वीर्यं यशस्तेजो धैर्यं चैव पराक्रमः।<br/>
            षडिमे देवता लोके पूजिता सर्वदैव हि॥"
          </p>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            "Charity, valor, fame, strength, patience and prowess - these six divine qualities are always worshipped in this world"
          </p>
          <div className="text-4xl">🌸 ॐ 🌸</div>
        </motion.div>

        {/* Spiritual Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/95 dark:bg-gray-900/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 backdrop-blur-xl shadow-xl mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center justify-center gap-2">
            <FaHeart className="text-saffron" />
            Divine Blessings
          </h2>
          
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p className="flex items-center justify-center gap-2">
              <span>🌺</span>
              Your seva contributes to spreading Krishna consciousness
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>🍃</span>
              May your devotion inspire others to serve the Lord
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>✨</span>
              Every offering made with love reaches the Supreme
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>🌸</span>
              Your generosity helps maintain this sacred space
            </p>
          </div>
        </motion.div>

        {/* Final Blessing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-saffron/10 dark:to-gold/10 rounded-2xl p-8 border border-saffron/40 backdrop-blur-sm shadow-lg mb-8"
        >
          <div className="text-5xl mb-4">🕉️</div>
          <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-4 max-w-2xl mx-auto">
            "May your generous heart be filled with Krishna's blessings, and may this offering bring you closer to divine love and eternal happiness."
          </p>
          <p className="text-saffron font-semibold text-xl">
            Hare Krishna! Radhe Radhe! 🌸
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="space-y-4"
        >
          <motion.button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 bg-saffron-gradient text-white font-bold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome />
            Return to Home
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
