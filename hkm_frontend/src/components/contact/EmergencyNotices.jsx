import { motion } from 'framer-motion';
import { 
  FaExclamationTriangle, 
  FaBullhorn, 
  FaShieldAlt, 
  FaAmbulance, 
  FaLock, 
  FaCalendarCheck, 
  FaUsers, 
  FaPhone, 
  FaCalendarAlt, 
  FaClock,
  // IoIosMegaphone,
  FaFirstAid,
  FaDownload,
  FaInfoCircle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { IoIosMegaphone } from "react-icons/io";

export default function EmergencyNotices() {
  const emergencyContacts = [
    {
      service: 'Medical Emergency',
      number: '+91 98765 43213',
      description: 'Immediate medical assistance and first aid',
      availability: '24/7',
      icon: <FaAmbulance />,
      color: 'from-red-500 to-red-600'
    },
    {
      service: 'Temple Security',
      number: '+91 91161 39371',
      description: 'Security issues, lost items, safety concerns',
      availability: '24/7',
      icon: <FaLock />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      service: 'Festival Coordination',
      number: '+91 98765 43214',
      description: 'Event emergencies, crowd management during festivals',
      availability: 'During Events',
      icon: <FaCalendarCheck />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      service: 'VIP Guest Services',
      number: '+91 98765 43215',
      description: 'Special assistance for elderly, disabled, or VIP visitors',
      availability: 'Temple Hours',
      icon: <FaUsers />,
      color: 'from-green-500 to-green-600'
    }
  ];

  const currentNotices = [
    {
      id: 1,
      type: 'Festival Alert',
      title: 'Janmashtami 2024 - Special Arrangements',
      message: 'Extended hours from Aug 25-26. Special entry gates for devotees. Free shuttle service from railway station.',
      priority: 'high',
      validUntil: '2024-08-26',
      icon: <IoIosMegaphone />
    },
    {
      id: 2,
      type: 'Weather Advisory',
      title: 'Monsoon Season Precautions',
      message: 'Carry umbrellas and wear appropriate footwear. Some outdoor activities may be moved indoors.',
      priority: 'medium',
      validUntil: '2024-09-30',
      icon: <span className="text-2xl">🌧️</span>
    },
    {
      id: 3,
      type: 'Health Notice',
      title: 'Enhanced Sanitization Measures',
      message: 'Hand sanitizers available at all entry points. Masks recommended for elderly visitors.',
      priority: 'medium',
      validUntil: '2024-12-31',
      icon: <FaFirstAid />
    }
  ];

  const festivalEmergencyInfo = {
    nextBigEvent: 'Diwali Celebration 2024',
    date: 'November 12, 2024',
    expectedVisitors: '5000+',
    specialArrangements: [
      'Additional security personnel deployed',
      'Medical camp setup with qualified doctors',
      'Extra parking arrangements at nearby grounds',
      'Free water and refreshment counters',
      'Lost & found help desk at main entrance'
    ]
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
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
            Emergency Contacts & Important Notices
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Stay informed about important updates and know who to contact in case of emergencies
          </p>
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Emergency Contact Numbers</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-red-300 dark:border-red-500 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-red-500 hover:border-opacity-80 dark:hover:border-opacity-60 hover:shadow-red-300/30 dark:hover:shadow-red-500/20 transition-all duration-300 group text-center shadow-xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {contact.icon}
                </div>
                
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                  {contact.service}
                </h4>
                
                <div className="text-2xl font-bold text-red-600 dark:text-red-300 mb-3 font-mono">
                  {contact.number}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {contact.description}
                </p>
                
                <span className="inline-block bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 text-xs px-3 py-1 rounded-full font-semibold">
                  {contact.availability}
                </span>

                <motion.button
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPhone />
                  Call Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Current Notices */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Current Important Notices</h3>
          <div className="space-y-6">
            {currentNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-xl p-6 border backdrop-blur-xl transition-all duration-300 group shadow-lg ${
                  notice.priority === 'high' 
                    ? 'bg-red-100/80 dark:bg-gradient-to-r dark:from-red-900/30 dark:to-orange-900/30 border-red-400 dark:border-red-500 border-opacity-60 dark:border-opacity-50' 
                    : 'bg-yellow-100/80 dark:bg-gradient-to-r dark:from-yellow-900/30 dark:to-amber-900/30 border-yellow-400 dark:border-yellow-500 border-opacity-60 dark:border-opacity-50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      notice.priority === 'high' ? 'bg-red-600' : 'bg-yellow-600'
                    } shadow-lg`}>
                      <span className="text-white text-xl">{notice.icon}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          notice.priority === 'high' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-black'
                        }`}>
                          {notice.type}
                        </span>
                        {notice.priority === 'high' && (
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-red-600 dark:text-red-400 font-bold text-sm"
                          >
                            URGENT
                          </motion.span>
                        )}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-xs flex items-center gap-1">
                        <FaCalendarAlt />
                        Valid until: {notice.validUntil}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                      {notice.title}
                    </h4>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                      {notice.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Festival Emergency Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/30 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Upcoming Festival - Special Arrangements</h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🎊</div>
              <h4 className="text-xl font-bold text-saffron mb-2">{festivalEmergencyInfo.nextBigEvent}</h4>
              <p className="text-gold font-semibold text-lg mb-2 flex items-center justify-center gap-2">
                <FaCalendarAlt />
                {festivalEmergencyInfo.date}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center justify-center gap-2">
                <FaUsers />
                Expected Visitors: <span className="font-bold text-gray-800 dark:text-white">{festivalEmergencyInfo.expectedVisitors}</span>
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gold mb-4 flex items-center gap-2">
                <FaShieldAlt />
                Special Safety Arrangements:
              </h4>
              <ul className="space-y-2">
                {festivalEmergencyInfo.specialArrangements.map((arrangement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-2"
                  >
                    <FaInfoCircle className="text-saffron mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{arrangement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <motion.button
              className="px-6 py-3 bg-saffron-gradient text-white font-bold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              Download Festival Safety Guide
            </motion.button>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaClock className="text-saffron" />
              <span>24/7 Emergency</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="text-gold" />
              <span>Safety First</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Always Updated</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
