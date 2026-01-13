import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Navigation from './Components/Navigation';
import AllTasks from './pages/AllTasks';
import CompletedTasks from './pages/CompletedTasks';
import AIAssistant from './Components/AIAssistant';
import './App.css';

export default function App() {
  const [currentView, setCurrentView] = React.useState('all');

  return (
    <TaskProvider>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20 transition-colors duration-500">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
        </div>

        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        
        <div className="relative z-10 max-w-7xl mx-auto p-6">
          {currentView === 'all' ? <AllTasks /> : <CompletedTasks />}
        </div>
        
        <AIAssistant />

        {/* Background Grid Pattern CSS */}
        <style>{`
          .bg-grid-pattern {
            background-image: 
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
          }
        `}</style>
      </div>
    </TaskProvider>
  );
}