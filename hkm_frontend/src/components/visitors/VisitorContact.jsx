import { motion } from 'framer-motion';
import { 
  FaPhone, 
  FaWhatsapp, 
  FaEnvelope, 
  FaBuilding, 
  FaComments, 
  FaQuestionCircle, 
  FaInfoCircle, 
  FaExclamationTriangle, 
  FaShieldAlt, 
  FaFirstAid, 
  FaSearch, 
  FaUsers, 
  FaArrowRight,
  FaClock,
  FaHeartbeat,
  FaUserFriends
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function VisitorContact() {
  const contactMethods = [
    {
      title: 'Visitor Helpline',
      description: 'Dedicated support for visitor queries and assistance',
      contact: '+91 91161 39371',
      hours: '24/7 Available',
      icon: <FaPhone />,
      color: 'from-green-500 to-emerald-600',
      type: 'phone'
    },
    {
      title: 'WhatsApp Support',
      description: 'Quick responses to your questions via WhatsApp',
      contact: '+91 91161 39371',
      hours: '9 AM - 9 PM',
      icon: <FaWhatsapp />,
      color: 'from-green-400 to-green-600',
      type: 'whatsapp'
    },
    {
      title: 'Email Assistance',
      description: 'Detailed information and booking support',
      contact: 'nljd@hkmjodhpur.org',
      hours: 'Response within 24 hours',
      icon: <FaEnvelope />,
      color: 'from-blue-500 to-cyan-600',
      type: 'email'
    },
    {
      title: 'Reception Desk',
      description: 'In-person assistance at temple entrance',
      contact: 'Temple Reception',
      hours: 'Temple Hours: 08:30 AM - 08:30 PM',
      icon: <FaBuilding />,
      color: 'from-purple-500 to-indigo-600',
      type: 'reception'
    }
  ];

  const frequentlyAsked = [
    {
      question: 'What are the temple timings?',
      answer: 'Temple is open daily from 04:30 AM to 08:30 PM with a break from 01:00 PM - 04:00 PM.'
    },
    {
      question: 'Is there any entry fee?',
      answer: 'No, temple entry is completely free for all visitors. Donations are voluntary.'
    },
    {
      question: 'Can I book accommodation in advance?',
      answer: 'Yes, temple guest rooms can be booked 15 days in advance by calling our booking desk.'
    },
    {
      question: 'Are photography and videography allowed?',
      answer: 'Yes, in designated areas. No flash during aarti. Commercial shoots require permission.'
    },
    {
      question: 'Is prasadam available for all?',
      answer: 'Yes, prasadam distribution timings are from 07:00 AM - 09:00 AM, 12:00 PM - 02:00 PM & 07:00 PM - 09:00 PM.'
    },
    {
      question: 'How can I participate in temple activities?',
      answer: 'Join our morning aarti, Sunday programs, or contact volunteers for more opportunities.'
    }
  ];

  const emergencyContacts = [
    { service: 'Temple Security', number: '+91 91161 39371', available: '24/7', icon: <FaShieldAlt /> },
    { service: 'Medical Emergency', number: '+91 91161 39371', available: '24/7', icon: <FaFirstAid /> },
    { service: 'Lost & Found', number: '+91 91161 39371', available: 'Temple Hours', icon: <FaSearch /> },
    { service: 'Group Bookings', number: '+91 91161 39371', available: '9 AM - 6 PM', icon: <FaUsers /> }
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
            Visitor Assistance
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Our dedicated team is here to help make your temple visit smooth and memorable
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group text-center shadow-xl"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {method.icon}
              </div>
              
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                {method.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                {method.description}
              </p>
              
              <div className="space-y-2">
                <div className="font-semibold text-gold">{method.contact}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs flex items-center justify-center gap-1">
                  <FaClock />
                  {method.hours}
                </div>
              </div>

              <a
                href={
                  method.type === 'phone'
                    ? `tel:${method.contact}`
                    : method.type === 'whatsapp'
                    ? `https://wa.me/${method.contact.replace(/\D/g, '')}`
                    : method.type === 'email'
                    ? `mailto:${method.contact}`
                    : undefined
                }
                target={method.type !== 'reception' ? '_blank' : undefined}
                rel={method.type !== 'reception' ? 'noopener noreferrer' : undefined}
                className="w-full"
              >
                <motion.button
                  className={`mt-4 w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    method.type === 'phone' || method.type === 'whatsapp'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-600/30'
                      : 'border border-saffron text-saffron hover:bg-saffron hover:text-white dark:hover:text-black'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                {method.type === 'phone' && (
                  <>
                    <FaPhone />
                    Call Now
                  </>
                )}
                {method.type === 'whatsapp' && (
                  <>
                    <FaWhatsapp />
                    Chat on WhatsApp
                  </>
                )}
                {method.type === 'email' && (
                  <>
                    <FaEnvelope />
                    Send Email
                  </>
                )}
                {method.type === 'reception' && (
                  <>
                    <FaBuilding />
                    Visit Reception
                  </>
                )}
              </motion.button>
              </a>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {frequentlyAsked.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-indigo-900/50 dark:to-purple-900/50 rounded-xl p-6 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-saffron rounded-full flex items-center justify-center text-white font-bold text-sm">
                    <FaQuestionCircle />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* <div className="text-center mt-8">
            <motion.button
              className="px-6 py-3 border border-saffron text-saffron rounded-lg hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300 font-semibold flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All FAQs
              <FaArrowRight />
            </motion.button>
          </div> */}
        </motion.div>

        {/* Emergency Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-red-100/80 dark:bg-gradient-to-r dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-red-400 dark:border-red-500 border-opacity-60 dark:border-opacity-30 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8 flex items-center justify-center gap-2">
            <FaExclamationTriangle className="text-red-600" />
            Emergency & Special Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 bg-white/10 dark:bg-gray-900/80 rounded-xl border border-red-300 dark:border-red-400 border-opacity-60 dark:border-opacity-20 shadow-lg"
              >
                <div className="text-2xl mb-2 text-red-600 flex justify-center">{contact.icon}</div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{contact.service}</h4>
                <p className="text-red-600 dark:text-red-300 font-mono text-sm mb-2">{contact.number}</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{contact.available}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-red-700 dark:text-red-200 text-sm flex items-center justify-center gap-2">
              <FaHeartbeat />
              For medical emergencies, dial 108 (National Emergency Number) or contact our on-site medical team
            </p>
          </div>
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
              <FaUserFriends className="text-saffron" />
              <span>Dedicated Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaInfoCircle className="text-gold" />
              <span>Quick Responses</span>
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
