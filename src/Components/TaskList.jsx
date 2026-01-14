import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onDelete }) {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="relative min-h-[240px] flex items-center justify-center">
                <div className="relative text-center">
                    <div className="w-14 h-14 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-blue-900 dark:text-blue-400" />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        No Tasks Yet
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        Create a task to get started
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md">
                        <TrendingUp className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                            Click “New Task”
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
