import React, { useState } from 'react';
import { X, AlertCircle, Sparkles, Calendar, FileText, Flag } from 'lucide-react';
import { validateTask } from '../utils/validators';

export default function TaskForm({ task = null, onClose, onSubmit }) {
    const [form, setForm] = useState(() => ({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'Pending',
        dueDate: task?.dueDate || ''
    }));
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
        { value: 'Pending' },
        { value: 'In Progress' },
        { value: 'Completed' }
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex justify-center items-start p-3 overflow-y-auto"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/50" />
            <div
                className="relative w-full max-w-xl my-6"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 max-h-[85vh] flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-500" />
                            <h3 className="text-sm font-semibold dark:text-white">
                                {task ? 'Edit Task' : 'New Task'}
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="p-4 space-y-4 overflow-y-auto">
                        <div className="space-y-1">
                            <label className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                                <FileText className="w-3 h-3" />
                                Title
                            </label>
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 rounded-md border text-sm
                                ${errors.title
                                        ? 'border-red-500'
                                        : 'border-gray-300 dark:border-gray-700'
                                    }`}
                            />
                            {errors.title && (
                                <p className="flex items-center gap-1 text-xs text-red-500">
                                    <AlertCircle className="w-3 h-3" />
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                                <FileText className="w-3 h-3" />
                                Description
                            </label>
                            <textarea
                                rows="3"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    <Flag className="w-3 h-3" />
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
                                >
                                    {statusOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.value}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    <Calendar className="w-3 h-3" />
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={form.dueDate}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 rounded-md border text-sm
                                    ${errors.dueDate
                                            ? 'border-red-500'
                                            : 'border-gray-300 dark:border-gray-700'
                                        }`}
                                />
                                {errors.dueDate && (
                                    <p className="flex items-center gap-1 text-xs text-red-500">
                                        <AlertCircle className="w-3 h-3" />
                                        {errors.dueDate}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="flex-1 px-3 py-2 rounded-md bg-blue-900 text-white text-sm hover:bg-blue-800"
                            >
                                {task ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
