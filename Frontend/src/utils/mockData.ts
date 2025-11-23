export const mockQuizzes = [
  {
    id: 1,
    topic: 'Water Cycle',
    score: 3,
    total: 3,
    date: '2025-11-05',
  },
  {
    id: 2,
    topic: 'Photosynthesis',
    score: 2,
    total: 3,
    date: '2025-11-04',
  },
  {
    id: 3,
    topic: 'Solar System',
    score: 3,
    total: 3,
    date: '2025-11-03',
  },
];

export const mockDownloads = [
  {
    id: 1,
    title: 'Water Cycle - Complete Lecture',
    type: 'PDF',
    date: '2025-11-05',
    thumbnail: 'https://images.pexels.com/photos/1229841/pexels-photo-1229841.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    title: 'Photosynthesis Video Lecture',
    type: 'MP4',
    date: '2025-11-04',
    thumbnail: 'https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 3,
    title: 'Solar System Quiz',
    type: 'TXT',
    date: '2025-11-03',
    thumbnail: 'https://images.pexels.com/photos/220071/pexels-photo-220071.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export const mockQuestions = [
  {
    id: 1,
    question: 'What is the first stage of the water cycle?',
    options: ['Condensation', 'Evaporation', 'Precipitation', 'Collection'],
    correct: 1,
  },
  {
    id: 2,
    question: 'Which of these is a renewable energy source?',
    options: ['Coal', 'Solar Power', 'Natural Gas', 'Oil'],
    correct: 1,
  },
  {
    id: 3,
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'],
    correct: 2,
  },
];

export const mockProgressData = [
  { month: 'Jan', score: 70 },
  { month: 'Feb', score: 75 },
  { month: 'Mar', score: 85 },
  { month: 'Apr', score: 80 },
  { month: 'May', score: 90 },
  { month: 'Jun', score: 95 },
];

export const mockDoubtSessions = [
  {
    id: 1,
    title: 'Understanding Calculus',
    lastMessage: 'Can you explain derivatives?',
    timestamp: '2025-11-05T10:30:00',
    messages: [
      { id: 1, sender: 'user', text: 'I need help with derivatives', timestamp: '10:25 AM' },
      { id: 2, sender: 'mentor', text: 'Of course! A derivative represents the rate of change of a function. Think of it as the slope at any point on a curve.', timestamp: '10:26 AM' },
      { id: 3, sender: 'user', text: 'Can you explain derivatives?', timestamp: '10:30 AM' },
    ],
  },
  {
    id: 2,
    title: 'Chemistry Help',
    lastMessage: 'Thanks for the explanation!',
    timestamp: '2025-11-04T14:20:00',
    messages: [
      { id: 1, sender: 'user', text: 'What is atomic bonding?', timestamp: '2:15 PM' },
      { id: 2, sender: 'mentor', text: 'Atomic bonding occurs when atoms share or transfer electrons to achieve stability.', timestamp: '2:18 PM' },
      { id: 3, sender: 'user', text: 'Thanks for the explanation!', timestamp: '2:20 PM' },
    ],
  },
];

export const mockChatResponses = [
  "That's a great question! Let me help you understand that better.",
  "I can definitely assist with that. Here's what you need to know...",
  "Interesting topic! Let me break it down for you.",
  "I'm here to help! This concept is easier than it seems.",
  "Great thinking! Let's explore this together.",
];
