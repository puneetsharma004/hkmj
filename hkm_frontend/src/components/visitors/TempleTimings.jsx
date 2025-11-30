import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaClock, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaUsers, 
  FaInfoCircle, 
  FaStar, 
  FaHeart, 
  FaRegClock,
  FaBell,
  FaUserClock
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { RiRestTimeFill } from "react-icons/ri";
import { BsFillSunriseFill } from "react-icons/bs";
import { BsFillSunsetFill } from "react-icons/bs";
export default function TempleTimings() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentHour = now.getHours();
      // Temple open: 4:30 AM - 1 PM and 4:30 PM - 8:30 PM
      const isCurrentlyOpen = (currentHour >= 4 && currentHour < 13) || (currentHour >= 16 && currentHour < 21);
      setIsOpen(isCurrentlyOpen);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate next opening time message
  const getNextOpening = () => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();

    if (hour < 4 || (hour === 4 && minute < 30)) {
      return '4:30 AM Today';
    } else if (hour < 13) {
      return '4:30 PM Today';
    } else if (hour < 16 || (hour === 16 && minute < 30)) {
      return '4:30 PM Today';
    } else {
      return '4:30 AM Tomorrow';
    }
  };

  const dailySchedule = [
    {
      session: 'Morning Session',
      time: '4:30 AM - 1:00 PM',
      icon: <BsFillSunriseFill />,
      activities: ['Mangala Aarti', 'Guru Puja', 'Sringar Aarti', 'Raj Bhog'],
      highlight: true
    },
    {
      session: 'Afternoon Break',
      time: '1:00 PM - 4:30 PM',
      icon: <RiRestTimeFill />,
      activities: ['Temple Closed', 'Deity Rest Time'],
      highlight: false
    },
    {
      session: 'Evening Session',
      time: '4:30 PM - 8:30 PM',
      icon: <BsFillSunsetFill />,
      activities: ['Utthapan Aarti', 'Sandhya Aarti', 'Shayan Aarti'],
      highlight: true
    }
  ];

  const specialTimings = [
    { occasion: 'Festival Days', timing: 'Extended Hours (4 AM - 10 PM)', note: 'During major festivals' },
    { occasion: 'Ekadashi (15th November 2025)', timing: 'Same as Daily Schedule', note: 'Fasting from Grains, Delicious Prasadam Distribution' },
    { occasion: 'Janmashtami (04 September 2026)', timing: 'Full Night Open', note: 'Midnight Celebrations, Optional Fasting' },
    { occasion: 'Weekends', timing: 'Regular Schedule + Palki Utsav', note: 'Bhagavatam & Srimad Bhagavat Gita Classes for all' }
  ];

  const bestTimes = [
    { time: 'Morning Artis (4:30 AM - 7:00 AM)', reason: 'Peaceful atmosphere, less crowded', crowd: 'Low' },
    { time: 'Evening Aarti (07:00 PM - 08:30 PM)', reason: 'Beautiful ceremony, vibrant energy', crowd: 'High' },
    { time: 'Weekend Evenings (07:00 PM - 08:45 PM)', reason: 'Ecstatic Kirtan followed by Palki Utsav & Prasadam', crowd: 'Medium' },
    { time: 'Sunday Mornings (07:00 AM - 10:00 AM)', reason: 'Special Programs including Aartis, Bhagvatam & Srimad Bhagavat Gita Classes & Prasadam Distribution', crowd: 'High' }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 dark:bg-purple-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
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
            Temple Timings
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Plan your visit with our daily schedule and special occasion timings
          </p>
        </motion.div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mb-12 rounded-2xl p-6 border backdrop-blur-xl shadow-lg ${
            isOpen 
              ? 'bg-green-100/80 dark:bg-gradient-to-r dark:from-green-900/30 dark:to-emerald-900/30 border-green-400 dark:border-green-500 border-opacity-60 dark:border-opacity-50' 
              : 'bg-red-100/80 dark:bg-gradient-to-r dark:from-red-900/30 dark:to-orange-900/30 border-red-400 dark:border-red-500 border-opacity-60 dark:border-opacity-50'
          }`}
        >
          <div className="text-center">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-4xl mb-3"
      >
        {isOpen ? (
          <FaCheckCircle className="text-green-600 dark:text-green-400 mx-auto" />
        ) : (
          <FaTimesCircle className="text-red-600 dark:text-red-400 mx-auto" />
        )}
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Temple is currently {isOpen ? 'OPEN' : 'CLOSED'}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-lg flex items-center justify-center gap-2">
        <FaClock />
        Current time: {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </p>
      {!isOpen && (
        <p className="text-orange-600 dark:text-yellow-300 mt-2 flex items-center justify-center gap-2">
          <FaBell />
          Next opening: {getNextOpening()}
        </p>
      )}
    </div>
        </motion.div>

        {/* Daily Schedule */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {dailySchedule.map((schedule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-6 border backdrop-blur-xl transition-all duration-300 group shadow-xl ${
                schedule.highlight 
                  ? 'bg-gradient-to-br from-saffron/20 to-gold/20 dark:from-saffron/20 dark:to-gold/20 border-saffron/60 dark:border-saffron/50 border-opacity-80 dark:border-opacity-100 hover:border-opacity-90 dark:hover:border-opacity-70' 
                  : 'bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 border-orange-200 dark:border-gray-600 border-opacity-60 dark:border-opacity-30'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl mb-4 text-saffron flex justify-center">{schedule.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${schedule.highlight ? 'text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                  {schedule.session}
                </h3>
                <div className={`text-2xl font-bold mb-4 flex items-center justify-center gap-2 ${schedule.highlight ? 'text-saffron' : 'text-gray-500 dark:text-gray-500'}`}>
                  <FaClock />
                  {schedule.time}
                </div>
                
                <div className="space-y-2">
                  {schedule.activities.map((activity, actIndex) => (
                    <div 
                      key={actIndex} 
                      className={`text-sm px-3 py-1 rounded-full ${
                        schedule.highlight 
                          ? 'bg-orange-100/20 dark:bg-purple-900/30 text-gray-700 dark:text-gray-200' 
                          : 'bg-gray-200/80 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special Timings */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Special Occasion Timings</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {specialTimings.map((special, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl p-6 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                      {special.occasion}
                    </h4>
                    <p className="text-gold font-semibold mb-2 flex items-center gap-2">
                      <FaCalendarAlt />
                      {special.timing}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2">
                      <FaInfoCircle />
                      {special.note}
                    </p>
                  </div>
                  <div className="text-2xl ml-4">🎉</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Best Times to Visit */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8 flex items-center justify-center gap-2">
            Best Times to Visit
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {bestTimes.map((time, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-4 bg-white/10 dark:bg-gray-900/80 rounded-xl shadow-lg"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-saffron-gradient rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
                    <FaUserClock />
                    {time.time}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{time.reason}</p>
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit ${
                    time.crowd === 'Low' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
                    time.crowd === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
                  }`}>
                    <FaUsers />
                    {time.crowd} Crowd
                  </span>
                </div>
              </motion.div>
            ))}
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
              <span>Real-time Status</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeart className="text-gold" />
              <span>Daily Schedule</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Special Events</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
