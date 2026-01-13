import React from 'react';
import { Search, Plus, Filter, SortAsc, Sparkles } from 'lucide-react';

export default function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  onAddTask
}) {
  return (
    <div className="relative mb-8">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20" />
      
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar with Icon */}
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            <div className="relative flex items-center">
              <div className="absolute left-4 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search tasks by title..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent rounded-xl 
                  focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 
                  transition-all duration-300 text-gray-900 dark:text-white
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  hover:bg-white dark:hover:bg-gray-800"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Filter Dropdown */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            <div className="relative flex items-center">
              <Filter className="absolute left-4 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="appearance-none pl-11 pr-10 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent rounded-xl 
                  focus:border-purple-500 focus:bg-white dark:focus:bg-gray-800
                  transition-all duration-300 text-gray-900 dark:text-white font-medium
                  hover:bg-white dark:hover:bg-gray-800 cursor-pointer min-w-[180px]"
              >
                <option value="ALL">All Status</option>
                <option value="Pending">🔶 Pending</option>
                <option value="In Progress">🔵 In Progress</option>
                <option value="Completed">✅ Completed</option>
              </select>
              <div className="absolute right-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            <div className="relative flex items-center">
              <SortAsc className="absolute left-4 w-4 h-4 text-gray-500 dark:text-gray-400 pointer-events-none" />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-11 pr-10 py-3.5 bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent rounded-xl 
                  focus:border-cyan-500 focus:bg-white dark:focus:bg-gray-800
                  transition-all duration-300 text-gray-900 dark:text-white font-medium
                  hover:bg-white dark:hover:bg-gray-800 cursor-pointer min-w-[180px]"
              >
                <option value="ASC">📅 Due Date (Soonest)</option>
                <option value="DESC">📅 Due Date (Latest)</option>
              </select>
              <div className="absolute right-4 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Add Task Button */}
          <button
            onClick={onAddTask}
            className="group/btn relative overflow-hidden px-8 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
              rounded-xl font-bold text-white shadow-lg hover:shadow-2xl
              transform hover:scale-105 transition-all duration-300
              flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
            <Sparkles className="w-5 h-5 relative z-10 group-hover/btn:rotate-180 transition-transform duration-500" />
            <span className="relative z-10">New Task</span>
            <Plus className="w-5 h-5 relative z-10 group-hover/btn:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Active Filters Display */}
        {(search || status !== 'ALL') && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Active Filters:</span>
            {search && (
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium flex items-center gap-1">
                Search: "{search}"
                <button onClick={() => setSearch('')} className="hover:text-blue-900 dark:hover:text-blue-100">✕</button>
              </span>
            )}
            {status !== 'ALL' && (
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium flex items-center gap-1">
                Status: {status}
                <button onClick={() => setStatus('ALL')} className="hover:text-purple-900 dark:hover:text-purple-100">✕</button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}