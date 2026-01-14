import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navigation from './Components/Navigation';
import AllTasks from './pages/AllTasks';
import CompletedTasks from './pages/CompletedTasks';
import './App.css';

export default function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
        </div>

        <Navigation />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-4">
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/completed" element={<CompletedTasks />} />
          </Routes>
        </div>
      </div>
    </TaskProvider>
  );
}
