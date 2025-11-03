import { motion } from 'framer-motion';
import { 
  FaTheaterMasks, 
  FaHome, 
  FaChevronRight, 
  FaClock, 
  FaMobileAlt, 
  FaGift, 
  FaCalendarAlt,
  FaEye,
  FaUsers
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function EventsPageHeader() {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10 text-center">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 text-sm">
            <a 
              href="/" 
              className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors duration-300 flex items-center space-x-1"
            >
              <FaHome className="text-xs" />
              <span>Home</span>
            </a>
            <FaChevronRight className="text-gray-500 dark:text-gray-600 text-xs" />
            <span className="text-saffron font-medium">Darshan & Events</span>
          </div>
        </motion.nav>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >  
          <h1 className="text-4xl md:text-6xl font-bold gradient-text-saffron-gold mb-6">
            Darshan & Events
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Experience Divine Darshan and Join Our Spiritual Celebrations
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <FaClock className="text-saffron" />
              <span>Daily Darshan: 8:30 AM - 8:30 PM</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <FaMobileAlt className="text-gold" />
              <span>Virtual Darshan Available</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <FaGift className="text-saffron" />
              <span>50+ Annual Events</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <div className="bg-saffron/10 rounded-2xl p-6 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl text-saffron mb-2 flex justify-center items-center">
                  <FaEye />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Visitors</div>
              </div>
              <div>
                <div className="text-3xl text-gold mb-2 flex justify-center items-center">
                  <FaUsers />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Community Members</div>
              </div>
              <div>
                <div className="text-3xl text-saffron mb-2 flex justify-center items-center">
                  <HiSparkles />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">14+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Years of Service</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
