import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Video, Calendar, Search } from 'lucide-react';
import { mockDownloads } from '../utils/mockData';

const Downloads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredDownloads = mockDownloads.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-6 h-6 text-[#E63946]" />;
      case 'MP4':
        return <Video className="w-6 h-6 text-[#E63946]" />;
      default:
        return <FileText className="w-6 h-6 text-[#E63946]" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#1C1C1C] mb-2">Downloads</h1>
        <p className="text-gray-600">Access all your generated learning materials</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-md mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search downloads..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E63946] focus:outline-none transition-all duration-300"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'PDF', 'MP4', 'TXT'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filterType === type
                    ? 'bg-[#E63946] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredDownloads.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.03, y: -5 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-video bg-gray-200 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-[#1C1C1C] mb-2 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </div>
                </div>
                <div className="w-10 h-10 bg-[#E63946] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-2">
                  {getIconForType(item.type)}
                </div>
              </div>
              <button className="w-full py-2 bg-[#E63946] text-white rounded-xl hover:bg-[#d32f3b] transition-all duration-300 flex items-center justify-center gap-2 font-semibold">
                <Download className="w-4 h-4" />
                Download {item.type}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredDownloads.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl p-12 shadow-md text-center"
        >
          <Download className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#1C1C1C] mb-2">No downloads found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search' : 'Generate a lecture to create your first download'}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Downloads;
