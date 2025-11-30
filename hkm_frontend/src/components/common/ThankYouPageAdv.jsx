/*import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaHeart, 
  FaHandsHelping, 
  FaDownload, 
  FaEnvelope, 
  FaPhone, 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp, 
  FaShare, 
  FaUsers, 
  FaCalendarAlt, 
  FaNewspaper, 
  FaUserPlus, 
  FaCheckCircle, 
  FaPrint, 
  FaFileAlt, 
  FaGift, 
  FaPrayingHands, 
  FaHome,
  FaStar,
  FaChevronRight,
  FaExclamationTriangle,
  FaClock,
  FaTimes
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

export default function ThankYouPage() {
  const [donationData, setDonationData] = useState({
    amount: 0,
    currency: 'INR',
    transactionId: '',
    donorName: 'Devotee',
    email: 'devotee@example.com',
    date: new Date().toLocaleDateString('en-IN'),
    purpose: 'General Temple Fund',
    paymentStatus: 'SUCCESS',
    paymentMessage: 'Payment successful',
    responseCode: '',
    paymentId: ''
  });

  const [showReceipt, setShowReceipt] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get payment data from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storedData = localStorage.getItem('donationData');
    
    // Check if this is a payment response from ICICI
    const paymentStatus = params.get('status');
    const paymentAmount = params.get('amount');
    const paymentTransactionId = params.get('transactionId');
    const paymentMessage = params.get('message');
    const responseCode = params.get('responseCode');
    const paymentId = params.get('paymentId');
    const timestamp = params.get('timestamp');
    
    console.log('🔍 Payment response data:', {
      paymentStatus, paymentAmount, paymentTransactionId, paymentMessage, responseCode
    });
    
    if (paymentStatus && (paymentAmount || paymentTransactionId)) {
      // This is a real payment response from backend
      const storedDonorData = storedData ? JSON.parse(storedData) : {};
      
      setDonationData({
        amount: parseInt(paymentAmount) || 0,
        currency: 'INR',
        transactionId: paymentTransactionId || 'N/A',
        donorName: storedDonorData.donorName || 'Devotee',
        email: storedDonorData.email || 'devotee@example.com',
        date: timestamp ? new Date(timestamp).toLocaleDateString('en-IN') : new Date().toLocaleDateString('en-IN'),
        purpose: storedDonorData.purpose || 'General Temple Fund',
        paymentStatus: paymentStatus,
        paymentMessage: paymentMessage || 'Payment processed',
        responseCode: responseCode || '',
        paymentId: paymentId || ''
      });
      
      // Clean up stored data after successful payment
      if (storedData) {
        localStorage.removeItem('donationData');
      }
      
    } else if (storedData) {
      // Fallback to stored data (for direct page visits)
      setDonationData({
        ...JSON.parse(storedData),
        paymentStatus: 'SUCCESS', // Default for stored data
        paymentMessage: 'Donation confirmed'
      });
      localStorage.removeItem('donationData');
    }
    
    setIsLoading(false);
  }, []);

  // Get status-specific styling and content
  const getStatusConfig = () => {
    switch (donationData.paymentStatus) {
      case 'SUCCESS':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-500',
          icon: <FaCheckCircle className="text-white text-3xl" />,
          title: 'धन्यवाद! Thank You!',
          subtitle: 'Your generous donation has been received successfully. May Krishna bless you abundantly for your selfless contribution.',
          showReceipt: true
        };
      case 'PENDING':
        return {
          color: 'text-orange-600',
          bgColor: 'bg-orange-500',
          icon: <FaClock className="text-white text-3xl" />,
          title: 'Payment Processing',
          subtitle: 'Your payment is being processed. You will receive a confirmation once the transaction is complete.',
          showReceipt: false
        };
      case 'FAILED':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-500',
          icon: <FaTimes className="text-white text-3xl" />,
          title: 'Payment Failed',
          subtitle: 'Unfortunately, your payment could not be processed. Please try again or contact our support team.',
          showReceipt: false
        };
      case 'ERROR':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-500',
          icon: <FaExclamationTriangle className="text-white text-3xl" />,
          title: 'Processing Error',
          subtitle: 'There was an error processing your payment. If amount was deducted, please contact support immediately.',
          showReceipt: false
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-500',
          icon: <FaCheckCircle className="text-white text-3xl" />,
          title: 'Thank You',
          subtitle: 'Thank you for visiting Hare Krishna Marwar Mandir.',
          showReceipt: false
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Dynamic impact messages based on donation amount
  const getImpactMessages = () => {
    const amount = donationData.amount;
    if (amount >= 5000) {
      return [
        `Your generous donation of ₹${amount.toLocaleString()} can provide prasadam for 100+ devotees`,
        'Supports major temple renovation and spiritual programs',
        'Helps organize grand festivals and cultural celebrations',
        'Contributes significantly to community outreach programs'
      ];
    } else if (amount >= 1000) {
      return [
        `Your donation of ₹${amount.toLocaleString()} can provide prasadam for 50+ devotees`,
        'Supports daily temple maintenance and spiritual programs',
        'Helps spread Krishna consciousness in the community',
        'Contributes to festivals and cultural celebrations'
      ];
    } else {
      return [
        `Your donation of ₹${amount.toLocaleString()} helps support daily temple activities`,
        'Every contribution, no matter the size, is deeply appreciated',
        'Helps maintain the sacred atmosphere of the temple',
        'Supports the spiritual growth of our community'
      ];
    }
  };

  const impactMessages = getImpactMessages();

  const socialShareData = {
    text: `I just made a donation to Hare Krishna Marwar Mandir! 🙏 Join me in supporting this sacred cause.`,
    url: window.location.origin,
    hashtags: ['HareKrishna', 'Donation', 'Seva', 'SpiritualGiving']
  };

  const handleSocialShare = (platform) => {
    const { text, url, hashtags } = socialShareData;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags.join(',')}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const downloadReceipt = () => {
    // Generate receipt data
    const receiptData = {
      ...donationData,
      temple: 'Hare Krishna Marwar Mandir',
      address: 'Sector 12, Jodhpur, Rajasthan',
      receiptDate: new Date().toLocaleDateString('en-IN')
    };
    
    // This would typically generate and download a PDF receipt
    console.log('Generating receipt for:', receiptData);
    alert('Receipt download feature - implement PDF generation here');
  };

  if (isLoading) {
    return (
      <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
        <div className="relative max-w-6xl mx-auto z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-saffron mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Processing payment response...</p>
          </div>
        </div>
      </section>
    );
  }*/

  // return (
  //   <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:bg-black">
  //     {/* Light/Dark Gradient Background */}
  //     <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-amber-100/50 to-yellow-100/50 dark:from-black dark:via-purple-950 dark:to-indigo-950"></div>
      
  //     {/* Animated Background Glow */}
  //     <div className="absolute inset-0">
  //       <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-saffron/30 to-orange-400/30 dark:bg-orange-600 rounded-full opacity-40 dark:opacity-20 blur-3xl animate-pulse"></div>
  //       <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/25 to-indigo-400/25 dark:bg-purple-600 rounded-full opacity-30 dark:opacity-15 blur-3xl animate-pulse delay-1000"></div>
  //       <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-gold/20 to-saffron/20 dark:bg-gold rounded-full opacity-30 dark:opacity-10 blur-3xl animate-pulse delay-500 transform -translate-x-1/2 -translate-y-1/2"></div>
  //     </div>


  //     <div className="relative max-w-6xl mx-auto z-10">
  //       {/* Breadcrumb */}
  //       <motion.nav
  //         initial={{ opacity: 0, y: -20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.5 }}
  //         className="mb-8"
  //       >
  //         <div className="flex items-center justify-center space-x-2 text-sm">
  //           <a 
  //             href="/" 
  //             className="text-gray-600 dark:text-gray-400 hover:text-saffron transition-colors duration-300 flex items-center space-x-1"
  //           >
  //             <FaHome className="text-xs" />
  //             <span>Home</span>
  //           </a>
  //           <FaChevronRight className="text-gray-500 dark:text-gray-600 text-xs" />
  //           <span className="text-saffron font-medium flex items-center space-x-1">
  //             <FaCheckCircle className="text-xs" />
  //             <span>Payment Status</span>
  //           </span>
  //         </div>
  //       </motion.nav>

  //       {/* Main Status Header */}
  //       <motion.div
  //         initial={{ opacity: 0, y: 30 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.8 }}
  //         className="text-center mb-12"
  //       >
  //         <motion.div
  //           initial={{ scale: 0 }}
  //           animate={{ scale: 1 }}
  //           transition={{ duration: 0.6, delay: 0.3 }}
  //           className={`w-20 h-20 ${statusConfig.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}
  //         >
  //           {statusConfig.icon}
  //         </motion.div>

  //         <h1 className="text-4xl md:text-6xl font-bold gradient-text-saffron-gold mb-6">
  //           {statusConfig.title}
  //         </h1>
          
  //         <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
  //           {statusConfig.subtitle}
  //         </p>

  //         {/* Payment Status Alert */}
  //         {donationData.paymentStatus !== 'SUCCESS' && (
  //           <motion.div
  //             initial={{ opacity: 0, scale: 0.8 }}
  //             animate={{ opacity: 1, scale: 1 }}
  //             transition={{ duration: 0.8, delay: 0.4 }}
  //             className={`${
  //               donationData.paymentStatus === 'PENDING' 
  //                 ? 'bg-orange-100 border-orange-400 text-orange-800' 
  //                 : 'bg-red-100 border-red-400 text-red-800'
  //             } border rounded-2xl p-6 max-w-3xl mx-auto mb-8`}
  //           >
  //             <div className="flex items-center justify-center gap-3 mb-2">
  //               <div className="text-2xl">
  //                 {donationData.paymentStatus === 'PENDING' ? <FaClock /> : <FaExclamationTriangle />}
  //               </div>
  //               <div>
  //                 <p className="font-bold text-lg">
  //                   Status: {donationData.paymentStatus}
  //                 </p>
  //                 <p className="text-sm">{donationData.paymentMessage}</p>
  //                 {donationData.responseCode && (
  //                   <p className="text-xs mt-1">Response Code: {donationData.responseCode}</p>
  //                 )}
  //               </div>
  //             </div>
              
  //             {donationData.paymentStatus === 'FAILED' && (
  //               <div className="mt-4 p-3 bg-red-50 rounded-lg">
  //                 <p className="text-sm">
  //                   <strong>Next Steps:</strong>
  //                   <br />• Check your payment method and try again
  //                   <br />• Contact your bank if the issue persists
  //                   <br />• Reach out to our support team for assistance
  //                 </p>
  //               </div>
  //             )}
              
  //             {donationData.paymentStatus === 'ERROR' && (
  //               <div className="mt-4 p-3 bg-red-50 rounded-lg">
  //                 <p className="text-sm">
  //                   <strong>Important:</strong> If any amount was deducted from your account, 
  //                   please contact our support team immediately with your transaction reference.
  //                 </p>
  //               </div>
  //             )}
  //           </motion.div>
  //         )}

  //         {/* Sanskrit Blessing - Only show for successful payments */}
  //         {donationData.paymentStatus === 'SUCCESS' && (
  //           <motion.div
  //             initial={{ opacity: 0, scale: 0.8 }}
  //             animate={{ opacity: 1, scale: 1 }}
  //             transition={{ duration: 0.8, delay: 0.6 }}
  //             className="bg-gradient-to-r from-orange-100/80 to-amber-100/80 dark:from-indigo-900/80 dark:to-purple-900/80 rounded-2xl p-6 max-w-3xl mx-auto border border-saffron/40 dark:border-saffron/30 border-opacity-60 dark:border-opacity-100 shadow-lg mb-8"
  //           >
  //             <p className="text-gray-800 dark:text-white text-lg italic mb-2">
  //               "दानं वीर्यं यशस्तेजो धैर्यं चैव पराक्रमः।<br/>
  //               षडिमे देवता लोके पूजिता सर्वदैव हि॥"
  //             </p>
  //             <p className="text-gray-600 dark:text-gray-300 text-sm">
  //               "Charity, valor, fame, strength, patience and prowess - these six divine qualities are always worshipped in this world"
  //             </p>
  //           </motion.div>
  //         )}
  //       </motion.div>

  //       {/* Payment Details Card */}
  //       {(donationData.transactionId || donationData.amount > 0) && (
  //         <motion.div
  //           initial={{ opacity: 0, y: 50 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.8, delay: 0.4 }}
  //           className="bg-white/95 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl mb-12"
  //         >
  //           <div className="text-center mb-8">
  //             <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center justify-center gap-2">
  //               <FaFileAlt />
  //               Transaction Details
  //             </h2>
  //           </div>

  //           <div className="grid md:grid-cols-2 gap-8">
  //             {/* Payment Details */}
  //             <div className="space-y-4">
  //               {donationData.amount > 0 && (
  //                 <div className="flex justify-between items-center p-3 bg-orange-100/20 dark:bg-saffron/10 rounded-lg">
  //                   <span className="text-gray-600 dark:text-gray-400">Amount:</span>
  //                   <span className={`font-bold text-xl ${statusConfig.color}`}>
  //                     ₹{donationData.amount.toLocaleString()}
  //                   </span>
  //                 </div>
  //               )}
                
  //               <div className="flex justify-between items-center p-3 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg">
  //                 <span className="text-gray-600 dark:text-gray-400">Status:</span>
  //                 <span className={`font-bold ${statusConfig.color}`}>
  //                   {donationData.paymentStatus}
  //                 </span>
  //               </div>
                
  //               {donationData.transactionId && (
  //                 <div className="flex justify-between items-center p-3 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg">
  //                   <span className="text-gray-600 dark:text-gray-400">Transaction ID:</span>
  //                   <span className="font-mono text-gray-800 dark:text-white text-sm">
  //                     {donationData.transactionId}
  //                   </span>
  //                 </div>
  //               )}
                
  //               {donationData.paymentId && (
  //                 <div className="flex justify-between items-center p-3 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg">
  //                   <span className="text-gray-600 dark:text-gray-400">Payment ID:</span>
  //                   <span className="font-mono text-gray-800 dark:text-white text-sm">
  //                     {donationData.paymentId}
  //                   </span>
  //                 </div>
  //               )}
                
  //               <div className="flex justify-between items-center p-3 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg">
  //                 <span className="text-gray-600 dark:text-gray-400">Date:</span>
  //                 <span className="text-gray-800 dark:text-white">{donationData.date}</span>
  //               </div>
                
  //               <div className="flex justify-between items-center p-3 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg">
  //                 <span className="text-gray-600 dark:text-gray-400">Purpose:</span>
  //                 <span className="text-gray-800 dark:text-white">{donationData.purpose}</span>
  //               </div>
  //             </div>

  //             {/* Receipt Actions - Only show for successful payments */}
  //             {statusConfig.showReceipt && (
  //               <div className="space-y-4">
  //                 <h3 className="font-bold text-gray-800 dark:text-white mb-4">Receipt & Tax Benefits</h3>
                  
  //                 <div className="p-4 bg-green-100/80 dark:bg-green-900/30 rounded-lg border border-green-400 dark:border-green-500 border-opacity-60 dark:border-opacity-30">
  //                   <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
  //                     Receipt will be sent to {donationData.email}
  //                   </p>
                    
  //                   <div className="flex flex-col gap-2">
  //                     <motion.button
  //                       onClick={downloadReceipt}
  //                       className="flex items-center justify-center gap-2 px-4 py-2 bg-saffron text-white rounded-lg hover:shadow-lg transition-all duration-300"
  //                       whileHover={{ scale: 1.02 }}
  //                       whileTap={{ scale: 0.98 }}
  //                     >
  //                       <FaDownload />
  //                       Download Receipt
  //                     </motion.button>
                      
  //                     <motion.button
  //                       onClick={() => window.print()}
  //                       className="flex items-center justify-center gap-2 px-4 py-2 border border-saffron text-saffron rounded-lg hover:bg-saffron hover:text-white transition-all duration-300"
  //                       whileHover={{ scale: 1.02 }}
  //                       whileTap={{ scale: 0.98 }}
  //                     >
  //                       <FaPrint />
  //                       Print Receipt
  //                     </motion.button>
  //                   </div>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </motion.div>
  //       )}

  //       {/* Impact & Gratitude - Only show for successful payments */}
  //       {donationData.paymentStatus === 'SUCCESS' && donationData.amount > 0 && (
  //         <div className="grid lg:grid-cols-2 gap-12 mb-16">
  //           {/* Impact Statement */}
  //           <motion.div
  //             initial={{ opacity: 0, x: -50 }}
  //             animate={{ opacity: 1, x: 0 }}
  //             transition={{ duration: 0.8, delay: 0.6 }}
  //             className="bg-white/95 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-8 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl"
  //           >
  //             <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
  //               <FaStar />
  //               Your Impact
  //             </h3>
              
  //             <div className="space-y-4">
  //               {impactMessages.map((message, index) => (
  //                 <motion.div
  //                   key={index}
  //                   initial={{ opacity: 0, y: 20 }}
  //                   animate={{ opacity: 1, y: 0 }}
  //                   transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
  //                   className="flex items-start gap-3 p-3 bg-orange-100/20 dark:bg-saffron/10 rounded-lg"
  //                 >
  //                   <div className="w-6 h-6 bg-saffron rounded-full flex items-center justify-center flex-shrink-0">
  //                     <FaCheckCircle className="text-white text-xs" />
  //                   </div>
  //                   <p className="text-gray-600 dark:text-gray-300 text-sm">{message}</p>
  //                 </motion.div>
  //               ))}
  //             </div>
  //           </motion.div>

  //           {/* Next Steps */}
  //           <motion.div
  //             initial={{ opacity: 0, x: 50 }}
  //             animate={{ opacity: 1, x: 0 }}
  //             transition={{ duration: 0.8, delay: 0.8 }}
  //             className="space-y-6"
  //           >
  //             <div className="bg-white/95 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl">
  //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
  //                 <FaHandsHelping />
  //                 Ways to Stay Connected
  //               </h3>
                
  //               <div className="space-y-3">
  //                 <motion.button
  //                   className="w-full flex items-center justify-between p-3 bg-orange-100/20 dark:bg-saffron/10 rounded-lg hover:bg-orange-200/80 dark:hover:bg-saffron/20 transition-all duration-300 group"
  //                   whileHover={{ scale: 1.02 }}
  //                 >
  //                   <div className="flex items-center gap-3">
  //                     <FaUserPlus />
  //                     <span className="text-gray-800 dark:text-white">Volunteer with us</span>
  //                   </div>
  //                   <FaChevronRight className="text-gray-600 dark:text-gray-400 group-hover:text-saffron" />
  //                 </motion.button>
                  
  //                 <motion.button
  //                   className="w-full flex items-center justify-between p-3 bg-orange-100/20 dark:bg-saffron/10 rounded-lg hover:bg-orange-200/80 dark:hover:bg-saffron/20 transition-all duration-300 group"
  //                   whileHover={{ scale: 1.02 }}
  //                 >
  //                   <div className="flex items-center gap-3">
  //                     <FaCalendarAlt />
  //                     <span className="text-gray-800 dark:text-white">Attend our programs</span>
  //                   </div>
  //                   <FaChevronRight className="text-gray-600 dark:text-gray-400 group-hover:text-saffron" />
  //                 </motion.button>
                  
  //                 <motion.button
  //                   className="w-full flex items-center justify-between p-3 bg-orange-100/20 dark:bg-saffron/10 rounded-lg hover:bg-orange-200/80 dark:hover:bg-saffron/20 transition-all duration-300 group"
  //                   whileHover={{ scale: 1.02 }}
  //                 >
  //                   <div className="flex items-center gap-3">
  //                     <FaNewspaper />
  //                     <span className="text-gray-800 dark:text-white">Subscribe to newsletter</span>
  //                   </div>
  //                   <FaChevronRight className="text-gray-600 dark:text-gray-400 group-hover:text-saffron" />
  //                 </motion.button>
  //               </div>
  //             </div>
              
  //             {/* Social Sharing - Only for successful payments */}
  //             <div className="bg-white/95 dark:bg-gradient-to-br dark:from-gray-900/80 dark:to-black/80 rounded-2xl p-6 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 backdrop-blur-xl shadow-xl">
  //               <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
  //                 <FaShare />
  //                 Share the Joy
  //               </h3>
  //               <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
  //                 Inspire others to contribute by sharing your donation
  //               </p>
                
  //               <div className="flex gap-3">
  //                 <motion.button
  //                   onClick={() => handleSocialShare('facebook')}
  //                   className="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
  //                   whileHover={{ scale: 1.05 }}
  //                   whileTap={{ scale: 0.95 }}
  //                 >
  //                   <FaFacebookF />
  //                   <span className="text-sm">Facebook</span>
  //                 </motion.button>
                  
  //                 <motion.button
  //                   onClick={() => handleSocialShare('twitter')}
  //                   className="flex-1 flex items-center justify-center gap-2 p-2 bg-sky-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
  //                   whileHover={{ scale: 1.05 }}
  //                   whileTap={{ scale: 0.95 }}
  //                 >
  //                   <FaTwitter />
  //                   <span className="text-sm">Twitter</span>
  //                 </motion.button>
                  
  //                 <motion.button
  //                   onClick={() => handleSocialShare('whatsapp')}
  //                   className="flex-1 flex items-center justify-center gap-2 p-2 bg-green-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
  //                   whileHover={{ scale: 1.05 }}
  //                   whileTap={{ scale: 0.95 }}
  //                 >
  //                   <FaWhatsapp />
  //                   <span className="text-sm">WhatsApp</span>
  //                 </motion.button>
  //               </div>
  //             </div>
  //           </motion.div>
  //         </div>
  //       )}

  //       {/* Contact Information */}
  //       <motion.div
  //         initial={{ opacity: 0, y: 50 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.8, delay: 1.0 }}
  //         className="grid md:grid-cols-3 gap-8 mb-12"
  //       >
  //         <div className="text-center">
  //           <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
  //             <FaPhone />
  //           </div>
  //           <h4 className="font-bold text-saffron mb-2">Questions?</h4>
  //           <p className="text-gray-600 dark:text-gray-300 text-sm">
  //             Contact our support team<br/>
  //             +91 91161 39371<br/>
  //             Mon-Sat: 9 AM - 6 PM
  //           </p>
  //         </div>
          
  //         <div className="text-center">
  //           <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
  //             <FaEnvelope />
  //           </div>
  //           <h4 className="font-bold text-saffron mb-2">Email Support</h4>
  //           <p className="text-gray-600 dark:text-gray-300 text-sm">
  //             donations@harekrishnamarwar.org<br/>
  //             Payment & receipt queries<br/>
  //             Response within 24 hours
  //           </p>
  //         </div>
          
  //         <div className="text-center">
  //           <div className="text-4xl mb-3 text-saffron flex justify-center items-center">
  //             <FaUsers />
  //           </div>
  //           <h4 className="font-bold text-saffron mb-2">Visit Us</h4>
  //           <p className="text-gray-600 dark:text-gray-300 text-sm">
  //             Hare Krishna Marwar Mandir<br/>
  //             Sector 12, Jodhpur<br/>
  //             Daily: 5 AM - 9 PM
  //           </p>
  //         </div>
  //       </motion.div>

  //       {/* Final Blessing - Only for successful payments */}
  //       {donationData.paymentStatus === 'SUCCESS' && (
  //         <motion.div
  //           initial={{ opacity: 0, scale: 0.8 }}
  //           animate={{ opacity: 1, scale: 1 }}
  //           transition={{ duration: 0.8, delay: 1.2 }}
  //           className="text-center bg-saffron/10 rounded-2xl p-8 border border-saffron/40 dark:border-saffron/20 border-opacity-60 dark:border-opacity-100 backdrop-blur-sm shadow-lg"
  //         >
  //           <div className="text-5xl mb-4">🙏</div>
  //           <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-4 max-w-2xl mx-auto">
  //             "May your generous heart be filled with Krishna's blessings, and may this donation bring you closer to divine love and eternal happiness."
  //           </p>
  //           <p className="text-saffron font-semibold text-xl">
  //             Hare Krishna! Radhe Radhe! 🌸
  //           </p>
  //         </motion.div>
  //       )}

  //       {/* Navigation Back */}
  //       <motion.div
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.8, delay: 1.4 }}
  //         className="mt-12 text-center space-y-4"
  //       >
  //         <motion.button
  //           onClick={() => window.location.href = '/'}
  //           className="px-8 py-3 bg-saffron-gradient text-white font-bold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all duration-300 flex items-center gap-2 mx-auto"
  //           whileHover={{ scale: 1.05 }}
  //           whileTap={{ scale: 0.95 }}
  //         >
  //           <FaHome />
  //           Return to Home
  //         </motion.button>
          
  //         {/* Retry button for failed payments */}
  //         {(donationData.paymentStatus === 'FAILED' || donationData.paymentStatus === 'ERROR') && (
  //           <motion.button
  //             onClick={() => window.location.href = '/donate'}
  //             className="px-8 py-3 border-2 border-saffron text-saffron font-bold rounded-lg hover:bg-saffron hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto"
  //             whileHover={{ scale: 1.05 }}
  //             whileTap={{ scale: 0.95 }}
  //           >
  //             <FaGift />
  //             Try Again
  //           </motion.button>
  //         )}
  //       </motion.div>
  //     </div>
  //   </section>
  // );
// }

