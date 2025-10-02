import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaBook, 
  FaHeart, 
  FaBullhorn, 
  // TfiThought, 
  FaUsers, 
  FaNewspaper, 
  FaFilter, 
  FaChevronDown, 
  FaListUl,
  FaEye,
  FaBookOpen
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { TfiThought } from "react-icons/tfi";

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', icon: <FaBook />, count: 250 },
    { id: 'teachings', name: 'Spiritual Teachings', icon: '🕉️', count: 85 },
    { id: 'festivals', name: 'Festivals', icon: '🎉', count: 45 },
    { id: 'history', name: 'Temple History', icon: '🏛️', count: 32 },
    { id: 'community', name: 'Community Stories', icon: <FaUsers />, count: 58 },
    { id: 'announcements', name: 'Announcements', icon: <FaBullhorn />, count: 25 },
    { id: 'philosophy', name: 'Philosophy', icon: <TfiThought />, count: 67 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <FaFilter />
        Browse by Category
      </h3>
      
      {/* Desktop Categories */}
      <div className="hidden md:flex flex-wrap gap-3 mb-6">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg ${
              activeCategory === category.id
                ? 'bg-saffron-gradient text-white'
                : 'bg-white/10 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 hover:border-saffron hover:border-opacity-80 dark:hover:border-opacity-50'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeCategory === category.id
                ? 'bg-white/20 text-white'
                : 'bg-orange-100 dark:bg-black/20 text-gray-700 dark:text-gray-300'
            }`}>
              {category.count}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Mobile Categories Dropdown */}
      <div className="md:hidden">
        <div className="relative">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full px-4 py-3 pr-10 bg-white/10 dark:bg-gray-900/80 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 shadow-lg appearance-none"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id} className="bg-white dark:bg-gray-900">
                {typeof category.icon === 'string' ? category.icon : '📄'} {category.name} ({category.count})
              </option>
            ))}
          </select>
          <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Active Category Info */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mt-4"
      >
        <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
          <FaEye />
          <span>
            Showing {categories.find(cat => cat.id === activeCategory)?.count} articles 
            {activeCategory === 'all' ? '' : ` in ${categories.find(cat => cat.id === activeCategory)?.name}`}
          </span>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <div className="flex justify-center items-center space-x-6 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <FaListUl className="text-saffron" />
            <span>Organized Content</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaBookOpen className="text-gold" />
            <span>Easy Discovery</span>
          </div>
          <div className="flex items-center space-x-1">
            <HiSparkles className="text-saffron" />
            <span>Curated Articles</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
