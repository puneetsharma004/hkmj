import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaEdit, 
  FaEnvelope, 
  FaClipboardList, 
  FaUser, 
  FaPhone, 
  FaComments, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaSpinner,
  FaPaperPlane,
  FaInfoCircle
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const inquiryTypes = [
    { value: '', label: 'Select Inquiry Type' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'events', label: 'Event Information' },
    { value: 'donations', label: 'Donations & Seva' },
    { value: 'volunteer', label: 'Volunteering Opportunities' },
    { value: 'accommodation', label: 'Temple Accommodation' },
    { value: 'spiritual', label: 'Spiritual Guidance' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-15 blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Send Us a Message
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Have a question or need assistance? Fill out the form below and we'll get back to you within 24 hours
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl"
        >
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-500 border-opacity-60 dark:border-opacity-50 rounded-lg text-center shadow-lg"
            >
              <div className="text-4xl mb-2 text-green-600 dark:text-green-400">
                <FaCheckCircle className="mx-auto" />
              </div>
              <h3 className="text-green-800 dark:text-green-300 font-bold mb-2">Message Sent Successfully!</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Thank you for reaching out. We'll respond to your inquiry within 24 hours.
              </p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-500 border-opacity-60 dark:border-opacity-50 rounded-lg text-center shadow-lg"
            >
              <div className="text-4xl mb-2 text-red-600 dark:text-red-400">
                <FaExclamationCircle className="mx-auto" />
              </div>
              <h3 className="text-red-800 dark:text-red-300 font-bold mb-2">Message Failed to Send</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Please try again or contact us directly via phone or email.
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FaUser className="text-saffron" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FaEnvelope className="text-saffron" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </motion.div>
            </div>

            {/* Phone and Subject Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FaPhone className="text-saffron" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300"
                  placeholder="+91 91161 39371"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <FaClipboardList className="text-saffron" />
                  Inquiry Type *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300"
                  required
                >
                  {inquiryTypes.map((type, index) => (
                    <option key={index} value={type.value} className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
                      {type.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <FaComments className="text-saffron" />
                Your Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 resize-vertical"
                placeholder="Please describe your inquiry in detail. We're here to help!"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-saffron-gradient text-white hover:shadow-saffron/30 hover:scale-105'
                }`}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <FaSpinner className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 text-white">
                    <FaPaperPlane />
                    <span>Send Message</span>
                  </div>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-sm mt-4">
                <FaInfoCircle />
                <p>* Required fields. We typically respond within 24 hours.</p>
              </div>
            </motion.div>
          </form>
        </motion.div>

        {/* Alternative Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Prefer to contact us directly? Choose your preferred method:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center space-x-2 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+919116139371
"
            >
              <FaPhone />
              <span>Call: +91 91161 39371</span>
            </motion.a>
            <motion.a
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:nljd@hkmjodhpur.org"
            >
              <FaEnvelope />
              <span>Email: nljd@hkmjodhpur.org</span>
            </motion.a>
            <motion.a
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 flex items-center space-x-2 shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/9191161 39371
"
            >
              <FaComments />
              <span>WhatsApp Us</span>
            </motion.a>
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
              <FaCheckCircle className="text-saffron" />
              <span>Secure Form</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaInfoCircle className="text-gold" />
              <span>24hr Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Personal Care</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
