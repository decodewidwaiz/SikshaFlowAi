import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileQuestion, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Quiz {
  id: number;
  topic: string;
  score: number;
  total: number;
  date: string;
}

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('SikshaFlow AI_quizzes') || '[]');
    setQuizzes(storedQuizzes);
  }, []);

  const chartData = quizzes.map((quiz, idx) => ({
    name: `Quiz ${idx + 1}`,
    score: Math.round((quiz.score / quiz.total) * 100),
  }));

  const averageScore = quizzes.length > 0
    ? Math.round(quizzes.reduce((acc, q) => acc + (q.score / q.total) * 100, 0) / quizzes.length)
    : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#1C1C1C] mb-2">My Quizzes</h1>
        <p className="text-gray-600">Track your quiz performance and progress</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#E63946] bg-opacity-10 rounded-xl flex items-center justify-center">
              <FileQuestion className="w-6 h-6 text-[#E63946]" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Quizzes</p>
              <p className="text-2xl font-bold text-[#1C1C1C]">{quizzes.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-[#1C1C1C]">{averageScore}%</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-10 rounded-xl flex items-center justify-center">
              <FileQuestion className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Questions Answered</p>
              <p className="text-2xl font-bold text-[#1C1C1C]">
                {quizzes.reduce((acc, q) => acc + q.total, 0)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {quizzes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-md mb-8"
        >
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-6">Performance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
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
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-md"
      >
        <h2 className="text-xl font-bold text-[#1C1C1C] mb-6">Quiz History</h2>
        {quizzes.length > 0 ? (
          <div className="space-y-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E63946] bg-opacity-10 rounded-xl flex items-center justify-center">
                    <FileQuestion className="w-6 h-6 text-[#E63946]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1C1C1C]">{quiz.topic}</h4>
                    <p className="text-sm text-gray-500">{quiz.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#E63946]">
                    {quiz.score}/{quiz.total}
                  </p>
                  <p className="text-sm text-gray-500">
                    {Math.round((quiz.score / quiz.total) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileQuestion className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No quizzes completed yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Generate a lecture to create your first quiz!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Quizzes;
