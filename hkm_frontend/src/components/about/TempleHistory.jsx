import { motion } from 'framer-motion';
import { 
  FaScroll, 
  FaClock, 
  FaUniversity, 
  FaTools, 
  FaBuilding, 
  FaMobile, 

  FaCalendarAlt,
  FaHistory
} from 'react-icons/fa';
// import { GiTemple } from 'react-icons/gi';

export default function TempleHistory() {
  const timeline = [
    { year: '2011', event: 'Foundation of Akshaya Patra Kitchen & Hostel laid in Jodhpur at Ratanada', icon: <FaTools /> },
    { year: '2017', event: 'Major expansion and Started Building Chaitanya Kunj (The Spiritual Oasis) in front of IIT Jodhpur, Karwar', icon: <FaUniversity /> },
    { year: '2022', event: 'Sanctioned Land by Jodhpur Development Authority for Cultural Centre & Kitchen', icon: <FaBuilding /> },
    { year: '2023', event: 'Started Construction of Hare Krishna Marwar Mandir', icon: <FaMobile /> },
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
            Temple History
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            A sacred journey that began decades ago, rooted in devotion and blessed by divine grace
          </p>
        </motion.div>

        {/* History Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-saffron mb-4">Our Sacred Beginning</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
                <p>
                  Hare Krishna Marwar Mandir is a spiritual initiative inspired by His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada, dedicated to spreading Krishna Consciousness and Vedic cultural values in the land of Marwar.

                </p>
                <p>
                  Guided by the teachings of the Bhagavad Gita and Srimad Bhagavatam, the temple promotes devotion, service, and spiritual growth through its various programs like Annadana Seva, Gau Seva, youth empowerment, and cultural festivals—uplifting lives with the message of Lord Krishna.
                </p>
                <p>
                  Aligned with the global Hare Krishna Movement, the temple promotes spiritual growth and social welfare through its many initiatives — including Bhagavad Gita study sessions, Annadana Seva, Gau Seva, youth development programs, cultural festivals, and community outreach.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Timeline Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-2">
              <FaHistory />
              Historical Timeline
            </h3>
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 bg-white/10 dark:bg-gradient-to-r dark:from-indigo-900/80 dark:to-purple-900/80 rounded-xl p-4 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-20 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-40 transition-all duration-300 group shadow-lg"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-saffron-gradient rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="text-saffron font-bold text-lg flex items-center gap-2">
                    <FaCalendarAlt className="text-sm" />
                    {item.year}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                    {item.event}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Legacy Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Living Heritage</h3>
            <p className="text-gray-700 dark:text-gray-200 text-lg italic leading-relaxed">
              "From humble beginnings to a magnificent spiritual center, our temple's history is a testament to the unwavering faith of countless devotees. Each milestone represents not just physical growth, but the deepening of our community's spiritual roots in the sacred soil of Rajasthan."
            </p>
            <div className="mt-6 flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <FaClock className="text-saffron" />
                <span>40+ Years of Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUniversity className="text-gold" />
                <span>Growing Legacy</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
