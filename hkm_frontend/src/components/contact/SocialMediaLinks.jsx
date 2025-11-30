import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter, 
  FaWhatsapp, 
  FaTelegramPlane, 
  FaMobileAlt, 
  FaComments, 
  FaShare, 
  FaHeart, 
  FaArrowRight, 
  FaUsers,
  FaEye
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function SocialMediaLinks() {
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      color: 'from-blue-600 to-blue-700',
      followers: '25K',
      description: 'Daily updates, events, and community posts',
      url: 'https://facebook.com/Marwarmandir',
      posts: 'Daily'
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      color: 'from-pink-500 to-purple-600',
      followers: '18K',
      description: 'Beautiful temple photos and devotional moments',
      url: 'https://instagram.com/Marwarmandir',
      posts: 'Multiple daily'
    },
    {
      name: 'YouTube',
      icon: <FaYoutube />,
      color: 'from-red-500 to-red-600',
      followers: '12K',
      description: 'Live aarti, lectures, and spiritual videos',
      url: 'https://youtube.com/@Marwarmandir',
      posts: 'Weekly'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      color: 'from-sky-400 to-sky-500',
      followers: '8K',
      description: 'Quick updates, thoughts, and announcements',
      url: 'https://twitter.com/Marwarmandir',
      posts: 'Regular'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      color: 'from-green-500 to-green-600',
      followers: '5K',
      description: 'Direct updates and community broadcasts',
      url: 'https://wa.me/9191161 39371',
      posts: 'Announcements'
    },
    {
      name: 'Telegram',
      icon: <FaTelegramPlane />,
      color: 'from-blue-400 to-blue-500',
      followers: '3K',
      description: 'Spiritual quotes and daily inspiration',
      url: 'https://t.me/Marwarmandir',
      posts: 'Daily quotes'
    }
  ];

  const recentPosts = [
    {
      platform: 'Instagram',
      content: 'Beautiful morning aarti at our temple today 🌅',
      time: '2 hours ago',
      likes: '234',
      image: 'https://images.unsplash.com/photo-1582555172866-f73bb12ba8c6?w=100&h=100&fit=crop'
    },
    {
      platform: 'Facebook',
      content: 'Join us this Sunday for special Bhagavad Gita class',
      time: '6 hours ago',
      likes: '156',
      image: null
    },
    {
      platform: 'YouTube',
      content: 'New video: Evening Sandhya Aarti - Live Recording',
      time: '1 day ago',
      likes: '89',
      image: 'https://images.unsplash.com/photo-1571896848203-97f5ce0b9e9e?w=100&h=100&fit=crop'
    }
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-15 blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-1500"></div>
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
            Connect With Us Online
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Follow us on social media for daily inspiration, live updates, and community connection
          </p>
        </motion.div>

        {/* Social Platforms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {socialPlatforms.map((platform, index) => (
            <motion.a
              key={index}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {platform.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-gold text-sm" />
                    <span className="text-gold font-semibold">{platform.followers}</span>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">followers</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                {platform.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-saffron text-sm font-semibold">{platform.posts}</span>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 group-hover:text-saffron transition-colors duration-300">
                  <span>Follow</span>
                  <FaArrowRight />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Recent Posts</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl p-6 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-start space-x-3 mb-4">
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post thumbnail"
                      className="w-12 h-12 rounded-lg object-cover shadow-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-saffron font-semibold text-sm">{post.platform}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">{post.time}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                      {post.content}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gold flex items-center gap-1">
                    <FaHeart className="text-red-500" />
                    {post.likes} likes
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 group-hover:text-saffron transition-colors duration-300 flex items-center gap-1">
                    <FaEye />
                    View Post
                    <FaArrowRight />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Media CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm text-center shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Join Our Digital Sangha</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Be part of our online spiritual community. Get daily inspiration, live darshan updates, 
            and connect with fellow devotees from around the world.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Facebook', icon: <FaFacebookF /> },
              { name: 'Instagram', icon: <FaInstagram /> },
              { name: 'YouTube', icon: <FaYoutube /> },
              { name: 'WhatsApp', icon: <FaWhatsapp /> }
            ].map((platform, index) => (
              <motion.button
                key={index}
                className="px-4 py-2 bg-saffron-gradient text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {platform.icon}
                {platform.name}
              </motion.button>
            ))}
          </div>
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
              <FaUsers className="text-saffron" />
              <span>Growing Community</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaComments className="text-gold" />
              <span>Daily Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Live Content</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
