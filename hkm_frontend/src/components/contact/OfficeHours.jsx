import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaClock, 
  FaBuilding, 
  FaPhone, 
  FaEnvelope, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExclamationTriangle, 
  FaFirstAid, 
  FaShieldAlt, 
  FaInfoCircle,
  FaBolt,
  FaDollarSign,
  FaCalendarAlt
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function OfficeHours() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentHour = now.getHours();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      // Office hours: Mon-Sat 9 AM - 6 PM, Sunday 10 AM - 4 PM
      let isOpen = false;
      if (currentDay === 0) { // Sunday
        isOpen = currentHour >= 10 && currentHour < 16;
      } else { // Monday to Saturday
        isOpen = currentHour >= 9 && currentHour < 18;
      }
      setIsOfficeOpen(isOpen);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const officeSchedule = [
    {
      days: 'Monday - Saturday',
      hours: '9:00 AM - 6:00 PM',
      services: ['General Inquiries', 'Donations Processing', 'Event Registration', 'Volunteer Coordination'],
      icon: <FaBuilding />,
      isWeekend: false
    },
    {
      days: 'Sunday',
      hours: '10:00 AM - 4:00 PM',
      services: ['Limited Services', 'Emergency Assistance', 'Basic Inquiries', 'Community Programs'],
      icon: <FaClock />,
      isWeekend: true
    }
  ];

  const contactDepartments = [
    {
      department: 'Administration',
      hours: 'Mon-Sat: 9 AM - 6 PM',
      contact: '+91 291 2612345',
      services: ['General queries', 'Temple information', 'Official matters'],
      available: true,
      icon: <FaBuilding />
    },
    {
      department: 'Donations & Seva',
      hours: 'Mon-Sat: 9 AM - 6 PM',
      contact: '+91 91161 39371',
      services: ['Donation receipts', 'Seva opportunities', 'Sponsorships'],
      available: true,
      icon: <FaDollarSign />
    },
    {
      department: 'Visitor Services',
      hours: 'Daily: 5 AM - 9 PM',
      contact: '+91 91161 39371',
      services: ['Accommodation booking', 'Visit planning', 'Guest assistance'],
      available: true,
      icon: <FaInfoCircle />
    },
    {
      department: 'Emergency Support',
      hours: '24/7 Available',
      contact: '+91 91161 39371',
      services: ['Medical emergency', 'Security', 'Urgent assistance'],
      available: true,
      icon: <FaExclamationTriangle />
    }
  ];

  const getDayName = (day) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
  };

  return (
    <section className="relative py-8 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
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
            Office Hours & Availability
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Our administrative team is available to assist you with inquiries, donations, and services
          </p>
        </motion.div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`mb-12 rounded-2xl p-6 border backdrop-blur-xl shadow-lg ${
            isOfficeOpen 
              ? 'bg-green-100/80 dark:bg-gradient-to-r dark:from-green-900/30 dark:to-emerald-900/30 border-green-400 dark:border-green-500 border-opacity-60 dark:border-opacity-50' 
              : 'bg-red-100/80 dark:bg-gradient-to-r dark:from-red-900/30 dark:to-orange-900/30 border-red-400 dark:border-red-500 border-opacity-60 dark:border-opacity-50'
          }`}
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-3"
            >
              {isOfficeOpen ? (
                <FaCheckCircle className="text-green-600 dark:text-green-400 mx-auto" />
              ) : (
                <FaTimesCircle className="text-red-600 dark:text-red-400 mx-auto" />
              )}
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Office is currently {isOfficeOpen ? 'OPEN Till 08:30 PM' : 'CLOSED'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg flex items-center justify-center gap-2">
              <FaCalendarAlt />
              {getDayName(currentTime.getDay())}, {currentTime.toLocaleTimeString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            {!isOfficeOpen && (
              <p className="text-yellow-600 dark:text-yellow-300 mt-2">
                {currentTime.getDay() === 0 
                  ? 'Opens tomorrow at 9:00 AM' 
                  : currentTime.getHours() < 9 
                    ? `Opens today at ${currentTime.getDay() === 0 ? '10:00 AM' : '9:00 AM'}`
                    : 'Opens tomorrow at 9:00 AM'
                }
              </p>
            )}
          </div>
        </motion.div>

        {/* Office Schedule */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {officeSchedule.map((schedule, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 border backdrop-blur-xl transition-all duration-300 group shadow-xl ${
                schedule.isWeekend 
                  ? 'bg-orange-100/20 dark:bg-gradient-to-br dark:from-orange-900/30 dark:to-red-900/30 border-orange-400 dark:border-orange-500 border-opacity-60 dark:border-opacity-30 hover:border-orange-500 hover:border-opacity-80 dark:hover:border-opacity-50' 
                  : 'bg-gradient-to-br from-saffron/20 to-gold/20 dark:from-saffron/20 dark:to-gold/20 border-saffron border-opacity-60 dark:border-opacity-50 hover:border-opacity-80 dark:hover:border-opacity-70'
              }`}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 text-saffron">{schedule.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{schedule.days}</h3>
                <div className="text-3xl font-bold text-saffron flex items-center justify-center gap-2">
                  <FaClock />
                  {schedule.hours}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gold mb-4">Available Services:</h4>
                <ul className="space-y-2">
                  {schedule.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-center space-x-2">
                      <FaInfoCircle className="text-saffron" />
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Department Contacts */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Department-wise Contact Hours</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {contactDepartments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-saffron/20 transition-all duration-300 group shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl text-saffron">{dept.icon}</div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                        {dept.department}
                      </h4>
                      <p className="text-gold text-sm font-semibold flex items-center gap-1">
                        <FaClock />
                        {dept.hours}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 flex items-center gap-1">
                        <FaPhone />
                        {dept.contact}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                    dept.available 
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' 
                      : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
                  }`}>
                    {dept.available ? <FaCheckCircle /> : <FaTimesCircle />}
                    {dept.available ? 'Available' : 'Closed'}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-saffron mb-2">Services:</h5>
                  <ul className="space-y-1">
                    {dept.services.map((service, serviceIndex) => (
                      <li key={serviceIndex} className="flex items-center space-x-2">
                        <FaInfoCircle className="text-gold text-xs" />
                        <span className="text-gray-700 dark:text-gray-300 text-xs">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Important Notes */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Important Information</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-saffron mb-4 flex items-center gap-2">
                <FaPhone />
                For Immediate Assistance:
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <FaExclamationTriangle className="text-red-600" />
                  <span>Emergency: +91 91161 39371
 (24/7)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaFirstAid className="text-green-600" />
                  <span>Medical Help: Temple First Aid</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaShieldAlt className="text-blue-600" />
                  <span>Security: On-site security team</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-saffron mb-4 flex items-center gap-2">
                <FaEnvelope />
                Email Response Times:
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-2">
                  <FaBolt className="text-yellow-600" />
                  <span>General Inquiries: Within 24 hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaDollarSign className="text-green-600" />
                  <span>Donations: Within 12 hours</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-purple-600">🎪</span>
                  <span>Events: Within 48 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div> */}

        {/* Additional Info */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaClock className="text-saffron" />
              <span>Real-time Status</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gold" />
              <span>Always Reachable</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Dedicated Support</span>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
