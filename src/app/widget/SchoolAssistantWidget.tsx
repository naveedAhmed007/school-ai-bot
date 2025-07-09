import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ArrowLeft, Clock, Calendar, Phone, Mail, MapPin, Users, BookOpen, Heart, AlertCircle } from 'lucide-react';

// Inline SVG cartoon avatars as React components
const CartoonAvatars = [
    {
        id: 1,
        name: 'Alex (Male, Young)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#F9D5B3" />
                <path fill="#5D4037" d="M20 40c6 4 24 4 24 0v8H20v-8z" />
                <circle cx="22" cy="30" r="5" fill="#3E2723" />
                <circle cx="42" cy="30" r="5" fill="#3E2723" />
                <path d="M20 25c0-6 24-6 24 0" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 2,
        name: 'Bella (Female, Young)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#FFD1DC" />
                <path fill="#4E342E" d="M16 38c7 5 24 5 24 0v6H16v-6z" />
                <circle cx="22" cy="28" r="6" fill="#6D4C41" />
                <circle cx="42" cy="28" r="6" fill="#6D4C41" />
                <path d="M22 26c0-5 20-5 20 0" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 3,
        name: 'Chris (Non-binary)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#C6B89F" />
                <path fill="#3E2723" d="M24 40c8 6 16 0 16 0v6H24v-6z" />
                <circle cx="25" cy="30" r="5" fill="#4E342E" />
                <circle cx="40" cy="30" r="5" fill="#4E342E" />
                <path d="M24 25c0-6 16-6 16 0" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 4,
        name: 'Dana (Older Female)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#E7C9A9" />
                <path fill="#4E342E" d="M18 38c9 6 24 6 24 0v5H18v-5z" />
                <circle cx="22" cy="28" r="7" fill="#6D4C41" />
                <circle cx="42" cy="28" r="7" fill="#6D4C41" />
                <path d="M20 24c0-4 24-4 24 0" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 5,
        name: 'Eli (Bald Male)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#B49982" />
                <path fill="#3E2723" d="M21 38c6 5 22 5 22 0v5H21v-5z" />
                <circle cx="24" cy="30" r="5" fill="#5D4037" />
                <circle cx="40" cy="30" r="5" fill="#5D4037" />
                <path d="M21 25c0-5 22-5 22 0" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: 6,
        name: 'Faith (Young Female, Glasses)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#FFD9B3" />
                <path fill="#4E342E" d="M18 38c8 7 24 7 24 0v5H18v-5z" />
                <circle cx="22" cy="28" r="6" fill="#6D4C41" />
                <circle cx="42" cy="28" r="6" fill="#6D4C41" />
                <rect x="16" y="25" width="12" height="4" fill="none" stroke="#3E2723" strokeWidth="2" rx="2" ry="2" />
                <rect x="36" y="25" width="12" height="4" fill="none" stroke="#3E2723" strokeWidth="2" rx="2" ry="2" />
                <path d="M20 22c0-3 24-3 24 0" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
            </svg>
        ),
    },
];

const menuOptions = [
    { id: 'school-info', name: 'School Information', icon: BookOpen },
    { id: 'wellbeing', name: 'Wellbeing & Support', icon: Heart },
    { id: 'parent-resources', name: 'Parent Resources', icon: Users },
    { id: 'careers', name: 'Careers & Universities (6th Form)', icon: BookOpen },
    { id: 'report', name: 'Report Incident/Absence', icon: AlertCircle },
    { id: 'question', name: 'Ask a Question', icon: MessageCircle },
    { id: 'teacher-portal', name: 'Teacher Portal', icon: Users },
];

const schoolInfoSubMenu = [
    { name: 'School Calendar', icon: Calendar, content: 'View important dates and events for the academic year.' },
    { name: 'Term Dates', icon: Clock, content: 'Term 1: Sept 4 - Dec 15, 2024\nTerm 2: Jan 8 - Mar 28, 2025\nTerm 3: Apr 14 - Jul 18, 2025' },
    { name: 'Uniform Information', icon: Users, content: 'Navy blazer, white shirt, school tie, grey trousers/skirt. PE kit includes house t-shirt and navy shorts.' },
    { name: 'Canteen Menu', icon: BookOpen, content: 'Weekly rotating menu available. Healthy options include salad bar, jacket potatoes, and fresh fruit daily.' },
    { name: 'Contact Information', icon: Phone, content: 'Main Office: 01234 567890\nEmail: office@school.edu\nAddress: 123 Education Street, Learning City, LC1 2AB' },
    { name: 'Policies & Procedures', icon: BookOpen, content: 'Access to behavior policy, safeguarding procedures, and academic guidelines.' },
];

