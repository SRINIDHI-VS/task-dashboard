import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, Trash2, Edit2, Calendar, Sparkles, Flag } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => onDelete(task.id), 300);
  };

  const statusConfig = {
    Pending: {
      gradient: 'from-amber-400 via-orange-400 to-rose-400',
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20',
      border: 'border-amber-200 dark:border-amber-800/30',
      icon: Circle,
      badgeGradient: 'from-amber-500 to-orange-500',
      glow: 'shadow-amber-500/20'
    },
    'In Progress': {
      gradient: 'from-blue-400 via-cyan-400 to-teal-400',
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/20',
      border: 'border-blue-200 dark:border-blue-800/30',
      icon: Clock,
      badgeGradient: 'from-blue-500 to-cyan-500',
      glow: 'shadow-blue-500/20'
    },
    Completed: {
      gradient: 'from-emerald-400 via-green-400 to-teal-400',
      bg: 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/20',
      border: 'border-emerald-200 dark:border-emerald-800/30',
      icon: CheckCircle,
      badgeGradient: 'from-emerald-500 to-green-500',
      glow: 'shadow-emerald-500/20'
    }
  };

  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  // Calculate days until due
  const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue >= 0 && daysUntilDue <= 3;

  return (
    <div
      className={`group relative ${config.bg} ${config.border} border-2 rounded-2xl p-6 
        ${deleting ? 'animate-slideOut' : 'animate-slideUp'} 
        transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${config.glow}
        backdrop-blur-sm overflow-hidden`}
    >
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Glowing Orb Effect */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${config.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
      
      {/* Priority Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${config.badgeGradient} text-white text-xs font-bold flex items-center gap-1.5 shadow-lg`}>
          <StatusIcon className="w-3 h-3" />
          {task.status}
        </div>
      </div>

      {/* Task Title with Sparkle Icon */}
      <div className="relative mb-4 pr-24">
        <div className="flex items-start gap-2">
          <Sparkles className="w-5 h-5 mt-1 text-purple-500 dark:text-purple-400 flex-shrink-0" />
          <h4 className="font-bold text-xl dark:text-white leading-tight">
            {task.title}
          </h4>
        </div>
      </div>

      {/* Description with Gradient Fade */}
      <div className="relative mb-5">
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {task.description || 'No description provided'}
        </p>
        {task.description && task.description.length > 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-gray-800 to-transparent" />
        )}
      </div>

      {/* Due Date with Dynamic Badge */}
      <div className="flex items-center gap-2 mb-5">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
          isOverdue 
            ? 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400' 
            : isDueSoon 
            ? 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
        }`}>
          <Calendar className="w-4 h-4" />
          <span className="text-xs font-semibold">
            {isOverdue 
              ? `Overdue by ${Math.abs(daysUntilDue)} days` 
              : isDueSoon 
              ? `Due in ${daysUntilDue} days`
              : new Date(task.dueDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
          </span>
        </div>
        {isDueSoon && !isOverdue && (
          <Flag className="w-4 h-4 text-yellow-500 animate-pulse" />
        )}
      </div>

      {/* Action Buttons with Glassmorphism */}
      <div className="flex gap-2 relative z-10">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 group/btn relative overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-md 
            border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 
            hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 
            hover:shadow-lg hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover/btn:opacity-10 transition-opacity" />
          <span className="relative flex items-center justify-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
            <Edit2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
            Edit
          </span>
        </button>
        
        <button
          onClick={handleDelete}
          className="flex-1 group/btn relative overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-md 
            border border-red-200 dark:border-red-900/30 rounded-xl py-2.5 
            hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300 
            hover:shadow-lg hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 opacity-0 group-hover/btn:opacity-10 transition-opacity" />
          <span className="relative flex items-center justify-center gap-2 font-semibold text-red-600 dark:text-red-400">
            <Trash2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
            Delete
          </span>
        </button>
      </div>

      {/* Bottom Glow Effect */}
      <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gradient-to-t ${config.gradient} blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
    </div>
  );
}