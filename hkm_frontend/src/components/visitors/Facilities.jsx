import { motion } from 'framer-motion';
import { 
  FaBuilding, 
  FaCog, 
  FaTools, 
  FaShoePrints, 
  FaTint, 
  FaUtensils, 
  FaCar, 
  FaRestroom, 
  FaBook, 
  FaFirstAid, 
  FaWifi, 
  FaWheelchair, 
  FaPhone, 
  FaCheckCircle, 
  FaTimesCircle,
  FaInfoCircle,
  FaUsers,
  FaCamera,
  FaCalendarAlt,
  FaParking,
  FaShieldAlt
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { RiWheelchairFill } from "react-icons/ri";
import { PiBabyCarriageFill } from "react-icons/pi";
import { MdElderly } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
export default function Facilities() {
  const facilities = [
    {
      name: 'Shoe Storage',
      description: 'Secure and organized shoe storage facility at the entrance',
      icon: <FaShoePrints />,
      details: ['Free of charge', 'Numbered tokens provided', 'Attended storage', 'Open during temple hours'],
      available: true
    },
    {
      name: 'Drinking Water',
      description: 'Clean and filtered drinking water stations throughout the premises',
      icon: <FaTint />,
      details: ['RO filtered water', 'Multiple stations', 'Bottles for sale', 'Free water dispensers'],
      available: true
    },
    {
      name: 'Free Prasadam Counter',
      description: 'Distribution of blessed food offerings after aarti ceremonies',
      icon: <FaUtensils />,
      details: ['After each aarti', 'Vegetarian only', 'Served with love', 'Special feast on Sundays'],
      available: true
    },
    {
      name: 'Parking Facilities',
      description: 'Ample parking space for cars, motorcycles, and bicycles',
      icon: <FaParking />,
      details: ['Free parking', 'Security available', 'Separate areas for different vehicles', '24/7 access'],
      available: true
    },
    {
      name: 'Restrooms',
      description: 'Clean and well-maintained washroom facilities for visitors',
      icon: <FaRestroom />,
      details: ['Separate for men/women', 'Wheelchair accessible', 'Baby changing area', 'Regular cleaning'],
      available: true
    },
    {
      name: 'Book Store',
      description: 'Spiritual books, audio CDs, and religious items available',
      icon: <FaBook />,
      details: ['Bhagavad Gita in multiple languages', 'Audio lectures', 'Prayer beads', 'Spiritual accessories'],
      available: true
    },
    {
      name: 'First Aid',
      description: 'Basic medical assistance and emergency care available',
      icon: <FaFirstAid />,
      details: ['Trained volunteers', 'Basic medicines', 'Emergency contact numbers', 'Doctor on call'],
      available: true
    },
    {
      name: 'WiFi Access',
      description: 'Free wireless internet access in common areas',
      icon: <FaWifi />,
      details: ['Temple_WiFi network', 'Password available at reception', 'Good coverage', 'Fair usage policy'],
      available: true
    }
  ];

  const accessibilityFeatures = [
    {
      feature: 'Wheelchair Access',
      description: 'Ramps and wide pathways for wheelchair users',
      icon: <RiWheelchairFill />,
      locations: ['Main entrance', 'Prayer halls', 'Restrooms', 'Dining area']
    },
    {
      feature: 'Senior Citizen Support',
      description: 'Special seating and assistance for elderly visitors',
      icon: <MdElderly />,
      locations: ['Reserved seating in prayer hall', 'Walking support available', 'Priority prasadam service']
    },
    {
      feature: 'Baby Care',
      description: 'Facilities for families with young children',
      icon: <PiBabyCarriageFill />,
      locations: ['Baby changing stations', 'High chairs available', 'Quiet feeding area']
    }
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
            Temple Facilities
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Modern amenities and traditional hospitality for a comfortable temple experience
          </p>
        </motion.div>

        {/* Main Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-xl"
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3 text-saffron group-hover:scale-110 transition-transform duration-300 flex justify-center items-center">
                  {facility.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                  {facility.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                  {facility.description}
                </p>
              </div>

              <div className="space-y-2">
                {facility.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex items-center space-x-2">
                    <FaInfoCircle className="text-gold text-xs" />
                    <span className="text-gray-600 dark:text-gray-400 text-xs">{detail}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold gap-1 ${
                  facility.available 
                    ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' 
                    : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
                }`}>
                  {facility.available ? <FaCheckCircle /> : <FaTimesCircle />}
                  {facility.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-gradient-to-r dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl p-8 border border-orange-200 dark:border-purple-500 border-opacity-60 dark:border-opacity-30 backdrop-blur-sm shadow-xl"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Additional Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { service: 'Guided Tours', availability: 'On request', icon: <IoPersonSharp /> },
              { service: 'Group Bookings', availability: 'Advance notice', icon: <FaUsers /> },
              { service: 'Photography Permission', availability: 'Prior approval', icon: <FaCamera /> },
              { service: 'Event Hosting', availability: 'Based on calendar', icon: <FaCalendarAlt /> }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 bg-orange-100/20 dark:bg-gray-900/80 rounded-xl shadow-lg"
              >
                <div className="text-3xl mb-2 text-saffron flex justify-center">{service.icon}</div>
                <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{service.service}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{service.availability}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <motion.button
              className="px-6 py-3 bg-saffron-gradient text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPhone />
              Contact for Special Services
            </motion.button>
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
              <FaShieldAlt className="text-saffron" />
              <span>Secure Facilities</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaWheelchair className="text-gold" />
              <span>Accessible</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Modern Amenities</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
