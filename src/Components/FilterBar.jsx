import React from 'react';
import { Search, Plus, Filter, SortAsc } from 'lucide-react';

export default function FilterBar({
    search,
    setSearch,
    status,
    setStatus,
    sort,
    setSort,
    onAddTask
}) {
    return (
        <div className="mb-4">
            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur rounded-lg p-2 border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search tasks"
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="pl-9 pr-8 py-2 text-sm rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        >
                            <option value="ALL">All</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="relative">
                        <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="pl-9 pr-8 py-2 text-sm rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        >
                            <option value="ASC">Due soon</option>
                            <option value="DESC">Due later</option>
                        </select>
                    </div>

                    <button
                        onClick={onAddTask}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm rounded-md bg-blue-900 text-white hover:bg-blue-700"
                    >
                        <Plus className="w-4 h-4" />
                        New
                    </button>
                </div>
            </div>
        </div>
    );
}
