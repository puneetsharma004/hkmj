import { motion } from 'framer-motion';
import { 
  FaDoorOpen, 
  FaCalendarAlt, 
  FaHotel, 
  FaTheaterMasks, 
  FaPrayingHands, 
  FaCompass, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaClock, 
  FaArrowRight, 
  FaDownload, 
  FaMobileAlt, 
  FaCheckCircle, 
  FaGift, 
  FaUsers,
  FaWhatsapp,
  FaStar
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function VisitorInfoCallToAction() {
  const quickActions = [
    // {
    //   title: 'Plan Your Visit',
    //   description: 'Get personalized visit recommendations',
    //   icon: <FaCalendarAlt />,
    //   color: 'from-blue-500 to-cyan-600',
    //   action: 'Start Planning',
    //   link: '#plan-visit'
    // },
    {
      title: 'Book Accommodation',
      description: 'Reserve your temple guest room',
      icon: <FaHotel />,
      color: 'from-green-500 to-teal-600',
      action: 'Book Now',
      link: '#accommodation'
    },
    {
      title: 'Join Events',
      description: 'Participate in upcoming programs',
      icon: <FaTheaterMasks />,
      color: 'from-purple-500 to-pink-600',
      action: 'View Events',
      link: '/events'
    },
    {
      title: 'Support Temple',
      description: 'Contribute to our spiritual mission',
      icon: <FaPrayingHands />,
      color: 'from-orange-500 to-red-600',
      action: 'Donate',
      link: '/donations'
    }
  ];

  const visitingPackages = [
    {
      name: 'Half Day Visit',
      duration: '4 hours',
      includes: ['Morning aarti participation', 'Temple tour', 'Prasadam meal', 'Spiritual discourse'],
      price: 'Free',
      timing: '5 AM - 9 AM',
      suitable: 'Local visitors'
    },
    {
      name: 'Full Day Experience',
      duration: '8 hours',
      includes: ['All aartis', 'Guided temple tour', 'Meals included', 'Cultural program', 'Souvenir'],
      price: 'Donation based',
      timing: '5 AM - 9 PM',
      suitable: 'Out-of-town visitors'
    },
    {
      name: 'Weekend Retreat',
      duration: '2 days',
      includes: ['Accommodation', 'All meals', 'Spiritual workshops', 'Meditation sessions', 'Personal guidance'],
      price: '₹1,500/person',
      timing: 'Friday evening to Sunday evening',
      suitable: 'Spiritual seekers'
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
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-gold/20 to-saffron/20 dark:bg-gold rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
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
            Ready to Visit Us?
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            Experience divine peace and spiritual joy at the Hare Krishna Marwar Mandir. 
            Your journey to Krishna consciousness begins here.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            {/* Primary Visit Button */}
            <motion.button
              className="group relative overflow-hidden px-12 py-4 bg-saffron text-white font-bold rounded-full shadow-2xl hover:shadow-saffron/50 transition-all duration-300 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-3">
                <FaDoorOpen />
                <span>Visit Temple Today</span>
                <motion.span
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <FaArrowRight />
                </motion.span>
              </span>
            </motion.button>

            {/* Get Directions */}
            <motion.button
              className="group border-2 border-saffron text-saffron font-bold px-8 py-4 rounded-full hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300 flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaCompass className="text-xl" />
              <span>Get Directions</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Quick Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.a
              key={index}
              href={action.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-60 hover:shadow-saffron/20 transition-all duration-300 group text-center shadow-xl"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {action.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-saffron transition-colors duration-300">
                {action.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                {action.description}
              </p>
              
              <motion.div
                className="inline-flex items-center space-x-2 text-saffron font-semibold group-hover:text-gold transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <span>{action.action}</span>
                <FaArrowRight />
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
              <FaMapMarkerAlt />
            </div>
            <h4 className="font-bold text-saffron mb-2">Visit Us</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Chopasani, Near Vastra Mantralay, <br />Jodhpur, RJ PIN: 342024,<br /> Nearest Landmark: Vastra Mantralay
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
              <FaPhone />
            </div>
            <h4 className="font-bold text-saffron mb-2">Call Us</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Visitor Helpline: +91 91161 39371<br/>
              Temple Office: +91 91161 39371
<br/>
              WhatsApp: +91 91161 39371

            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
              <FaClock />
            </div>
            <h4 className="font-bold text-saffron mb-2">Temple Hours</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Morning: 5:00 AM - 12:00 PM<br/>
              Evening: 4:00 PM - 9:00 PM<br/>
              Open Daily (All Year Round)
            </p>
          </div>
        </motion.div>

        {/* Final Blessing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
        >
          <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-4 max-w-2xl mx-auto">
            "The temple doors are always open for sincere souls seeking Krishna's love and peace."
          </p>
          <p className="text-saffron font-semibold text-xl flex items-center justify-center gap-2">
            Hare Krishna! We look forward to welcoming you 
          </p>
          
          {/* <div className="mt-8 text-center">
            <motion.button
              className="px-8 py-3 bg-saffron-gradient text-white font-bold rounded-full hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2 mx-auto shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              Download Visitor Guide
              <FaMobileAlt />
            </motion.button>
          </div> */}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaUsers className="text-saffron" />
              <span>Welcoming Community</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPrayingHands className="text-gold" />
              <span>Spiritual Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Divine Atmosphere</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
