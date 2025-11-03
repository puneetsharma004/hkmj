import { motion } from 'framer-motion';
import { 
  FaTheaterMasks, 
  FaCalendarAlt, 
  FaMobileAlt, 
  FaEdit, 
  FaHandshake, 
  FaPray, 
  FaDoorOpen, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaClock, 
  FaArrowRight,
  FaExclamationCircle,
  FaUserPlus,
  FaWhatsapp
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { PiHandsPrayingFill } from 'react-icons/pi';

export default function EventsCallToAction() {
  const quickActions = [
    {
      title: 'Join Virtual Darshan',
      description: 'Experience divine presence online',
      icon: <FaMobileAlt />,
      color: 'from-purple-500 to-indigo-600',
      link: '/virtual-darshan',
      urgent: false
    },
    {
      title: 'Register for Events',
      description: 'Book your spot in upcoming programs',
      icon: <FaEdit />,
      color: 'from-blue-500 to-cyan-600',
      link: '#newsletter',
      urgent: false
    },
    {
      title: 'Support Temple',
      description: 'Contribute to our spiritual mission',
      icon: <FaPray />,
      color: 'from-orange-500 to-red-600',
      link: '/donations',
      urgent: false
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-gold/20 to-saffron/20 dark:bg-gold rounded-full opacity-25 dark:opacity-10 blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Main CTA Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-saffron-gold mb-6">
            Begin Your Spiritual Journey
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            Join thousands of devotees in experiencing Krishna's divine love through our darshan, events, and community programs
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            {/* Primary CTA */}
            <motion.a
              href="/visitor-info"
              className="group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-saffron text-white font-bold px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-3">
                <FaDoorOpen className="text-2xl" />
                <span className="text-lg">Plan Your Visit</span>
                <motion.span
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <FaArrowRight />
                </motion.span>
              </div>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#newsletter"
              className="group border-2 border-saffron text-saffron font-bold px-8 py-4 rounded-full hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300 flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope className="text-xl" />
              <span>Get Event Updates</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.a
              key={index}
              href={action.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.03 }}
              className={`relative rounded-2xl p-6 border backdrop-blur-xl transition-all duration-300 group shadow-lg ${
                action.urgent 
                  ? 'bg-gradient-to-br from-saffron/20 to-gold/20 dark:from-saffron/20 dark:to-gold/20 border-saffron border-opacity-80 shadow-saffron/30' 
                  : 'bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50'
              }`}
            >
              {action.urgent && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FaExclamationCircle />
                  URGENT
                </motion.div>
              )}

              <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {action.icon}
              </div>
              
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-2 text-center group-hover:text-saffron transition-colors duration-300">
                {action.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                {action.description}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          id="newsletter"
          className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm mb-12 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Stay Connected with Krishna</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Subscribe to receive updates about upcoming events, festivals, and spiritual programs
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-900/80 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:border-opacity-80 dark:focus:border-opacity-60 transition-all duration-300"
              />
              <motion.button
                className="px-6 py-3 bg-saffron-gradient text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaUserPlus />
                Subscribe
              </motion.button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
              <FaMapMarkerAlt />
            </div>
            <h4 className="font-bold text-saffron mb-2">Visit Us</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Chopasani, Near Vastra Mantralay, <br /> Jodhpur, RJ PIN: 342024,<br /> Nearest Landmark: Vastra Mantralay
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
              <FaPhone />
            </div>
            <h4 className="font-bold text-saffron mb-2">Call Us</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Temple: +91 91161 39371<br/>
              Office: +91 91161 39371<br/>
              <span className="flex items-center justify-center gap-1">
                <FaWhatsapp className="text-green-500" />
                WhatsApp: +91 91161 39371
              </span>
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
              <FaClock />
            </div>
            <h4 className="font-bold text-saffron mb-2">Temple Hours</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Morning: 4:30 AM - 12:00 PM<br/>
              Evening: 4:00 PM - 8:30 PM<br/>
              Closed: 12:00 PM - 4:00 PM
            </p>
          </div>
        </motion.div>

        {/* Final Blessing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg max-w-4xl mx-auto">
            <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-4">
              "Wherever you are, whatever you do, remember Krishna and His divine love"
            </p>
            <div className="flex items-center justify-center space-x-4">
              <PiHandsPrayingFill className="text-2xl text-saffron" />
              <p className="text-saffron font-semibold text-xl">
                Hare Krishna!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
