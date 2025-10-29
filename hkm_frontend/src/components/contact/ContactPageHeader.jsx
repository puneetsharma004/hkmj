import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaEnvelope, 
  FaComments, 
  FaHome, 
  FaChevronRight, 
  FaWhatsapp, 
  FaMapMarkerAlt,
  FaPray
} from 'react-icons/fa';
import { FaShieldHeart } from "react-icons/fa6";

export default function ContactPageHeader() {
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
            <span className="text-saffron font-medium">Contact Us</span>
          </div>
        </motion.nav>

        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text-saffron-gold mb-6">
            Contact Us
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            We're Here to Help and Guide You
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-indigo-900/80 dark:to-purple-900/80 rounded-2xl p-6 max-w-3xl mx-auto border border-saffron/40 dark:border-saffron/30 border-opacity-60 dark:border-opacity-100 shadow-lg"
          >
            <p className="text-gray-800 dark:text-white text-lg">
              Whether you need guidance, have questions, or want to connect with our community, 
              we're always here to assist you on your spiritual journey.
            </p>
          </motion.div>
        </motion.div>

        {/* Quick Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
        >
          {[
            { icon: <FaPhone />, method: 'Call Us', detail: '+91 91161 39371', color: 'text-green-600', link: "tel:+919116139371" },
            { icon: <FaEnvelope />, method: 'Email Us', detail: 'nljd@hkmjodhpur.org', color: 'text-blue-600', link: "mailto:nljd@hkmjodhpur.org" },
            { icon: <FaWhatsapp />, method: 'WhatsApp', detail: 'Quick Response', color: 'text-green-500', link: "https://wa.me/919116139371" },
            { icon: <FaMapMarkerAlt />, method: 'Visit Us', detail: 'Jodhpur, Rajasthan', color: 'text-purple-600', link: "https://maps.app.goo.gl/Y3wsrxUAw5cdoKk96" }
          ].map((contact, index) => (
            <motion.a
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
              href={contact.link}
              className="text-center p-4 bg-white/10 dark:bg-gradient-to-br dark:from-purple-900/80 dark:to-indigo-900/80 rounded-xl border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-20 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-40 transition-all duration-300 group cursor-pointer shadow-lg"
            >
              <div className={`text-2xl mb-2 ${contact.color} group-hover:scale-110 transition-transform duration-300 flex justify-center items-center`}>
                {contact.icon}
              </div>
              <div className="text-saffron font-bold text-sm">{contact.method}</div>
              <div className="text-gray-600 dark:text-gray-300 text-xs">{contact.detail}</div>
            </motion.a>
          ))}
        </motion.div>

        {/* Additional Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12"
        >
          <div className="bg-saffron/10 rounded-2xl p-6 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl text-saffron mb-2 flex justify-center items-center">
                  <FaComments />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">08:30 AM - 08:30 PM</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Available Support</div>
              </div>
              <div>
                <div className="text-3xl text-gold mb-2 flex justify-center items-center">
                  <FaEnvelope />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">24hrs</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Response Time</div>
              </div>
              <div>
                <div className="text-3xl text-saffron mb-2 flex justify-center items-center">
                  <FaShieldHeart />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Personal Care</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
