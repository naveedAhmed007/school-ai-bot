import React, { useState, useEffect, useRef, ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { CartoonAvatars } from '../constants/cartoonAvatars';
import { Avatar } from '@heroui/avatar';
import { User } from 'lucide-react';
interface Message {
    id: number;
    from: 'user' | 'ai';
    text: string;
}

interface ChatSupportProps {
    onClose: () => void;
    title?: string;
    headerContent?: ReactNode;
}

const ChatSupport: React.FC<ChatSupportProps> = ({
    onClose,
    title = 'Chat Support',
    headerContent,
}) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, from: 'ai', text: '👋 Hello! I’m your assistant. How can I help you today?' },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), from: 'user', text: input.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const aiReply: Message = {
                id: Date.now() + 1,
                from: 'ai',
                text: "🤖 Got it! Let me look into that for you.",
            };
            setMessages((prev) => [...prev, aiReply]);
            setIsTyping(false);
        }, 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };
    const avatarId = useSelector((state: any) => state.avatar.avatarId);
    const selectedAvatarObj: any | null =
        avatarId ? CartoonAvatars.find((a) => a.id === avatarId) ?? null : null;





    return (
        <div className="flex flex-col h-[550px] w-full max-w-md bg-white rounded-b-2xl shadow-lg border border-t-0 overflow-hidden">
            {/* Generic Header */}

            <div className="sticky top-0 z-10 bg-white shadow px-4 py-3 flex items-center justify-between">
                {headerContent ? (
                    headerContent
                ) : (
                    <>
                        <button
                            onClick={onClose}
                            aria-label="Back"
                            className="text-blue-600 font-semibold hover:text-blue-800 transition"
                        >
                            ←
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                        {/* Spacer to balance flex */}
                        <div style={{ width: 50 }} />
                    </>
                )}
            </div>

            {/* Chat Messages */}
            <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-blue-50 to-white text-sm">
                {messages.map(({ id, from, text }) => (
                    <div key={id} className={`flex ${from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-end gap-2 max-w-[80%]">
                            {from === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg">
                                    🤖
                                </div>
                            )}
                            <div
                                className={`px-4 py-2 rounded-2xl shadow-md leading-snug
                ${from === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                        : 'bg-white text-gray-900 border rounded-bl-sm'
                                    }`}
                            >
                                {text}
                            </div>
                            {from === 'user' && (
                                selectedAvatarObj?.src ? (
                                    <Avatar
                                        src={selectedAvatarObj.src}
                                        name={selectedAvatarObj.name}
                                        className="w-8 h-8 rounded-full object-cover border border-gray-300"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg">
                                        🧑
                                    </div>
                                )
                            )}                       </div>
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg">🤖</div>
                        <div className="bg-white border px-4 py-2 rounded-2xl text-gray-400 text-sm animate-pulse">
                            Typing...
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </main>

            {/* Input Area */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                }}
                className="sticky bottom-0 flex items-center gap-2 px-4 py-3 bg-white border-t"
            >
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Type your message..."
                    className="flex-1 resize-none border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatSupport;
