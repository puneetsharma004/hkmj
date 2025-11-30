import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  FaCalendarAlt, 
  FaCalendar, 
  FaClipboardList, 
  FaTheaterMasks, 
  FaGift, 
  FaMusic, 
  FaBook, 
  FaUtensils, 
  FaHandshake, 
  FaClock, 
  FaMapMarkerAlt, 
  FaChartBar,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaUserPlus,
  FaStar,
  FaArrowDown
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import VaishnavaCalendar from './VaishnavaCalendar';

export default function EventsCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [events, setEvents] = useState([]);


  const eventTypes = [
    { id: 'all', name: 'All Events', color: 'saffron', icon: <FaTheaterMasks /> },
    { id: 'festivals', name: 'Festivals', color: 'gold', icon: <FaGift /> },
    { id: 'kirtans', name: 'Kirtans', color: 'purple-500', icon: <FaMusic /> },
    { id: 'lectures', name: 'Lectures', color: 'blue-500', icon: <FaBook /> },
    { id: 'prasadam', name: 'Prasadam', color: 'green-500', icon: <FaUtensils /> },
    { id: 'seva', name: 'Community Service', color: 'orange-500', icon: <FaHandshake /> }
  ];

    // Fetch events dynamically from Supabase
    useEffect(() => {
      const fetchEvents = async () => {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });
  
        if (error) {
          console.error('Error fetching events:', error);
        } else {
          setEvents(data || []);
        }
      };

      fetchEvents();
    }, []);

  // const events = [
  //   {
  //     id: 1,
  //     title: 'Janmashtami Celebration',
  //     date: '2024-09-06',
  //     time: '6:00 PM',
  //     type: 'festivals',
  //     description: 'Grand celebration of Lord Krishna\'s birth',
  //     location: 'Main Temple Hall',
  //     registration: true,
  //     featured: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Weekly Bhagavad Gita Class',
  //     date: '2024-09-08',
  //     time: '7:00 PM',
  //     type: 'lectures',
  //     description: 'Deep dive into Krishna\'s teachings',
  //     location: 'Study Hall',
  //     registration: false,
  //     featured: false
  //   },
  //   {
  //     id: 3,
  //     title: 'Radhashtami Festival',
  //     date: '2024-09-15',
  //     time: '5:00 AM',
  //     type: 'festivals',
  //     description: 'Celebration of Radha Rani\'s appearance',
  //     location: 'Temple Complex',
  //     registration: true,
  //     featured: true
  //   },
  //   {
  //     id: 4,
  //     title: 'Community Kirtan',
  //     date: '2024-09-20',
  //     time: '7:30 PM',
  //     type: 'kirtans',
  //     description: 'Devotional singing and dancing',
  //     location: 'Main Hall',
  //     registration: false,
  //     featured: false
  //   },
  //   {
  //     id: 5,
  //     title: 'Sunday Feast',
  //     date: '2024-09-22',
  //     time: '1:00 PM',
  //     type: 'prasadam',
  //     description: 'Free prasadam distribution',
  //     location: 'Community Kitchen',
  //     registration: false,
  //     featured: false
  //   },
  //   {
  //     id: 6,
  //     title: 'Temple Cleaning Seva',
  //     date: '2024-09-25',
  //     time: '8:00 AM',
  //     type: 'seva',
  //     description: 'Volunteer temple maintenance',
  //     location: 'Temple Premises',
  //     registration: true,
  //     featured: false
  //   }
  // ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredEvents = events.filter(event => 
    selectedFilter === 'all' || event.type === selectedFilter
  );

  const getEventTypeColor = (type) => {
    const eventType = eventTypes.find(t => t.id === type);
    return eventType ? eventType.color : 'gray-500';
  };

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
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
            <span className="mx-4 text-4xl text-saffron animate-pulse">
              <FaCalendarAlt />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Events Calendar
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Stay updated with all our spiritual celebrations, community programs, and special events
          </p>
        </motion.div> */}

        <VaishnavaCalendar/>

        {/* Filter Tabs */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {eventTypes.map((type, index) => (
              <motion.button
                key={type.id}
                onClick={() => setSelectedFilter(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg outline-none ${
                  selectedFilter === type.id
                    ? 'bg-saffron-gradient text-white'
                    : 'bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 text-gray-700 dark:text-gray-300 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={` ${selectedFilter === type.id ? 'text-white' : 'text-saffron'}`}>{type.icon}</span>
                <span>{type.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div> */}

        {/* Calendar Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl mb-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">September 2024</h3>
            <div className="flex space-x-2">
              <motion.button
                className="p-2 rounded-lg bg-saffron/20 text-saffron hover:bg-saffron hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronLeft />
              </motion.button>
              <motion.button
                className="p-2 rounded-lg bg-saffron/20 text-saffron hover:bg-saffron hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaChevronRight />
              </motion.button>
            </div>
          </div>

          <div className="text-center text-gray-600 dark:text-gray-300 text-sm">
            <span className="inline-flex items-center space-x-2">
              <FaChartBar />
              <span>{filteredEvents.length} events this month</span>
            </span>
          </div>
        </motion.div> */}

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              className={`rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 group ${
                event.featured 
                  ? 'bg-gradient-to-r from-saffron/20 to-gold/20 dark:from-saffron/20 dark:to-gold/20 border-2 border-saffron border-opacity-80 shadow-saffron/30' 
                  : 'bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50'
              } backdrop-blur-xl`}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 bg-saffron-gradient text-white p-3 rounded-xl text-center min-w-[80px] shadow-lg">
                      <div className="font-bold text-lg">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`text-xl font-bold transition-colors duration-300 ${
                          event.featured ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-white group-hover:text-saffron'
                        }`}>
                          {event.title}
                        </h3>
                        {event.featured && (
                          <span className="bg-saffron text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <FaStar />
                            FEATURED
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <FaClock />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaMapMarkerAlt />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className={`w-2 h-2 rounded-full bg-${getEventTypeColor(event.type)}`}></span>
                          <span className="capitalize">{event.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium text-sm hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEye />
                      View Details
                    </motion.button>
                    
                    {event.registration && (
                      <motion.button
                        className="px-4 py-2 bg-saffron-gradient text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaUserPlus />
                        Register Now
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Events */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowDown />
            Load More Events
          </motion.button>
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
              <FaCalendarAlt className="text-saffron" />
              <span>Monthly View</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaStar className="text-gold" />
              <span>Featured Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Live Updates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
