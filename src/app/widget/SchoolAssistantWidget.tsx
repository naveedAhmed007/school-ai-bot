import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, X, Send, ArrowLeft, Clock, Calendar, Phone, Users, BookOpen, Heart, AlertCircle } from 'lucide-react';

/* ------------------------------------------------------------------
   Types
-------------------------------------------------------------------*/

interface MenuOption {
    id: string;
    name: string;
    icon: any;
}

interface SubMenuItem {
    name: string;
    icon: any;
    content: string;
}

interface Avatar {
    id: number;
    name: string;
    svg: React.ReactElement;
}

// Inline SVG cartoon avatars as React components
const CartoonAvatars: Avatar[] = [
    {
        id: 1,
        name: 'Alex (Male, Young)',
        svg: (
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const menuOptions: MenuOption[] = [
    { id: 'school-info', name: 'School Information', icon: BookOpen },
    { id: 'wellbeing', name: 'Wellbeing & Support', icon: Heart },
    { id: 'parent-resources', name: 'Parent Resources', icon: Users },
    { id: 'careers', name: 'Careers & Universities (6th Form)', icon: BookOpen },
    { id: 'report', name: 'Report Incident/Absence', icon: AlertCircle },
    { id: 'question', name: 'Ask a Question', icon: MessageCircle },
    { id: 'teacher-portal', name: 'Teacher Portal', icon: Users },
];

const schoolInfoSubMenu: SubMenuItem[] = [
    { name: 'School Calendar', icon: Calendar, content: 'View important dates and events for the academic year.' },
    { name: 'Term Dates', icon: Clock, content: 'Term 1: Sept 4 - Dec 15, 2024\nTerm 2: Jan 8 - Mar 28, 2025\nTerm 3: Apr 14 - Jul 18, 2025' },
    { name: 'Uniform Information', icon: Users, content: 'Navy blazer, white shirt, school tie, grey trousers/skirt. PE kit includes house t-shirt and navy shorts.' },
    { name: 'Canteen Menu', icon: BookOpen, content: 'Weekly rotating menu available. Healthy options include salad bar, jacket potatoes, and fresh fruit daily.' },
    { name: 'Contact Information', icon: Phone, content: 'Main Office: 01234 567890\nEmail: office@school.edu\nAddress: 123 Education Street, Learning City, LC1 2AB' },
    { name: 'Policies & Procedures', icon: BookOpen, content: 'Access to behavior policy, safeguarding procedures, and academic guidelines.' },
];

const teacherPortalMenu: SubMenuItem[] = [
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

const subMenus: Record<string, SubMenuItem[]> = {
    'school-info': schoolInfoSubMenu,
    'teacher-portal': teacherPortalMenu,
};

/* ------------------------------------------------------------------
   Component
-------------------------------------------------------------------*/

export default function SchoolAssistantWidget() {
    const [open, setOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [avatarSelected, setAvatarSelected] = useState<number | null>(null);
    const [chatMode, setChatMode] = useState(false);
    const [messages, setMessages] = useState<Array<{ id: number, text: string, sender: 'user' | 'bot', timestamp: Date }>>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    /* ------------------------------ Device Detection ----------------*/
    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
            const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
            const isSmallScreen = window.innerWidth < 768;
            setIsMobile(isMobileDevice || isSmallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    /* ------------------------------ Auto‑scroll --------------------*/
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /* ------------------------------ Lock body scroll ---------------*/
    useEffect(() => {
        if (open && isMobile) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        };
    }, [open, isMobile]);

    /* ------------------------------ Handlers -----------------------*/
    const handleMenuClick = (menuId: string) => {
        if (menuId === 'question') {
            setChatMode(true);
            setSelectedMenu(null);
        } else {
            setSelectedMenu(menuId);
        }
    };

    const handleQuickResponse = (text: string) => {
        handleSendMessage(text);
    };

    const handleSendMessage = useCallback(
        (forcedText?: string) => {
            const text = forcedText ?? inputMessage;
            if (!text.trim()) return;
            setMessages((m) => [...m, { id: Date.now(), text, sender: 'user', timestamp: new Date() }]);
            setInputMessage('');
            simulateBotResponse(text);
        },
        [inputMessage]
    );

    const handleItemClick = (item: any) => {
        setSelectedItem(item);
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

    const simulateBotResponse = useCallback((userText: string) => {
        setIsTyping(true);
        setTimeout(() => {
            const lower = userText.toLowerCase();
            let reply = "I'm here to help! Let me find that information for you.";
            if (lower.includes('hours')) reply = 'School hours are 8:30 AM - 3:30 PM Monday to Friday.';
            else if (lower.includes('absence')) reply = 'To report an absence, call 01234 567890 before 9 AM or use our online form.';
            else if (lower.includes('lunch')) reply = "Today's lunch: chicken curry, vegetarian pasta, salad bar. £3.50.";
            else if (lower.includes('parent evening')) reply = 'Next parent evening: Thu 14 Mar 2025, 4–7 PM.';
            else if (lower.includes('teacher')) reply = "Contact teachers via the app, email, or phone 01234 567890.";
            else if (lower.includes('homework')) reply = 'Homework: 30 min (Y7‑9), 45 min (Y10‑11) per subject.';
            setMessages((m) => [...m, { id: Date.now(), text: reply, sender: 'bot', timestamp: new Date() }]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    }, []);

    /* ------------------------------ Helpers ------------------------*/
    const resetMenu = () => {
        setSelectedMenu(null);
        setSelectedItem(null);
    };

    const resetToMain = () => {
        setSelectedMenu(null);
        setSelectedItem(null);
        setChatMode(false);
    };

    const selectedAvatarObj = avatarSelected ? CartoonAvatars.find((a) => a.id === avatarSelected) : null;

    // Dynamic sizing based on device
    const getWidgetSize = () => {
        if (isMobile) {
            return {
                width: '100vw',
                height: '100dvh',
                maxWidth: '100vw',
                maxHeight: '100dvh',
                borderRadius: '0px',
                position: 'fixed' as const,
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                /* respect the notch / status‑bar */
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
                paddingLeft: 'env(safe-area-inset-left)',
                paddingRight: 'env(safe-area-inset-right)',
                boxSizing: 'border-box',
            } as React.CSSProperties;
        } else {
            return {
                width: 'min(90vw, 28rem)',
                height: 'min(85vh, 36rem)',
                maxWidth: '28rem',
                maxHeight: '36rem',
                borderRadius: '1.5rem',
                position: 'relative' as const,
            } as React.CSSProperties;
        }
    };

    const widgetStyle = getWidgetSize();

    /* ----------------------------------------------------------------
       JSX
    ----------------------------------------------------------------*/
    return (
        <div
            ref={containerRef}
            className="z-50 font-sans"
            style={{
                bottom: isMobile ? '0' : '1rem',
                right: isMobile ? '0' : '1rem',
                left: isMobile ? '0' : 'auto',
                top: isMobile ? '0' : 'auto',
            }}
        >
            {open ? (
                <div
                    className="bg-white shadow-2xl border border-gray-200 flex flex-col overflow-hidden fixed"
                    style={widgetStyle}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <h2 className="text-sm md:text-lg font-semibold flex items-center gap-2">
                            {selectedAvatarObj && (
                                <span className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" aria-label={selectedAvatarObj.name}>
                                    {selectedAvatarObj.svg}
                                </span>
                            )}
                            <span className="hidden md:inline">Hello! I'm your School Assistant</span>
                            <span className="md:hidden">School Assistant</span>
                        </h2>
                        <button
                            aria-label="Close"
                            onClick={() => setOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={isMobile ? 18 : 20} />
                        </button>
                    </div>

                    {/* Avatar Selection */}
                    {avatarSelected === null ? (
                        <div className="flex flex-col items-center justify-center flex-1 gap-4 px-4 py-6 text-center">
                            <p className="text-gray-600 text-sm md:text-base mb-2">Choose an avatar to get started:</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-md">
                                {CartoonAvatars.map((av) => (
                                    <button
                                        key={av.id}
                                        onClick={() => setAvatarSelected(av.id)}
                                        className="flex flex-col items-center p-3 md:p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    >
                                        <div className="w-12 h-12 md:w-14 md:h-14 mb-2">
                                            {av.svg}
                                        </div>
                                        <div className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">
                                            {av.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : chatMode ? (
                        /* ------------- Chat Mode -------------------*/
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className="px-4 py-3 bg-gray-50 border-b flex items-center gap-3">
                                <button
                                    onClick={resetToMain}
                                    className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <span className="text-sm font-medium text-gray-700">Ask a Question</span>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                                {messages.length === 0 && (
                                    <div className="text-center text-gray-500 py-8">
                                        <MessageCircle size={isMobile ? 28 : 32} className="mx-auto mb-4 text-gray-300" />
                                        <p className="mb-4 text-sm md:text-base">Start a conversation! Try these common questions:</p>
                                        <div className="grid gap-2 max-w-sm mx-auto">
                                            {quickResponses.map((q) => (
                                                <button
                                                    key={q}
                                                    onClick={() => handleQuickResponse(q)}
                                                    className="text-left p-3 text-sm bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                >
                                                    {q}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {messages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3 rounded-lg ${msg.sender === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                            <p className="text-xs mt-1 opacity-70">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-gray-100 p-3 rounded-lg" aria-live="polite">
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

                            <div className="p-4 border-t bg-gray-50">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        onClick={() => handleSendMessage()}
                                        disabled={!inputMessage.trim()}
                                        className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Menu Navigation */
                        <div className="flex-1 overflow-auto p-4 text-gray-700">
                            {!selectedMenu ? (
                                <div className="space-y-3" role="menu">
                                    <p className="text-sm text-gray-500 mb-4">What can I help you with today?</p>
                                    {menuOptions.map((menu) => {
                                        const Icon = menu.icon;
                                        return (
                                            <button
                                                key={menu.id}
                                                role="menuitem"
                                                onClick={() => handleMenuClick(menu.id)}
                                                className="w-full text-left px-4 py-4 bg-white hover:bg-blue-50 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md flex items-center gap-3"
                                            >
                                                <Icon size={20} className="text-blue-600 flex-shrink-0" />
                                                <span className="text-sm md:text-base font-medium">{menu.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : selectedItem ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <button
                                            onClick={() => setSelectedItem(null)}
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                                        >
                                            <ArrowLeft size={18} />
                                        </button>
                                        <h3 className="text-lg font-semibold text-blue-700">{selectedItem.name}</h3>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <div className="flex items-start gap-3">
                                            <selectedItem.icon size={22} className="text-blue-600 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-sm md:text-base text-gray-700 whitespace-pre-line leading-relaxed">
                                                    {selectedItem.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={resetToMain}
                                        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base font-medium"
                                    >
                                        Back to Main Menu
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="mb-4 flex justify-between items-center">
                                        <h3 className="text-base md:text-lg font-semibold text-blue-700">
                                            {menuOptions.find(m => m.id === selectedMenu)?.name}
                                        </h3>
                                        <button
                                            onClick={resetMenu}
                                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
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
                                                className="w-full text-left px-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50 hover:shadow-md transition-all flex items-center gap-3"
                                            >
                                                <Icon size={18} className="text-blue-600 flex-shrink-0" />
                                                <p className="text-sm md:text-base font-medium">{item.name}</p>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="p-3 text-center text-xs text-gray-400 border-t bg-gray-50">
                        © {new Date().getFullYear()} School Assistant. All rights reserved.
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className={`
    bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700
    text-white rounded-full
    shadow-lg shadow-indigo-500/50
    hover:from-purple-700 hover:via-indigo-700 hover:to-blue-600
    hover:shadow-xl hover:shadow-purple-600/70
    transition-transform transition-shadow duration-300
    transform hover:scale-110 active:scale-95
    focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50
    flex items-center justify-center
  `}
                    style={{
                        padding: isMobile ? '1rem' : '1.125rem',
                        width: isMobile ? '4rem' : '4.5rem',
                        height: isMobile ? '4rem' : '4.5rem',
                    }}
                    aria-label="Open School Assistant Chat"
                >
                    <MessageCircle size={isMobile ? 22 : 26} />
                </button>
            )}
        </div>
    );
}