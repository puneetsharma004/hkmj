import { motion } from 'framer-motion';
import { 
  FaQuoteLeft, 
  FaStar, 
  FaTrophy, 
  FaHeart, 
  FaClock, 
  FaUsers, 
  FaVideo, 
  FaArrowRight, 
  FaSeedling, 
  FaCalendarAlt, 
  FaAward, 
  FaComments, 
  FaEye, 
  FaHandsHelping,
  FaLightbulb
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function VolunteerStories() {
  const stories = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Prasadam Service Volunteer',
      duration: '3 years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=150&h=150&fit=crop&crop=face',
      quote: 'Serving prasadam has taught me that the secret ingredient in every dish is love. When I see the joy on devotees\' faces as they honor Krishna\'s mercy, my heart overflows with gratitude. This seva has transformed not just how I cook, but how I live.',
      achievement: 'Organized community meals for 500+ people during festivals',
      favorite: 'Seeing children\'s faces light up during Sunday feasts'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Festival Coordination Team',
      duration: '5 years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'Being part of festival organization feels like painting with divine colors. Every Janmashtami, every Holi becomes a masterpiece of devotion. The teamwork, the joy, the spiritual energy - it\'s indescribable. I\'ve found my true calling in service.',
      achievement: 'Led decoration team for 15+ major festivals',
      favorite: 'The midnight aarti during Janmashtami - pure magic!'
    },
    {
      id: 3,
      name: 'Sister Radha Devi',
      role: 'Children\'s Education Volunteer',
      duration: '7 years',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      quote: 'Teaching children about Krishna is like tending a divine garden. Each child is a flower blooming with spiritual potential. Through stories, songs, and games, we plant seeds of devotion that will flourish their entire lives. These children are my greatest teachers.',
      achievement: 'Taught over 200 children Bhagavad Gita principles',
      favorite: 'When children perform Krishna stories with pure devotion'
    },
    {
      id: 4,
      name: 'Arjun Patel',
      role: 'Temple Maintenance Volunteer',
      duration: '2 years',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: 'Every flower I arrange, every surface I clean becomes a meditation. Maintaining Krishna\'s house taught me that no service is small when offered with devotion. The temple has become my spiritual home, and keeping it beautiful fills me with peace.',
      achievement: 'Maintained temple cleanliness during major festivals',
      favorite: 'Early morning seva when the temple is peaceful and serene'
    }
  ];

  const impactStats = [
    { number: '2500+', label: 'Lives Touched', icon: <FaHeart /> },
    { number: '15000+', label: 'Service Hours', icon: <FaClock /> },
    { number: '50+', label: 'Community Events', icon: <span>🎪</span> },
    { number: '100%', label: 'Spiritual Growth', icon: <FaSeedling /> }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 dark:bg-purple-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Spiritual Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-5">
        <div className="absolute top-16 left-16 text-5xl text-saffron animate-pulse delay-600">
          <FaComments />
        </div>
        <div className="absolute top-32 right-20 text-4xl text-gold animate-pulse delay-1100">
          <FaStar />
        </div>
        <div className="absolute bottom-32 left-20 text-6xl text-saffron animate-pulse delay-400">
          <span>🌟</span>
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
              <FaComments />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Volunteer Stories
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Hear from our devoted volunteers about their transformational journey through seva
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-white/95 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-xl"
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full border-3 border-saffron/50 dark:border-saffron/50 group-hover:border-saffron/80 transition-all duration-300 shadow-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                    {story.name}
                  </h3>
                  <p className="text-gold text-sm font-semibold">{story.role}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaClock />
                      {story.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mb-6">
                <div className="text-4xl text-saffron opacity-30 mb-2">
                  <FaQuoteLeft />
                </div>
                <p className="text-gray-600 dark:text-gray-200 leading-relaxed italic group-hover:text-gray-700 dark:group-hover:text-white transition-colors duration-300 pl-4">
                  {story.quote}
                </p>
                <div className="text-4xl text-saffron opacity-30 text-right transform scale-x-[-1]">
                  <FaQuoteLeft />
                </div>
              </div>

              {/* Achievement & Favorite */}
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-saffron/10 dark:to-gold/10 rounded-lg p-3 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg">
                  <div className="flex items-start space-x-2">
                    <span className="text-saffron">
                      <FaTrophy />
                    </span>
                    <div>
                      <div className="text-xs text-saffron font-semibold mb-1">Achievement:</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">{story.achievement}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-100/80 dark:bg-gradient-to-r dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-purple-400 dark:border-purple-500 border-opacity-60 dark:border-opacity-20 shadow-lg">
                  <div className="flex items-start space-x-2">
                    <span className="text-purple-600 dark:text-purple-300">
                      <FaHeart />
                    </span>
                    <div>
                      <div className="text-xs text-purple-600 dark:text-purple-300 font-semibold mb-1">Favorite Moment:</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">{story.favorite}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-saffron/10 dark:to-gold/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Collective Impact of Our Volunteers</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-4xl mb-3 text-saffron group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-saffron mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Video Testimonial CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-600/30 transition-all duration-300 flex items-center space-x-3 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaVideo />
            <span>Watch Video Testimonials</span>
            <FaArrowRight />
          </motion.button>
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
              <FaHandsHelping className="text-saffron" />
              <span>Inspiring Stories</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaAward className="text-gold" />
              <span>Real Experiences</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Transformative Seva</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
