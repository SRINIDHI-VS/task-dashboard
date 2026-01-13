import React, { useState } from 'react';
import { X, AlertCircle, Sparkles, Calendar, FileText, Flag } from 'lucide-react';
import { validateTask } from '../utils/validators';

export default function TaskForm({ task = null, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'Pending',
    dueDate: task?.dueDate || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validateTask(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({ ...form, id: task?.id || Date.now() });
    onClose();
  };

  const statusOptions = [
    { value: 'Pending', icon: '🔶', gradient: 'from-amber-500 to-orange-500' },
    { value: 'In Progress', icon: '🔵', gradient: 'from-blue-500 to-cyan-500' },
    { value: 'Completed', icon: '✅', gradient: 'from-emerald-500 to-green-500' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Backdrop with Blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl animate-slideUp"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl opacity-30" />

        {/* Modal Content */}
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
          {/* Header with Gradient */}
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 p-6">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {task ? 'Edit Task' : 'Create New Task'}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {task ? 'Update your task details' : 'Add a new task to your board'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:rotate-90 duration-300"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FileText className="w-4 h-4" />
                Task Title *
              </label>
              <div className="relative group">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Complete project proposal"
                  className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                    ${errors.title 
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-purple-500 focus:bg-white dark:focus:bg-gray-900'
                    }
                    text-gray-900 dark:text-white placeholder:text-gray-400`}
                />
                {errors.title && (
                  <p className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400 animate-slideUp">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FileText className="w-4 h-4" />
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Add more details about your task..."
                rows="4"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                  bg-gray-50 dark:bg-gray-800 focus:border-purple-500 focus:bg-white dark:focus:bg-gray-900
                  transition-all duration-300 resize-none text-gray-900 dark:text-white 
                  placeholder:text-gray-400"
              />
            </div>

            {/* Status and Date Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Select */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Flag className="w-4 h-4" />
                  Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 
                      bg-gray-50 dark:bg-gray-800 focus:border-purple-500 focus:bg-white dark:focus:bg-gray-900
                      transition-all duration-300 text-gray-900 dark:text-white font-medium cursor-pointer"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.icon} {opt.value}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Due Date Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  Due Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300
                      ${errors.dueDate 
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/20' 
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-purple-500 focus:bg-white dark:focus:bg-gray-900'
                      }
                      text-gray-900 dark:text-white`}
                  />
                  {errors.dueDate && (
                    <p className="flex items-center gap-1 mt-2 text-sm text-red-600 dark:text-red-400 animate-slideUp">
                      <AlertCircle className="w-4 h-4" />
                      {errors.dueDate}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 
                  font-semibold text-gray-700 dark:text-gray-300 
                  hover:bg-gray-100 dark:hover:bg-gray-800 
                  transition-all duration-300 hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 relative group overflow-hidden px-6 py-3.5 rounded-xl font-semibold text-white
                  transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {task ? 'Update Task' : 'Create Task'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}