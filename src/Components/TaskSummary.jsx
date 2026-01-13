import React, { useMemo } from 'react';
import { CheckCircle, Circle, Clock, TrendingUp, Zap } from 'lucide-react';

export default function TaskSummary({ tasks }) {
    const summary = useMemo(() => {
        const s = { Pending: 0, 'In Progress': 0, Completed: 0 };
        tasks.forEach(t => s[t.status]++);
        const total = tasks.length;
        const completionRate = total > 0 ? Math.round((s.Completed / total) * 100) : 0;
        return { ...s, total, completionRate };
    }, [tasks]);

    const cards = [
        {
            label: 'Pending',
            value: summary.Pending,
            gradient: 'from-amber-400 via-orange-400 to-rose-500',
            icon: Circle,
            bgGradient: 'from-amber-500/10 via-orange-500/10 to-rose-500/10',
            iconBg: 'from-amber-400 to-orange-500',
            glowColor: 'shadow-orange-500/30'
        },
        {
            label: 'In Progress',
            value: summary['In Progress'],
            gradient: 'from-blue-400 via-cyan-400 to-teal-500',
            icon: Clock,
            bgGradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
            iconBg: 'from-blue-400 to-cyan-500',
            glowColor: 'shadow-cyan-500/30'
        },
        {
            label: 'Completed',
            value: summary.Completed,
            gradient: 'from-emerald-400 via-green-400 to-teal-500',
            icon: CheckCircle,
            bgGradient: 'from-emerald-500/10 via-green-500/10 to-teal-500/10',
            iconBg: 'from-emerald-400 to-green-500',
            glowColor: 'shadow-green-500/30'
        }
    ];

    return (
        <div className="mb-10">
            {/* Header with Completion Rate */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent mb-1">
                        Dashboard Overview
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Track your productivity in real-time
                    </p>
                </div>

                {/* Completion Rate Badge */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl px-6 py-3 border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-3">
                            <Zap className="w-5 h-5 text-purple-500" />
                            <div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Completion Rate</p>
                                <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    {summary.completionRate}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map(({ label, value, gradient, icon: Icon, bgGradient, iconBg, glowColor }) => (
                    <div
                        key={label}
                        className="group relative animate-slideUp hover:scale-105 transition-all duration-500"
                    >
                        {/* Glow Effect */}
                        <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500`} />

                        {/* Card Content */}
                        <div className={`relative bg-gradient-to-br ${bgGradient} backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-xl ${glowColor} group-hover:shadow-2xl transition-all duration-500 overflow-hidden`}>

                            {/* Animated Background Orbs */}
                            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                            <div className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                            {/* Content */}
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 uppercase tracking-wider">
                                        {label}
                                    </p>
                                    <p className="text-5xl font-extrabold dark:text-white mb-1">
                                        {value}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {value === 1 ? 'task' : 'tasks'}
                                    </p>
                                </div>

                                {/* Animated Icon */}
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${iconBg} rounded-xl blur-md opacity-50`} />
                                    <div className={`relative w-14 h-14 bg-gradient-to-br ${iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative z-10 mt-4 h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out`}
                                    style={{ width: summary.total > 0 ? `${(value / summary.total) * 100}%` : '0%' }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Insight Bar */}
            <div className="mt-6 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-red-900/20 rounded-xl p-4 border border-purple-200/50 dark:border-purple-800/30 backdrop-blur-sm">
                <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                    <span className="font-bold">{summary.total}</span> total tasks •
                    <span className="font-bold ml-2">{summary.Completed}</span> completed •
                    <span className="font-bold ml-2">{summary['In Progress'] + summary.Pending}</span> remaining
                </p>
            </div>
        </div>
    );
}