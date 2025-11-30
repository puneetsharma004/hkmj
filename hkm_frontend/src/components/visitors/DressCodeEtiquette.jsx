import { motion } from 'framer-motion';
import { 
  FaTshirt, 
  FaBan, 
  FaShoePrints, 
  FaVolumeDown, 
  FaSmokingBan, 
  FaCamera, 
  FaPray, 
  FaHandsWash, 
  FaInfoCircle, 
  FaLightbulb, 
  FaUserFriends,
  FaEye,
  FaHeart
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function DressCodeEtiquette() {
  const dressCodeGuidelines = [
    {
      category: 'Recommended Attire',
      icon: <FaTshirt />,
      color: 'from-green-500 to-emerald-600',
      guidelines: [
        'Traditional Indian clothing (dhoti, kurta, saree, salwar kameez)',
        'Modest Western clothing with covered shoulders and knees',
        'Comfortable clothing suitable for sitting on floor',
        'Light-colored or white clothing preferred'
      ]
    },
    {
      category: 'What to Avoid',
      icon: <FaBan />,
      color: 'from-red-500 to-orange-600',
      guidelines: [
        'Shorts, mini skirts, or revealing clothing',
        'Sleeveless tops or low necklines',
        'Tight-fitting or transparent clothing',
        'Clothing with inappropriate graphics or text'
      ]
    }
  ];

  const etiquetteRules = [
    {
      rule: 'Remove Footwear',
      description: 'All shoes and sandals must be removed before entering temple premises',
      icon: <FaShoePrints />,
      tip: 'Use the designated shoe storage area'
    },
    {
      rule: 'Maintain Silence',
      description: 'Keep your voice low and maintain peaceful atmosphere in prayer areas',
      icon: <FaVolumeDown />,
      tip: 'Mobile phones should be on silent mode'
    },
    {
      rule: 'No Smoking/Alcohol',
      description: 'Smoking, alcohol, and non-vegetarian food are strictly prohibited',
      icon: <FaSmokingBan />,
      tip: 'Please consume only vegetarian food in temple'
    },
    {
      rule: 'Photography Rules',
      description: 'Photography allowed in designated areas only, no flash during aarti',
      icon: <FaCamera />,
      tip: 'Ask permission before photographing people'
    },
    {
      rule: 'Respect Sacred Space',
      description: 'Do not touch deities or sacred objects without permission',
      icon: <FaPray />,
      tip: 'Follow instructions from temple staff'
    },
    {
      rule: 'Personal Hygiene',
      description: 'Maintain cleanliness and wash hands before entering prayer halls',
      icon: <FaHandsWash />,
      tip: 'Hand washing facilities available at entrance'
    }
  ];

  const specialInstructions = [
    {
      title: 'During Aarti',
      icon: <span>🪔</span>,
      instructions: [
        'Stand or sit respectfully during ceremonies',
        'Join in chanting if you know the mantras',
        'Do not walk in front of devotees during prayers',
        'Wait for prasadam distribution to complete'
      ]
    },
    {
      title: 'For Photography',
      icon: <FaCamera />,
      instructions: [
        'No flash photography during religious ceremonies',
        'Avoid photographing people without permission',
        'Commercial photography requires prior approval',
        'Share photos respectfully on social media'
      ]
    },
    {
      title: 'For First-Time Visitors',
      icon: <FaUserFriends />,
      instructions: [
        'Feel free to ask temple volunteers for guidance',
        'Observe others if unsure about customs',
        'Participate as much as you feel comfortable',
        'Take your time to absorb the spiritual atmosphere'
      ]
    }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
      

        {/* Etiquette Rules */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Temple Etiquette</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {etiquetteRules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl p-6 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-lg"
              >
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2 text-saffron flex justify-center">{rule.icon}</div>
                  <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                    {rule.rule}
                  </h4>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {rule.description}
                </p>
                
                <div className="bg-orange-100/20 dark:bg-saffron/10 rounded-lg p-2">
                  <p className="text-saffron text-xs font-semibold flex items-center gap-2">
                    <FaLightbulb />
                    {rule.tip}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {specialInstructions.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-saffron/10 rounded-xl p-6 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg"
            >
              <h4 className="font-bold text-saffron mb-4 text-center flex items-center justify-center gap-2">
                <span className="text-2xl flex justify-center">{section.icon}</span>
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.instructions.map((instruction, instIndex) => (
                  <li key={instIndex} className="flex items-start space-x-2">
                    <FaInfoCircle className="text-gold text-sm mt-1" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{instruction}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-white/10 dark:bg-gradient-to-r dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-orange-200 dark:border-purple-500 border-opacity-60 dark:border-opacity-30 shadow-lg"
        >
          <p className="text-gray-700 dark:text-gray-300 italic flex items-center justify-center gap-2">
            "These guidelines help maintain the sacred atmosphere of our temple. 
            When in doubt, observe others or ask our friendly volunteers for assistance."
          </p>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaTshirt className="text-saffron" />
              <span>Dress Respectfully</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEye className="text-gold" />
              <span>Observe Customs</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Sacred Space</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
