import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaClock, 
  FaBell, 
  FaSun, 
  FaMoon, 
  FaCloud, 
  FaCrown, 
  FaDoorOpen, 
  FaDoorClosed,
  FaRegClock,
  FaCalendarAlt,
  FaInfoCircle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BsFillSunsetFill } from "react-icons/bs";

export default function DailyDarshanTimings() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextAarti, setNextAarti] = useState(null);

  const aartiSchedule = [
    {
      name: 'Mangala Aarti',
      time: '4:30 AM',
      timeValue: 4.5 * 60,
      description: 'Wake up the deity with devotional songs',
      significance: 'The first aarti awakens Lord Krishna and welcomes the new day with gratitude',
      icon: <FaSun />,
      // duration: '30 mins'
    },
    {
      name: 'Darshan Aarti',
      time: '7:30 AM',
      timeValue: 7.5 * 60,
      description: 'Morning dress and decoration of deities',
      significance: 'Adorning the deities with beautiful clothes and ornaments',
      icon: <FaCrown />,
      // duration: '45 mins'
    },
    {
      name: 'Raj Bhog Aarti',
      time: '12:00 PM',
      timeValue: 12 * 60,
      description: 'Midday offering and bhog',
      significance: 'The grand afternoon meal offering to the deities',
      icon: <FaSun />,
      // duration: '1 hour'
    },
    {
      name: 'Utthapan Aarti',
      time: '4:00 PM',
      timeValue: 16 * 60,
      description: 'Afternoon awakening ceremony',
      significance: 'Waking the deities from their afternoon rest',
      icon: <FaCloud />,
      // duration: '20 mins'
    },
    {
      name: 'Sandhya Aarti',
      time: '7:00 PM',
      timeValue: 19 * 60,
      description: 'Evening prayers and lamp ceremony',
      significance: 'The most popular evening aarti with beautiful lamp offerings',
      icon: <BsFillSunsetFill />,
      // duration: '1 hour'
    },
    {
      name: 'Shayan Aarti',
      time: '8:15 PM',
      timeValue: 20.25 * 60,
      description: 'Night rest ceremony',
      significance: 'Putting the deities to peaceful rest for the night',
      icon: <FaMoon />,
      // duration: '30 mins'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const next = aartiSchedule.find(aarti => aarti.timeValue > currentMinutes);
      setNextAarti(next || aartiSchedule[0]); // If no aarti today, show tomorrow's first
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeUntilNext = () => {
    if (!nextAarti) return '';
    
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    let timeUntil = nextAarti.timeValue - currentMinutes;
    
    if (timeUntil <= 0) {
      timeUntil = (24 * 60) + timeUntil; // Next day
    }
    
    const hours = Math.floor(timeUntil / 60);
    const minutes = timeUntil % 60;
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>

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
            Daily Darshan & Aarti Timings
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Join us for divine darshan and experience the sacred aarti ceremonies throughout the day
          </p>
        </motion.div>

        {/* Next Aarti Highlight */}
        {nextAarti && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-indigo-900/80 dark:to-purple-900/80 rounded-2xl p-6 mb-12 border border-saffron/40 dark:border-saffron border-opacity-60 dark:border-opacity-40 backdrop-blur-xl shadow-lg"
          >
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Next Aarti</h3>
              <div className="text-2xl font-bold text-saffron mb-2">{nextAarti.name}</div>
              <div className="text-xl text-gold mb-2 flex items-center justify-center gap-2">
                <FaRegClock />
                {nextAarti.time}
              </div>
              <div className="text-lg text-gray-700 dark:text-gray-300">
                Starts in: <span className="font-bold text-saffron">{getTimeUntilNext()}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Aarti Schedule Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aartiSchedule.map((aarti, index) => {
            const isNext = nextAarti && aarti.name === nextAarti.name;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`rounded-2xl shadow-2xl p-6 border backdrop-blur-xl transition-all duration-300 group ${
                  isNext 
                    ? 'bg-gradient-to-br from-saffron/20 to-gold/20 dark:from-saffron/20 dark:to-gold/20 border-saffron border-opacity-80 shadow-saffron/30' 
                    : 'bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50'
                }`}
              >
                {/* Time and Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl text-saffron">{aarti.icon}</div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${isNext ? 'text-saffron' : 'text-gold'}`}>
                      {aarti.time}
                    </div>
                  </div>
                </div>

                {/* Aarti Name */}
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                  isNext ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-white group-hover:text-saffron'
                }`}>
                  {aarti.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {aarti.description}
                </p>

                {/* Significance */}
                <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                  <div className="text-xs text-saffron mb-1 flex items-center gap-1">
                    <FaInfoCircle />
                    Spiritual Significance:
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                    {aarti.significance}
                  </p>
                </div>

                {/* Next Indicator */}
                {isNext && (
                  <motion.div
                    className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    NEXT
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Temple Timings */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-purple-900/50 dark:to-indigo-900/50 rounded-2xl p-8 border border-blue-300 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Temple Timings</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
                <FaSun />
              </div>
              <h4 className="font-bold text-saffron mb-2">Morning Session</h4>
              <p className="text-gray-700 dark:text-gray-300">4:30 AM - 12:30 PM</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Daily darshan and morning activities</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
                <BsFillSunsetFill />
              </div>
              <h4 className="font-bold text-saffron mb-2">Evening Session</h4>
              <p className="text-gray-700 dark:text-gray-300">4:00 PM - 8:30 PM</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Evening darshan and night aarti</p>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-400 dark:border-gray-600">
            <p className="text-gray-700 dark:text-gray-300 text-sm flex items-center justify-center gap-2">
              <FaDoorClosed className="text-saffron" />
              Temple remains <span className="text-saffron font-semibold">closed</span> from 12:30 PM to 4:00 PM for deity rest
            </p>
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
              <FaBell className="text-saffron" />
              <span>Live Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gold" />
              <span>Daily Schedule</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Sacred Timings</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
