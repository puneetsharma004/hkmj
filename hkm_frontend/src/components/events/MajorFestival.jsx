import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  FaGift, 
  FaUniversity, 
  FaClock, 
  FaInfoCircle, 
  FaBookOpen, 
  FaBell, 
  FaUsers, 
  FaTheaterMasks, 
  FaPray,
  FaHeart,
  FaArrowRight
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { IoCalendar } from "react-icons/io5";
import { supabase } from '../../lib/supabase';

export default function MajorFestivals() {
  const [majorFestivals, setMajorFestivals] = useState([]);
    // Fetch majorFestivals dynamically from Supabase
    useEffect(() => {
      const fetchMajorFestivals = async () => {
        const { data, error } = await supabase
          .from('majorFestivals')
          .select('*')
          .order('created_at', { ascending: false });
  
        if (error) {
          console.error('Error fetching majorFestivals:', error);
        } else {
          setMajorFestivals(data || []);
        }
      };

      fetchMajorFestivals();
    }, []);
  // const majorFestivals = [
  //   {
  //     name: 'Janmashtami',
  //     date: 'August/September',
  //     description: 'The grand celebration of Lord Krishna\'s birth with midnight festivities, devotional singing, and special darshan.',
  //     significance: 'The most important festival celebrating Krishna\'s divine appearance on Earth',
  //     specialPrograms: ['Midnight Aarti', 'Krishna Jhanki', 'Devotional Drama', 'Special Bhog'],
  //     image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
  //     color: 'from-blue-600 to-purple-600',
  //     duration: '2 Days'
  //   },
  //   {
  //     name: 'Radhashtami',
  //     date: 'August/September',
  //     description: 'Celebrating the appearance of Srimati Radharani, Krishna\'s eternal consort and the embodiment of divine love.',
  //     significance: 'Honoring the divine feminine energy and devotion',
  //     specialPrograms: ['Radha Abhishek', 'Flower Decorations', 'Special Kirtans', 'Radha Katha'],
  //     image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500&h=300&fit=crop',
  //     color: 'from-pink-500 to-rose-600',
  //     duration: '1 Day'
  //   },
  //   {
  //     name: 'Holi Festival',
  //     date: 'March',
  //     description: 'The festival of colors celebrating Krishna\'s playful nature with organic colors, music, and community celebration.',
  //     significance: 'Celebrating the victory of good over evil and divine play',
  //     specialPrograms: ['Color Celebrations', 'Holika Dahan', 'Community Feast', 'Cultural Programs'],
  //     image: 'https://images.unsplash.com/photo-1583211892916-5e38c6ee3297?w=500&h=300&fit=crop',
  //     color: 'from-yellow-500 to-red-500',
  //     duration: '2 Days'
  //   },
  //   {
  //     name: 'Rath Yatra',
  //     date: 'June/July',
  //     description: 'The grand chariot festival where Lord Krishna travels through the streets blessing all devotees.',
  //     significance: 'Commemorating Krishna\'s journey and his accessibility to all',
  //     specialPrograms: ['Grand Procession', 'Chariot Pulling', 'Street Kirtans', 'Public Darshan'],
  //     image: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?w=500&h=300&fit=crop',
  //     color: 'from-orange-500 to-amber-600',
  //     duration: '1 Day'
  //   },
  //   {
  //     name: 'Diwali',
  //     date: 'October/November',
  //     description: 'Festival of lights celebrating Krishna\'s victory over darkness with lamp decorations and special prayers.',
  //     significance: 'The triumph of light over darkness and good over evil',
  //     specialPrograms: ['Lamp Lighting', 'Fireworks Display', 'Special Aarti', 'Community Dinner'],
  //     image: 'https://images.unsplash.com/photo-1605538883669-825200433431?w=500&h=300&fit=crop',
  //     color: 'from-amber-500 to-yellow-600',
  //     duration: '3 Days'
  //   },
  //   {
  //     name: 'Govardhan Puja',
  //     date: 'October/November',
  //     description: 'Commemorating Krishna lifting Mount Govardhan with elaborate food offerings and mountain replica.',
  //     significance: 'Celebrating Krishna\'s protection of devotees and nature worship',
  //     specialPrograms: ['Mountain Replica', 'Anna Koot', '108 Food Items', 'Parikrama'],
  //     image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
  //     color: 'from-green-500 to-teal-600',
  //     duration: '1 Day'
  //   }
  // ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
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
            Major Festivals & Celebrations
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Join us in celebrating the divine festivals that fill our hearts with joy and bring our community together
          </p>
        </motion.div>

        {/* Festivals Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {majorFestivals.map((festival, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl overflow-hidden border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group"
            >
              {/* Festival Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`}></div>
              </div>

              {/* Festival Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                      {festival.name}
                    </h3>
                    <span className="text-gold text-sm font-semibold flex items-center gap-1">
                      <IoCalendar />
                      {festival.date}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                    {festival.description}
                  </p>
                </div>

                {/* Significance */}
                <div className="mb-4 p-3 bg-saffron/10 rounded-lg border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100">
                  <h4 className="text-sm font-semibold text-saffron mb-1 flex items-center gap-1">
                    <FaInfoCircle />
                    Spiritual Significance
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300">{festival.significance}</p>
                </div>

                {/* Special Programs */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gold mb-2 flex items-center gap-1">
                    <FaBookOpen />
                    Special Programs
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {festival.specialPrograms.split(',').map((program, idx) => (
                      <div 
                        key={idx} 
                        className="bg-orange-100/20 dark:bg-purple-900/30 px-2 py-1 rounded text-xs text-gray-700 dark:text-gray-300 text-center"
                      >
                        {program}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    className="flex-1 bg-saffron-gradient text-white font-semibold py-2 px-4 rounded-lg text-sm hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaBookOpen />
                    Learn More
                  </motion.button>
                  <motion.button
                    className="flex-1 border border-saffron text-saffron font-semibold py-2 px-4 rounded-lg text-sm hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaBell />
                    Get Notified
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Festival Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Why Join Our Festivals?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FaUsers />, title: 'Community Unity', desc: 'Connect with fellow devotees' },
              { icon: <FaTheaterMasks />, title: 'Cultural Heritage', desc: 'Experience authentic traditions' },
              { icon: <FaPray />, title: 'Spiritual Growth', desc: 'Deepen your devotion' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl mb-3 text-saffron group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                  {item.icon}
                </div>
                <h4 className="font-bold text-saffron mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            className="px-8 py-4 bg-saffron text-white font-bold rounded-full shadow-xl hover:shadow-saffron/50 transition-all duration-300 flex items-center gap-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart />
            Join Our Festival Community
            <FaArrowRight />
          </motion.button>
          
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400 mt-6">
            <div className="flex items-center space-x-2">
              <IoCalendar className="text-saffron" />
              <span>Year-Round Celebrations</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUsers className="text-gold" />
              <span>Community Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Sacred Traditions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
