import { motion } from 'framer-motion';
import { BookOpen, FileQuestion, TrendingUp, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockProgressData, mockQuizzes } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: BookOpen,
      label: 'Lectures Created',
      value: '12',
      color: 'bg-blue-500',
    },
    {
      icon: FileQuestion,
      label: 'Quizzes Attempted',
      value: mockQuizzes.length.toString(),
      color: 'bg-green-500',
    },
    {
      icon: Award,
      label: 'Average Score',
      value: `${Math.round((mockQuizzes.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / mockQuizzes.length))}%`,
      color: 'bg-[#E63946]',
    },
    {
      icon: TrendingUp,
      label: 'Streak Days',
      value: '7',
      color: 'bg-orange-500',
    },
  ];

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
        <h1 className="text-3xl font-bold text-[#1C1C1C] mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">Here's an overview of your learning progress</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#1C1C1C] mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-6">Progress Over Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#E63946"
                strokeWidth={3}
                dot={{ fill: '#E63946', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {mockQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#E63946] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <FileQuestion className="w-5 h-5 text-[#E63946]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1C1C1C]">{quiz.topic} Quiz</h4>
                    <p className="text-sm text-gray-500">{quiz.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#E63946]">
                    {quiz.score}/{quiz.total}
                  </p>
                  <p className="text-sm text-gray-500">Score</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-[#E63946] to-[#d32f3b] rounded-2xl p-8 text-white shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-2">Ready to learn something new?</h2>
        <p className="mb-6 opacity-90">
          Generate a new lecture or take a quiz to continue your learning journey
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-[#E63946] rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300">
            Generate Lecture
          </button>
          <button className="px-6 py-3 bg-white bg-opacity-20 text-white rounded-xl font-semibold hover:bg-opacity-30 transition-all duration-300">
            Browse Quizzes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
