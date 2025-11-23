import { useState } from 'react';

const StudyPlanner = () => {
  const [subjects, setSubjects] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [deadline, setDeadline] = useState('');
  const [schedule, setSchedule] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would call an AI service to generate the study plan
    // For now, we'll just show a mock response
    setSchedule({
      subjects: subjects.split(',').map(s => s.trim()),
      difficulty,
      deadline,
      plan: [
        { day: 'Monday', tasks: ['Review mathematics concepts', 'Practice 10 problems'] },
        { day: 'Tuesday', tasks: ['Read science chapter 5', 'Complete summary notes'] },
        { day: 'Wednesday', tasks: ['Solve physics problems', 'Review previous topics'] },
        { day: 'Thursday', tasks: ['Practice mock test', 'Analyze weak areas'] },
        { day: 'Friday', tasks: ['Group study session', 'Clarify doubts'] },
        { day: 'Saturday', tasks: ['Full syllabus revision', 'Take practice test'] },
        { day: 'Sunday', tasks: ['Rest and light review', 'Prepare for next week'] }
      ]
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#1C1C1C] mb-6">AI Study Planner</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Your Study Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subjects (comma separated)
            </label>
            <input
              type="text"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              placeholder="e.g., Mathematics, Physics, Chemistry"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946]"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946]"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E63946] focus:border-[#E63946]"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#E63946] text-white py-2 px-4 rounded-lg hover:bg-[#d32f3f] transition-colors duration-300 font-medium"
          >
            Generate Study Plan
          </button>
        </form>
      </div>
      
      {schedule && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Personalized Study Plan</h2>
          <div className="mb-4">
            <p><span className="font-medium">Subjects:</span> {schedule.subjects.join(', ')}</p>
            <p><span className="font-medium">Difficulty:</span> {schedule.difficulty}</p>
            <p><span className="font-medium">Deadline:</span> {schedule.deadline}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedule.plan.map((day: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{day.day}</h3>
                <ul className="space-y-1">
                  {day.tasks.map((task: string, taskIndex: number) => (
                    <li key={taskIndex} className="text-sm text-gray-600">• {task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;