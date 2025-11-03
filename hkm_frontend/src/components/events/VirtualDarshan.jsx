import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaMobileAlt, 
  FaDesktop, 
  FaTv, 
  FaVideo, 
  FaVrCardboard, 
  FaImages, 
  FaCalendarPlus, 
  FaPlay, 
  FaClock, 
  FaInfoCircle,
  FaEye,
  FaCamera,
  FaUniversity,
  FaPalette,
  FaPlayCircle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { PiFlowerLotusFill } from "react-icons/pi";

export default function VirtualDarshan() {
  const [activeTab, setActiveTab] = useState('live');

  const virtualOptions = [
    {
      id: 'live',
      title: 'Live Darshan',
      icon: <FaTv />,
      description: 'Join live streaming during aarti times',
      available: true
    },
    // {
    //   id: '360',
    //   title: '360° Tour',
    //   icon: <FaVrCardboard />,
    //   description: 'Virtual temple tour experience',
    //   available: true
    // },
    {
      id: 'gallery',
      title: 'Photo Gallery',
      icon: <FaImages />,
      description: 'High-quality deity photographs',
      available: true
    },
    // {
    //   id: 'booking',
    //   title: 'Book Session',
    //   icon: <FaCalendarPlus />,
    //   description: 'Schedule personal virtual darshan',
    //   available: false
    // }
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
          <div className="flex justify-center items-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
            <span className="mx-4 text-4xl text-saffron animate-pulse">
              <FaMobileAlt />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Virtual Darshan
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Experience divine darshan from anywhere in the world through our virtual temple services
          </p>
        </motion.div>

        {/* Virtual Darshan Options */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Options Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              {virtualOptions.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setActiveTab(option.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 shadow-lg outline-none ${
                    activeTab === option.id
                      ? 'bg-saffron-gradient text-white border-saffron'
                      : 'bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 text-gray-700 dark:text-gray-300 border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50'
                  } ${!option.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: option.available ? 1.02 : 1 }}
                  whileTap={{ scale: option.available ? 0.98 : 1 }}
                  disabled={!option.available}
                >
                  <div className={`text-2xl mb-2 ${activeTab === option.id? "text-white": "text-saffron"}`}>{option.icon}</div>
                  <div className="font-semibold text-sm">{option.title}</div>
                  {!option.available && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Coming Soon</div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Active Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl"
            >
              {activeTab === 'live' && (
                <div>
                  <h3 className="text-xl font-bold text-saffron mb-4 flex items-center gap-2">
                    <FaVideo />
                    Live Darshan Streaming
                  </h3>
                  <div className="space-y-4 text-gray-700 dark:text-gray-200">
                    <p>Join our live darshan sessions during aarti times:</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-orange-100/20 dark:bg-purple-900/30 p-3 rounded-lg">
                        <div className="font-semibold text-gold flex items-center gap-1">
                          <FaClock />
                          Morning Aarti
                        </div>
                        <div>4:30 AM - 6:00 AM</div>
                      </div>
                      <div className="bg-orange-100/20 dark:bg-purple-900/30 p-3 rounded-lg">
                        <div className="font-semibold text-gold flex items-center gap-1">
                          <FaClock />
                          Evening Aarti
                        </div>
                        <div>7:00 PM - 8:00 PM</div>
                      </div>
                    </div>
                    <motion.button
                      className="w-full bg-saffron-gradient text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-saffron/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaPlayCircle />
                      Join Live Stream
                    </motion.button>
                  </div>
                </div>
              )}

              {activeTab === '360' && (
                <div>
                  <h3 className="text-xl font-bold text-saffron mb-4 flex items-center gap-2">
                    <FaVrCardboard />
                    360° Virtual Tour
                  </h3>
                  <div className="space-y-4 text-gray-700 dark:text-gray-200">
                    <p>Take an immersive virtual tour of our temple:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <FaUniversity className="text-saffron" />
                        <span>Main sanctum and deity darshan</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <PiFlowerLotusFill className="text-gold" />
                        <span>Beautiful temple architecture</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <FaPalette className="text-saffron" />
                        <span>Sacred artwork and decorations</span>
                      </li>
                    </ul>
                    <motion.button
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaVrCardboard />
                      Start Virtual Tour
                    </motion.button>
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div>
                  <h3 className="text-xl font-bold text-saffron mb-4 flex items-center gap-2">
                    <FaImages />
                    Deity Photo Gallery
                  </h3>
                  <div className="space-y-4 text-gray-700 dark:text-gray-200">
                    <p>View high-quality photographs of our deities:</p>
                
                    <motion.button
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaCamera />
                      View Full Gallery
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Virtual Darshan Video/Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl overflow-hidden border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-orange-100/80 to-amber-100/80 dark:from-saffron/20 dark:to-gold/20 flex items-center justify-center relative">
                <div className="text-center">
                  <p className="text-gray-800 dark:text-white font-semibold">Virtual Darshan Preview</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Live streaming available during aarti times</p>
                </div>
                
                {/* Play Button Overlay */}
                <motion.button
                  className="absolute inset-0 bg-black/30 flex items-center justify-center hover:bg-black/40 transition-colors duration-300"
                >
                  <div className="w-16 h-16 bg-saffron rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                    <FaPlay />
                  </div>
                </motion.button>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <FaEye />
                  Next Live Darshan
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-saffron font-semibold">Evening Aarti</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Today at 7:30 PM</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gold font-bold text-lg flex items-center gap-1">
                      <FaClock />
                      2:30:45
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">Time remaining</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 bg-saffron/10 rounded-xl p-4 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg"
            >
              <h4 className="font-semibold text-saffron mb-2 flex items-center gap-2">
                <FaInfoCircle />
                How to Join Virtual Darshan
              </h4>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>• Click on the live stream button during aarti times</p>
                <p>• Ensure stable internet connection for best experience</p>
                <p>• Join with devotion and receive Krishna's blessings</p>
              </div>
            </motion.div>

            {/* Additional Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-4 text-center"
            >
              <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <FaTv className="text-saffron" />
                  <span>HD Streaming</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaVrCardboard className="text-gold" />
                  <span>360° Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiSparkles className="text-saffron" />
                  <span>Live Daily</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
