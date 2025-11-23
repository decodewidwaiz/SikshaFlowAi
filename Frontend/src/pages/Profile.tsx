import { motion } from 'framer-motion';
import { User, Mail, Calendar, Award, BookOpen, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  const stats = [
    { icon: BookOpen, label: 'Lectures Created', value: '12', color: 'bg-blue-500' },
    { icon: Award, label: 'Quizzes Completed', value: '8', color: 'bg-green-500' },
    { icon: TrendingUp, label: 'Average Score', value: '85%', color: 'bg-[#E63946]' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-[#1C1C1C] mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and view your stats</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden mb-8"
      >
        <div className="bg-gradient-to-r from-[#E63946] to-[#d32f3b] h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
            <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white">
              <User className="w-16 h-16 text-[#E63946]" />
            </div>
            <div className="flex-1 md:mb-4">
              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-1">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <button className="md:mb-4 px-6 py-2 bg-[#E63946] text-white rounded-xl hover:bg-[#d32f3b] transition-all duration-300 font-semibold">
              Edit Profile
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#1C1C1C] mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-md"
      >
        <h2 className="text-xl font-bold text-[#1C1C1C] mb-6">Account Information</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-[#E63946] bg-opacity-10 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-[#E63946]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-[#1C1C1C]">{user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-[#E63946] bg-opacity-10 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#E63946]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-semibold text-[#1C1C1C]">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-[#E63946] bg-opacity-10 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#E63946]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-semibold text-[#1C1C1C]">November 2025</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
