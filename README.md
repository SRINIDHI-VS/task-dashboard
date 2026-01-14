# TaskMaster – Task Management Dashboard

TaskMaster is a modern, React-based task management dashboard that enables users to efficiently manage tasks with filtering, sorting, persistence, and clean UI/UX patterns. The application is designed with scalability, maintainability, and a senior-level frontend architecture in mind.

---

## Features

### Core Functionality
- Create, edit, and delete tasks
- Task properties:
  - Title
  - Description
  - Status (Pending, In Progress, Completed)
  - Due Date
- Validation for required fields:
  - Title
  - Due Date
- Filter tasks by status
- Sort tasks by due date
- Search tasks by title

---

###  Dashboard
A summary section that displays:
- Number of **Pending** tasks
- Number of **In Progress** tasks
- Number of **Completed** tasks
- **Completion percentage** of all tasks

---

###  Navigation
- Client-side routing using **React Router**
- Dedicated views for:
  - **All Tasks**
  - **Completed Tasks**
- Default redirect:
  - `/` → `/tasks`

---

###  Persistence
- Tasks are stored in **localStorage**
- Theme preference (light/dark) stored in **localStorage**
- State is automatically restored on page refresh

---

###  UI / UX
- Fully responsive layout (mobile, tablet, desktop)
- Clean and minimal design using **Tailwind CSS**
- Reusable and composable components
- Modal-based task creation and editing
- Consistent spacing, typography, and color system

---

##  Tech Stack
- **React 18**
- **React Router**
- **Context API + useReducer**
- **Tailwind CSS**
- **Lucide React Icons**
- **LocalStorage** for persistence

---

##  Project Structure

```text
src/
├── Components/
│   ├── FilterBar.jsx        # Task filtering and search controls
│   ├── Navigation.jsx       # App navigation and routing links
│   ├── TaskCard.jsx         # Individual task UI component
│   ├── TaskForm.jsx         # Create/Edit task modal form
│   ├── TaskList.jsx         # Task list renderer
│   └── TaskSummary.jsx     # Dashboard summary metrics
├── context/
│   ├── TaskContext.jsx     # Global task context provider
│   └── taskReducer.js      # Pure reducer for task state updates
├── pages/
│   ├── AllTasks.jsx        # All tasks view
│   └── CompletedTasks.jsx  # Completed tasks view
├── utils/
│   └── validators.js       # Form validation helpers
├── App.js                  # Application routes and layout
├── index.js                # React DOM entry point
└── index.css               # Tailwind base styles

```
---

##  State Management

- Centralized application state managed using **Context API**
- Business logic encapsulated in a **pure reducer** for predictable updates
- Side effects such as **localStorage synchronization** handled using `useEffect`
- Ensures predictable state transitions and simplifies debugging and maintenance

---

## Routing

| Route        | Description              |
|--------------|--------------------------|
| `/tasks`     | All tasks view           |
| `/completed` | Completed tasks view     |
| `/`          | Redirects to `/tasks`    |

---

##  Notes

- Designed following **senior-level frontend best practices**
- Easily extendable to support:
  - Authentication & authorization
  - API-based persistence
  - Drag-and-drop task reordering
- Suitable for:
  - Technical interviews
  - Developer portfolios
  - Real-world task management applications

---

##  License

This project is intended strictly for **educational and demonstration purposes**.

---
