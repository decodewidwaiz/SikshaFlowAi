import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles, Brain, MessageCircle } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <nav className="px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Brain className="w-8 h-8 text-[#E63946]" />
          <span className="text-2xl font-bold text-[#1C1C1C]">SikshaFlow AI</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4"
        >
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 text-[#1C1C1C] hover:text-[#E63946] transition-all duration-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2 bg-[#E63946] text-white rounded-2xl hover:bg-[#d32f3b] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </motion.div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-[#1C1C1C] mb-6 leading-tight">
            Transform Ideas into
            <br />
            <span className="text-[#E63946]">Educational Excellence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered platform that turns your prompts into complete lecture materials,
            quizzes, and interactive learning experiences.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className="px-8 py-4 bg-[#E63946] text-white rounded-2xl text-lg font-semibold hover:bg-[#d32f3b] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-[#E63946] bg-opacity-10 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-[#E63946]" />
            </div>
            <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Generate Lectures</h3>
            <p className="text-gray-600">
              Create complete lecture materials with slides, videos, and quizzes from simple text prompts.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-[#E63946] bg-opacity-10 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-7 h-7 text-[#E63946]" />
            </div>
            <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">Interactive Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge with AI-generated quizzes and track your progress over time.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-[#E63946] bg-opacity-10 rounded-2xl flex items-center justify-center mb-4">
              <MessageCircle className="w-7 h-7 text-[#E63946]" />
            </div>
            <h3 className="text-xl font-bold text-[#1C1C1C] mb-3">1:1 Doubt Sessions</h3>
            <p className="text-gray-600">
              Get personalized help with your AI mentor Shikshak, available 24/7.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
