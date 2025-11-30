import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaMap, 
  FaCompass, 
  FaSearch, 
  FaMapPin, 
  FaBuilding, 
  FaEnvelope, 
  FaPhone, 
  FaCopy, 
  FaDirections, 
  FaInfoCircle, 
  FaClock,
  FaUniversity,
  FaMapMarkedAlt,
  FaRoute
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';


export default function LocationAndMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const templeLocation = {
    address: 'Chopasani, Near Vastra Mantralay, Jodhpur',
    gpsCoordinates: '26.273568206420695, 72.92895033343702',
    landmark: 'Opposite JDA Colony',
    pincode: '342024',
    district: 'Jodhpur',
    state: 'Rajasthan'
  };

  const nearbyLandmarks = [
    { name: 'Mehrangarh Fort', distance: '14.5 km', time: '33 mins' },
    { name: 'Jodhpur Railway Station', distance: '11.7 km', time: '26 mins' },
    { name: 'Umaid Bhawan Palace', distance: '15.6 km', time: '33 mins' },
    // { name: 'Clock Tower Market', distance: '12.7 km', time: '32 mins' }
  ];
  const Copy = () => {
    toast.success('Coordinates Copied')
    navigator.clipboard.writeText(templeLocation.gpsCoordinates)
  }

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      <Toaster 
        position="bottom-center"
        reverseOrder={false}
      />
      
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
            Location & Directions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Find us in the heart of the Blue City, easily accessible from all major landmarks
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Map Container */}
            <div className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl overflow-hidden border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-orange-100/80 to-amber-100/80 dark:from-saffron/20 dark:to-gold/20  relative">
                {/* Placeholder for Google Maps */}
                
                <div className="w-full h-full relative">
                  {!mapLoaded && (
                    <div className='w-full h-full grid items-center'>
                      <div className="text-center">
                        <div className="text-6xl mb-4 text-saffron flex justify-center items-center animate-pulse">
                          <FaMap />
                        </div>
                        <p className="text-gray-800 dark:text-white font-semibold">Interactive Map</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">Loading Google Maps...</p>
                      </div>
                    </div>
                  )}
  
                  <iframe
                    title="Temple Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223.60221799336995!2d72.92808394879104!3d26.273491250976406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418f00266be169%3A0x9ca057426b5d4bec!2sHare%20Krishna%20Marwar%20Mandir%2C%20Chokha%2CChopasni%2C%20Jodhpur!5e0!3m2!1sen!2sin!4v1759394060148!5m2!1sen!2sin" 
                    width="100%"
                    height="100%"
                    allowFullScreen=""
                    loading="lazy"
                    onLoad={() => setMapLoaded(true)}
                  ></iframe>
                </div>
                
                {/* Map Controls */}
                {/* <div className="absolute top-4 right-4 space-y-2">
                  <button className="bg-white/10 dark:bg-gray-800/90 p-2 rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300">
                    <FaSearch className="text-lg text-saffron" />
                  </button>
                  <button className="bg-white/10 dark:bg-gray-800/90 p-2 rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all duration-300">
                    <FaMapPin className="text-lg text-saffron" />
                  </button>
                </div> */}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-1">Hare Krishna Marwar Mandir</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{templeLocation.landmark}</p>
                  </div>
                  <motion.button
                    className="px-4 py-2 bg-saffron-gradient text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2 outline-none"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Hare+Krishna+Marwar+Mandir,+Sector+12,+Near+Blue+City+Mall,+Jodhpur,+Rajasthan+342001,+India', '_blank')}
                  >
                    <FaDirections />
                    Open in Maps
                  </motion.button>
                </div>
              </div>
            </div>

            {/* GPS Coordinates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white/10 dark:bg-gradient-to-r dark:from-indigo-900/80 dark:to-purple-900/80 rounded-xl p-4 border border-orange-200 dark:border-gold border-opacity-60 dark:border-opacity-20 backdrop-blur-sm shadow-lg"
            >
              <h4 className="font-bold text-gold mb-2 flex items-center gap-2">
                <FaMapMarkerAlt />
                GPS Coordinates
              </h4>
              <p className="text-gray-800 dark:text-white font-mono text-lg">{templeLocation.gpsCoordinates}</p>
              <button className="text-saffron text-sm hover:text-gold transition-colors duration-300 mt-2 flex items-center gap-1 cursor-pointer outline-none" onClick={Copy}>
                <FaCopy />
                
                Copy Coordinates
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Address Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Full Address */}
            <div className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl">
              <h3 className="text-2xl font-bold text-saffron mb-6">Complete Address</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaUniversity className="text-2xl text-saffron mt-1" />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">Temple Name</div>
                    <div className="text-gray-600 dark:text-gray-300">Hare Krishna Marwar Mandir</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-2xl text-saffron mt-1" />
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">Full Address</div>
                    <div className="text-gray-600 dark:text-gray-300">{templeLocation.address}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-saffron">🏷️</span>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Pincode</div>
                      <div className="text-gray-800 dark:text-white font-semibold">{templeLocation.pincode}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaMap className="text-saffron" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">State</div>
                      <div className="text-gray-800 dark:text-white font-semibold">{templeLocation.state}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Landmarks */}
            <div className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl">
              <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-2">
                <FaMapMarkedAlt />
                Nearby Landmarks
              </h3>
              <div className="space-y-4">
                {nearbyLandmarks.map((landmark, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-3 bg-orange-100/20 dark:bg-purple-900/30 rounded-lg hover:bg-orange-200/80 dark:hover:bg-purple-900/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3">
                      <FaUniversity className="text-xl text-saffron" />
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                          {landmark.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {landmark.distance} away
                        </div>
                      </div>
                    </div>
                    <div className="text-gold font-semibold flex items-center gap-1">
                      <FaClock />
                      {landmark.time}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

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
              <FaRoute className="text-saffron" />
              <span>Easy Navigation</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gold" />
              <span>Central Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Major Landmarks</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
