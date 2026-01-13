import React, { useContext } from 'react';
import { Moon, Sun, LayoutDashboard, CheckCheck, Sparkles } from 'lucide-react';
import { TaskContext } from '../context/TaskContext';

export default function Navigation({ currentView, setCurrentView }) {
  const { state, dispatch } = useContext(TaskContext);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  TaskMaster
                </span>
                <span className="text-xs ml-2 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold">
                  AI
                </span>
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl">
              <button
                onClick={() => setCurrentView('all')}
                className={`relative px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2
                  ${currentView === 'all'
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {currentView === 'all' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg" />
                )}
                <LayoutDashboard className="w-4 h-4 relative z-10" />
                <span className="relative z-10">All Tasks</span>
              </button>
              
              <button
                onClick={() => setCurrentView('completed')}
                className={`relative px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2
                  ${currentView === 'completed'
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                {currentView === 'completed' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg shadow-lg" />
                )}
                <CheckCheck className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Completed</span>
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
            className="group relative overflow-hidden w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 
              hover:shadow-lg transition-all duration-300 hover:scale-110"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            {state.theme === 'light' ? (
              <Moon className="absolute inset-0 m-auto w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:rotate-12 transition-transform" />
            ) : (
              <Sun className="absolute inset-0 m-auto w-5 h-5 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2 mt-4 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl">
          <button
            onClick={() => setCurrentView('all')}
            className={`relative flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2
              ${currentView === 'all'
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-400'
              }`}
          >
            {currentView === 'all' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg" />
            )}
            <LayoutDashboard className="w-4 h-4 relative z-10" />
            <span className="relative z-10">All</span>
          </button>
          
          <button
            onClick={() => setCurrentView('completed')}
            className={`relative flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2
              ${currentView === 'completed'
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-400'
              }`}
          >
            {currentView === 'completed' && (
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg shadow-lg" />
            )}
            <CheckCheck className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Completed</span>
          </button>
        </div>
      </div>
    </nav>
  );
}