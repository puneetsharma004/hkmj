import { motion } from 'framer-motion';
import { 
  FaHotel, 
  FaBed, 
  FaHome, 
  FaStar, 
  FaPhone, 
  FaInfoCircle, 
  FaClock, 
  FaCheck, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaRupeeSign,
  FaShieldAlt,
  FaWifi,
  FaCar,
  FaUtensils,
  FaSwimmer,
  FaSpa,
  FaConciergeBell
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function Accommodation() {
  const templeAccommodation = [
    {
      type: 'Guest Rooms',
      capacity: '2-4 people per room',
      description: 'Separate Rooms inside the Temple premises for Families/Individuals',
      amenities: ['Attached bathroom', 'AC/Fan options', 'Basic furniture', 'Clean bedding'],
      availability: 'Subject to availability',
      booking: 'Advance booking required',
      icon: <FaHome />
    },
    {
      type: 'Dormitory',
      capacity: '8-12 people',
      description: 'Bunk Beds Best for Single/Group of Young Individuals, Students',
      amenities: ['Shared bathrooms', 'Lockers provided', 'Common area', 'Basic facilities'],
      availability: 'Usually available',
      booking: 'Walk-in or advance booking',
      icon: <FaBed />
    }
  ];

  // const nearbyHotels = [
  //   {
  //     name: 'Hotel Shanti Palace',
  //     category: 'Budget',
  //     distance: '2 km',
  //     price: '₹1,200-2,000/night',
  //     rating: '4.2',
  //     amenities: ['Free WiFi', 'Restaurant', 'Room service', 'Parking'],
  //     contact: '+91 291 XXXXXX'
  //   },
  //   {
  //     name: 'Rajputana Heritage',
  //     category: 'Mid-Range',
  //     distance: '3 km',
  //     price: '₹2,500-4,000/night',
  //     rating: '4.5',
  //     amenities: ['Pool', 'Spa', 'Multi-cuisine restaurant', 'Travel desk'],
  //     contact: '+91 291 XXXXXX'
  //   },
  //   {
  //     name: 'Blue City Boutique',
  //     category: 'Luxury',
  //     distance: '4 km',
  //     price: '₹5,000-8,000/night',
  //     rating: '4.8',
  //     amenities: ['Heritage property', 'Fine dining', 'Concierge', 'Airport transfer'],
  //     contact: '+91 291 XXXXXX'
  //   }
  // ];

  const accommodationGuidelines = [
    'Check-in: 12:00 PM | Check-out: 11:00 AM',
    'Valid ID proof required for all guests',
    'No smoking or alcohol in temple premises',
    'Maintain silence after 10:00 PM',
    'Participate in morning aarti (optional but encouraged)',
    'Meals available at temple kitchen (donation basis)'
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
            Accommodation Options
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Stay close to the divine with our temple guest facilities or nearby comfortable hotels
          </p>
        </motion.div>

        {/* Temple Accommodation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Temple Guest Accommodation</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {templeAccommodation.map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-saffron/20 to-gold/20 dark:from-saffron/20 dark:to-gold/20 rounded-2xl p-8 border border-saffron/60 dark:border-saffron/50 border-opacity-80 dark:border-opacity-100 backdrop-blur-xl hover:border-opacity-90 dark:hover:border-opacity-70 transition-all duration-300 group shadow-xl"
              >
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 text-saffron flex justify-center items-center">{room.icon}</div>
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{room.type}</h4>
                  <div className="text-lg font-bold text-saffron flex items-center justify-center gap-2">
                    {room.description}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2 mt-2">
                    <FaUsers />
                    {room.capacity}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gold mb-2">Amenities:</h5>
                    <ul className="space-y-1">
                      {room.amenities.map((amenity, amenityIndex) => (
                        <li key={amenityIndex} className="flex items-center space-x-2">
                          <FaCheck className="text-saffron" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Availability:</span>
                      <div className="text-gray-800 dark:text-white font-semibold">{room.availability}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Booking:</span>
                      <div className="text-gray-800 dark:text-white font-semibold">{room.booking}</div>
                    </div>
                  </div>

                  <motion.button
                    className="w-full bg-saffron-gradient text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guidelines */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 bg-white/10 dark:bg-gradient-to-r dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-orange-200 dark:border-purple-500 border-opacity-60 dark:border-opacity-30 shadow-lg"
          >
            <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-saffron" />
              Guest Guidelines:
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {accommodationGuidelines.map((guideline, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <FaInfoCircle className="text-saffron" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{guideline}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Nearby Hotels */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Nearby Hotels & Guest Houses</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {nearbyHotels.map((hotel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-xl"
              >
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-saffron transition-colors duration-300">
                    {hotel.name}
                  </h4>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      hotel.category === 'Budget' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
                      hotel.category === 'Mid-Range' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300' :
                      'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300'
                    }`}>
                      {hotel.category}
                    </span>
                    <span className="text-gold font-semibold flex items-center gap-1">
                      <FaStar />
                      {hotel.rating}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-saffron mb-1 flex items-center justify-center gap-1">
                    <FaRupeeSign className="text-xl" />
                    {hotel.price.replace('₹', '')}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
                    <FaMapMarkerAlt />
                    {hotel.distance} from temple
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gold mb-2">Amenities:</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {hotel.amenities.map((amenity, amenityIndex) => {
                        // Map amenities to appropriate icons
                        const getAmenityIcon = (amenity) => {
                          if (amenity.includes('WiFi')) return <FaWifi className="text-xs" />;
                          if (amenity.includes('Restaurant') || amenity.includes('dining')) return <FaUtensils className="text-xs" />;
                          if (amenity.includes('Parking')) return <FaCar className="text-xs" />;
                          if (amenity.includes('Pool')) return <FaSwimmer className="text-xs" />;
                          if (amenity.includes('Spa')) return <FaSpa className="text-xs" />;
                          if (amenity.includes('Concierge')) return <FaConciergeBell className="text-xs" />;
                          return <FaCheck className="text-xs" />;
                        };

                        return (
                          <div key={amenityIndex} className="text-xs bg-orange-100/20 dark:bg-purple-900/30 px-2 py-1 rounded text-gray-700 dark:text-gray-300 text-center flex items-center justify-center gap-1">
                            {getAmenityIcon(amenity)}
                            {amenity}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center justify-center gap-2">
                      <FaPhone />
                      Contact: {hotel.contact}
                    </p>
                    <motion.button
                      className="w-full border border-saffron text-saffron font-semibold py-2 rounded-lg hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

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
              <FaHome className="text-saffron" />
              <span>Temple Stay</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gold" />
              <span>Nearby Options</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>All Budgets</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
