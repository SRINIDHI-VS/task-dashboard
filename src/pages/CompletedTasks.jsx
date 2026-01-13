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
    <div className="animate-fadeIn">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold dark:text-white">Completed Tasks</h2>
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
          {completed.length}
        </span>
      </div>

      {completed.length === 0 ? (
        <div className="text-center py-16">
          <CheckCircle className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No completed tasks yet
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Complete some tasks to see them here!
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