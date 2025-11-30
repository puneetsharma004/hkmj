import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaFileAlt, 
  FaPrayingHands, 
  FaTimes,
  FaCreditCard, 
  FaUniversity, 
  FaUtensils, 
  FaGift, 
  FaTools, 
  FaBook,
  FaGlobe,
  FaUniversalAccess,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaRupeeSign,
  FaCalendarCheck,
  FaReceipt,
  FaArrowLeft,
  FaArrowRight,
  FaPray,
  FaHeart,
  FaMapMarkerAlt,
  FaAddressCard
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function DonationForm() {
  const [formData, setFormData] = useState({
    // Step 1 - Personal Details
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    address: '',
    pincode: '',
    anonymous: false,
    
    // Step 2 - Donation Details
    amount: '',
    customAmount: '',
    purpose: '',
    recurring: false,
    
    // Step 3 - Payment (will be handled automatically)
    paymentMethod: 'online',
    receipt: true
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  // ✅ ADD THIS NEW STATE FOR CONFIRMATION MODAL
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const donationPurposes = [
    { id: 'general', name: 'General Temple Operations', icon: <FaUniversity /> },
    { id: 'gau-seva', name: 'Gau Seva (Cow Protection)', icon: <FaHeart /> },
    { id: 'anna-daan', name: 'Anna Daan (Food Distribution)', icon: <FaUtensils /> },
    { id: 'festival', name: 'Festival Sponsorship', icon: <FaGift /> },
    { id: 'construction', name: 'Temple Construction', icon: <FaTools /> },
    { id: 'education', name: 'Education & Outreach', icon: <FaBook /> }
  ];

  const suggestedAmounts = [500, 1000, 2500, 5000, 10000, 25000];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // ✅ ADD THIS NEW FUNCTION HERE
  const validateMobileNumber = (mobile) => {
    // Remove any spaces, dashes, or special characters
    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    
    // Should be exactly 10 digits, no leading zero for Indian mobile numbers
    if (cleanMobile.length === 11 && cleanMobile.startsWith('0')) {
      return cleanMobile.substring(1); // Remove leading 0
    }
    
    if (cleanMobile.length === 10 && /^[6-9]/.test(cleanMobile)) {
      return cleanMobile;
    }
    
    throw new Error('Please enter a valid 10-digit mobile number starting with 6-9');
  };

  // ✅ REPLACE YOUR EXISTING validateStep1 FUNCTION WITH THIS
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // ✅ UPDATED PHONE VALIDATION
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      try {
        validateMobileNumber(formData.phone);
      } catch (error) {
        newErrors.phone = error.message;
      }
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const validateStep2 = () => {
    const newErrors = {};
    
    const donationAmount = formData.customAmount || formData.amount;
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      newErrors.amount = 'Please select or enter a valid donation amount';
    } else if (parseFloat(donationAmount) < 10) {
      newErrors.amount = 'Minimum donation amount is ₹10';
    }
    
    if (!formData.purpose) {
      newErrors.purpose = 'Please select a donation purpose';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ REPLACE YOUR EXISTING handleNext FUNCTION WITH THIS
  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      // ✅ SHOW CONFIRMATION MODAL INSTEAD OF DIRECT REDIRECT
      setShowConfirmModal(true);
    }
  };

  // ✅ ADD THESE NEW FUNCTIONS
  const handleConfirmPayment = () => {
    setShowConfirmModal(false);
    setStep(3);
    // Automatically submit after user confirms
    setTimeout(() => {
      document.getElementById('donation-form').requestSubmit();
    }, 100);
  };

  const handleCancelPayment = () => {
    setShowConfirmModal(false);
    // User stays on step 2
  };


  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const generateReferenceNo = () => {
    return 'TXN' + Date.now() + Math.floor(Math.random() * 1000);
  };

  // ✅ REPLACE YOUR EXISTING handleSubmit FUNCTION WITH THIS
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const donationAmount = formData.customAmount || formData.amount;
      const referenceNo = generateReferenceNo();
      
      // ✅ VALIDATE AND FORMAT MOBILE NUMBER
      let validatedMobile;
      try {
        validatedMobile = validateMobileNumber(formData.phone);
      } catch (error) {
        setErrors(prev => ({ ...prev, phone: error.message }));
        return; // Stop submission if phone is invalid
      }

      const paymentData = {
        referenceNo,
        submerchantId: '45',
        transactionAmount: donationAmount,
        customerName: formData.anonymous ? 'Anonymous Donor' : formData.name,
        mobileNumber: validatedMobile, // ✅ USE VALIDATED MOBILE NUMBER
        emailId: formData.email,
        city: formData.city,
        state: formData.state,
        address: formData.address,
        pincode: formData.pincode,
        paymode: '9',
        returnUrl: `${window.location.origin}/thank-you`
      };

      // ✅ STORE DONATION DATA FOR THANK-YOU PAGE
      localStorage.setItem('donationData', JSON.stringify({
        donorName: paymentData.customerName,
        email: paymentData.emailId,
        purpose: formData.purpose
      }));

      // Send data to backend
      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();

      if (result.success && result.paymentUrl) {
        // Redirect to Payment Gateway
        window.location.href = result.paymentUrl;
      } else {
        alert('Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Failed to connect to payment server. Please try again.');
    }
  };



  // ✅ REPLACE YOUR EXISTING isStep1Valid FUNCTION WITH THIS
  const isStep1Valid = () => {
    try {
      return formData.name.trim() && 
            formData.email.trim() && 
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
            formData.phone.trim() && 
            validateMobileNumber(formData.phone) && // ✅ UPDATED PHONE CHECK
            formData.city.trim() && 
            formData.state.trim() && 
            formData.address.trim() && 
            /^\d{6}$/.test(formData.pincode);
    } catch (error) {
      return false; // Return false if phone validation fails
    }
  };


  const isStep2Valid = () => {
    const donationAmount = formData.customAmount || formData.amount;
    return donationAmount && 
           parseFloat(donationAmount) >= 10 && 
           formData.purpose;
  };

  return (
    <section id="donation-form" className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
      {/* Background elements remain the same */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
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
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Make Your Donation
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Complete this simple form to contribute to our spiritual mission
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-lg ${
                  step >= stepNumber 
                    ? 'bg-saffron text-white' 
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    step > stepNumber ? 'bg-saffron' : 'bg-gray-300 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-16 text-sm text-gray-600 dark:text-gray-400">
            <span className={step >= 1 ? 'text-saffron font-medium' : ''}>Details</span>
            <span className={step >= 2 ? 'text-saffron font-medium' : ''}>Amount</span>
            <span className={step >= 3 ? 'text-saffron font-medium' : ''}>Payment</span>
          </div>
        </motion.div>

        {/* Donation Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-2xl"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
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
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-800/50 border rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-800/50 border rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 ${
                        errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <div className="flex">
                      {/* Fixed country code display */}
                      <div className="inline-flex items-center px-3 py-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg text-gray-700 dark:text-gray-300 font-medium">
                        +91
                      </div>
                      {/* 10-digit phone input */}
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          // Only allow numbers, max 10 digits
                          const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                          setFormData(prev => ({ ...prev, phone: value }));
                          // Clear error when user starts typing
                          if (errors.phone) {
                            setErrors(prev => ({ ...prev, phone: '' }));
                          }
                        }}
                        className={`flex-1 px-4 py-3 bg-white dark:bg-gray-800/50 border border-l-0 rounded-r-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="91161 39371
"
                        maxLength="10"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-800/50 border rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 ${
                        errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Enter your city"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-800/50 border rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 ${
                        errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Enter your state"
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white dark:bg-gray-800/50 border rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 ${
                        errors.pincode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="123456"
                      maxLength="6"
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-800/50 border rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 ${
                      errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Enter your complete address"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleInputChange}
                      className="mr-2 text-saffron focus:ring-saffron rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Make this an anonymous donation</span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Step 2: Amount and Purpose */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <FaRupeeSign />
                  Donation Details
                </h3>
                
                {/* Suggested Amounts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Select Amount *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                    {suggestedAmounts.map((amount) => (
                      <motion.button
                        key={amount}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString(), customAmount: '' }))}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 shadow-lg ${
                          formData.amount === amount.toString()
                            ? 'bg-saffron text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ₹{amount.toLocaleString()}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Custom Amount */}
                  <input
                    type="number"
                    name="customAmount"
                    value={formData.customAmount}
                    onChange={(e) => {
                      handleInputChange(e);
                      if (e.target.value) {
                        setFormData(prev => ({ ...prev, amount: '' }));
                      }
                    }}
                    className={`w-full px-4 py-3 bg-white dark:bg-gray-800/50 border rounded-lg text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 ${
                      errors.amount ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Or enter custom amount (₹)"
                    min="10"
                  />
                  {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                </div>

                {/* Purpose Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Donation Purpose *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {donationPurposes.map((purpose) => (
                      <motion.label
                        key={purpose.id}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 shadow-lg ${
                          formData.purpose === purpose.id
                            ? 'bg-gradient-to-r from-saffron/20 to-gold/20 dark:from-saffron/20 dark:to-gold/20 border-2 border-saffron'
                            : 'bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <input
                          type="radio"
                          name="purpose"
                          value={purpose.id}
                          checked={formData.purpose === purpose.id}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="text-2xl mr-3 text-saffron">{purpose.icon}</span>
                        <span className="text-gray-800 dark:text-white font-medium">{purpose.name}</span>
                      </motion.label>
                    ))}
                  </div>
                  {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
                </div>

                {/* Recurring Donation */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="recurring"
                      checked={formData.recurring}
                      onChange={handleInputChange}
                      className="mr-2 text-saffron focus:ring-saffron rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <FaCalendarCheck />
                      Make this a monthly recurring donation
                    </span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment Confirmation */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <FaCreditCard />
                  Payment Confirmation
                </h3>
                
                {/* Payment Options */}
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { id: 'online', name: 'Online Payment', icon: <FaCreditCard />, desc: 'Cards, UPI, Net Banking' },
                    { id: 'bank', name: 'Bank Transfer', icon: <FaUniversalAccess />, desc: 'NEFT, RTGS, IMPS' },
                    { id: 'international', name: 'International', icon: <FaGlobe />, desc: 'PayPal, Wire Transfer' }
                  ].map((method) => (
                    <motion.label
                      key={method.id}
                      className={`p-6 rounded-lg cursor-pointer transition-all duration-300 shadow-lg ${
                        formData.paymentMethod === method.id
                          ? 'bg-gradient-to-r from-saffron/20 to-gold/20 dark:from-saffron/20 dark:to-gold/20 border-2 border-saffron'
                          : 'bg-gray-100 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-3xl mb-2 text-saffron">{method.icon}</div>
                        <div className="font-semibold text-gray-800 dark:text-white mb-1">{method.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{method.desc}</div>
                      </div>
                    </motion.label>
                  ))}
                </div>

                {/* Receipt Option */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="receipt"
                      checked={formData.receipt}
                      onChange={handleInputChange}
                      className="mr-2 text-saffron focus:ring-saffron rounded"
                    />
                    <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <FaReceipt />
                      Email me the donation receipt (for tax benefits)
                    </span>
                  </label>
                </div>

                {/* Summary */}
                <div className="bg-saffron/10 rounded-lg p-6 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 shadow-lg">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaHeart />
                    Donation Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Name:</span>
                      <span className="text-gray-800 dark:text-white font-medium">{formData.anonymous ? 'Anonymous' : formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                      <span className="text-gray-800 dark:text-white font-bold">₹{(formData.customAmount || formData.amount || '0').toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Purpose:</span>
                      <span className="text-gray-800 dark:text-white">{donationPurposes.find(p => p.id === formData.purpose)?.name || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Recurring:</span>
                      <span className="text-gray-800 dark:text-white">{formData.recurring ? 'Monthly' : 'One-time'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Payment Method:</span>
                      <span className="text-gray-800 dark:text-white capitalize">{formData.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-800 dark:hover:text-white transition-all duration-300 flex items-center gap-2 shadow-lg outline-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft />
                  Previous
                </motion.button>
              )}
              
              <div className="ml-auto">
                {step < 3 ? (
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    disabled={step === 1 ? !isStep1Valid() : !isStep2Valid()}
                    className={`px-8 py-3 font-bold rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      (step === 1 ? isStep1Valid() : isStep2Valid())
                        ? 'bg-saffron-gradient bg-green-400 text-white hover:shadow-lg hover:shadow-saffron/30'
                        : 'dark:bg-gray-300 bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={(step === 1 ? isStep1Valid() : isStep2Valid()) ? { scale: 1.02 } : {}}
                    whileTap={(step === 1 ? isStep1Valid() : isStep2Valid()) ? { scale: 0.98 } : {}}
                  >
                    Continue
                    <FaArrowRight />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center gap-2 outline-none"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPray />
                    Proceed to Payment Gateway
                  </motion.button>
                )}
              </div>
            </div>
          </form>
        </motion.div>
        {/* ✅ ADD THIS CONFIRMATION MODAL */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-orange-200 dark:border-purple-400"
            >
              {/* Header with Icon */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-saffron-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPrayingHands className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  🙏 Ready for Sacred Seva?
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  You are about to make a divine contribution
                </p>
              </div>

              {/* Donation Summary */}
              <div className="bg-orange-50 dark:bg-saffron/10 rounded-xl p-4 mb-6 border border-orange-200 dark:border-saffron/20">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Seva Amount:</span>
                    <span className="font-bold text-saffron text-xl">
                      ₹{(formData.customAmount || formData.amount).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Seva Purpose:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {donationPurposes.find(p => p.id === formData.purpose)?.name || formData.purpose}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Devotee:</span>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {formData.anonymous ? 'Anonymous Donor' : formData.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Blessing Message */}
              <div className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-indigo-900/80 dark:to-purple-900/80 rounded-xl p-4 mb-6 border border-saffron/40 dark:border-saffron/30">
                <p className="text-gray-700 dark:text-gray-300 text-center italic text-sm">
                  "दानं वीर्यं यशस्तेजो धैर्यं चैव पराक्रमः।"
                  <br />
                  <span className="text-xs mt-1 block">
                    Your seva will bring divine blessings and contribute to the spiritual welfare of many devotees.
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <motion.button
                  type="button"
                  onClick={handleCancelPayment}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaTimes className="inline mr-2" />
                  Cancel
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaHeart className="inline mr-2" />
                  Proceed to Payment
                </motion.button>
              </div>

              {/* Footer Note */}
              <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                🔒 Your payment is secured by ICICI Bank EazyPay
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
