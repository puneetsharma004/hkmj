import { motion } from 'framer-motion';
import { 
  FaStar, 
  FaNewspaper, 
  FaUser, 
  FaCalendarAlt, 
  FaClock, 
  FaArrowRight, 
  FaTag, 
  FaBookOpen, 
  FaEye, 
  FaHeart, 
  FaAward
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function FeaturedArticle() {
  const featuredArticle = {
    id: 1,
    title: 'The Spiritual Significance of Janmashtami: Krishna\'s Divine Appearance',
    excerpt: 'Explore the profound spiritual meaning behind Lord Krishna\'s birth celebration and how it transforms our consciousness. This comprehensive guide covers the traditional observances, philosophical insights, and practical ways to deepen your spiritual practice during this sacred time.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
    author: 'Swami Krishnananda Das',
    date: '2024-08-15',
    category: 'Festivals',
    readTime: '8 min read',
    featured: true,
    tags: ['Janmashtami', 'Krishna', 'Festivals', 'Spirituality']
  };

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
          <FaStar />
        </div>
        <div className="absolute top-32 right-20 text-4xl text-gold animate-pulse delay-800">
          <FaNewspaper />
        </div>
        <div className="absolute bottom-32 left-20 text-6xl text-saffron animate-pulse delay-1200">
          <HiSparkles />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
            <span className="mx-4 text-4xl text-saffron animate-pulse">
              <FaStar />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Featured Article
          </h2>
        </motion.div>

        {/* Featured Article Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-orange-100/80 to-amber-100/80 dark:from-saffron/20 dark:to-gold/20 rounded-2xl overflow-hidden border-2 border-saffron/60 dark:border-saffron/50 border-opacity-80 dark:border-opacity-100 backdrop-blur-xl shadow-2xl hover:border-opacity-90 dark:hover:border-opacity-70 hover:shadow-saffron/20 transition-all duration-300 group"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/60"></div>
              
              {/* Featured Badge */}
              <div className="absolute top-4 left-4 bg-saffron text-white font-bold px-3 py-1 rounded-full text-sm flex items-center gap-1 shadow-lg">
                <FaStar />
                FEATURED
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 right-4 bg-purple-600 text-white font-semibold px-3 py-1 rounded-full text-sm shadow-lg">
                {featuredArticle.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="flex items-center space-x-1">
                    <FaUser />
                    <span>{featuredArticle.author}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FaCalendarAlt />
                    <span>{new Date(featuredArticle.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FaClock />
                    <span>{featuredArticle.readTime}</span>
                  </span>
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-saffron transition-colors duration-300 leading-tight">
                {featuredArticle.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                {featuredArticle.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredArticle.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-orange-200/80 dark:bg-purple-900/30 text-orange-800 dark:text-purple-200 px-2 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <FaTag />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More Button */}
              <motion.button
                className="bg-saffron-gradient text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 inline-flex items-center space-x-2 w-fit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaBookOpen />
                <span>Read Full Article</span>
                <FaArrowRight />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaAward className="text-saffron" />
              <span>Premium Content</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEye className="text-gold" />
              <span>Editor's Choice</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeart className="text-saffron" />
              <span>Community Favorite</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
