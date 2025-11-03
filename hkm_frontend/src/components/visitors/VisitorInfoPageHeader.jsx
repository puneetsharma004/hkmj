import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaChevronRight, 
  FaUsers, 
  FaInfoCircle, 
  FaClock, 
  FaCar, 
  FaUtensils, 
  FaPhone, 
  FaParking,
  FaHandsHelping,
  FaHeart
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function VisitorInfoPageHeader() {
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
            <span className="text-saffron font-medium flex items-center space-x-1">
              <FaInfoCircle className="text-xs" />
              <span>Visitor Information</span>
            </span>
          </div>
        </motion.nav>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold gradient-text-saffron-gold mb-6">
            Visitor Information
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Plan Your Visit to Hare Krishna Marwar Mandir, Jodhpur
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-saffron/20 dark:to-gold/20 rounded-2xl p-6 max-w-3xl mx-auto dark:border-opacity-100 shadow-lg"
          >
            <p className="text-gray-800 dark:text-white text-lg flex items-center justify-center gap-2">
              Welcome to our sacred space. We're here to help make your visit meaningful and memorable.
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
        >
          {[
            { icon: <FaClock />, text: 'Open Daily', detail: '4:30 AM - 9 PM' },
            { icon: <FaParking />, text: 'Free Parking', detail: 'Available' },
            { icon: <FaUtensils />, text: 'Swadisht Prasadam', detail: 'Daily Distribution' },
            { icon: <FaPhone />, text: '24/7 Help', detail: 'Visitor Support' }
          ].map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              className="text-center p-4 bg-white/10 dark:bg-gradient-to-br dark:from-purple-900/80 dark:to-indigo-900/80 rounded-xl border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-20 backdrop-blur-sm shadow-lg hover:shadow-saffron/20 transition-all duration-300 group"
            >
              <div className="text-2xl mb-2 text-saffron group-hover:scale-110 transition-transform duration-300 flex justify-center items-center"> 
                {info.icon}
              </div>
              <div className="text-saffron font-bold text-sm">{info.text}</div>
              <div className="text-gray-600 dark:text-gray-300 text-xs">{info.detail}</div>
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
              <FaUsers className="text-saffron" />
              <span>Visitor Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHandsHelping className="text-gold" />
              <span>Guided Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Sacred Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
