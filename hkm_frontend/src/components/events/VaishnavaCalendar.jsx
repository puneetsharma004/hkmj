import React, { useState } from 'react';
import { Calendar, Download, Filter } from 'lucide-react';

const VaishnavaCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState('all');
  
  const calendarData = [
    { month: 'Mar 2025', date: 'Sat 15th', event: 'Festival of Jagannath Misra', fasting: '—-' },
    { month: 'Mar 2025', date: 'Wed 26th', event: 'Dvadasi (Fasting for Ekadashi vrata)', fasting: 'Next day after Sunrise' },
    { month: 'Apr 2025', date: 'Sun 6th', event: 'Sri Rama Navami', fasting: 'Fasting till Sunset' },
    { month: 'Apr 2025', date: 'Tue 8th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Apr 2025', date: 'Sat 12th', event: 'Their Lordships\' 28th Brahmotsava celebrations begin (in ISKCON Bangalore H.K.Hill) – Dhvaja Arohana', fasting: '—-' },
    { month: 'Apr 2025', date: 'Sat 12th', event: 'Hanuman Jayanti (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'Apr 2025', date: 'Mon 14th', event: 'Beginning of Salagrama & Tulasi Jala Dana', fasting: '—-' },
    { month: 'Apr 2025', date: 'Mon 21st', event: 'Brahma Ratha', fasting: '—-' },
    { month: 'Apr 2025', date: 'Wed 23rd', event: 'Brahmotsava celebrations end (in ISKCON Bangalore) – Dhvaja Avarohana', fasting: '—-' },
    { month: 'Apr 2025', date: 'Thu 24th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Apr 2025', date: 'Wed 30th', event: 'Akshaya Tritiya & Chandan Yatra of Sri Srinivasa Govinda begins (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'May 2025', date: 'Thu 8th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'May 2025', date: 'Thu 8th', event: 'Chandan Yatra of Sri Prahlada Narasimha begins (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'May 2025', date: 'Sun 11th', event: 'Narasimha Chaturdashi: Appearance of Lord Narasimhadeva', fasting: 'Fasting till dusk' },
    { month: 'May 2025', date: 'Wed 14th', event: 'End of Salagrama & Tulasi Jala Dana', fasting: '—-' },
    { month: 'May 2025', date: 'Fri 23rd', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Jun 2025', date: 'Sat 7th', event: 'Mahadvadasi (Fasting for Ekadashi vrata)', fasting: 'Next day after Sunrise' },
    { month: 'Jun 2025', date: 'Mon 9th', event: 'Panihati Chida Dahi Utsava', fasting: '—-' },
    { month: 'Jun 2025', date: 'Tue 10th', event: 'Brahmotsava celebrations (at ISKCON temple, in VK hill, Bangalore)', fasting: '—-' },
    { month: 'Jun 2025', date: 'Wed 11th', event: 'Jagannatha Snana Yatra (at ISKCON temple, in VK hill, Bangalore)', fasting: '—-' },
    { month: 'Jun 2025', date: 'Sun 22nd', event: 'Dvadasi (Fasting for Ekadashi vrata)', fasting: 'Next day after Sunrise' },
    { month: 'Jun 2025', date: 'Wed 25th', event: 'Srila Bhaktivinoda Thakura – Disappearance', fasting: 'Fasting till noon' },
    { month: 'Jun 2025', date: 'Fri 27th', event: 'Jagannatha Ratha Yatra (at ISKCON temple, in VK hill, Bangalore)', fasting: '—-' },
    { month: 'Jul 2025', date: 'Fri 4th', event: 'Sudarshana Jayanti (at ISKCON temple, in VK hill, Bangalore)', fasting: '—-' },
    { month: 'Jul 2025', date: 'Sat 5th', event: 'Jagannatha Puri Bahuda Ratha Yatra', fasting: '—-' },
    { month: 'Jul 2025', date: 'Sun 6th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Jul 2025', date: 'Thu 10th', event: 'First month of Chaturmasya begins. Fasting from Shak (green leafy vegetables) for one month', fasting: '—-' },
    { month: 'Jul 2025', date: 'Sun 13th', event: 'Founding Day (As per the Founding Document: CERTIFICATE OF INCORPORATION OF ISKCON)', fasting: '—-' },
    { month: 'Jul 2025', date: 'Mon 21st', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Jul 2025', date: 'Tue 29th', event: 'Garuda Panchami (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'Aug 2025', date: 'Tue 5th', event: 'Ekadashi and Jhulan Yatra begins', fasting: 'Next day after Sunrise' },
    { month: 'Aug 2025', date: 'Sat 9th', event: 'Balarama Jayanthi: Appearance of Lord Balarama Jhulan Yatra ends Second month of Chaturmasya begins. Fasting from yogurt for one month.', fasting: 'Fasting till noon' },
    { month: 'Aug 2025', date: 'Wed 13th', event: 'Jaladuta\'s Voyage of Compassion begins (as per Jaladuta Diary)', fasting: '—-' },
    { month: 'Aug 2025', date: 'Fri 15th', event: 'Sri Krishna Janmashtami Celebrations (1st day)', fasting: '—-' },
    { month: 'Aug 2025', date: 'Sat 16th', event: 'Sri Krishna Janmashtami Celebrations (2nd day) Appearance of Lord Sri Krishna', fasting: 'Fasting till midnight' },
    { month: 'Aug 2025', date: 'Sun 17th', event: 'Nandotsava Sri Vyasa Puja: Appearance of Srila Prabhupada', fasting: 'Fasting till noon' },
    { month: 'Aug 2025', date: 'Tue 19th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Aug 2025', date: 'Sun 24th', event: 'Srila Prabhupada\'s Vyasa Puja Smaranam (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'Aug 2025', date: 'Sun 31st', event: 'Radhashtami: Appearance of Srimati Radharani', fasting: 'Fasting till noon' },
    { month: 'Sep 2025', date: 'Wed 3rd', event: 'Ekadashi', fasting: 'Fasting till noon today in addition to regular Ekadashi fasting. Next day Feast after Sunrise' },
    { month: 'Sep 2025', date: 'Thu 4th', event: 'Vamana Jayanthi: Appearance of Lord Vamanadeva', fasting: 'Fasting observed the previous day till noon' },
    { month: 'Sep 2025', date: 'Fri 5th', event: 'Srila Bhaktivinoda Thakura – Appearance', fasting: 'Fasting till noon' },
    { month: 'Sep 2025', date: 'Sun 7th', event: 'Acceptance of sannyasa by Srila Prabhupada (Srila Prabhupada sannyasa smriti) Third month of Chaturmasya begins. Fasting from milk for one month.', fasting: '—-' },
    { month: 'Sep 2025', date: 'Wed 17th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Sep 2025', date: 'Fri 19th', event: 'Jaladuta\'s Voyage of Compassion ends (as per Jaladuta Diary)', fasting: '—-' },
    { month: 'Oct 2025', date: 'Thu 2nd', event: 'Vijaya Dashami – Dasara Festival (in Mysore)', fasting: '—-' },
    { month: 'Oct 2025', date: 'Fri 3rd', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Oct 2025', date: 'Tue 7th', event: 'Fourth month of Chaturmasya begins. Fasting from Urad dal for one month. KARTHIKA DEEPOTSAVA BEGINS (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'Oct 2025', date: 'Fri 17th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Oct 2025', date: 'Wed 22nd', event: 'Govardhana Puja, Go Puja', fasting: '—-' },
    { month: 'Oct 2025', date: 'Sat 25th', event: 'Srila Prabhupada – Disappearance', fasting: 'Fasting till noon' },
    { month: 'Nov 2025', date: 'Sun 2nd', event: 'Srila Gaura Kishora Dasa Babaji – Disappearance & Ekadashi (Trisprsa Mahadvadasi)', fasting: 'Fasting till noon today in addition to regular Ekadashi fasting. Next day Feast after Sunrise' },
    { month: 'Nov 2025', date: 'Tue 4th', event: 'Chaturmasya ends.', fasting: '—-' },
    { month: 'Nov 2025', date: 'Wed 5th', event: 'Last day of Deepotsava (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'Nov 2025', date: 'Wed 12th', event: 'Srila Prabhupada Diksha Diwasa', fasting: '—-' },
    { month: 'Nov 2025', date: 'Sat 15th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Nov 2025', date: 'Sun 23rd', event: 'Srila Prabhupada Book Distribution Festival Inauguration (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'Dec 2025', date: 'Mon 1st', event: 'Gita Jayanti & Fasting for Ekadashi Vrata', fasting: 'Next day after Sunrise' },
    { month: 'Dec 2025', date: 'Mon 8th', event: 'Srila Bhaktisiddhanta Sarasvati Thakura – Disappearance', fasting: 'Fasting till noon' },
    { month: 'Dec 2025', date: 'Sat 13th', event: 'Kirtan Mela (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'Dec 2025', date: 'Sun 14th', event: 'Kirtan Mela (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'Dec 2025', date: 'Tue 16th', event: 'Paksa vardhini Mahadvadasi', fasting: 'Next day after Sunrise' },
    { month: 'Dec 2025', date: 'Tue 30th', event: 'Vaikuntha Ekadashi', fasting: 'No Fasting for Ekadashi vrata' },
    { month: 'Dec 2025', date: 'Wed 31st', event: 'Dvadasi (Fasting for Ekadashi vrata)', fasting: 'Next day after Sunrise' },
    { month: 'Jan 2026', date: 'Wed 14th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Jan 2026', date: 'Sun 25th', event: 'Sri Advaita Acharya – Appearance', fasting: 'Fasting till noon' },
    { month: 'Jan 2026', date: 'Thu 29th', event: 'Ekadashi', fasting: 'Fasting till noon today in addition to regular Ekadashi fasting. Next day Feast after Sunrise' },
    { month: 'Jan 2026', date: 'Fri 30th', event: 'Sri Varahadeva – Appearance', fasting: 'Fasting observed the previous day till noon' },
    { month: 'Jan 2026', date: 'Sat 31st', event: 'Nityananda Trayodashi: Appearance of Sri Nityananda Prabhu', fasting: 'Fasting till noon' },
    { month: 'Feb 2026', date: 'Sun 1st', event: 'Srila Prabhupada Book Distribution Festival Closing Ceremony and Prize Distribution (in ISKCON Bangalore)', fasting: '—-' },
    { month: 'Feb 2026', date: 'Fri 6th', event: 'Srila Bhaktisiddhanta Sarasvati Thakura – Appearance', fasting: 'Fasting till noon' },
    { month: 'Feb 2026', date: 'Fri 13th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Feb 2026', date: 'Fri 27th', event: 'Ekadashi', fasting: 'Next day after Sunrise' },
    { month: 'Mar 2026', date: 'Tue 3rd', event: 'Sri Gaura Poornima: Appearance of Sri Chaitanya Mahaprabhu', fasting: 'Fasting till Moonrise' },
  ];

  const months = ['all', ...Array.from(new Set(calendarData.map(item => item.month)))];

  const filteredData = selectedMonth === 'all' 
    ? calendarData 
    : calendarData.filter(item => item.month === selectedMonth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 mb-8">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar className="w-10 h-10 text-orange-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-orange-800">
              Vaishnava Calendar
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">Stay updated with all our spiritual celebrations, community programs, and special events (2025-2026)</p>
          <a 
            href="https://www.iskconbangalore.org/wp-content/uploads/2025/03/Vaishnava-Calendar_BLR_2025_26.xlsx.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download PDF Calendar
          </a>
        </div>

        {/* Filter */}
        {/* <div className="mb-6 flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
          <Filter className="w-5 h-5 text-orange-600" />
          <label className="font-semibold text-gray-700">Filter by Month:</label>
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {months.map(month => (
              <option key={month} value={month}>
                {month === 'all' ? 'All Months' : month}
              </option>
            ))}
          </select>
        </div> */}

        {/* Calendar Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-600 to-amber-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-left font-semibold">Month</th>
                  <th className="px-4 py-4 text-left font-semibold">Date</th>
                  <th className="px-4 py-4 text-left font-semibold">Festival/Event</th>
                  <th className="px-4 py-4 text-left font-semibold">Fasting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr 
                    key={index}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-orange-700">
                      {item.month}
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {item.event}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.fasting}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            Source: <a href="https://www.iskconbangalore.org/vaishnava-calendar/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-orange-600 hover:text-orange-700 underline">
              ISKCON Bangalore
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VaishnavaCalendar;