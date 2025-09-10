import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FaSearch, 
  FaSpinner, 
  FaArrowRight, 
  FaHashtag, 
  FaLightbulb, 
  FaEye, 
  FaBookOpen, 
  FaTag, 
  FaTimes, 
  FaFilter,
  FaHeart
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';


export default function SearchFunction() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchSuggestions = [
    'Janmashtami celebration',
    'Bhagavad Gita teachings',
    'Temple history',
    'Community service',
    'Spiritual practices',
    'Festival stories'
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setIsSearching(true);
      // Simulate search
      setTimeout(() => {
        setSearchResults([
          { title: 'The Philosophy of Bhagavad Gita', category: 'Teachings' },
          { title: 'Janmashtami Celebrations 2024', category: 'Festivals' },
          { title: 'Community Kitchen Stories', category: 'Community' }
        ]);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-8"
    >
      <div className="relative">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search articles, teachings, stories..."
            className="w-full px-6 py-4 pl-12 pr-12 bg-white/90 dark:bg-gray-900/80 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 rounded-2xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all duration-300 backdrop-blur-xl shadow-lg"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {isSearching ? (
              <FaSpinner className="w-5 h-5 text-saffron animate-spin" />
            ) : (
              <FaSearch className="text-lg" />
            )}
          </div>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-saffron transition-colors duration-300"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        {searchQuery.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center gap-2">
              <FaEye />
              Popular searches:
            </p>
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="bg-orange-100 dark:bg-purple-900/30 text-orange-700 dark:text-purple-200 px-3 py-1 rounded-full text-sm hover:bg-saffron hover:text-white dark:hover:text-black transition-all duration-300 flex items-center gap-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHashtag className="text-xs" />
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-900/95 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 rounded-xl backdrop-blur-xl z-50 shadow-2xl"
          >
            {searchResults.map((result, index) => (
              <motion.div
                key={index}
                className="p-4 hover:bg-orange-100/80 dark:hover:bg-saffron/10 transition-colors duration-300 border-b border-orange-200/60 dark:border-gray-700 last:border-b-0 cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-gray-800 dark:text-white font-semibold flex items-center gap-2">
                      <FaBookOpen className="text-saffron" />
                      {result.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1 mt-1">
                      <FaTag className="text-xs" />
                      {result.category}
                    </p>
                  </div>
                  <FaArrowRight className="text-saffron" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {searchQuery.length > 2 && !isSearching && searchResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-900/95 border border-orange-200 dark:border-purple-400 border-opacity-60 dark:border-opacity-30 rounded-xl backdrop-blur-xl z-50 shadow-2xl p-6 text-center"
          >
            <div className="text-4xl mb-2">🔍</div>
            <h4 className="text-gray-800 dark:text-white font-semibold mb-2">No articles found</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Try searching for different keywords or browse our categories
            </p>
          </motion.div>
        )}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <div className="flex justify-center items-center space-x-6 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <FaFilter className="text-saffron" />
            <span>Smart Search</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaLightbulb className="text-gold" />
            <span>Quick Suggestions</span>
          </div>
          <div className="flex items-center space-x-1">
            <HiSparkles className="text-saffron" />
            <span>Instant Results</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
