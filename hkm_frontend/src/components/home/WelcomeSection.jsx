import { motion, AnimatePresence } from 'framer-motion';
import { CiCircleInfo } from "react-icons/ci";
import { PiHandsPraying } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useState } from 'react';
export default function WelcomeSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <section className="relative py-16 px-4 overflow-hidden bg-white ">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow - Light Theme */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/20 to-orange-300/20 rounded-full opacity-40 blur-3xl animate-pulse dark:bg-purple-600 dark:opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-300/20 to-yellow-300/20 rounded-full opacity-30 blur-3xl animate-pulse delay-1000 dark:bg-blue-600 dark:opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-200/30 to-saffron/30 rounded-full opacity-25 blur-2xl animate-pulse delay-500 dark:hidden"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative max-w-6xl mx-auto z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >      
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
            Welcome to 
            <span className="block gradient-text-saffron-gold mt-2">
              Hare Krishna Marwar Mandir
            </span>
          </h2>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl p-8 md:p-12 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-40 backdrop-blur-xl"
        >
          {/* Description */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center mb-8">
            {/* Video Container */}
            <div className="w-full lg:w-1/2 lg:max-w-2xl">
              <div className="aspect-video">
                <iframe className="w-full h-full rounded-lg shadow-lg" src="https://www.youtube.com/embed/Ul1mUVnE1r4?si=RYqUMiGeB1Jq3GgQ" 
                title="Hare Krishna Marwar Mandir" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen/>
                </div>
            </div>
            <div className="w-full lg:w-1/2 lg:max-w-2xl">
              <div className="aspect-video">
                <iframe 
                  className="w-full h-full rounded-lg shadow-lg"
                  src="https://www.youtube.com/embed/Czg2XVn8hTI?si=9Ur35i4c8-JEqOZN"
                  title="Hare Krishna Marwar Mandir" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin" 
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          {/* Content Container */}
            <div className="w-full text-justify lg:text-center lg:max-w-6xl mx-auto mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Featured Videos
              </h3>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                A Magnificent Temple for Krishna
              </h2>
              
              <div className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {/* First paragraph - Always visible */}
                <p>
                  In the royal city of Jodhpur, renowned for its rich heritage and timeless architecture, Hare Krishna Marwar Mandir is envisioned as a magnificent spiritual landmark — a sanctuary of devotion, culture, and divine harmony.
                </p>
                
                {/* Remaining paragraphs - Expandable on mobile, always visible on desktop */}
                <div className="md:block">
                  <AnimatePresence>
                    {(isExpanded || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4">
                          Spread across serene acres of land, this grand temple complex will beautifully blend the artistic essence of Rajasthani and Marwari architecture with refined modern design, symbolizing a perfect union of tradition and innovation.
                        </p>
                        <p className="mt-4">
                          Dedicated to the glorification of Lord Krishna, the Hare Krishna Marwar Mandir aims to serve as a center for spiritual awakening, cultural celebration, and social upliftment. This monumental project will stand as a radiant testament to the enduring glory of India's spiritual and architectural heritage.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Read More button - only on mobile */}
                <div className="md:hidden mt-4 flex justify-center">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300 outline-none"
                  >
                    {isExpanded ? (
                      <>
                        Read Less
                        <faChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Read More
                        <FaChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>


            {/* Decorative Quote Container */}
            <div className="relative bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-purple-900/80 dark:to-indigo-900/80 p-6 rounded-xl shadow-lg border border-saffron/30 dark:border-saffron/50 border-opacity-50 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-saffron/5 to-gold/5 dark:from-saffron/10 dark:to-gold/10 rounded-xl"></div>
              <blockquote className="text-lg md:text-xl italic text-gray-800 dark:text-white font-medium text-center relative z-10">
                By serving Krishna with love and devotion, we find eternal joy.
              </blockquote>
              <p className="text-center text-saffron font-semibold mt-3 text-sm glow">
                – Srila Prabhupada
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.a
  href="/about"
  whileHover={{ 
    scale: 1.02,
    backgroundColor: "#ff9933",
    color: "#ffffff"
  }}
  whileTap={{ scale: 0.98 }}
  className="inline-flex items-center border-2 border-saffron text-saffron hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 group"
>
  <span className="mr-2">Learn More About Our Temple</span>
  <motion.span
    className="group-hover:translate-x-1 transition-transform duration-200"
  >
    →
  </motion.span>
</motion.a>


            {/* Additional Links */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
              <a href="/events" className="text-gray-600 dark:text-gray-400 hover:text-[#ff9933] transition-colors duration-300 font-medium flex items-center gap-1 p-2 border border-text-gray-400 rounded-lg hover:bg-saffron">
                <GoPeople className='text-lg'/> <span>Events & Programs</span>
              </a>
              <span className="text-gray-400 dark:text-gray-700">•</span>
              <a href="/visitor-info" className="text-gray-600 dark:text-gray-400 hover:text-[#ff9933] transition-colors duration-300 font-medium flex items-center gap-1 p-2 border border-text-gray-400 rounded-lg hover:bg-saffron">
                <CiCircleInfo className='text-lg'/> <span>Visitor Information</span>
              </a>
              <span className="text-gray-400 dark:text-gray-700">•</span>
              <a href="/donations" className="text-gray-600 dark:text-gray-400 hover:text-[#ff9933] transition-colors duration-300 font-medium flex items-center gap-1 p-2 border border-text-gray-400 rounded-lg hover:bg-saffron">
                <PiHandsPraying className='text-lg'/> <span>Make a Donation</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
