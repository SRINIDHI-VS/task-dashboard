import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, Trash2, Edit2, Calendar } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => onDelete(task.id), 200);
  };

  const statusConfig = {
    Pending: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-800/30',
      icon: Circle,
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
    },
    'In Progress': {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-800/30',
      icon: Clock,
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
    },
    Completed: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'border-emerald-200 dark:border-emerald-800/30',
      icon: CheckCircle,
      badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    }
  };

  const config = statusConfig[task.status];
  const StatusIcon = config.icon;

  const daysUntilDue = Math.ceil(
    (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const isOverdue = daysUntilDue < 0;

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-lg p-4
        ${deleting ? 'opacity-50' : ''}
        transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <StatusIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <h4 className="text-sm font-semibold dark:text-white line-clamp-1">
            {task.title}
          </h4>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${config.badge}`}>
          {task.status}
        </span>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
        {task.description || 'No description'}
      </p>

      <div className="flex items-center gap-2 mb-3 text-xs">
        <Calendar className="w-3 h-3" />
        <span
          className={
            isOverdue
              ? 'text-red-600 dark:text-red-400'
              : 'text-gray-600 dark:text-gray-400'
          }
        >
          {isOverdue
            ? `Overdue`
            : new Date(task.dueDate).toLocaleDateString()}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 text-xs hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Edit2 className="w-3 h-3" />
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md border border-red-200 dark:border-red-900/40 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
      </div>
    </div>
  );
}
