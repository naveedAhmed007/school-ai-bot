import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../components/Header';
import AvatarSelector from '../components/AvatarSelector';
import { Avatar, StudentParentMenuOption } from '../types';
import { CartoonAvatars } from '../constants/cartoonAvatars';
import { ArrowLeft, MessageCircle, Send, User } from 'lucide-react';
import { menus } from '../constants/menuOptions';
import Footer from '../components/Footer';
import ChatLauncher from '../components/ChatLauncher';

const parentMenu = menus['parent-student'];
const schoolInfoMenu = menus['school-info'];

const quickResponses = [
    "What are the school hours?",
    "How do I report an absence?",
    "What's for lunch today?",
    "When is the next parent evening?",
    "How do I contact my child's teacher?",
    "What's the homework policy?"
];

/* ------------------------------------------------------------------
   Component
-------------------------------------------------------------------*/

export default function SchoolAssistantWidget() {
    const [open, setOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<StudentParentMenuOption | null>(null);
    const [avatarSelected, setAvatarSelected] = useState<number | null>(null);
    const [showAvatarSelection, setShowAvatarSelection] = useState(false);
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

    useEffect(() => {
        const saved = localStorage.getItem('selectedAvatar');
        if (saved) setAvatarSelected(Number(saved));
    }, []);

    useEffect(() => {
        if (avatarSelected !== null) {
            localStorage.setItem('selectedAvatar', avatarSelected.toString());
        }
    }, [avatarSelected]);

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

    const selectedAvatarObj: Avatar | null = avatarSelected
        ? CartoonAvatars.find((a) => a.id === avatarSelected) ?? null
        : null;
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
                    <Header
                        setOpen={setOpen}
                        isMobile={isMobile}
                        onTeacherLogin={() => { }}
                    />

                    {/* Avatar Selection */}
                    {showAvatarSelection ? (
                        <AvatarSelector
                            avatars={CartoonAvatars}
                            selectedId={avatarSelected}
                            onSelect={(id) => {
                                setAvatarSelected(id);
                                setShowAvatarSelection(false);
                            }}
                        />
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
                                <>
                                    {/* 🌟 Welcome message block */}

                                    {selectedAvatarObj && (
                                        <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                                            {selectedAvatarObj.svg}
                                        </div>
                                    )}
                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-semibold text-blue-700">
                                            👋 Hi! I'm your School Assistant
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            How can I help you today?
                                        </p>
                                        <button
                                            onClick={() => { setShowAvatarSelection(true) }}
                                            className="inline-flex items-center gap-2 px-3 py-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors"
                                            aria-label="Choose Your Avatar"
                                        >
                                            <User size={18} />
                                            <span className="text-sm font-medium">Choose Your Avatar</span>
                                        </button>


                                    </div>
                                    <div className="space-y-4" role="menu">
                                        {parentMenu.map((menu) => {
                                            const Icon = menu.icon;
                                            return (
                                                <button
                                                    key={menu.id}
                                                    role="menuitem"
                                                    onClick={() => handleMenuClick(menu.id)}
                                                    className="
    w-full text-left px-5 py-3
    bg-white hover:bg-blue-50
    rounded-lg
    border border-gray-300
    shadow-sm hover:shadow-md
    transition
    flex items-center gap-3
    focus:outline-none focus:ring-2 focus:ring-blue-400
    active:scale-95
  "
                                                >
                                                    <Icon size={22} className="text-blue-600 flex-shrink-0 transition-transform duration-200 group-hover:scale-105" />
                                                    <span className="text-base font-medium text-gray-700">{menu.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </>
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
                                            {parentMenu.find(m => m.id === selectedMenu)?.name}
                                        </h3>
                                        <button
                                            onClick={resetMenu}
                                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                        >
                                            ← Back
                                        </button>
                                    </div>

                                    {schoolInfoMenu.map((item, idx) => {
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
                    <Footer />
                </div>

            ) : (
                <ChatLauncher onOpen={() => setOpen(true)} />
            )}
        </div>
    );
}