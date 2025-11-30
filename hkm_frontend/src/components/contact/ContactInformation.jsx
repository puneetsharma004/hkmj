import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClipboardList, 
  FaWhatsapp, 
  FaDirections, 
  // MdGpsFixed,
  FaBuilding,
  FaMapPin,
  FaInfoCircle,
  FaHandsHelping,
  FaNewspaper
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { MdGpsFixed } from "react-icons/md";

export default function ContactInformation() {
  const contactDetails = [
    {
      category: 'Temple Address',
      icon: <FaMapMarkerAlt />,
      color: 'from-blue-500 to-cyan-600',
      details: [
        { label: 'Full Address', value: 'Chopasani, Near Vastra Mantralay, Jodhpur, RJ', icon: <FaBuilding /> },
        { label: 'Nearest Landmark', value: 'Vastra Mantralay', icon: <FaMapPin /> },
        { label: 'Pin Code', value: '342024', icon: <FaMapMarkerAlt /> },
        { label: 'GPS Coordinates', value: '26.2863° N, 73.0392° E', icon: <MdGpsFixed /> }
      ]
    },
    {
      category: 'Phone Numbers',
      icon: <FaPhone />,
      color: 'from-green-500 to-teal-600',
      details: [
        { label: 'General Inquiries', value: '+91 91161 39371', icon: <FaInfoCircle /> },
        { label: 'Visitor Assistance', value: '+91 91161 39371', icon: <FaPhone /> },
        { label: 'Donations & Seva', value: '+91 91161 39371', icon: <FaHandsHelping /> },
        { label: 'Emergency Contact', value: '+91 91161 39371', icon: <FaPhone /> }
      ]
    },
    {
      category: 'Email Addresses',
      icon: <FaEnvelope />,
      color: 'from-purple-500 to-pink-600',
      details: [
        { label: 'General Information', value: 'nljd@hkmjodhpur.org', icon: <FaInfoCircle /> },
        { label: 'Donations & Seva', value: 'nljd@hkmjodhpur.org', icon: <FaHandsHelping /> },
        { label: 'Volunteer Opportunities', value: 'nljd@hkmjodhpur.org', icon: <FaHandsHelping /> },
        { label: 'Media & Press', value: 'nljd@hkmjodhpur.org', icon: <FaNewspaper /> }
      ]
    }
  ];

  const quickActions = [
    { action: 'Call Now', icon: <FaPhone />, color: 'bg-green-600', number: '+91 91161 39371' },
    { action: 'Send Email', icon: <FaEnvelope />, color: 'bg-blue-600', email: 'nljd@hkmjodhpur.org' },
    { action: 'WhatsApp', icon: <FaWhatsapp />, color: 'bg-green-500', number: '+91 91161 39371' },
    { action: 'Get Directions', icon: <FaDirections />, color: 'bg-purple-600', link: '#map' }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 dark:bg-purple-600 rounded-full opacity-40 dark:opacity-15 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Contact Information
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Multiple ways to reach us for all your spiritual and temple-related needs
          </p>
        </motion.div>

        {/* Contact Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactDetails.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${section.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                  {section.category}
                </h3>
              </div>

              <div className="space-y-4">
                {section.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: detailIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-saffron/40 dark:border-saffron/30 border-opacity-60 dark:border-opacity-100 pl-4 hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-60 transition-all duration-300"
                  >
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-2">
                      <span className="text-saffron">{detail.icon}</span>
                      {detail.label}
                    </div>
                    <div className="text-gray-800 dark:text-white font-semibold leading-relaxed">
                      {detail.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Action Buttons */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Quick Contact Actions</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`${action.color} text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex flex-col items-center space-y-2 shadow-lg`}
              >
                <span className="text-2xl">{action.icon}</span>
                <span>{action.action}</span>
                {action.number && <span className="text-xs opacity-80">{action.number}</span>}
                {action.email && <span className="text-xs opacity-80 truncate w-full">{action.email}</span>}
              </motion.button>
            ))}
          </div>
        </motion.div> */}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-saffron" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gold" />
              <span>Quick Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Personal Care</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
