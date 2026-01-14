import { createContext, useReducer, useEffect } from 'react';
import { taskReducer, initialState } from './taskReducer';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }, [state.tasks]);

    useEffect(() => {
        localStorage.setItem('theme', state.theme);
    }, [state.theme]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}
