import { motion } from 'framer-motion';
import { CiCircleInfo } from "react-icons/ci";
import { PiHandsPraying } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
export default function WelcomeSection() {
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
      <div className="relative max-w-5xl mx-auto z-10">
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
            <span className="block text-2xl md:text-3xl font-medium text-orange-600 dark:text-purple-300 mt-2">Jodhpur</span>
          </h2>
        </motion.div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/90 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl shadow-2xl p-8 md:p-12 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-40 backdrop-blur-xl"
        >
          {/* Description */}
          <div className="mb-8">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-100 mb-6">
              Nestled in the heart of the <span className="font-semibold text-blue-600 dark:text-cyan-300 glow">Blue City</span>, our temple is a beacon of devotion, heritage, and spiritual bliss. 
              Part of the <span className="font-semibold text-saffron dark:text-saffron glow">ISKCON family</span>, the Hare Krishna Marwar Mandir offers daily darshan, cultural events, and a warm welcome to all.
            </p>

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
              <a href="/events" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors duration-300 font-medium hover:glow flex items-center gap-1">
                <GoPeople /> <span>Events & Programs</span>
              </a>
              <span className="text-gray-400 dark:text-gray-700">•</span>
              <a href="/visitor-info" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors duration-300 font-medium hover:glow flex items-center gap-1">
                <CiCircleInfo /> <span>Visitor Information</span>
              </a>
              <span className="text-gray-400 dark:text-gray-700">•</span>
              <a href="/donations" className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors duration-300 font-medium hover:glow flex items-center gap-1">
                <PiHandsPraying /> <span>Make a Donation</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
