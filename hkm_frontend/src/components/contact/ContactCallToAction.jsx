import { motion } from 'framer-motion';
import { 
  FaComments, 
  FaCalendarAlt, 
  FaTheaterMasks, 
  FaPray, 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaArrowRight, 
  FaClock,
  FaUserFriends,
  FaHeart,
  FaHandsHelping
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function ContactCallToAction() {
  const quickActions = [
    {
      title: 'Plan Your Visit',
      description: 'Get all the information you need for a perfect temple visit',
      icon: <FaCalendarAlt />,
      color: 'from-blue-500 to-cyan-600',
      action: 'Plan Visit',
      link: '/visitor-info'
    },
    {
      title: 'Join Our Events',
      description: 'Participate in festivals, workshops, and spiritual programs',
      icon: <FaTheaterMasks />,
      color: 'from-purple-500 to-pink-600',
      action: 'View Events',
      link: '/events'
    },
    {
      title: 'Support Our Mission',
      description: 'Contribute to temple activities and community service',
      icon: <FaPray />,
      color: 'from-green-500 to-teal-600',
      action: 'Donate Now',
      link: '/donations'
    }
  ];

  const contactMethods = [
    {
      method: 'Call Us Directly',
      detail: '+91 91161 39371',
      description: 'Speak with our team for immediate assistance',
      icon: <FaPhone />,
      action: 'Call Now'
    },
    {
      method: 'Send an Email',
      detail: 'nljd@hkmjodhpur.org',
      description: 'Detailed inquiries and official communication',
      icon: <FaEnvelope />,
      action: 'Email Us'
    },
    {
      method: 'WhatsApp Chat',
      detail: '+91 91161 39371',
      description: 'Quick messages and instant responses',
      icon: <FaWhatsapp />,
      action: 'Chat Now'
    },
    {
      method: 'Visit in Person',
      detail: 'Sector 12, Jodhpur',
      description: 'Come to our temple office for personal assistance',
      icon: <FaMapMarkerAlt />,
      action: 'Get Directions'
    }
  ];

  return (
    <section className="relative py-4 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
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
          <div className="flex justify-center items-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-32"></div>
            <span className="mx-6 text-5xl text-saffron animate-pulse">
              <FaComments />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-32"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-saffron-gold mb-6">
            Let's Connect & Serve Together
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            Have questions about visiting, donating, or joining our programs? 
            We are here to help and guide you on your spiritual journey.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-indigo-900/80 dark:to-purple-900/80 rounded-2xl p-6 max-w-3xl mx-auto border border-saffron/40 dark:border-saffron/30 border-opacity-60 dark:border-opacity-100 mb-12 shadow-lg"
          >
            <p className="text-gray-800 dark:text-white text-lg">
              "Your questions are important to us. Every inquiry brings us closer to serving you better 
              and spreading Krishna's love throughout our community."
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Action Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.a
              key={index}
              href={action.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-60 hover:shadow-saffron/20 transition-all duration-300 group text-center shadow-xl"
            >
              <div className={`w-20 h-20 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {action.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-saffron transition-colors duration-300">
                {action.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
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

        {/* Contact Methods Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Choose Your Preferred Contact Method</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl p-6 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group text-center shadow-lg"
              >
                <div className="text-4xl mb-3 text-saffron group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                  {method.icon}
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                  {method.method}
                </h4>
                <p className="text-gold font-semibold mb-2">{method.detail}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{method.description}</p>
                <span className="text-saffron text-sm font-semibold group-hover:text-gold transition-colors duration-300">
                  {method.action}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Response Promise */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm mb-12 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Our Response Promise</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { time: '< 2 mins', method: 'Phone Calls', icon: <FaPhone /> },
              { time: '< 24 hrs', method: 'Email Replies', icon: <FaEnvelope /> },
              { time: '< 1 hr', method: 'WhatsApp Messages', icon: <FaWhatsapp /> },
              { time: 'Immediate', method: 'In-Person Visits', icon: <FaMapMarkerAlt /> }
            ].map((promise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center outline-none"
              >
                <div className="text-3xl mb-2 text-saffron flex justify-center items-center">{promise.icon}</div>
                <div className="text-2xl font-bold text-saffron mb-1">{promise.time}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{promise.method}</div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Final Message & CTA */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg max-w-4xl mx-auto">
            <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-6 max-w-2xl mx-auto">
              "Every question is an opportunity to serve. Every conversation is a step towards 
              building our spiritual community together."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.button
                className="px-8 py-4 bg-saffron text-white font-bold rounded-full shadow-2xl hover:shadow-saffron/50 transition-all duration-300 text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaComments />
                Start a Conversation Today
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-saffron text-saffron font-bold rounded-full hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300 text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCalendarAlt />
                Schedule a Visit
              </motion.button>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <p className="text-saffron font-semibold text-xl">
                Hare Krishna! We're excited to hear from you
              </p>
            </div>
          </div>
        </motion.div> */}

        {/* Additional Info */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaUserFriends className="text-saffron" />
              <span>Personal Assistance</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaClock className="text-gold" />
              <span>Quick Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHandsHelping className="text-saffron" />
              <span>Ready to Help</span>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
