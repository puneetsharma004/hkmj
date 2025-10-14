import { motion } from 'framer-motion';
import { IoMdPhotos } from "react-icons/io";
import { BsCalendar2Event } from "react-icons/bs";
import { MdFestival } from "react-icons/md";
export default function GalleryPreview() {
  const gallery = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg'
  ];

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-amber-100/40 to-yellow-100/40 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-saffron/25 to-orange-400/25 dark:bg-orange-600 rounded-full opacity-50 dark:opacity-15 blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 dark:bg-purple-600 rounded-full opacity-40 dark:opacity-10 blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-300/15 to-saffron/15 rounded-full opacity-30 blur-3xl animate-pulse delay-1000 dark:hidden"></div>
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Temple Gallery
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Glimpses of divine moments, festivals, and the spiritual beauty of our temple
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 2,
                transition: { duration: 0.3 }
              }}
              className="relative group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl border-2 border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 group-hover:border-saffron group-hover:border-opacity-80 dark:group-hover:border-opacity-60 transition-all duration-300">
                <img 
                  src={img} 
                  alt={`Gallery ${i+1}`} 
                  className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-saffron text-white dark:text-black p-3 rounded-full shadow-xl glow-button">
                    <span className="text-2xl">🔍</span>
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl shadow-lg group-hover:shadow-saffron/40 dark:group-hover:shadow-saffron/30 group-hover:shadow-2xl transition-shadow duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            href="/gallery"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 153, 51, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-saffron text-white font-medium px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-saffron/50 focus:ring-offset-2 transition-all duration-200 group"
          >
            <span className="mr-3">View Full Gallery</span>
            <motion.span
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              →
            </motion.span>
          </motion.a>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-600 dark:text-gray-400 text-sm"
          >
            Discover more divine moments • Festival celebrations • Temple architecture
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
