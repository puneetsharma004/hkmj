import { motion } from 'framer-motion';
import { 
  FaFileInvoice, 
  FaRupeeSign, 
  FaChartBar, 
  FaBook, 
  FaCreditCard, 
  FaEnvelope, 
  FaScroll, 
  FaFileAlt, 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaDownload, 
  FaCalculator, 
  FaPercent, 
  FaClipboardCheck,
  FaStepForward,
  FaCertificate
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { IoShieldCheckmark } from "react-icons/io5";

export default function TaxBenefits() {
  const taxBenefits = [
    // {
    //   section: '80G',
    //   deduction: '50%',
    //   description: 'Deduction under Section 80G of Income Tax Act',
    //   eligibility: 'All donations to registered temples',
    //   icon: <FaClipboardCheck />
    // },
    {
      section: '35(1)(ii)',
      deduction: '100%',
      description: 'For specific charitable activities and research',
      eligibility: 'Educational and research programs',
      icon: <FaBook />
    }
  ];

  const receiptProcess = [
    {
      step: 1,
      title: 'Donate Online',
      description: 'Complete your donation through our secure payment gateway',
      icon: <FaCreditCard />
    },
    {
      step: 2,
      title: 'Instant Confirmation',
      description: 'Receive immediate confirmation via email and SMS',
      icon: <FaEnvelope />
    },
    // {
    //   step: 3,
    //   title: 'Tax Receipt',
    //   description: 'Digital receipt with 80G certificate sent within 24 hours',
    //   icon: <FaScroll />
    // },
    {
      step: 4,
      title: 'File Your Returns',
      description: 'Use the receipt to claim tax deductions in your ITR',
      icon: <FaChartBar />
    }
  ];

  const documents = [
    // { name: '80G Registration Certificate', status: 'valid', validity: '2025', icon: <FaCertificate /> },
    { name: 'Trust Registration', status: 'valid', validity: 'Permanent', icon: <IoShieldCheckmark /> },
    { name: 'Income Tax Exemption', status: 'valid', validity: '2026', icon: <FaFileAlt /> },
    { name: 'FCRA Registration', status: 'valid', validity: '2027', icon: <FaCheckCircle /> }
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

      {/* Spiritual Background Elements */}
      <div className="absolute inset-0 opacity-20 dark:opacity-5">
        <div className="absolute top-16 left-16 text-5xl text-saffron animate-pulse delay-200">
          <FaFileInvoice />
        </div>
        <div className="absolute top-32 right-20 text-4xl text-gold animate-pulse delay-800">
          <FaRupeeSign />
        </div>
        <div className="absolute bottom-32 left-20 text-6xl text-saffron animate-pulse delay-1200">
          <FaChartBar />
        </div>
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
          <div className="flex justify-center items-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
            <span className="mx-4 text-4xl text-saffron animate-pulse">
              <FaFileInvoice />
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-saffron to-transparent w-24"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold gradient-text-saffron-gold mb-4">
            Tax Benefits & Receipts
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Your donations are eligible for tax deductions under Indian Income Tax Act. Save tax while serving Krishna.
          </p>
        </motion.div>

        {/* Tax Benefits Overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Tax Sections */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Available Tax Deductions</h3>
            
            {taxBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/90 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50 hover:shadow-2xl hover:shadow-saffron/20 transition-all duration-300 group shadow-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl text-saffron group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-saffron transition-colors duration-300">
                        Section {benefit.section}
                      </h4>
                      <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <FaPercent className="text-xs" />
                        {benefit.deduction} Off
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors duration-300">
                      {benefit.description}
                    </p>
                    <div className="text-sm text-gold">
                      <strong>Eligibility:</strong> {benefit.eligibility}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Tax Calculation Example */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-green-100/80 to-emerald-100/80 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-6 border border-green-400 dark:border-green-500 border-opacity-60 dark:border-opacity-30 shadow-lg"
            >
              <h4 className="font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                <FaCalculator />
                Tax Savings Example
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Donation Amount:</span>
                  <span className="text-gray-800 dark:text-white font-semibold">₹10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Tax Deduction (50%):</span>
                  <span className="text-gray-800 dark:text-white font-semibold">₹5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Your Tax Bracket:</span>
                  <span className="text-gray-800 dark:text-white font-semibold">30%</span>
                </div>
                <div className="border-t border-green-400 dark:border-green-500 border-opacity-40 dark:border-opacity-30 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-green-600 dark:text-green-400 font-semibold">Tax Saved:</span>
                    <span className="text-green-600 dark:text-green-400 font-bold">₹1,500</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Receipt Process */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">How to Get Your Receipt</h3>
            
            {receiptProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-saffron to-gold rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{step.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </div>
                <div className="text-2xl text-saffron">{step.icon}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Legal Documents */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 border border-blue-400 dark:border-blue-500 border-opacity-60 dark:border-opacity-30 backdrop-blur-sm shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Legal Documentation & Compliance</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documents.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 bg-white/60 dark:bg-gray-900/50 rounded-xl border border-blue-300 dark:border-blue-400 border-opacity-40 dark:border-opacity-20 shadow-lg hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-40 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 text-saffron group-hover:scale-110 transition-transform duration-300">
                  {doc.icon}
                </div>
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-2">{doc.name}</h4>
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-green-600 dark:text-green-400 text-xs">Valid till {doc.validity}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              Download All Certificates
            </motion.button>
          </div>
        </motion.div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-yellow-100/80 to-orange-100/80 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 border border-yellow-400 dark:border-yellow-500 border-opacity-60 dark:border-opacity-30 shadow-lg"
        >
          <div className="flex items-start space-x-4">
            <div className="text-3xl text-yellow-600 dark:text-yellow-400">
              <FaExclamationTriangle />
            </div>
            <div>
              <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Important Tax Information</h4>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <p>• Tax benefits are subject to applicable Income Tax Act provisions</p>
                <p>• Please consult your tax advisor for specific advice on your situation</p>
                <p>• Receipts are issued only for donations above ₹500</p>
                <p>• Keep your receipt safe for ITR filing - digital copies are legally valid</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <IoShieldCheckmark className="text-saffron" />
              <span>100% Legitimate</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaStepForward className="text-gold" />
              <span>Quick Process</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiSparkles className="text-saffron" />
              <span>Digital Receipts</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
