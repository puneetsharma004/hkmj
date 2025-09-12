import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaEdit, 
  FaPenFancy, 
  FaClipboardList, 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaTools, 
  FaGraduationCap, 
  FaHeart, 
  FaShieldAlt, 
  FaSpinner, 
  FaArrowRight, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaHandsHelping, 
  FaUserPlus, 
  FaInfoCircle,
  FaLightbulb
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function VolunteerRegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    serviceArea: '',
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    timeSlots: [],
    skills: '',
    experience: '',
    emergencyContact: '',
    emergencyPhone: '',
    motivation: '',
    guidelines: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const serviceAreas = [
    { value: '', label: 'Select Service Area' },
    { value: 'temple-maintenance', label: 'Temple Maintenance & Decoration' },
    { value: 'festival-coordination', label: 'Festival Coordination & Events' },
    { value: 'prasadam-service', label: 'Prasadam Cooking & Distribution' },
    { value: 'cultural-programs', label: 'Cultural Programs & Performance' },
    { value: 'education-support', label: 'Educational Support & Teaching' },
    { value: 'media-outreach', label: 'Media & Digital Outreach' },
    { value: 'administrative', label: 'Administrative Support' },
    { value: 'youth-programs', label: 'Youth Programs & Mentoring' },
    { value: 'flexible', label: 'Flexible - Available for Various Roles' }
  ];

  const timeSlots = [
    'Early Morning (5 AM - 8 AM)',
    'Morning (8 AM - 12 PM)',
    'Afternoon (12 PM - 4 PM)',
    'Evening (4 PM - 8 PM)',
    'Night (8 PM - 10 PM)'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('availability.')) {
      const day = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        availability: {
          ...prev.availability,
          [day]: checked
        }
      }));
    } else if (name === 'timeSlots') {
      setFormData(prev => ({
        ...prev,
        timeSlots: checked 
          ? [...prev.timeSlots, value]
          : prev.timeSlots.filter(slot => slot !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        serviceArea: '',
        availability: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false
        },
        timeSlots: [],
        skills: '',
        experience: '',
        emergencyContact: '',
        emergencyPhone: '',
        motivation: '',
        guidelines: false
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Light/Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      {/* Animated Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-15 blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-1500"></div>
      </div>

      {/* Spiritual Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-5">
        <div className="absolute top-16 left-16 text-5xl text-saffron animate-pulse delay-400">
          <FaEdit />
        </div>
        <div className="absolute top-32 right-20 text-4xl text-gold animate-pulse delay-900">
          <FaPenFancy />
        </div>
        <div className="absolute bottom-32 left-20 text-6xl text-saffron animate-pulse delay-1300">
          <FaClipboardList />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
            <span className="mx-4 text-4xl text-saffron animate-pulse">
              <FaEdit />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Volunteer Registration
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Join our spiritual family and begin your journey of seva. Fill out this form to get started
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/95 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl"
        >
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-green-100/80 dark:bg-green-900/50 border border-green-400 dark:border-green-500 border-opacity-60 dark:border-opacity-50 rounded-lg text-center shadow-lg"
            >
              <div className="text-5xl mb-3">🙏</div>
              <h3 className="text-green-800 dark:text-green-300 font-bold text-xl mb-2">Welcome to Our Volunteer Family!</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Thank you for registering! We'll contact you within 48 hours with next steps and orientation details.
              </p>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-red-100/80 dark:bg-red-900/50 border border-red-400 dark:border-red-500 border-opacity-60 dark:border-opacity-50 rounded-lg text-center shadow-lg"
            >
              <div className="text-4xl mb-2">❌</div>
              <h3 className="text-red-800 dark:text-red-300 font-bold mb-2">Registration Failed</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Please try again or contact us directly at volunteer@Marwarmandir.org
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-bold text-saffron mb-6 flex items-center gap-2">
                <FaUser />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                    placeholder="Your age"
                    min="14"
                    max="100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <FaPhone />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <FaEnvelope />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                  <FaMapMarkerAlt />
                  Address (Optional)
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                  placeholder="Your full address"
                />
              </div>
            </div>

            {/* Service Preferences */}
            <div>
              <h3 className="text-xl font-bold text-saffron mb-6 flex items-center gap-2">
                <FaHandsHelping />
                Service Preferences
              </h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Service Area *
                </label>
                <select
                  name="serviceArea"
                  value={formData.serviceArea}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                  required
                >
                  {serviceAreas.map((area, index) => (
                    <option key={index} value={area.value} className="bg-white dark:bg-gray-800">
                      {area.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                  <FaCalendarAlt />
                  Days Available *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.keys(formData.availability).map((day) => (
                    <label key={day} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name={`availability.${day}`}
                        checked={formData.availability[day]}
                        onChange={handleInputChange}
                        className="text-saffron focus:ring-saffron"
                      />
                      <span className="text-gray-700 dark:text-gray-300 capitalize">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-1">
                  <FaClock />
                  Preferred Time Slots
                </label>
                <div className="space-y-2">
                  {timeSlots.map((slot, index) => (
                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="timeSlots"
                        value={slot}
                        checked={formData.timeSlots.includes(slot)}
                        onChange={handleInputChange}
                        className="text-saffron focus:ring-saffron"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Experience */}
            <div>
              <h3 className="text-xl font-bold text-saffron mb-6 flex items-center gap-2">
                <FaTools />
                Skills & Experience
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills & Talents
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                    placeholder="Cooking, event management, teaching, music, art, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                    <FaGraduationCap />
                    Previous Volunteer Experience
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                    placeholder="Previous volunteer work, community service, etc."
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="text-xl font-bold text-saffron mb-6 flex items-center gap-2">
                <FaExclamationTriangle />
                Emergency Contact
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                    placeholder="Full name of emergency contact"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Emergency Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                <FaHeart />
                Why do you want to volunteer with us?
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/90 dark:bg-gray-800/50 border border-orange-200 dark:border-gray-600 border-opacity-60 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg"
                placeholder="Share your motivation for volunteering and how you hope to contribute..."
              />
            </div>

            {/* Agreement */}
            <div className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-saffron/10 dark:to-gold/10 rounded-lg p-6 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="guidelines"
                  checked={formData.guidelines}
                  onChange={handleInputChange}
                  className="mt-1 text-saffron focus:ring-saffron"
                  required
                />
                <div>
                  <span className="text-gray-800 dark:text-white font-semibold flex items-center gap-2">
                    <FaShieldAlt />
                    I agree to follow temple guidelines and volunteer code of conduct *
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    This includes maintaining respectful behavior, following safety protocols, 
                    and upholding the spiritual values of our temple community.
                  </p>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`px-12 py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-saffron-gradient text-white hover:shadow-lg hover:shadow-saffron/30 hover:scale-105'
                }`}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <FaSpinner className="animate-spin" />
                    <span>Submitting Registration...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <span>🙏</span>
                    <span>Join as a Volunteer</span>
                    <FaArrowRight />
                  </div>
                )}
              </motion.button>

              <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                By submitting this form, you're taking the first step towards meaningful seva and spiritual growth
              </p>
            </div>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <FaUserPlus className="text-saffron" />
              <span>Easy Registration</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaInfoCircle className="text-gold" />
              <span>Quick Response</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Sacred Journey</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
