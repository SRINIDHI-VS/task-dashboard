import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckCheck, Sparkles } from 'lucide-react';

export default function Navigation() {
    const linkClass = isActive =>
        `px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 ${isActive
            ? 'bg-blue-900 text-white'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`;

    return (
        <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h1 className="text-lg font-semibold dark:text-white">
                        TaskMaster
                        <span className="text-[10px] ml-1 px-1.5 py-0.5 bg-blue-900 text-white rounded">
                            AI
                        </span>
                    </h1>
                </div>

                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <NavLink to="/tasks" className={({ isActive }) => linkClass(isActive)}>
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        All
                    </NavLink>

                    <NavLink to="/completed" className={({ isActive }) => linkClass(isActive)}>
                        <CheckCheck className="w-3.5 h-3.5" />
                        Completed
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}