const teacherPortalMenu = [
    { name: 'AI Lesson Planner', icon: BookOpen, content: 'Generate personalized lesson plans using AI technology.' },
    { name: 'Classroom Analytics', icon: BookOpen, content: 'Track student engagement and performance metrics.' },
    { name: 'Teacher Wellbeing Hub', icon: Heart, content: 'Resources and support for teacher mental health and work-life balance.' },
    { name: 'Student Support Centre', icon: Users, content: 'Tools for identifying and supporting students who need additional help.' },
    { name: 'Resource Library', icon: BookOpen, content: 'Access to teaching materials, worksheets, and digital resources.' },
    { name: 'Progress Tracking', icon: BookOpen, content: 'Monitor student progress and generate reports for parents.' },
];

const quickResponses = [
    "What are the school hours?",
    "How do I report an absence?",
    "What's for lunch today?",
    "When is the next parent evening?",
    "How do I contact my child's teacher?",
    "What's the homework policy?"
];

export default function SchoolAssistantWidget() {
    const [open, setOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [avatarSelected, setAvatarSelected] = useState<number | null>(null);
    const [chatMode, setChatMode] = useState(false);
    const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'bot', timestamp: Date}>>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let timeoutId: NodeJS.Timeout | null = null;

        const observer = new ResizeObserver(() => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if (!containerRef.current) return;
                const { offsetWidth: width, offsetHeight: height } = containerRef.current;
                window.parent.postMessage(
                    { type: 'resizeSchoolWidget', width, height },
                    '*'
                );
            }, 100);
        });

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleMenuClick = (menuId: string) => {
        if (menuId === 'question') {
            setChatMode(true);
            setSelectedMenu(null);
        } else {
            setSelectedMenu(menuId);
        }
    };

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
    };

    const resetMenu = () => {
        setSelectedMenu(null);
        setSelectedItem(null);
    };

    const resetToMain = () => {
        setSelectedMenu(null);
        setSelectedItem(null);
        setChatMode(false);
    };

    const getSubMenuItems = (menuId: string): any[] => {
        switch (menuId) {
            case 'school-info':
                return schoolInfoSubMenu;
            case 'teacher-portal':
                return teacherPortalMenu;
            default:
                return [];
        }
    };

    const simulateBotResponse = (userMessage: string) => {
        setIsTyping(true);
        
        setTimeout(() => {
            let response = "I'm here to help! Let me find that information for you.";
            
            if (userMessage.toLowerCase().includes('hours')) {
                response = "School hours are 8:30 AM - 3:30 PM Monday to Friday. The school office is open from 8:00 AM - 4:00 PM.";
            } else if (userMessage.toLowerCase().includes('absence')) {
                response = "To report an absence, please call the main office at 01234 567890 before 9:00 AM or use the online absence form on the school website.";
            } else if (userMessage.toLowerCase().includes('lunch')) {
                response = "Today's lunch menu includes chicken curry with rice, vegetarian pasta, jacket potatoes, and fresh salad bar. All meals are £3.50.";
            } else if (userMessage.toLowerCase().includes('parent evening')) {
                response = "The next parent evening is scheduled for Thursday, March 14th, 2025 from 4:00 PM - 7:00 PM. Booking will open next week.";
            } else if (userMessage.toLowerCase().includes('teacher')) {
                response = "You can contact your child's teacher via the school app, email through the main office, or by calling 01234 567890.";
            } else if (userMessage.toLowerCase().includes('homework')) {
                response = "Our homework policy allows 30 minutes per subject for Years 7-9, and 45 minutes for Years 10-11. All homework is set via the school app.";
            }
            
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: response,
                sender: 'bot',
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user' as const,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        simulateBotResponse(inputMessage);
        setInputMessage('');
    };

    const handleQuickResponse = (response: string) => {
        setInputMessage(response);
        handleSendMessage();
    };

    const selectedAvatarObj = avatarSelected
        ? CartoonAvatars.find((a) => a.id === avatarSelected)
        : null;

    return (
        <div ref={containerRef} className="fixed bottom-4 right-4 z-50 font-sans">
            {open ? (
                <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[85vh] sm:h-[80vh] md:h-[75vh] lg:h-[70vh] xl:h-[34rem] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden mx-4 sm:mx-0">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <h2 className="text-sm sm:text-lg font-semibold flex items-center gap-2">
                            {selectedAvatarObj && (
                                <span aria-label={selectedAvatarObj.name} title={selectedAvatarObj.name} className="hidden sm:inline">
                                    {selectedAvatarObj.svg}
                                </span>
                            )}
                            <span className="hidden sm:inline">Hello! I'm your School Assistant</span>
                            <span className="sm:hidden">School Assistant</span>
                        </h2>
                        <button
                            onClick={() => setOpen(false)}
                            className="hover:text-gray-300 transition-colors p-1"
                            aria-label="Close School Assistant Chat"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Avatar Selection */}
                    {avatarSelected === null ? (
                        <div className="flex flex-col items-center justify-center flex-1 gap-4 sm:gap-6 px-4 sm:px-6 text-center">
                            <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
                                To personalize your experience, please choose an avatar:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-xs sm:max-w-none">
                                {CartoonAvatars.map((avatar) => (
                                    <button
                                        key={avatar.id}
                                        className="rounded-full border border-gray-300 p-2 sm:p-3 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-110"
                                        onClick={() => setAvatarSelected(avatar.id)}
                                        aria-label={`Select avatar ${avatar.name}`}
                                    >
                                        <div className="w-12 h-12 sm:w-16 sm:h-16">
                                            {React.cloneElement(avatar.svg, { className: "w-full h-full" })}
                                        </div>
                                        <div className="mt-1 sm:mt-2 text-xs font-semibold text-gray-700">{avatar.name}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : chatMode ? (
                        /* Chat Mode */
                        <div className="flex-1 flex flex-col">
                            <div className="px-3 sm:px-4 py-2 bg-gray-50 border-b flex items-center gap-2">
                                <button
                                    onClick={resetToMain}
                                    className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                                >
                                    <ArrowLeft size={16} />
                                </button>
                                <span className="text-sm text-gray-600">Ask a Question</span>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                                {messages.length === 0 && (
                                    <div className="text-center text-gray-500 py-4 sm:py-8">
                                        <MessageCircle size={32} className="sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
                                        <p className="mb-3 sm:mb-4 text-sm sm:text-base">Start a conversation! Try these common questions:</p>
                                        <div className="grid grid-cols-1 gap-2 max-w-xs sm:max-w-none mx-auto">
                                            {quickResponses.map((response, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleQuickResponse(response)}
                                                    className="text-left p-2 text-xs sm:text-sm bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                >
                                                    {response}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {messages.map((message) => (
                                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] sm:max-w-xs p-2 sm:p-3 rounded-lg ${
                                            message.sender === 'user' 
                                                ? 'bg-blue-600 text-white' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                                            <p className="text-xs mt-1 opacity-70">
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 p-2 sm:p-3 rounded-lg">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div ref={messagesEndRef} />
                            </div>
                            
                            <div className="p-3 sm:p-4 border-t bg-gray-50">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type your message..."
                                        className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!inputMessage.trim()}
                                        className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Menu Navigation */
                        <div className="flex-1 overflow-auto px-3 sm:px-5 py-3 sm:py-4 text-gray-700">
                            {!selectedMenu ? (
                                <div className="space-y-2 sm:space-y-3" role="menu">
                                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Main Menu:</p>
                                    {menuOptions.map((menu) => {
                                        const Icon = menu.icon;
                                        return (
                                            <button
                                                key={menu.id}
                                                role="menuitem"
                                                onClick={() => handleMenuClick(menu.id)}
                                                className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 hover:bg-blue-50 rounded-xl border border-gray-200 shadow-sm transition-colors flex items-center gap-2 sm:gap-3"
                                            >
                                                <Icon size={16} className="sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                                                <span className="text-sm sm:text-base">{menu.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : selectedItem ? (
                                <div className="space-y-3 sm:space-y-4">
                                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                        <button
                                            onClick={() => setSelectedItem(null)}
                                            className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                                        >
                                            <ArrowLeft size={16} />
                                        </button>
                                        <h3 className="text-base sm:text-lg font-semibold text-blue-700">{selectedItem.name}</h3>
                                    </div>
                                    
                                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                                        <div className="flex items-start gap-2 sm:gap-3">
                                            <selectedItem.icon size={20} className="sm:w-6 sm:h-6 text-blue-600 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed">{selectedItem.content}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={resetToMain}
                                        className="w-full px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                                    >
                                        Back to Main Menu
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2 sm:space-y-3">
                                    <div className="mb-3 flex justify-between items-center">
                                        <h3 className="text-sm sm:text-base font-semibold text-blue-700">
                                            {menuOptions.find(m => m.id === selectedMenu)?.name}
                                        </h3>
                                        <button
                                            onClick={resetMenu}
                                            className="text-xs sm:text-sm text-blue-500 hover:underline"
                                        >
                                            ← Back
                                        </button>
                                    </div>

                                    {getSubMenuItems(selectedMenu).map((item, idx) => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleItemClick(item)}
                                                className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-2 sm:gap-3"
                                            >
                                                <Icon size={16} className="sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                                                <p className="text-sm sm:text-base font-medium">{item.name}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="p-3 sm:p-4 text-center text-xs text-gray-400 border-t">
                        © {new Date().getFullYear()} School Assistant. All rights reserved.
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white p-3 sm:p-4 rounded-full shadow-xl shadow-indigo-300 hover:shadow-indigo-400 transition-all duration-300 transform hover:scale-105"
                    aria-label="Open School Assistant Chat"
                >
                    <MessageCircle size={20} className="sm:w-6 sm:h-6" />
                </button>
            )}
        </div>
    );
}