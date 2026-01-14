import React, { useContext, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import { TaskContext } from '../context/TaskContext';
import TaskList from '../Components/TaskList';

export default function CompletedTasks() {
    const { state, dispatch } = useContext(TaskContext);

    const completed = useMemo(
        () => state.tasks.filter(t => t.status === 'Completed'),
        [state.tasks]
    );

    const handleDelete = id => {
        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold dark:text-white">
                    Completed Tasks
                </h2>
                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    {completed.length}
                </span>
            </div>

            {completed.length === 0 ? (
                <div className="text-center py-10">
                    <CheckCircle className="w-14 h-14 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No completed tasks yet
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                        Complete some tasks to see them here
                    </p>
                </div>
            ) : (
                <TaskList
                    tasks={completed}
                    onEdit={() => {}}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}
