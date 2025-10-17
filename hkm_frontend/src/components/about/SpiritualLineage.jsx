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
  
  // const spiritualTeachers = [
  //   {
  //     name: 'A.C. Bhaktivedanta Swami Prabhupada',
  //     title: 'Founder-Acharya of ISKCON',
  //     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  //     description: 'The visionary who brought Krishna consciousness to the Western world and established ISKCON globally.',
  //     icon: <FaCrown />
  //   },
  //   {
  //     name: 'His Holiness Radhanath Swami',
  //     title: 'Senior Spiritual Guide',
  //     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  //     description: 'Renowned spiritual teacher and author who has guided countless souls on the path of devotion.',
  //     icon: <FaHeart />
  //   },
  //   {
  //     name: 'Local Temple President',
  //     title: 'Temple Administrator',
  //     image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  //     description: 'Dedicated leader overseeing daily temple operations and community spiritual programs.',
  //     icon: <FaGraduationCap />
  //   }
  // ];

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
              <FaGlobeAmericas />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
          </div>
          
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

        {/* Spiritual Teachers
        <div className="grid md:grid-cols-3 gap-8">
          {spiritualTeachers.map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-2xl hover:shadow-saffron/20 transition-all duration-300 group text-center"
            >
              <div className="relative mb-6">
                <div className="relative">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-saffron border-opacity-50 group-hover:border-opacity-80 transition-all duration-300 shadow-lg"
                  />
                </div>
                <div className="absolute inset-0 rounded-full group-hover:shadow-saffron/30 transition-shadow duration-300"></div>
              </div>
              
              <h4 className="font-bold text-gray-800 dark:text-white text-lg mb-2 group-hover:text-saffron transition-colors duration-300">
                {teacher.name}
              </h4>
              <p className="text-gold text-sm font-medium mb-3">{teacher.role}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                {teacher.description}
              </p>
            </motion.div>
          ))}
        </div> */}

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
