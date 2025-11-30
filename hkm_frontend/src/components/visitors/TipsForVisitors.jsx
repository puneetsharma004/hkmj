import { motion } from 'framer-motion';
import { 
  FaLightbulb, 
  FaEdit, 
  FaBullseye, 
  FaThermometerHalf, 
  FaSun, 
  FaUmbrella, 
  FaMapMarkerAlt, 
  FaClock, 
  FaCamera, 
  FaFirstAid, 
  FaWheelchair, 
  FaUsers, 
  FaInfoCircle,
  FaRoute,
  FaCar,
  FaEye,
  FaHandsHelping,
  FaHeart
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { MdElderly } from "react-icons/md";

export default function TipsForVisitors() {
  const seasonalTips = [
    {
      season: 'Winter (Nov-Feb)',
      temperature: '10°C - 25°C',
      recommendation: 'Best time to visit',
      tips: ['Carry light woolens for early morning and evening', 'Perfect weather for sightseeing', 'Festival season - book accommodation early'],
      icon: '❄️',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      season: 'Summer (Mar-Jun)',
      temperature: '25°C - 45°C',
      recommendation: 'Visit early morning/evening',
      tips: ['Carry water bottle and sun protection', 'Avoid midday visits', 'Light colored cotton clothing recommended'],
      icon: <FaSun />,
      color: 'from-orange-500 to-red-600'
    },
    {
      season: 'Monsoon (Jul-Oct)',
      temperature: '20°C - 35°C',
      recommendation: 'Carry umbrella',
      tips: ['Check weather before visiting', 'Waterproof your belongings', 'Enjoy the cooler weather'],
      icon: <FaUmbrella />,
      color: 'from-green-500 to-teal-600'
    }
  ];

  const nearbyAttractions = [
    {
      name: 'Mehrangarh Fort',
      distance: '8 km',
      time: '15 mins drive',
      description: 'Magnificent hilltop fort with panoramic city views',
      bestTime: 'Morning or evening',
      icon: '🏰'
    },
    {
      name: 'Umaid Bhawan Palace',
      distance: '10 km',
      time: '20 mins drive',
      description: 'Art Deco palace, now a luxury hotel and museum',
      bestTime: 'Afternoon visit',
      icon: '🏛️'
    },
    {
      name: 'Clock Tower & Sardar Market',
      distance: '6 km',
      time: '15 mins drive',
      description: 'Bustling market area for shopping and local food',
      bestTime: 'Evening shopping',
      icon: '🕰️'
    },
    {
      name: 'Jaswant Thada',
      distance: '9 km',
      time: '18 mins drive',
      description: 'Beautiful marble cenotaph with intricate architecture',
      bestTime: 'Sunrise/sunset',
      icon: '⛩️'
    },
    {
      name: 'Blue City Walking Tour',
      distance: '7 km',
      time: '15 mins drive',
      description: 'Explore the famous blue painted houses of old city',
      bestTime: 'Early morning',
      icon: '🏘️'
    },
    {
      name: 'Mandore Gardens',
      distance: '12 km',
      time: '25 mins drive',
      description: 'Historic gardens with cenotaphs and temples',
      bestTime: 'Morning/evening',
      icon: '🌳'
    }
  ];

  const specialNeedsTips = [
    {
      category: 'Elderly Visitors',
      icon: <MdElderly />,
      tips: [
        'Reserved seating available in prayer halls',
        'Wheelchairs can be arranged on request',
        'Volunteers available to assist with mobility',
        'Priority prasadam service provided',
        'Rest areas available throughout the temple'
      ]
    },
    {
      category: 'Families with Children',
      icon: <FaUsers />,
      tips: [
        'Baby changing facilities in restrooms',
        'High chairs available in dining area',
        'Kid-friendly programs on Sundays',
        'Story telling sessions during festivals',
        'Safe play area in temple courtyard'
      ]
    },
    {
      category: 'Differently-Abled Visitors',
      icon: <FaWheelchair />,
      tips: [
        'Wheelchair accessible ramps and pathways',
        'Accessible restrooms available',
        'Sign language interpreter on request',
        'Braille materials for visually impaired',
        'Dedicated parking spaces near entrance'
      ]
    }
  ];

  const generalTips = [
    {
      category: 'Photography',
      tips: [
        'Best lighting during golden hours (sunrise/sunset)',
        'Ask permission before photographing people',
        'No flash during aarti ceremonies',
        'Respect "no photography" zones',
        'Commercial shoots require prior permission'
      ],
      icon: <FaCamera />
    },
    {
      category: 'Cultural Experience',
      tips: [
        'Participate in morning aarti for authentic experience',
        'Try temple prasadam - it\'s blessed food',
        'Listen to spiritual discourses on Sundays',
        'Join community activities and festivals',
        'Learn basic Sanskrit mantras from volunteers'
      ],
      icon: <FaHeart />
    },
    {
      category: 'Health & Safety',
      tips: [
        'Stay hydrated, especially in summer',
        'Wear comfortable walking shoes',
        'Keep emergency contacts handy',
        'Inform medical conditions to volunteers',
        'Follow COVID guidelines if applicable'
      ],
      icon: <FaFirstAid />
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
        
        {/* Special Needs Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Special Assistance</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {specialNeedsTips.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-saffron/10 rounded-xl p-6 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 text-saffron flex justify-center">{category.icon}</div>
                  <h4 className="font-bold text-saffron">{category.category}</h4>
                </div>
                
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2">
                      <FaHandsHelping className="text-gold text-sm mt-1" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* General Tips */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {generalTips.map((tipCategory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl"
            >
              <div className="text-center mb-4">
                <div className="text-2xl mb-3 text-saffron flex justify-center ">{tipCategory.icon}</div>
                <h4 className="font-bold text-gray-800 dark:text-white">{tipCategory.category}</h4>
              </div>
              
              <ul className="space-y-2">
                {tipCategory.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-2">
                    <FaInfoCircle className="text-saffron text-sm mt-1" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
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
              <FaRoute className="text-saffron" />
              <span>Local Insights</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEye className="text-gold" />
              <span>Visitor Tips</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Best Experience</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
