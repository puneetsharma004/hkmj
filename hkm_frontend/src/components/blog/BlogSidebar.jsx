import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaEnvelope, 
  FaCalendarAlt, 
  FaFire, 
  FaTag, 
  FaArrowRight, 
  FaEye, 
  FaDonate, 
  FaDoorOpen, 
  FaTheaterMasks, 
  FaCamera, 
  FaPhone, 
  FaPaperPlane, 
  FaHeart, 
  FaGift, 
  FaUsers, 
  FaClock, 
  FaNewspaper,
  FaHandsHelping
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function BlogSidebar() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const upcomingEvents = [
    {
      title: 'Sunday Bhagavad Gita Class',
      date: '2024-08-25',
      time: '10:00 AM',
      type: 'Weekly'
    },
    {
      title: 'Janmashtami Celebration',
      date: '2024-08-30',
      time: '6:00 PM',
      type: 'Festival'
    },
    {
      title: 'Community Kitchen Volunteer Day',
      date: '2024-09-05',
      time: '9:00 AM',
      type: 'Service'
    }
  ];

  const popularPosts = [
    {
      title: 'The Power of Daily Meditation',
      views: '2.5K',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=100&h=80&fit=crop'
    },
    {
      title: 'Understanding Krishna Consciousness',
      views: '1.8K',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=80&fit=crop'
    },
    {
      title: 'Temple Architecture and Symbolism',
      views: '1.4K',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=80&fit=crop'
    },
    {
      title: 'Community Service in Spirituality',
      views: '1.2K',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=80&fit=crop'
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const tags = [
    'Bhagavad Gita', 'Krishna', 'Meditation', 'Festivals', 'Community',
    'Philosophy', 'Spirituality', 'Temple', 'Service', 'Yoga',
    'Kirtan', 'Prasadam', 'Devotion', 'Wisdom', 'Peace'
  ];

  return (
    <div className="space-y-8">
      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-orange-100/80 to-amber-100/80 dark:from-saffron/20 dark:to-gold/20 rounded-2xl p-6 border border-saffron/40 dark:border-saffron/50 border-opacity-60 dark:border-opacity-100 backdrop-blur-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center flex items-center justify-center gap-2">
          <FaEnvelope />
          Stay Spiritually Connected
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
          Get weekly spiritual insights and temple updates delivered to your inbox
        </p>
        
        {subscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 bg-green-100/80 dark:bg-green-900/50 rounded-lg border border-green-400 dark:border-green-500 border-opacity-60 dark:border-opacity-50 shadow-lg"
          >
            <div className="text-3xl mb-2">🙏</div>
            <p className="text-green-800 dark:text-green-300 font-semibold">Thank you for subscribing!</p>
            <p className="text-gray-600 dark:text-gray-300 text-xs">Check your email for confirmation</p>
          </motion.div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
              required
            />
            <motion.button
              type="submit"
              className="w-full bg-saffron-gradient text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaPaperPlane />
              Subscribe Now
            </motion.button>
          </form>
        )}
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="bg-white/90 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
          <FaCalendarAlt />
          <span>Upcoming Events</span>
        </h3>
        
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-l-2 border-saffron pl-4 hover:border-gold transition-colors duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 dark:text-white text-sm group-hover:text-saffron transition-colors duration-300">
                    {event.title}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500">•</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs flex items-center gap-1">
                      <FaClock />
                      {event.time}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  event.type === 'Festival' ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200' :
                  event.type === 'Service' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' :
                  'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
                }`}>
                  {event.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.button
          className="w-full mt-4 px-4 py-2 border border-saffron text-saffron rounded-lg hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View All Events
          <FaArrowRight />
        </motion.button>
      </motion.div>

      {/* Popular Posts */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-white/90 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
          <FaFire className="text-orange-500" />
          <span>Popular Articles</span>
        </h3>
        
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-16 h-12 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-lg"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm leading-tight group-hover:text-saffron transition-colors duration-300">
                  {post.title}
                </h4>
                <div className="flex items-center space-x-1 mt-1">
                  <FaEye className="text-xs text-gray-500 dark:text-gray-400" />
                  <span className="text-xs text-gold">{post.views} views</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tags Cloud */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="bg-white/90 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center space-x-2">
          <FaTag />
          <span>Popular Tags</span>
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-100 dark:bg-purple-900/30 text-orange-700 dark:text-purple-200 px-3 py-1 rounded-full text-xs hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300"
            >
              #{tag}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Donation CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-green-100/80 dark:bg-gradient-to-r dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-400 dark:border-green-500 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl text-center shadow-lg"
      >
        <div className="text-4xl mb-4">🙏</div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Support Our Mission</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          Help us continue sharing spiritual wisdom and serving the community
        </p>
        <motion.button
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-green-600/30 transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaDonate />
          Donate Now
          <FaGift />
        </motion.button>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="bg-white/90 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Quick Links</h3>
        <div className="space-y-3">
          {[
            { name: 'Visitor Information', icon: <FaDoorOpen />, link: '/visitor-info' },
            { name: 'Events & Programs', icon: <FaTheaterMasks />, link: '/events' },
            { name: 'Photo Gallery', icon: <FaCamera />, link: '/gallery' },
            { name: 'Contact Us', icon: <FaPhone />, link: '/contact' }
          ].map((link, index) => (
            <motion.a
              key={index}
              href={link.link}
              className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-saffron transition-colors duration-300 group"
              whileHover={{ x: 5 }}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300 text-saffron">
                {link.icon}
              </span>
              <span>{link.name}</span>
              <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="flex justify-center items-center space-x-6 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <FaUsers className="text-saffron" />
            <span>Community Hub</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaNewspaper className="text-gold" />
            <span>Daily Updates</span>
          </div>
          <div className="flex items-center space-x-1">
            <HiSparkles className="text-saffron" />
            <span>Spiritual Growth</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
