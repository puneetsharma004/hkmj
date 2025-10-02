import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaBook, 
  FaEnvelope, 
  FaEdit, 
  FaComments, 
  FaBookOpen, 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaTwitter, 
  FaWhatsapp, 
  FaShare, 
  FaLock, 
  FaUsers, 
  FaCalendarAlt, 
  FaHeart, 
  FaPaperPlane,
  FaUserFriends,
  FaLightbulb
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function BlogCallToAction() {
  const [newsletterData, setNewsletterData] = useState({ name: '', email: '' });
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterData.name && newsletterData.email) {
      setIsSubscribed(true);
      setNewsletterData({ name: '', email: '' });
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const socialPlatforms = [
    { name: 'Facebook', icon: <FaFacebookF />, followers: '25K', url: '#facebook', color: 'text-blue-600' },
    { name: 'Instagram', icon: <FaInstagram />, followers: '18K', url: '#instagram', color: 'text-pink-600' },
    { name: 'YouTube', icon: <FaYoutube />, followers: '12K', url: '#youtube', color: 'text-red-600' },
    { name: 'Twitter', icon: <FaTwitter />, followers: '8K', url: '#twitter', color: 'text-sky-500' }
  ];

  const quickActions = [
    {
      title: 'Write for Us',
      description: 'Share your spiritual insights with our community',
      icon: <FaEdit />,
      color: 'from-blue-500 to-cyan-600',
      action: 'Submit Article'
    },
    {
      title: 'Join Discussions',
      description: 'Engage with fellow seekers in our forums',
      icon: <FaComments />,
      color: 'from-green-500 to-teal-600',
      action: 'Join Community'
    },
    {
      title: 'Attend Classes',
      description: 'Participate in our spiritual learning programs',
      icon: <FaBookOpen />,
      color: 'from-purple-500 to-indigo-600',
      action: 'View Schedule'
    }
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-gold/20 to-saffron/20 dark:bg-gold rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Spiritual Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-5">
        <div className="absolute top-16 left-16 text-6xl text-saffron animate-pulse delay-500">
          <FaBook />
        </div>
        <div className="absolute top-32 right-20 text-4xl text-gold animate-pulse delay-1000">
          <HiSparkles />
        </div>
        <div className="absolute bottom-32 left-20 text-5xl text-saffron animate-pulse delay-1500">
          <span>💫</span>
        </div>
        <div className="absolute bottom-16 right-16 text-4xl text-gold animate-pulse delay-200">
          <span>📖</span>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Main CTA Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-32"></div>
            <span className="mx-6 text-5xl text-saffron animate-pulse">
              <FaBook />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-32"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-saffron-gold mb-6">
            Stay Updated & Spiritually Connected
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            Receive spiritual insights, temple updates, and wisdom teachings directly in your inbox. 
            Join our community of seekers on the path of Krishna consciousness.
          </p>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/30 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm mb-16 shadow-lg"
        >
          <div className="max-w-2xl mx-auto">
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-green-100/80 dark:bg-green-900/50 rounded-2xl border border-green-400 dark:border-green-500 border-opacity-60 dark:border-opacity-50 shadow-lg"
              >
                <div className="text-6xl mb-4">🙏</div>
                <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">Welcome to Our Spiritual Family!</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Thank you for subscribing. You'll receive weekly spiritual insights and temple updates.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-2">
                    <FaEnvelope />
                    Subscribe to Spiritual Insights
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get weekly articles, teachings, and temple updates delivered to your inbox
                  </p>
                </div>
                
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newsletterData.name}
                      onChange={(e) => setNewsletterData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your Full Name"
                      className="px-6 py-4 bg-white/10 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                      required
                    />
                    <input
                      type="email"
                      value={newsletterData.email}
                      onChange={(e) => setNewsletterData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="px-6 py-4 bg-white/10 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-saffron via-orange-500 to-gold text-white font-bold rounded-xl shadow-2xl hover:shadow-saffron/50 transition-all duration-300 text-lg flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPaperPlane />
                    Subscribe to Spiritual Insights
                    <FaBook />
                  </motion.button>
                  
                  <p className="text-center text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
                    <FaLock />
                    We respect your privacy. Unsubscribe anytime. No spam, only spiritual wisdom.
                  </p>
                </form>
              </>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Join Our Spiritual Community</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-60 hover:shadow-saffron/20 transition-all duration-300 group text-center shadow-xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {action.icon}
                </div>
                
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-saffron transition-colors duration-300">
                  {action.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {action.description}
                </p>
                
                <motion.button
                  className="px-6 py-2 border border-saffron text-saffron rounded-lg hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {action.action}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Media Follow */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Follow Us for Daily Inspiration</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {socialPlatforms.map((platform, index) => (
              <motion.a
                key={index}
                href={platform.url}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl p-6 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group text-center shadow-lg"
              >
                <div className={`text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 ${platform.color} flex justify-center items-center`}>
                  {platform.icon}
                </div>
                <h4 className="font-bold text-gray-800 dark:text-white mb-1 group-hover:text-saffron transition-colors duration-300">
                  {platform.name}
                </h4>
                <p className="text-gold font-semibold flex items-center justify-center gap-1">
                  <FaUsers />
                  {platform.followers} followers
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Article Sharing */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-gradient-to-r dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl p-8 border border-orange-200 dark:border-purple-500 border-opacity-60 dark:border-opacity-30 backdrop-blur-sm mb-12 text-center shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-600 dark:text-white mb-4 flex items-center justify-center gap-2">
            <FaShare />
            Share the Wisdom
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Help spread spiritual knowledge by sharing our articles with friends and family. 
            Every share plants a seed of Krishna consciousness.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { text: 'Share on Facebook', icon: <FaFacebookF /> },
              { text: 'Tweet Article', icon: <FaTwitter /> },
              { text: 'WhatsApp Share', icon: <FaWhatsapp /> },
              { text: 'Email Friend', icon: <FaEnvelope /> }
            ].map((option, index) => (
              <motion.button
                key={index}
                className="px-4 py-2 bg-saffron-gradient text-black dark:text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {option.icon}
                {option.text}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Final Blessing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 italic text-lg mb-4 max-w-2xl mx-auto">
            "Through knowledge and wisdom, we illuminate the path to spiritual enlightenment. 
            May these teachings guide you closer to Krishna's divine love."
          </p>
          <p className="text-saffron font-semibold text-xl flex items-center justify-center gap-2">
            Hare Krishna! Keep reading, keep growing 
            <span>📚🙏</span>
          </p>
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
              <FaUserFriends className="text-saffron" />
              <span>Growing Community</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaLightbulb className="text-gold" />
              <span>Daily Wisdom</span>
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
