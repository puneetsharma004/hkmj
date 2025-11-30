import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const whatsappNumber = '919116139371'; // Replace with your WhatsApp number
  const whatsappMessage = 'Hare Krishna! I would like to know more about your services.';

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-5 right-5 bg-[#25d366] text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:scale-105 transition z-[100]"
    >
      <FaWhatsapp />
    </button>
  );
}
