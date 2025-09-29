import { motion } from 'framer-motion';
import { GiByzantinTemple } from "react-icons/gi";
export default function EventsAndDarshan() {
  const events = [
    { img: '/images/event1.jpg', title: 'Janmashtami 2025', date: '6 Sep', desc: 'Celebrate the birth of Lord Krishna.' },
    { img: '/images/event2.jpg', title: 'Radhashtami', date: '21 Sep', desc: 'Devotional singing and offerings.' },
    { img: '/images/event3.jpg', title: 'Diwali', date: '12 Nov', desc: 'Festival of lights celebration.' }
  ];

  const darshan = [
    { time: '6:00 AM', name: 'Mangala Aarti', icon: '🌅' },
    { time: '12:00 PM', name: 'Raj Bhog Aarti', icon: '☀️' },
    { time: '7:00 PM', name: 'Sandhya Aarti', icon: '🌇' }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-32 w-80 h-80 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 left-32 w-96 h-96 bg-gradient-to-r from-amber-400/25 to-yellow-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Spiritual Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-5">
        <div className="absolute top-20 left-16 text-5xl text-saffron animate-pulse delay-300">🎭</div>
        <div className="absolute top-40 right-16 text-4xl text-gold animate-pulse delay-700">⏰</div>
        <div className="absolute bottom-40 left-20 text-6xl text-saffron animate-pulse delay-1100">🏛️</div>
        <div className="absolute bottom-20 right-20 text-4xl text-gold animate-pulse delay-1500">🔔</div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-2">
              Upcoming Events
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg">Join us in divine celebrations</p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white/90 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl overflow-hidden shadow-2xl border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl group hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-2xl hover:shadow-saffron/20 transition-all duration-300"
              >
                {/* Event Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={ev.img} 
                    alt={ev.title} 
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-saffron text-white dark:text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg glow-button">
                    {ev.date}
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h4 className="font-bold text-xl text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                    {ev.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{ev.desc}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-orange-600 dark:text-gold text-sm font-semibold">🎉 Festival</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-saffron hover:text-orange-600 dark:hover:text-gold transition-colors duration-300 font-medium text-sm"
                    >
                      Learn More →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Darshan Timings Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-2">
              Darshan Timings
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg">Divine moments await you</p>
          </div>

          {/* Darshan Schedule */}
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {darshan.map((aarti, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-between p-6 bg-white/80 dark:bg-gradient-to-r dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl shadow-xl border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-20 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-40 hover:shadow-lg hover:shadow-saffron/10 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {aarti.icon}
                    </span>
                    <div>
                      <span className="text-gray-800 dark:text-white font-semibold text-lg group-hover:text-saffron transition-colors duration-300">
                        {aarti.name}
                      </span>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Daily Temple Service</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="font-bold text-2xl text-orange-600 dark:text-gold group-hover:text-saffron transition-colors duration-300 glow">
                      {aarti.time}
                    </span>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">IST</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-saffron/10 dark:to-gold/10 rounded-xl border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 text-center shadow-lg"
            >
              <p className="text-gray-800 dark:text-gray-200 mb-2">
                <span className="text-saffron font-semibold flex items-center gap-1 justify-center"><GiByzantinTemple /> Temple Opens:</span> 5:00 AM - 9:00 PM (Daily)
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Visitors are welcome during all aarti timings. Please maintain silence during prayers.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
