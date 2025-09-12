import { motion } from 'framer-motion';
import { 
  FaWalking, 
  FaClipboardList, 
  FaBullseye, 
  FaEdit, 
  FaUsers, 
  FaCheckCircle, 
  FaClock, 
  FaCalendarAlt, 
  FaHandsHelping, 
  FaHeart, 
  FaGraduationCap, 
  FaUserPlus, 
  FaArrowRight,
  FaInfoCircle,
  FaUserCheck
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function HowToJoin() {
  const steps = [
    {
      step: 1,
      title: 'Fill Registration Form',
      description: 'Complete our simple volunteer application with your interests and availability',
      icon: <FaEdit />,
      color: 'from-blue-500 to-cyan-600',
      details: ['Basic personal information', 'Service area preferences', 'Availability schedule', 'Skills and experience'],
      duration: '5-10 minutes'
    },
    {
      step: 2,
      title: 'Attend Orientation',
      description: 'Join our friendly orientation session to learn about temple values and volunteer guidelines',
      icon: <FaUsers />,
      color: 'from-green-500 to-teal-600',
      details: ['Temple philosophy introduction', 'Volunteer code of conduct', 'Safety guidelines', 'Q&A session'],
      duration: '1.5 hours'
    },
    {
      step: 3,
      title: 'Get Your Assignment',
      description: 'Receive your seva assignment based on your interests, skills, and our current needs',
      icon: <FaBullseye />,
      color: 'from-purple-500 to-indigo-600',
      details: ['Matched to suitable role', 'Meet your team leader', 'Receive training materials', 'Set your schedule'],
      duration: '30 minutes'
    },
    {
      step: 4,
      title: 'Begin Sacred Service',
      description: 'Start your spiritual journey through seva and become part of our temple family',
      icon: <span>🙏</span>,
      color: 'from-orange-500 to-red-600',
      details: ['Start with guided practice', 'Regular check-ins', 'Ongoing support', 'Spiritual growth'],
      duration: 'Ongoing'
    }
  ];

  const requirements = [
    {
      category: 'Age Requirements',
      icon: <span>👶</span>,
      details: [
        '16+ for most volunteer roles',
        '18+ for leadership positions',
        '14-15 with parent/guardian consent',
        'Special youth programs available'
      ]
    },
    {
      category: 'Commitment Level',
      icon: <FaClock />,
      details: [
        'Minimum 2 hours per week preferred',
        'Flexible scheduling available',
        'Seasonal volunteers welcome',
        'Short-term project opportunities'
      ]
    },
    {
      category: 'Basic Requirements',
      icon: <FaCheckCircle />,
      details: [
        'Respectful and positive attitude',
        'Willingness to learn and serve',
        'Follow temple guidelines',
        'Basic health and safety awareness'
      ]
    }
  ];

  const orientationSchedule = [
    { date: 'Every Sunday', time: '2:00 PM - 3:30 PM', type: 'Regular Session', capacity: '20 people' },
    { date: 'First Saturday', time: '10:00 AM - 11:30 AM', type: 'Weekend Session', capacity: '15 people' },
    { date: 'Festival Days', time: 'Special timing', type: 'Festival Orientation', capacity: 'Unlimited' }
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

      {/* Spiritual Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-5">
        <div className="absolute top-16 left-16 text-5xl text-saffron animate-pulse delay-200">
          <FaWalking />
        </div>
        <div className="absolute top-32 right-20 text-4xl text-gold animate-pulse delay-800">
          <FaClipboardList />
        </div>
        <div className="absolute bottom-32 left-20 text-6xl text-saffron animate-pulse delay-1200">
          <FaBullseye />
        </div>
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
              <FaWalking />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            How to Join Our Volunteer Family
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Simple steps to begin your journey of seva and spiritual growth with us
          </p>
        </motion.div>

        {/* Steps Process */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-saffron-gradient opacity-30 z-0"></div>
                )}
                
                <div className="relative bg-white/90 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group h-full shadow-xl">
                  {/* Step Number */}
                  <div className="absolute top-4 left-6 w-8 h-8 bg-saffron-gradient rounded-full flex items-center justify-center text-gray-500 dark:text-white font-bold text-sm z-10 shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-2">
                        <FaInfoCircle className="text-saffron text-xs" />
                        <span className="text-gray-600 dark:text-gray-400 text-xs">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Duration */}
                  <div className="text-center">
                    <span className="bg-orange-100 dark:bg-purple-900/30 text-orange-700 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center justify-center gap-1 mx-auto w-fit">
                      <FaClock />
                      {step.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Volunteer Requirements</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/90 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl p-6 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-lg"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 text-saffron group-hover:scale-110 transition-transform duration-300">
                    {req.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                    {req.category}
                  </h4>
                </div>
                
                <ul className="space-y-2">
                  {req.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start space-x-2">
                      <FaCheckCircle className="text-gold text-sm mt-1" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Orientation Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-saffron/10 dark:to-gold/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8 flex items-center justify-center gap-2">
            <FaCalendarAlt />
            Orientation Schedule
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {orientationSchedule.map((session, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white/90 dark:bg-gray-900/50 rounded-xl border border-orange-200 dark:border-saffron border-opacity-60 dark:border-opacity-20 shadow-lg"
              >
                <div className="text-3xl mb-3 text-saffron">
                  <FaGraduationCap />
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-2">{session.type}</h4>
                <div className="space-y-1 text-sm">
                  <div className="text-saffron font-semibold flex items-center justify-center gap-1">
                    <FaCalendarAlt />
                    {session.date}
                  </div>
                  <div className="text-gold flex items-center justify-center gap-1">
                    <FaClock />
                    {session.time}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                    <FaUsers />
                    Capacity: {session.capacity}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <motion.button
              className="px-8 py-3 bg-saffron-gradient text-white font-bold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaUserPlus />
              Reserve Your Orientation Spot
              <FaArrowRight />
            </motion.button>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
              Walk-ins welcome, but registration recommended for guaranteed spot
            </p>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaHandsHelping className="text-saffron" />
              <span>Guided Process</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUserCheck className="text-gold" />
              <span>Supportive Community</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Spiritual Growth</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
