import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChatbotShikshak from './ChatbotShikshak';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Ensure sidebar is open on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setSidebarOpen(true);
      }
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative flex h-screen bg-[#FAFAFA] overflow-hidden">
      {/* Render sidebar - it handles its own visibility on large screens */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header without menu button */}
        <header className="bg-white shadow-sm px-6 py-4">
          {/* Menu button removed - sidebar is always visible */}
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />

        </main>
      </div>

      <ChatbotShikshak />
    </div>
  );
};

export default DashboardLayout;