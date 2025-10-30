import { motion } from 'framer-motion';
import { 
  FaPray, 
  FaGift, 
  FaBolt, 
  FaRupeeSign, 
  FaHeart, 
  FaComments, 
  FaPhone, 
  FaEnvelope, 
  FaExclamationTriangle,
  FaUsers,
  FaCalendarAlt,
  FaArrowRight,
  FaRedo,
  FaUtensils,
  // FaHandHeart
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { PiCowFill } from "react-icons/pi";

export default function DonationsCallToAction() {
  // Scroll to donation form
  const scrollToDonationForm = () => {
    const donationForm = document.querySelector('#donation-form');
    if (donationForm) {
      donationForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll to a section with class name if ID doesn't exist
      const donationSection = document.querySelector('.donation-form, .donate-section');
      if (donationSection) {
        donationSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };
  const urgentNeeds = [
    {
      title: 'Emergency Gau Seva',
      description: 'Winter shelter needed for 5 cows',
      amount: '₹50,000',
      deadline: 'Ongoing',
      urgent: true,
      icon: <PiCowFill />
    },
    {
      title: 'Annadan Seva for Hospital Patients & Attendants',
      description: 'Help us arrange nutritious food for hospital patients & attendants.',
      amount: '₹5,00,000',
      deadline: 'Ongoing',
      urgent: false,
      icon: <FaUtensils />
    }
  ];

  const quickDonations = [
    { amount: '₹500', impact: 'Feeds 20 devotees', icon: <FaUtensils /> },
    { amount: '₹1,500', impact: 'One day aarti sponsorship', icon: <FaPray /> },
    { amount: '₹5,000', impact: 'Cow food for a month', },
    { amount: '₹10,000', impact: 'Festival decoration', icon: <FaGift /> }
  ];

  return (
    <section className="relative py-5 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-gold/20 to-saffron/20 dark:bg-gold rounded-full opacity-25 dark:opacity-10 blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
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
          
          <h2 className="text-4xl md:text-5xl font-bold gradient-text-saffron-gold mb-6">
            Your Support Makes a Difference
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            Every contribution, big or small, helps us serve Krishna and the community. 
            Join thousands of devotees in this sacred seva.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            {/* Primary Donate Button */}
            <motion.button
              className="group relative overflow-hidden px-12 py-4 bg-saffron text-white font-bold rounded-full shadow-2xl hover:shadow-saffron/50 transition-all duration-300 text-lg outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center space-x-3 cursor-pointer" onClick={scrollToDonationForm}>
                <FaGift />
                <span>Donate Now</span>
                <motion.span
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <FaArrowRight />
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gold to-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>

            {/* Recurring Donation */}
            <motion.button
              className="group border-2 border-saffron text-saffron font-bold px-8 py-4 rounded-full hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300 flex items-center space-x-3 outline-none cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToDonationForm}
            >
              <FaRedo />
              <span>Monthly Donation</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Quick Donation Options */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Quick Donation Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickDonations.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-60 transition-all duration-300 group text-center shadow-lg"
              >
                <div className="text-3xl font-bold text-saffron mb-2 group-hover:text-gold transition-colors duration-300">
                  {option.amount}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                  {option.impact}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div> */}

        {/* Urgent Needs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Urgent Needs</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {urgentNeeds.map((need, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 border backdrop-blur-xl transition-all duration-300 group shadow-lg outline-none ${
                  need.urgent 
                    ? 'bg-gradient-to-br from-red-100/90 to-orange-100/90 dark:from-red-900/20 dark:to-orange-900/20 border-red-400 dark:border-red-500 border-opacity-60 dark:border-opacity-50' 
                    : 'bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50'
                }`}
              >
                {/* Icon Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-saffron-gradient rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                    {need.icon}
                  </div>
                  {need.urgent && (
                    <motion.div
                      className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg "
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FaExclamationTriangle />
                      URGENT
                    </motion.div>
                  )}
                </div>
                
                <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-saffron transition-colors duration-300">
                  {need.title}
                </h4>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {need.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <FaRupeeSign />
                      Target Amount
                    </div>
                    <div className="text-2xl font-bold text-saffron">{need.amount}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <FaCalendarAlt />
                      Cycle
                    </div>
                    <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                      Monthly
                    </div>
                  </div>

                </div>
                
                <motion.button
                  className={`w-full font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg outline-none cursor-pointer ${
                    need.urgent
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-red-500/30'
                      : 'bg-saffron-gradient text-white hover:shadow-saffron/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToDonationForm}
                >
                  <FaHeart />
                  Contribute Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact & Support */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center p-6 bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/50 dark:to-black/50 rounded-xl border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 transition-all duration-300 shadow-lg ">
            <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
              <FaComments />
            </div>
            <h4 className="font-bold text-saffron mb-2">Need Help?</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Our donation team is here to assist you with any questions about contributing to our temple.
            </p>
            <button className="text-saffron hover:text-gold transition-colors duration-300 font-semibold flex items-center gap-1 mx-auto">
              Chat with Us <FaArrowRight />
            </button>
          </div>
          
          <div className="text-center p-6 bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/50 dark:to-black/50 rounded-xl border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 transition-all duration-300 shadow-lg">
            <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
              <FaPhone />
            </div>
            <h4 className="font-bold text-saffron mb-2">Call Us</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Speak directly with our donation coordinators for personalized assistance.
            </p>
            <button className="text-saffron hover:text-gold transition-colors duration-300 font-semibold">
              +91 91161 39371
            </button>
          </div>
          
          <div className="text-center p-6 bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/50 dark:to-black/50 rounded-xl border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 transition-all duration-300 shadow-lg">
            <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
              <FaEnvelope />
            </div>
            <h4 className="font-bold text-saffron mb-2">Email Us</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Send us your questions and we'll get back to you within 24 hours.
            </p>
            <button className="text-saffron hover:text-gold transition-colors duration-300 font-semibold">
              donations@Marwarmandir.org
            </button>
          </div>
        </motion.div> */}

        {/* Final Blessing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg max-w-4xl mx-auto">
            <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-4 max-w-2xl mx-auto">
              "न हि कल्याणकृत्कश्चिद्दुर्गतिं तात गच्छति"<br/>
              "One who performs virtuous deeds never meets with misfortune"
            </p>
            <p className="text-saffron font-semibold text-xl">
              May Krishna bless you abundantly for your generous heart
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
