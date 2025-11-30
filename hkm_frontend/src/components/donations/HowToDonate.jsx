import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaCreditCard, 
  FaUniversity, 
  FaGlobe, 
  FaLock, 
  // IoShieldCheckmarkSharp, 
  FaCheckCircle, 
  FaKey, 
  FaCopy, 
  FaExclamationTriangle, 
  FaArrowRight, 
  FaCheck,
  FaMobile,
  FaWallet,
  FaMoneyCheck,
  FaPaypal,
  FaDollarSign,
  FaFileInvoice
} from 'react-icons/fa';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { HiSparkles } from 'react-icons/hi';

export default function HowToDonate() {
  const [selectedMethod, setSelectedMethod] = useState('online');

  const paymentMethods = [
    {
      id: 'online',
      title: 'Online Payment',
      description: 'Quick and secure payment through our integrated gateway',
      icon: <FaCreditCard />,
      methods: ['Credit/Debit Cards', 'UPI (GPay, PhonePe, Paytm)', 'Net Banking', 'Digital Wallets'],
      benefits: ['Instant Receipt', 'Secure SSL', 'Multiple Options', '24/7 Available']
    },
    {
      id: 'bank',
      title: 'Bank Transfer',
      description: 'Direct transfer to our temple bank account',
      icon: <FaUniversity />,
      methods: ['NEFT/RTGS', 'IMPS', 'Cheque/DD', 'Cash Deposit'],
      benefits: ['No Processing Fee', 'Large Amounts', 'Traditional Method', 'Bank Records']
    },
    // {
    //   id: 'international',
    //   title: 'International',
    //   description: 'For devotees contributing from outside India',
    //   icon: <FaGlobe />,
    //   methods: ['PayPal', 'Wire Transfer', 'Western Union', 'Wise Transfer'],
    //   benefits: ['Multi-Currency', 'Global Access', 'Secure Transfer', 'Tax Receipt']
    // }
  ];

  const bankDetails = {
    accountName: 'Hare Krishna Movement Jodhpur',
    accountNumber: '729901000990',
    ifscCode: 'ICIC0007299',
    bankName: 'ICICI Bank',
    branch: 'Jagatpura Mahal Road branch, Jaipur',
    swiftCode: 'SBININBB123' // For international transfers
  };

  const securityFeatures = [
    { icon: <FaLock />, title: 'SSL Encryption', description: 'Bank-grade security' },
    { icon: <IoShieldCheckmarkSharp />, title: 'PCI Compliance', description: 'Industry standards' },
    { icon: <FaCheckCircle />, title: 'Verified Gateway', description: 'Trusted payment partners' },
    { icon: <FaKey />, title: 'No Data Storage', description: 'Your info stays safe' }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
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
            How to Donate
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Choose your preferred method to contribute to our temple. All options are secure and provide instant confirmation
          </p>
        </motion.div>

        {/* Payment Method Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-4 bg-white/10 dark:bg-gradient-to-r dark:from-gray-900/50 dark:to-black/50 p-2 rounded-2xl border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-lg">
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 outline-none ${
                  selectedMethod === method.id
                    ? 'bg-saffron-gradient outline-none text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{method.icon}</span>
                <span>{method.title}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Selected Method Details */}
        <motion.div
          key={selectedMethod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Left: Method Details */}
          <div className="bg-white/10 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-4xl text-saffron">{paymentMethods.find(m => m.id === selectedMethod)?.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {paymentMethods.find(m => m.id === selectedMethod)?.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {paymentMethods.find(m => m.id === selectedMethod)?.description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-saffron mb-3">Available Methods:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.find(m => m.id === selectedMethod)?.methods.map((method, index) => (
                    <div key={index} className="bg-orange-100 dark:bg-purple-900/30 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                      {method}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-saffron mb-3">Benefits:</h4>
                <div className="space-y-2">
                  {paymentMethods.find(m => m.id === selectedMethod)?.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FaCheck className="text-gold" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Bank Details or Additional Info */}
          <div className="space-y-6">
            {selectedMethod === 'bank' && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 dark:from-indigo-900/50 dark:to-purple-900/50 rounded-2xl p-6 border border-blue-300 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm shadow-lg"
              >
                <h4 className="font-bold text-blue-700 dark:text-gold mb-4 flex items-center gap-2">
                  <FaUniversity />
                  Bank Account Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Account Name:</span>
                    <span className="text-gray-800 dark:text-white font-semibold">{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 dark:text-white font-mono">{bankDetails.accountNumber}</span>
                      <button onClick={() => copyToClipboard(bankDetails.accountNumber)} className="text-saffron hover:text-orange-600 transition-colors">
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">IFSC Code:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 dark:text-white font-mono">{bankDetails.ifscCode}</span>
                      <button onClick={() => copyToClipboard(bankDetails.ifscCode)} className="text-saffron hover:text-orange-600 transition-colors">
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Bank:</span>
                    <span className="text-gray-800 dark:text-white">{bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Branch:</span>
                    <span className="text-gray-800 dark:text-white">{bankDetails.branch}</span>
                  </div>
                </div>
                
                <motion.button
                  className="w-full mt-4 bg-saffron-gradient text-white font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 outline-none"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Copy All Bank Details
                </motion.button>
              </motion.div>
            )}

            {selectedMethod === 'international' && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-cyan-100/80 to-blue-100/80 dark:from-blue-900/50 dark:to-cyan-900/50 rounded-2xl p-6 border border-cyan-300 dark:border-gold border-opacity-60 dark:border-opacity-30 backdrop-blur-sm shadow-lg"
              >
                <h4 className="font-bold text-cyan-700 dark:text-gold mb-4 flex items-center gap-2">
                  <FaGlobe />
                  International Transfer Details
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">SWIFT Code:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-800 dark:text-white font-mono">{bankDetails.swiftCode}</span>
                      <button onClick={() => copyToClipboard(bankDetails.swiftCode)} className="text-saffron hover:text-orange-600 transition-colors">
                        <FaCopy />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Beneficiary:</span>
                    <span className="text-gray-800 dark:text-white">{bankDetails.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Country:</span>
                    <span className="text-gray-800 dark:text-white">India</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg border border-yellow-400 dark:border-yellow-500 border-opacity-50 dark:border-opacity-30">
                  <p className="text-yellow-700 dark:text-yellow-300 text-xs flex items-start gap-2">
                    <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
                    International transfers may take 3-5 business days and incur additional fees from your bank.
                  </p>
                </div>
              </motion.div>
            )}

            {selectedMethod === 'online' && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 dark:from-green-900/50 dark:to-emerald-900/50 rounded-2xl p-6 border border-green-300 dark:border-emerald-500 border-opacity-60 dark:border-opacity-30 backdrop-blur-sm shadow-lg"
              >
                <h4 className="font-bold text-green-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                  <FaCreditCard />
                  Quick Online Options
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
                    <FaCreditCard className="text-saffron" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Card Payment</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
                    <FaMobile className="text-saffron" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">UPI</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
                    <FaUniversity className="text-saffron" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Net Banking</span>
                  </div>
                  <div className="flex items-center space-x-2 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
                    <FaWallet className="text-saffron" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Digital Wallet</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-300 dark:border-green-500 border-opacity-60 dark:border-opacity-30 backdrop-blur-sm shadow-lg"
            >
              <h4 className="font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                <FaLock />
                Security & Trust
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-2 text-saffron flex justify-center">{feature.icon}</div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-white">{feature.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Donate Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            className="px-12 py-4 bg-saffron outline-none text-white font-bold rounded-full shadow-2xl hover:shadow-saffron/50 transition-all duration-300 text-lg flex items-center gap-3 mx-auto cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
                    document.querySelector('#donation-form')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
          >
            Start Donation Process
            <FaArrowRight />
          </motion.button>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">Secure • Fast • Trusted by 1000+ devotees</p>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <IoShieldCheckmarkSharp className="text-saffron" />
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaFileInvoice className="text-gold" />
              <span>Instant Tax Receipt</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
