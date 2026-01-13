import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="relative min-h-[400px] flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-64 h-64 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Empty State Content */}
        <div className="relative text-center animate-slideUp">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
              <Sparkles className="w-12 h-12 text-white animate-float" />
            </div>
          </div>

          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-3">
            No Tasks Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
            Start your productivity journey by creating your first task or let AI help you get organized!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                Click "New Task" to begin
              </span>
            </div>
            <div className="px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                Or use AI Assistant
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}