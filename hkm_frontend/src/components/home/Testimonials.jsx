import { motion } from 'framer-motion';
import { BiSolidQuoteLeft } from "react-icons/bi";
import { BiSolidQuoteRight } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    { 
      name: 'Ramesh Kumar', 
      location: 'Jodhpur, Rajasthan',
      quote: 'Visiting Hare Krishna Marwar Mandir has completely transformed my life. The serene atmosphere and the teachings of Lord Krishna inspire me every day to live with love, compassion, and devotion.', 
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      role: 'Regular Devotee'
    },
    { 
      name: 'Meera Sharma', 
      location: 'Mumbai, Maharashtra',
      quote: 'The Bhagavad Gita sessions here are enlightening. I feel spiritually nourished and find practical guidance for facing life’s challenges with clarity and peace', 
      img: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      role: 'Visiting Devotee'
    },
    { 
      name: 'Arjun Patel', 
      location: 'Ahmedabad, Gujarat',
      quote: 'Participating in Annadana Seva has taught me the joy of selfless service. Feeding others with prasadam brings immense happiness and a sense of connection to Lord Krishna.', 
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      role: 'Temple Volunteer'
    },
    { 
      name: 'Priya Agarwal', 
      location: 'Delhi, India',
      quote: 'Hare Krishna Marwar Mandir is more than a temple; it’s a spiritual home. The youth programs here helped me develop skills while staying grounded in Krishna Consciousness.', 
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      role: 'Temple Patron'
    }
  ];

  return (
    <section className="relative py-4 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-amber-100/30 to-yellow-100/30 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-32 w-96 h-96 bg-gradient-to-r from-saffron/20 to-orange-400/20 dark:bg-orange-600 rounded-full opacity-60 dark:opacity-10 blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-amber-400/15 to-yellow-400/15 dark:bg-purple-600 rounded-full opacity-50 dark:opacity-15 blur-3xl animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-300/10 to-saffron/10 rounded-full opacity-40 blur-2xl animate-pulse delay-1000 dark:hidden"></div>
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
          <h3 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            What Devotees Say
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Hear from our beloved devotees about their spiritual journey with us
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 }
          }}
          className="pb-12"
        >
          {testimonials.map((testimonial, i) => (
            <SwiperSlide key={i}>
              <div
                    className="
                    p-8 rounded-2xl 
                    bg-white/20 dark:bg-white/5 
                    border border-white/30 dark:border-white/10 
                    backdrop-blur-xl 
                    transition-all duration-300 
                    hover:-translate-y-1 
                    hover:bg-white/30 dark:hover:bg-white/10
                    hover:border-saffron/60"
              >
                {/* Quote */}
                <div className="relative mb-6">
                  <div className="absolute -top-4 -left-6 text-2xl text-saffron opacity-50 dark:opacity-30">
                    <BiSolidQuoteLeft />
                  </div>
                  <div className="absolute -bottom-4 -right-2 text-2xl text-saffron opacity-50 dark:opacity-30">
                    <BiSolidQuoteRight />
                  </div>
                  <p className="text-gray-700 dark:text-gray-100 text-lg italic leading-relaxed relative z-10">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <FaStar key={starIndex} className="text-gold text-xl mr-1" />
                  ))}
                </div>

                {/* Devotee Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-saffron shadow-lg"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-orange-600 dark:text-gold text-sm font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-saffron/10 p-8 rounded-2xl border border-saffron/50 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm max-w-2xl mx-auto shadow-lg ">
            <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Share Your Experience</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We'd love to hear about your spiritual journey with us. Your words inspire others to join our divine family.
            </p>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(255, 153, 51, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-saffron text-white dark:text-black font-bold px-6 py-3 rounded-full shadow-xl hover:shadow-saffron/50 transition-all duration-300 glow-button"
            >
              Submit Your Testimonial
            </motion.button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto"
        >
          {[
            { number: '1000+', label: 'Happy Devotees', },
            { number: '15+', label: 'Years of Service', },
            { number: '50+', label: 'Community Events', }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 + (i * 0.1) }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-4 bg-white/70 dark:bg-gradient-to-br dark:from-purple-900/80 dark:to-indigo-900/80 rounded-xl border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-20 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-40 transition-all duration-300"
            >
              <div className="text-md md:text-2xl font-bold text-saffron glow">{stat.number}</div>
              <div className="text-gray-700 dark:text-gray-300 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
