import { motion } from 'framer-motion';
import { 
  FaGlobeAmericas, 
  FaUsers, 
  FaCrown,
  FaHeart,
  FaGraduationCap
} from 'react-icons/fa';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';


export default function SpiritualLineage() {
    const [spiritualTeachers, setSpiritualTeachers] = useState([]);

    useEffect(() => {
        const fetchSpiritualTeachers = async () => {
          const { data, error } = await supabase
            .from('spiritualTeachers')
            .select('*')
            .order('created_at', { ascending: true });
    
          if (error) {
            console.error('Error fetching Spiritual Teachers:', error);
          } else {
            setSpiritualTeachers(data || []);
          }
        };

        fetchSpiritualTeachers();
      }, []);

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
            Spiritual Lineage
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Connected to a global family of devotees through the Worldwide Hare Krishna Movement
          </p>
        </motion.div>

        {/* ISKCON Connection */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-saffron mb-4">Hare Krishna Movement Global Network</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
                <p>
                  Hare Krishna Marwar Mandir, Jodhpur, is a part of the worldwide Hare Krishna Movement, founded in 1965 by His Divine Grace A.C. Bhaktivedanta Swami Srila Prabhupada.
                </p>
                <p>
                  With a global presence of over 800 temples and centers, the movement is dedicated to sharing the timeless wisdom of the Vedas, spreading devotion to Lord Krishna, and promoting spiritual harmony and cultural upliftment across the world.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-gradient-to-r from-saffron/10 to-gold/10 rounded-lg border border-saffron/20">
                    <div className="text-2xl font-bold text-gold flex items-center justify-center gap-2">
                      55+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Centers Across India</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-gold/10 to-saffron/10 rounded-lg border border-gold/20">
                    <div className="text-2xl font-bold text-gold flex items-center justify-center gap-2">
                      25+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-full mb-4 text-saffron flex justify-center items-center">
                <img className='w-full lg:w-[60%] h-auto rounded-2xl' src="/images/about/WorldwideHKM.png" alt="Worldwide HKM" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "The whole world is one family under Krishna's love"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Connection Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg max-w-4xl mx-auto">
            <p className="text-gray-700 dark:text-gray-200 text-lg italic">
              "Through this divine lineage, we remain connected to the eternal wisdom that flows from guru to disciple, generation to generation, bringing Krishna's love to every corner of the world."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
