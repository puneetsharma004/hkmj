import { motion } from 'framer-motion';
import { 
  FaBell, 
  FaClock, 
  FaInfoCircle, 
  FaArrowRight, 
  FaCalendarAlt,
  FaPray,
  FaLeaf
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BsFillSunriseFill } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { BsCloudSunFill } from "react-icons/bs";
import { BsFillSunFill } from "react-icons/bs";
import { BsSunsetFill } from "react-icons/bs";
import { IoIosCloudyNight } from "react-icons/io";
export default function AartiSchedule() {
  const aartiSchedule = [
    {
      name: 'Mangala Aarti',
      time: '4:30 AM',
      duration: '30 mins',
      description: 'Early morning awakening ceremony for the deities',
      significance: 'Awakens the deities with devotional songs and prayers',
      icon: <BsFillSunriseFill />,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      name: 'Darshan Aarti',
      time: '7:00 AM',
      duration: '45 mins',
      description: 'Morning dress and decoration ceremony',
      significance: 'Adorning the deities with beautiful clothes and ornaments',
      icon: <FaCrown />,
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'Raj Bhog Aarti',
      time: '12:00 PM',
      duration: '15 mins',
      description: 'Grand midday offering ceremony',
      significance: 'The royal lunch offering to Krishna with elaborate bhog',
      icon: <BsFillSunFill /> ,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      name: 'Utthapan Aarti',
      time: '4:00 PM',
      duration: '20 mins',
      description: 'Afternoon awakening ceremony',
      significance: 'Waking the deities from their afternoon rest',
      icon: <BsCloudSunFill />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Sandhya Aarti',
      time: '7:30 PM',
      duration: '15 mins',
      description: 'Evening lamp offering ceremony',
      significance: 'The most beautiful evening aarti with ghee lamps',
      icon: <BsSunsetFill />,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      name: 'Shayan Aarti',
      time: '8:30 PM',
      duration: '30 mins',
      description: 'Night rest ceremony',
      significance: 'Putting the deities to peaceful rest for the night',
      icon: <IoIosCloudyNight />,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-15 blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-1500"></div>
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
            Daily Aarti Schedule
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto mb-6">
            Join us for these sacred ceremonies throughout the day
          </p>
          
          <motion.a
            href="/events"
            className="inline-flex items-center space-x-2 text-saffron hover:text-gold transition-colors duration-300 font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            <FaCalendarAlt />
            <span>View Complete Events Schedule</span>
            <FaArrowRight />
          </motion.a>
        </motion.div>

        {/* Aarti Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aartiSchedule.map((aarti, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl overflow-hidden border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${aarti.color} p-6 text-center`}>
                <div className="text-4xl mb-2 text-white flex justify-center">{aarti.icon}</div>
                <h3 className="text-xl font-bold text-white">{aarti.name}</h3>
                <div className="text-2xl font-bold text-white mt-2 flex items-center justify-center gap-2">
                  <FaClock />
                  {aarti.time}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="text-gold font-semibold">{aarti.duration}</span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {aarti.description}
                </p>
                
                <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                  <h4 className="text-sm font-semibold text-saffron mb-2 flex items-center gap-2">
                    <HiSparkles />
                    Spiritual Significance:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {aarti.significance}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Aarti Participation Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-saffron mb-4 flex items-center gap-2">
                <FaInfoCircle />
                What to Expect:
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <FaLeaf className="text-gold" />
                  <span>Devotional songs and mantras</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-gold">🪔</span>
                  <span>Beautiful lamp offerings to deities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-gold">🍃</span>
                  <span>Distribution of sacred prasadam</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaPray className="text-gold" />
                  <span>Opportunity for personal prayers</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-saffron mb-4 flex items-center gap-2">
                <FaInfoCircle />
                How to Participate:
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <FaClock className="text-gold" />
                  <span>Arrive 10-15 minutes early</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-gold">🪑</span>
                  <span>Sit quietly in designated areas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-gold">🎵</span>
                  <span>Join in chanting if you wish</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-gold">🙏</span>
                  <span>Receive prasadam with cupped hands</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

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
              <FaClock className="text-saffron" />
              <span>Daily Schedule</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPray className="text-gold" />
              <span>Sacred Rituals</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Divine Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
