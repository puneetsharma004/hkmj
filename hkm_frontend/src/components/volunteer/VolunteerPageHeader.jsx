import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaChevronRight, 
  FaHandshake, 
  FaUsers, 
  FaBullseye, 
  FaClock, 
  FaCalendarAlt, 
  FaHeart, 
  FaHandsHelping, 
  FaInfoCircle,
  FaUserFriends,
  FaLightbulb
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function VolunteerPageHeader() {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Spiritual Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-5">
        <div className="absolute top-16 left-16 text-6xl text-saffron animate-pulse delay-300">
          <FaHandshake />
        </div>
        <div className="absolute top-32 right-20 text-5xl text-gold animate-pulse delay-800">
          <span>💝</span>
        </div>
        <div className="absolute bottom-32 left-20 text-7xl text-saffron animate-pulse delay-1200">
          <span>🙏</span>
        </div>
        <div className="absolute bottom-16 right-16 text-4xl text-gold animate-pulse delay-600">
          <HiSparkles />
        </div>
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
            <span className="text-saffron font-medium flex items-center space-x-1">
              <FaHandsHelping className="text-xs" />
              <span>Volunteer With Us</span>
            </span>
          </div>
        </motion.nav>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex justify-center items-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-32"></div>
            <span className="mx-6 text-5xl text-saffron animate-pulse">
              <FaHandshake />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-32"></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text-saffron-gold mb-6">
            Volunteer With Us
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Serve with Devotion – Be Part of Our Spiritual Community
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-saffron/20 dark:to-gold/20 rounded-2xl p-6 max-w-3xl mx-auto border border-saffron/40 dark:border-saffron/30 border-opacity-60 dark:border-opacity-100 shadow-lg"
          >
            <p className="text-gray-800 dark:text-white text-lg italic mb-2">
              "सेवा परमो धर्मः"
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              "Service is the highest dharma" - Join hundreds of devotees in selfless service to Krishna and humanity
            </p>
          </motion.div>
        </motion.div>

        {/* Volunteer Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
        >
          {[
            { number: '500+', label: 'Active Volunteers', icon: <FaUsers /> },
            { number: '25+', label: 'Service Areas', icon: <FaBullseye /> },
            { number: '15K+', label: 'Hours Monthly', icon: <FaClock /> },
            { number: '5+', label: 'Years Program', icon: <FaCalendarAlt /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              className="text-center p-4 bg-white/90 dark:bg-gradient-to-br dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-20 backdrop-blur-sm shadow-lg hover:shadow-saffron/20 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2 text-saffron group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-saffron">{stat.number}</div>
              <div className="text-gray-600 dark:text-gray-300 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaUserFriends className="text-saffron" />
              <span>Growing Community</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeart className="text-gold" />
              <span>Sacred Service</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Spiritual Growth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
