import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Plus } from 'lucide-react';
import { mockDoubtSessions, mockChatResponses } from '../utils/mockData';

interface Message {
  id: number;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
}

interface Session {
  id: number;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: Message[];
}

const DoubtSessions = () => {
  const [sessions, setSessions] = useState<Session[]>(mockDoubtSessions);
  const [activeSession, setActiveSession] = useState<Session>(sessions[0]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeSession.messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: activeSession.messages.length + 1,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...activeSession.messages, newMessage];
    const updatedSession = {
      ...activeSession,
      messages: updatedMessages,
      lastMessage: inputText,
      timestamp: new Date().toISOString(),
    };

    setActiveSession(updatedSession);
    setSessions(sessions.map((s) => (s.id === activeSession.id ? updatedSession : s)));
    setInputText('');

    setTimeout(() => {
      const mentorResponse: Message = {
        id: updatedMessages.length + 1,
        sender: 'mentor',
        text: mockChatResponses[Math.floor(Math.random() * mockChatResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const updatedWithResponse = {
        ...updatedSession,
        messages: [...updatedMessages, mentorResponse],
      };

      setActiveSession(updatedWithResponse);
      setSessions(sessions.map((s) => (s.id === activeSession.id ? updatedWithResponse : s)));
    }, 1500);
  };

  const handleNewSession = () => {
    const newSession: Session = {
      id: Date.now(),
      title: 'New Doubt Session',
      lastMessage: 'Session started',
      timestamp: new Date().toISOString(),
      messages: [
        {
          id: 1,
          sender: 'mentor',
          text: "Hello! I'm here to help. What would you like to learn about today?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    setSessions([newSession, ...sessions]);
    setActiveSession(newSession);
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-[#1C1C1C] mb-2">Doubt Sessions</h1>
        <p className="text-gray-600">Get personalized help with your learning</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100%-5rem)]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 bg-white rounded-2xl shadow-md p-4 overflow-y-auto"
        >
          <button
            onClick={handleNewSession}
            className="w-full py-3 bg-[#E63946] text-white rounded-xl hover:bg-[#d32f3b] transition-all duration-300 flex items-center justify-center gap-2 mb-4 font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Session
          </button>

          <div className="space-y-2">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeSession.id === session.id
                    ? 'bg-[#E63946] bg-opacity-10 border-2 border-[#E63946]'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <h4 className="font-semibold text-[#1C1C1C] mb-1 truncate">
                  {session.title}
                </h4>
                <p className="text-sm text-gray-500 truncate">{session.lastMessage}</p>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 bg-white rounded-2xl shadow-md flex flex-col"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#E63946] bg-opacity-10 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#E63946]" />
              </div>
              <div>
                <h3 className="font-bold text-[#1C1C1C]">{activeSession.title}</h3>
                <p className="text-sm text-gray-500">Active Session</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeSession.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-[#E63946] text-white'
                      : 'bg-gray-100 text-[#1C1C1C]'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-white opacity-70' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your doubt..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E63946] focus:outline-none transition-all duration-300"
              />
              <button
                onClick={handleSend}
                className="px-6 py-3 bg-[#E63946] text-white rounded-xl hover:bg-[#d32f3b] transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoubtSessions;
