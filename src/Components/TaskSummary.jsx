import React, { useMemo } from 'react';
import { CheckCircle, Circle, Clock, TrendingUp } from 'lucide-react';

export default function TaskSummary({ tasks }) {
    const summary = useMemo(() => {
        const s = { Pending: 0, 'In Progress': 0, Completed: 0 };
        tasks.forEach(t => s[t.status]++);
        const total = tasks.length;
        const completionRate = total ? Math.round((s.Completed / total) * 100) : 0;
        return { ...s, total, completionRate };
    }, [tasks]);

    const cards = [
        { label: 'Pending', value: summary.Pending, icon: Circle, bar: 'bg-amber-500', iconColor: 'text-amber-600' },
        { label: 'In Progress', value: summary['In Progress'], icon: Clock, bar: 'bg-blue-500', iconColor: 'text-blue-600' },
        { label: 'Completed', value: summary.Completed, icon: CheckCircle, bar: 'bg-emerald-500', iconColor: 'text-emerald-600' }
    ];

    return (
        <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold dark:text-white">
                        Overview
                    </h2>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Task summary
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5">
                    <p className="text-[10px] text-gray-500">Completion</p>
                    <p className="text-sm font-semibold dark:text-white">
                        {summary.completionRate}%
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cards.map(({ label, value, icon: Icon, bar, iconColor }) => (
                    <div
                        key={label}
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide">
                                    {label}
                                </p>
                                <p className="text-2xl font-semibold dark:text-white">
                                    {value}
                                </p>
                            </div>
                            <Icon className={`w-4 h-4 ${iconColor}`} />
                        </div>

                        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                            <div
                                className={`h-full rounded-full ${bar}`}
                                style={{
                                    width: summary.total
                                        ? `${(value / summary.total) * 100}%`
                                        : '0%'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                {summary.total} total • {summary.Completed} completed •{' '}
                {summary.Pending + summary['In Progress']} remaining
            </div>
        </div>
    );
}
