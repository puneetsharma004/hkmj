import { motion } from 'framer-motion';
import { 
  FaComments, 
  FaStar, 
  FaHeart, 
  FaUsers, 
  FaTrophy, 
  FaChartLine, 
  FaQuoteLeft, 
  FaQuoteRight, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaGift, 
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { BiSolidDonateHeart } from "react-icons/bi";
export default function DonorTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Ankit Jain',
      location: 'Mumbai, Maharashtra',
      donorSince: '2019',
      contribution: 'Monthly Prasadam Sponsor',
      quote: 'Contributing to Hare Krishna Marwar Mandir has been one of the most fulfilling experiences of my life. Knowing that my support helps spread devotion and serve those in need fills my heart with peace and gratitude.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      amount: '₹5,000/month',
      impact: 'Feeds 200+ devotees monthly'
    },
    {
      id: 2,
      name: 'Sunita Mehta',
      location: 'Delhi, India',
      donorSince: '2020',
      contribution: 'Festival Sponsor',
      quote: 'I feel blessed to be a small part of this divine mission. The temple’s initiatives like Annadan Seva and Gau Seva truly embody the spirit of selfless service taught by Lord Krishna.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=80&h=80&fit=crop&crop=face',
      amount: '₹25,000/year',
      impact: 'Sponsors 2 major festivals annually'
    },
    {
      id: 3,
      name: 'Rajendra Singh Rathore',
      location: 'Ahmedabad, Gujarat',
      donorSince: '2018',
      contribution: 'Gau Seva Supporter',
      quote: 'Supporting the temple’s construction and social programs gives me a sense of purpose. Every visit reminds me that my contribution is helping preserve our spiritual and cultural heritage.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      amount: '₹10,000/year',
      impact: 'Supports 4 cows annually'
    },
    {
      id: 4,
      name: 'Pooja Sharma',
      location: 'Bangalore, Karnataka',
      donorSince: '2021',
      contribution: 'Education Program Donor',
      quote: 'Hare Krishna Marwar Mandir isn’t just a temple — it’s a movement of compassion and faith. Donating here feels like offering directly at the lotus feet of Lord Krishna.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      amount: '₹15,000/year',
      impact: 'Educates 50+ students monthly'
    }
  ];

  const donorStats = [
    { icon: <FaUsers />, number: '2,500+', label: 'Happy Donors' },
    { icon: <BiSolidDonateHeart />, number: '₹2.5Cr+', label: 'Total Raised' },
    { icon: <FaStar />, number: '4.9/5', label: 'Donor Satisfaction' },
    { icon: <FaChartLine />, number: '75%', label: 'Recurring Donors' }
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
            What Our Donors Say
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Hear from our beloved donor community about their experience contributing to our spiritual mission
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-2xl hover:shadow-saffron/20 transition-all duration-300 group shadow-xl"
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full border-3 border-saffron border-opacity-50 group-hover:border-opacity-80 transition-all duration-300 shadow-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                    <FaMapMarkerAlt />
                    {testimonial.location}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-xs">
                    <span className="text-gold flex items-center gap-1">
                      <FaCalendarAlt />
                      Donor since {testimonial.donorSince}
                    </span>
                    <span className="text-green-500 dark:text-green-400 flex items-center gap-1">
                      <FaGift />
                      {testimonial.contribution}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="mb-6">
                <div className="text-4xl text-saffron opacity-30 mb-2">
                  <FaQuoteLeft />
                </div>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed italic group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                  {testimonial.quote}
                </p>
                <div className="text-4xl text-saffron opacity-30 text-right flex justify-end mt-2">
                  <FaQuoteRight />
                </div>
              </div>

              {/* Impact Summary */}
              <div className="bg-saffron/10 rounded-lg p-4 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Contribution</div>
                    <div className="text-lg font-bold text-saffron">{testimonial.amount}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Impact</div>
                    <div className="text-sm font-semibold text-gold">{testimonial.impact}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaTrophy className="text-saffron" />
              <span>Verified Impact Reports</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaHeart className="text-gold" />
              <span>100% Transparency</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Regular Updates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
