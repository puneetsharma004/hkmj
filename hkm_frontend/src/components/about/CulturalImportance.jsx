import { motion } from 'framer-motion';
import { 
  FaUniversity, 
  FaTheaterMasks, 
  FaHandshake, 
  FaStar, 
  FaBook, 
  FaUtensils, 
  FaUsers, 
  FaLeaf, 
  FaPaintBrush, 
  FaClock, 
  FaHeart, 
  FaGift
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function CulturalImportance() {
  const communityPrograms = [
    { name: 'Bhagavad Gita Classes', frequency: 'Daily', icon: <FaBook />, participants: '1000+' },
    { name: 'Cultural Festivals', frequency: 'Occasionally', icon: <FaTheaterMasks />, participants: '200+' },
    { name: 'Prasadam Distribution', frequency: 'Daily', icon: <FaUtensils />, participants: '50 lakhs+ Meals' },
    { name: 'Youth Programs', frequency: 'Bi-weekly', icon: <FaUsers />, participants: '250+' },
    { name: 'Spiritual Trips', frequency: 'Monthly ', icon: <FaLeaf />, participants: '100+' },
    { name: 'Sessions Delivered', frequency: 'Fortnightly', icon: <FaPaintBrush />, participants: '100+' }
  ];

  const impactStats = [
    { number: '14+', label: 'Years of Devotion', icon: <FaClock /> },
    { number: '50,000+', label: 'Lives Touched', icon: <FaHeart /> },
    { number: '200+', label: 'Festivals Celebrated', icon: <FaGift /> },
    { number: '4+', label: 'Community Projects', icon: <FaHandshake /> }
  ];

  return (
    <section className="relative pt-8 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
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
            Cultural Importance
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Reviving the divine essence of Vedic Culture in the Heart of Marwar
          </p>
        </motion.div>

        {/* Temple's Role */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center lg:items-start">
            <div className="space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
          <h3 className="text-2xl font-bold text-saffron mb-6 text-left">Heart of the Community</h3>
              <p>
                For over two decades, the Hare Krishna Marwar Mandir has served as the spiritual and cultural heart of Jodhpur's devotional community. Our temple plays a vital role in preserving the rich heritage of the Marwar region while fostering spiritual growth and community unity.
              </p>
              <p>
                We host numerous festivals that bring together people from all walks of life, creating bridges between different communities and promoting the universal message of love and peace that Lord Krishna represents.
              </p>
              <p>
                Through our various programs, we've contributed significantly to the cultural landscape of the Blue City, making spiritual wisdom accessible to modern seekers while honoring ancient traditions.
              </p>
            </div>
            <div className="text-center">
              <div className="text-center flex flex-col justify-center items-center ">
                <img className='w-full lg:w-[60%] h-auto rounded-2xl shadow-xl' src="/images/about/HeartoftheCommunity.jpg" alt="Worldwide HKM" />
               <p className="text-gray-600 dark:text-gray-300 italic mt-4">
                "Building bridges through devotion"
              </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Community Programs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center text-gold mb-8">Community Programs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 dark:bg-gradient-to-r dark:from-indigo-900/80 dark:to-purple-900/80 rounded-xl p-6 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-20 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-40 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-saffron-gradient rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                    {program.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                      {program.name}
                    </h4>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{program.frequency}</span>
                      <span className="text-gold font-semibold">{program.participants}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 mb-12 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Our Impact</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl flex justify-center items-center mb-3 text-saffron group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-saffron glow mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
