import { motion } from 'framer-motion';
import { 
  FaUniversity, 
  FaTools, 
  FaPaintBrush, 
  FaCircle, 
  FaGem, 
  FaSun,
  FaHandPaper,
  FaEye,
  FaBuilding
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
// import { GiPillar, GiGreekTemple } from 'react-icons/gi';

export default function TempleArchitecture() {
  const architecturalFeatures = [
    {
      title: 'Marwar Style Domes',
      description: 'Traditional Rajasthani architectural elements with intricate carvings',
      image: 'https://images.unsplash.com/photo-1574401572222-9e4c2b6b5e4c?w=400&h=300&fit=crop'
    },
    {
      title: 'Blue City Aesthetics',
      description: 'Incorporating Jodhpur\'s famous blue color palette in temple design',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      title: 'Sacred Sanctum',
      description: 'Inner sanctuary housing beautiful deities of Krishna and Radha',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12ba8c6?w=400&h=300&fit=crop'
    },
    {
      title: 'Community Halls',
      description: 'Spacious areas for gatherings, festivals, and spiritual programs',
      image: 'https://images.unsplash.com/photo-1571896848203-97f5ce0b9e9e?w=400&h=300&fit=crop'
    }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-15 blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-300"></div>
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
            Temple Architecture
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            A magnificent blend of traditional Marwar architecture and sacred temple design
          </p>
        </motion.div>

        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl font-bold text-saffron mb-6">Architectural Heritage</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-200 leading-relaxed">
                <p>
                  Our temple stands as a testament to the rich architectural heritage of Rajasthan, seamlessly blending traditional Marwar design principles with sacred Vedic temple architecture.
                </p>
                <p>
                  The structure incorporates the distinctive blue hues of Jodhpur, earning its place as a spiritual jewel in the Blue City. Intricate stone carvings, traditional jharokhas (overhanging enclosed balconies), and ornate domes create a visual symphony that reflects both devotion and cultural pride.
                </p>
                <p>
                  Recent renovations have preserved the original charm while incorporating modern amenities for the comfort of devotees, ensuring our temple remains a bridge between ancient wisdom and contemporary accessibility.
                </p>
              </div>
            </div>
            <div className="text-center flex flex-col justify-center items-center ">
              <img className='w-full lg:w-[60%] h-auto rounded-2xl shadow-xl' src="/images/about/TempleArchitecture.jpg" alt="Temple Architecture" />
              <p className="text-gray-600 dark:text-gray-300 italic mt-4">
                "Where ancient artistry meets divine inspiration"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Special Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Special Architectural Elements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <FaHandPaper />, title: 'Hand-Carved Details', desc: 'Intricate stone work by master craftsmen' },
              { icon: <FaGem />, title: 'Sacred Geometry', desc: 'Vedic proportions for spiritual harmony' },
              { icon: <FaSun />, title: 'Natural Lighting', desc: 'Strategic placement for divine illumination' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl flex justify-center items-center mb-3 text-saffron group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h4 className="font-bold text-saffron mb-2">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Architectural Heritage Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white/10 dark:bg-gradient-to-r dark:from-purple-900/50 dark:to-indigo-900/50 rounded-2xl p-8 border border-orange-200 dark:border-saffron border-opacity-60 dark:border-opacity-30 backdrop-blur-sm max-w-4xl mx-auto shadow-xl">
            <p className="text-gray-700 dark:text-gray-100 text-lg italic">
              "Every stone speaks of devotion, every arch echoes with prayers, and every dome reaches toward the divine - our temple is not just built with materials, but with the faith and love of countless devotees." <br /> - Srila Prabhupada
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
