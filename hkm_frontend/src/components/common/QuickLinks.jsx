import { motion } from 'framer-motion';
import { FaDonate, FaHandsHelping, FaVideo, FaPhone } from 'react-icons/fa';
import { IoCall } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { SiMinutemailer } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
export default function QuickLinks() {
  const links = [
    { 
      icon: <FaDonate size={30} />, 
      text: 'Donate Online', 
      link: '/donations',
      description: 'Support our temple seva',
      color: 'from-green-500 to-emerald-600',
      lightColor: 'from-green-400 to-emerald-500'
    },
    { 
      icon: <FaHandsHelping size={30} />, 
      text: 'Volunteer Signup', 
      link: '/volunteer',
      description: 'Join our divine service',
      color: 'from-blue-500 to-cyan-600',
      lightColor: 'from-blue-400 to-cyan-500'
    },
    { 
      icon: <FaVideo size={30} />, 
      text: 'Virtual Darshan', 
      link: '/virtual-darshan',
      description: 'Online temple visit',
      color: 'from-purple-500 to-violet-600',
      lightColor: 'from-purple-400 to-violet-500'
    },
    { 
      icon: <FaPhone size={30} />, 
      text: 'Contact Temple', 
      link: 'tel:+919116139371',
      description: 'Get in touch with us',
      color: 'from-orange-500 to-red-600',
      lightColor: 'from-orange-400 to-red-500'
    }
  ];

  return (
    <section className="relative py-8 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-amber-100/40 to-yellow-100/40 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-saffron/25 to-orange-400/25 dark:bg-orange-600 rounded-full opacity-50 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 dark:bg-purple-600 rounded-full opacity-40 dark:opacity-10 blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-300/15 to-saffron/15 rounded-full opacity-35 blur-2xl animate-pulse delay-750 dark:hidden"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
 
          <h3 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Quick Actions
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Easy access to temple services and community engagement
          </p>
        </motion.div>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {links.map((link, i) => (
            <motion.a
              key={i}
              href={link.link}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative outline-none"
            >
              {/* Main Card */}
              <div className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 p-6 rounded-2xl shadow-xl border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-60 hover:shadow-2xl hover:shadow-saffron/20 transition-all duration-300 h-full outline-none">
                
                {/* Icon Container */}
                <div className="flex justify-center mb-4">
                  <div className={`bg-gradient-to-r ${link.lightColor} dark:${link.color} p-4 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 transform`}>
                    <div className="text-white">
                      {link.icon}
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-center">
                  <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-2 group-hover:text-saffron transition-colors duration-300">
                    {link.text}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {link.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <motion.div 
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-saffron text-xl">→</span>
                </motion.div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl shadow-lg group-hover:shadow-saffron/30 dark:group-hover:shadow-saffron/20 group-hover:shadow-2xl transition-shadow duration-300"></div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Additional Info Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-saffron/10 p-6 rounded-2xl border border-saffron/50 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm max-w-4xl mx-auto shadow-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2 justify-center">
              <span className="text-saffron font-semibold flex items-center gap-2"><IoCall /> 24/7 Support:</span> Need immediate assistance? Our temple staff is always ready to help.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-2 hover:text-saffron transition-colors duration-300">
                <span><GoClockFill /></span>
                <span>Temple Hours: 5 AM - 9 PM</span>
              </div>
              <div className="flex items-center justify-center space-x-2 hover:text-saffron transition-colors duration-300">
                <span><SiMinutemailer /></span>
                <span>Email: nljd@hkmjodhpur.org</span>
              </div>
              <div className="flex items-center justify-center space-x-2 hover:text-saffron transition-colors duration-300">
                <span><FaWhatsapp /></span>
                <span>WhatsApp: +91 91161 39371</span>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Emergency Contact Section
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-6 text-lg">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-2 bg-white/70 dark:bg-gray-800/70 px-4 py-2 rounded-full shadow-lg border border-orange-200 dark:border-purple-400/30 backdrop-blur-sm"
            >
              <span className="text-green-500">🟢</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Temple Open Now</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center space-x-2 bg-white/70 dark:bg-gray-800/70 px-4 py-2 rounded-full shadow-lg border border-orange-200 dark:border-purple-400/30 backdrop-blur-sm"
            >
              <span className="text-saffron animate-pulse">🔔</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Next Aarti: 7:00 PM</span>
            </motion.div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
