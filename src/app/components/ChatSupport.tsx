import React, { useState, useEffect, useRef } from 'react';
import MenuHeader from './MenuHeader';

interface ChatSupportProps {
    onClose: () => void;
}

const ChatSupport: React.FC<ChatSupportProps> = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, from: 'ai', text: 'Hi! How can I assist you today?' },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;

        const newUserMsg = { id: Date.now(), from: 'user', text: input.trim() };
        setMessages((msgs) => [...msgs, newUserMsg]);
        setInput('');

        setTimeout(() => {
            const aiReply = {
                id: Date.now() + 1,
                from: 'ai',
                text: "Thanks for your message! I'm here to help.",
            };
            setMessages((msgs) => [...msgs, aiReply]);
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-[500px] w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

            <MenuHeader title={'Chat Support'} onBack={onClose} />

            {/* Chat Body */}
            <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-blue-50 to-white">
                {messages.map(({ id, from, text }) => (
                    <div
                        key={id}
                        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm relative
              ${from === 'user'
                                ? 'bg-blue-600 text-white ml-auto rounded-br-sm'
                                : 'bg-white text-gray-900 shadow rounded-bl-sm'
                            }`}
                    >
                        {text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            {/* Input */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}
                className="flex items-center gap-3 px-4 py-4 bg-white border-t border-gray-200"
            >
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Type your message..."
                    className="flex-1 resize-none border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-full disabled:opacity-50 hover:bg-blue-700 transition text-sm font-medium"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatSupport;
