export const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
  theme: localStorage.getItem('theme') || 'light'
};

export function taskReducer(state, action) {
  let updatedTasks;

  switch (action.type) {
    case 'ADD_TASK':
      updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    case 'UPDATE_TASK':
      updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id ? action.payload : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    case 'DELETE_TASK':
      updatedTasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };

    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };

    default:
      return state;
  }
}