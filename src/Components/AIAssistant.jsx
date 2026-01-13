import React, { useState, useContext } from 'react';
import { Sparkles, X, Send, Bot } from 'lucide-react';
import { TaskContext } from '../context/TaskContext';

export default function AIAssistant() {
    const { dispatch } = useContext(TaskContext);
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');

    const handleAI = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setResponse('');

        try {
            const res = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    messages: [
                        {
                            role: 'user',
                            content: `You are a task management assistant. Help the user with: "${input}". 
            
If they want to create a task, respond ONLY with valid JSON in this exact format:
{"action": "create", "task": {"title": "...", "description": "...", "status": "Pending", "dueDate": "YYYY-MM-DD"}}

If they want suggestions or help, provide helpful advice in plain text.

Keep responses concise and actionable.`
                        }
                    ]
                })
            });

            const data = await res.json();
            const text = data.content.map(c => c.text || '').join('\n').trim();

            try {
                const parsed = JSON.parse(text.replace(/```json|```/g, ''));
                if (parsed.action === 'create' && parsed.task) {
                    dispatch({
                        type: 'ADD_TASK',
                        payload: { ...parsed.task, id: Date.now() }
                    });
                    setResponse('✨ Task created successfully from AI!');
                    setTimeout(() => {
                        setOpen(false);
                        setInput('');
                        setResponse('');
                    }, 2000);
                }
            } catch {
                setResponse(text);
            }
        } catch (err) {
            setResponse('AI assistant unavailable. Please try again.');
        }
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAI();
        }
    };

    return (
        <>
            {/* Floating AI Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-8 right-8 z-50 group"
                title="AI Assistant"
            >
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse-glow" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 rounded-full shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                    <Sparkles className="w-7 h-7 text-white group-hover:rotate-180 transition-transform duration-500" />
                </div>
            </button>

            {/* AI Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-lg" />

                    {/* Modal */}
                    <div
                        className="relative w-full max-w-2xl animate-slideUp"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur-2xl opacity-40" />

                        {/* Modal Content */}
                        <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 p-6">
                                <div className="absolute inset-0 bg-black/10" />
                                <div className="relative flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                            <Bot className="w-6 h-6 text-white animate-pulse" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                                                AI Assistant
                                                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">Beta</span>
                                            </h3>
                                            <p className="text-white/80 text-sm">
                                                Powered by Claude AI
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:rotate-90 duration-300"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Example Prompts */}
                                <div className="mb-6">
                                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                                        Try asking:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            'Create a task to review code by tomorrow',
                                            'Add team meeting task for Friday',
                                            'Help me prioritize my tasks'
                                        ].map((prompt, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setInput(prompt)}
                                                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 transition-all hover:scale-105"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Input Area */}
                                <div className="relative mb-4">
                                    <textarea
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Describe what you need... (Press Enter to send)"
                                        rows="4"
                                        className="w-full px-4 py-4 pr-14 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:border-purple-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 resize-none text-gray-900 dark:text-white placeholder:text-gray-400"
                                    />
                                    <button
                                        onClick={handleAI}
                                        disabled={loading || !input.trim()}
                                        className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Send className="w-5 h-5 text-white" />
                                        )}
                                    </button>
                                </div>

                                {/* Response Area */}
                                {response && (
                                    <div className="relative animate-slideUp">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20" />
                                        <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-800/30">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <Bot className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                                        AI Response
                                                    </p>
                                                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                                        {response}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Info */}
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                                    💡 AI can help you create tasks, set priorities, and organize your work
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}