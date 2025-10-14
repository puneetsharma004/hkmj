import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { GiByzantinTemple } from "react-icons/gi";

export default function EventsAndDarshan() {
    const [upcomingEvents, setupComingEvents] = useState([]);

    // Fetch upcomingEvents dynamically from Supabase
      useEffect(() => {
        const fetchupComingEvents = async () => {
          const { data, error } = await supabase
            .from('upcomingEvents')
            .select('*')
            .order('created_at', { ascending: false });
    
          if (error) {
            console.error('Error fetching upcomingEvents:', error);
          } else {
            setupComingEvents(data || []);
          }
        };

        fetchupComingEvents();
      }, []);
  
  // const upcomingEvents = [
  //   { img: '/images/event1.jpg', title: 'Janmashtami 2025', date: '6 Sep', desc: 'Celebrate the birth of Lord Krishna.' },
  //   { img: '/images/event2.jpg', title: 'Radhashtami', date: '21 Sep', desc: 'Devotional singing and offerings.' },
  //   { img: '/images/event3.jpg', title: 'Diwali', date: '12 Nov', desc: 'Festival of lights celebration.' }
  // ];

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
        {/* upcomingEvents Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb- lg:mb-16"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-2">
              Programs
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg">Join us in divine celebrations</p>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl overflow-hidden shadow-2xl border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl group hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-2xl hover:shadow-saffron/20 transition-all duration-300"
              >
                {/* Event Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={ev.image} 
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
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{ev.description}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-orange-600 dark:text-gold text-sm font-semibold">{ev.location}</span>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-saffron hover:text-orange-600 dark:hover:text-gold transition-colors duration-300 font-medium text-sm"
                      href='/events'
                    >
                      Learn More →
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* About Us Section */}
        <motion.div 
          className="mx-auto px-4 py-6 md:px-6 mt-8 rounded-lg bg-white dark:bg-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          >
            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3">
              About us
            </h2>

            {/* Subheading */}
            <h3 className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-300 mt-2">
              The Hare Krishna Movement, Mumbai
            </h3>

            {/* Scrollable Content */}
            <div className="my-4 pr-2">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-3 mb-4">
                The Hare Krishna Movement Mumbai (HKM Mumbai) is a spiritual organization that aims 
                to gift human society an opportunity for a life of happiness, good health, peace of 
                mind and all good qualities through God Consciousness.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-3">
                Registered as a trust in 2010, it is spiritually mentored by ISKCON Bangalore. In 
                accordance with the desire of His Divine Grace A.C. Bhaktivedanta Swami Prabhupada, 
                Founder-Acharya of the worldwide Hare Krishna Movement, who wished "to organize Bombay 
                as world headquarters from every point of view, culturally, scientifically, and 
                philosophically". Following in the footsteps of Srila Prabhupada, the devotees at HKM 
                Mumbai conduct their activities based on the teachings of the Bhagavad Gita and the Vedas.
              </p>
            </div>

            {/* Call to Action Button */}
            <a 
              href="/about/" 
              className="inline-block px-6 py-2.5 mb-4 
                        border-2 border-orange-500 text-orange-600 
                        font-semibold rounded-md 
                        hover:bg-orange-500 hover:text-white hover:scale-105
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Know more
            </a>
          
        </motion.div>

        <motion.div className="flex flex-col lg:flex-row mt-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          >
            {/* Image Container - Takes 1/3 width on large screens */}
            <div className="w-full lg:w-1/3">
              <div className="relative w-full h-64 lg:h-full">
                <img
                  src="/images/srila-prabhupada-hkm.webp"
                  srcSet="/images/srila-prabhupada-hkm.webp 750w, 
                          /images/srila-prabhupada-hkm.webp 1080w"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  alt="Srila Prabhupada"
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content Container - Takes 2/3 width on large screens */}
            <div className="w-full lg:w-2/3 ">
              <div className="p-6 lg:p-8 lg:pr-12">
                {/* Dedication Label */}
                <div className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  Humble dedication
                </div>

                {/* Heading */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-300 mt-2">
                  His Divine Grace Srila Prabhupada
                </h3>

                {/* Scrollable Content */}
                <div className="my-4 pr-2">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 pt-4">
                    His Divine Grace Srila Prabhupada is the Acharya or Diksha Guru of the Hare Krishna 
                    Movement. He worked relentlessly to impart knowledge, enlighten minds and establish the 
                    Hare Krishna movement globally. Srila Prabhupada lived a truly inspirational life and is 
                    a phenomenal role model for anyone who seeks to bring about transformation in any field 
                    of work. As a 70-year-old, Srila Prabhupada travelled to New York with the sole purpose 
                    of fulfilling his guru's dream of spreading the message of Krishna Consciousness all over 
                    the world. Starting his work from a tiny office in New York, he went on to ignite a 
                    worldwide phenomenon, now known as the Hare Krishna Movement.
                  </p>
                </div>

                {/* Call to Action Button */}
                <a 
                  href="/srila-prabhupada/" 
                  className="inline-block px-6 py-2.5 border-2 border-orange-500 text-orange-500 
                            font-semibold rounded-md hover:bg-orange-500 hover:text-white 
                            transition-all duration-300 mb-4"
                >
                  Know more
                </a>
              </div>
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
          <div className="text-center my-12">
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
                  className="flex items-center justify-between p-6 bg-white/10 dark:bg-gradient-to-r dark:from-indigo-900/80 dark:to-purple-900/80 rounded-xl shadow-xl border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-20 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-40 hover:shadow-lg hover:shadow-saffron/10 transition-all duration-300 group"
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
              className="mt-8 p-6 bg-saffron/10 rounded-xl border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 text-center shadow-lg"
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
