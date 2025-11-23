import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, FileQuestion, Download, MessageSquare, User, LogOut, Brain, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { logout, user } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: BookOpen, label: 'Generate Lecture', path: '/dashboard/generate' },
    { icon: FileQuestion, label: 'My Quizzes', path: '/dashboard/quizzes' },
    { icon: Brain, label: 'AI Study Planner', path: '/dashboard/study-planner' },
    { icon: BookOpen, label: 'Notes Summarizer', path: '/dashboard/notes-summarizer' },
    { icon: Download, label: 'Downloads', path: '/dashboard/downloads' },
    { icon: MessageSquare, label: 'Doubt Sessions', path: '/dashboard/doubts' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Overlay - only shown on mobile when sidebar is open */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed lg:static left-0 top-0 h-screen w-70 bg-white shadow-xl z-50 lg:flex lg:flex-col"
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E63946] rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-[#1C1C1C]">SikshaFlow AI</h2>
                  <p className="text-xs text-gray-500">{user?.name}</p>
                </div>
              </div>
              <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-[#E63946]">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-[#E63946] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;