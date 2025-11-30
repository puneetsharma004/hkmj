import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaMobileAlt, 
  FaComments, 
  FaTabletAlt, 
  FaInstagram, 
  FaFacebookF, 
  FaYoutube, 
  FaHeart, 
  FaComment, 
  FaClock,
  FaShare,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function SocialMediaFeed() {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');

  const socialPlatforms = [
    { id: 'instagram', name: 'Instagram', icon: <FaInstagram />, color: 'from-pink-500 to-purple-600', link: ' https://www.instagram.com/harekrishnamarwar/' },
    { id: 'facebook', name: 'Facebook', icon: <FaFacebookF />, color: 'from-blue-500 to-indigo-600', link: 'https://www.facebook.com/Harekrishnamarwar' },
    { id: 'youtube', name: 'YouTube', icon: <FaYoutube />, color: 'from-red-500 to-pink-600', link: 'https://www.youtube.com/@HareKrishnaJodhpur' }
  ];

  const socialPosts = {
    instagram: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
        caption: 'Beautiful moments from today\'s Janmashtami celebration! 🎉✨ #JanmashtamiFestival #HareKrishna',
        likes: 245,
        comments: 18,
        timeAgo: '2 hours ago',
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1582555172866-f73bb12ba8c6?w=300&h=300&fit=crop',
        caption: 'Evening aarti filled with divine vibrations 🕉️🙏 #EveningAarti #Devotion',
        likes: 189,
        comments: 12,
        timeAgo: '1 day ago'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop',
        caption: 'Serving prasadam with love to our community 💖🍽️ #CommunityService #Prasadam',
        likes: 312,
        comments: 25,
        timeAgo: '3 days ago'
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1583211892916-5e38c6ee3297?w=300&h=300&fit=crop',
        caption: 'Colors of joy at our Holi celebration! 🎨🌈 #HoliFestival #ColorsOfJoy',
        likes: 156,
        comments: 9,
        timeAgo: '1 week ago'
      }
    ],
    facebook: [
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
        caption: 'Join us for our weekly Bhagavad Gita classes every Sunday at 10 AM. Discover the timeless wisdom of Krishna.',
        likes: 89,
        comments: 15,
        timeAgo: '6 hours ago'
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1571896848203-97f5ce0b9e9e?w=300&h=300&fit=crop',
        caption: 'Thank you to all the volunteers who made our community kitchen possible. Together we serve Krishna.',
        likes: 134,
        comments: 22,
        timeAgo: '2 days ago'
      }
    ],
    youtube: [
      {
        id: 7,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        caption: 'New video: Morning Kirtan Session - Hare Krishna Mahamantra',
        likes: 456,
        comments: 78,
        timeAgo: '5 days ago'
      },
      {
        id: 8,
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop',
        caption: 'Complete Bhagavad Gita Chapter 2 lecture now available!',
        likes: 234,
        comments: 45,
        timeAgo: '1 week ago'
      }
    ]
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 dark:bg-purple-600 rounded-full opacity-40 dark:opacity-15 blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-1500"></div>
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
            Follow Our Journey
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Stay connected with our daily spiritual activities and community updates on social media
          </p>
        </motion.div>

        {/* Platform Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-4 bg-white/10 dark:bg-gradient-to-r dark:from-gray-900/50 dark:to-black/50 p-2 rounded-2xl border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-lg">
            {socialPlatforms.map((platform) => (
              <motion.a
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 cursor-pointer outline-none ${
                  selectedPlatform === platform.id
                    ? `bg-gradient-to-r ${platform.color} text-white`
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{platform.icon}</span>
                <span>{platform.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Social Posts Grid */}
        <motion.div
          key={selectedPlatform}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {socialPosts[selectedPlatform]?.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl overflow-hidden border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt="Social media post"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/20 dark:bg-black/40 p-2 rounded-full backdrop-blur-sm">
                  <span className="text-xl text-white">
                    {socialPlatforms.find(p => p.id === selectedPlatform)?.icon}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {post.caption}
                </p>

                {/* Post Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <FaHeart className="text-red-500" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FaComment className="text-blue-500" />
                      <span>{post.comments}</span>
                    </span>
                  </div>
                  <span className="text-saffron flex items-center gap-1">
                    <FaClock />
                    {post.timeAgo}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Connect With Us</h3>
            <div className="flex justify-center space-x-6 mb-6">
              {socialPlatforms.map((platform, index) => (
                <motion.a
                  key={platform.id}
                  href={platform.link}
                  className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg hover:shadow-2xl transition-all duration-300`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {platform.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              Follow us for daily updates, spiritual insights, and community moments
            </p>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaMobileAlt className="text-saffron" />
              <span>Mobile Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-gold" />
              <span>Daily Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeart className="text-saffron" />
              <span>Community Driven</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
