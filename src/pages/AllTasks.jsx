import { useContext, useState, useMemo } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskSummary from '../Components/TaskSummary';
import FilterBar from '../Components/FilterBar';
import TaskList from '../Components/TaskList';
import TaskForm from '../Components/TaskForm';

export default function AllTasks() {
    const { state, dispatch } = useContext(TaskContext);
    const [showForm, setShowForm] = useState(false);
    const [editTask, setEditTask] = useState(null);
    const [status, setStatus] = useState('ALL');
    const [sort, setSort] = useState('ASC');
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        let result =
            status === 'ALL'
                ? state.tasks
                : state.tasks.filter(t => t.status === status);

        if (search) {
            result = result.filter(t =>
                t.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        return result.sort((a, b) =>
            sort === 'ASC'
                ? new Date(a.dueDate) - new Date(b.dueDate)
                : new Date(b.dueDate) - new Date(a.dueDate)
        );
    }, [state.tasks, status, search, sort]);

    const handleSubmit = task => {
        const isUpdate = task.id && state.tasks.find(t => t.id === task.id);
        dispatch({
            type: isUpdate ? 'UPDATE_TASK' : 'ADD_TASK',
            payload: task
        });
        setShowForm(false);
        setEditTask(null);
    };

    const handleEdit = task => {
        setEditTask(task);
        setShowForm(true);
    };

    const handleDelete = id => {
        dispatch({ type: 'DELETE_TASK', payload: id });
    };

    return (
        <div className="space-y-4">
            <TaskSummary tasks={state.tasks} />

            <FilterBar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                sort={sort}
                setSort={setSort}
                onAddTask={() => setShowForm(true)}
            />

            <TaskList
                tasks={filtered}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showForm && (
                <TaskForm
                    task={editTask}
                    onClose={() => {
                        setShowForm(false);
                        setEditTask(null);
                    }}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
}
