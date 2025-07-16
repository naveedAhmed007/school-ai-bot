import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../components/Header';
import AvatarSelector from '../components/AvatarSelector';
import { Avatar } from '../types';
import { CartoonAvatars } from '../constants/cartoonAvatars';
import { ArrowLeft, User } from 'lucide-react';
import { menus } from '../constants/menuOptions';
import Footer from '../components/Footer';
import ChatLauncher from '../components/ChatLauncher';
import { useIsMobile } from '../hooks/useIsMobile';
import MenuButton from '../components/MenuButton';

const parentMenu = menus['parent-student'];
const schoolInfoMenu = menus['school-info'];
const wellbeingFlowMenu = menus['wellbeing-flow'];




export default function SchoolAssistantWidget() {
    const [open, setOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [avatarSelected, setAvatarSelected] = useState<number | null>(null);
    const [showAvatarSelection, setShowAvatarSelection] = useState(false);
    const [chatMode, setChatMode] = useState(false);
    const [messages, setMessages] = useState<Array<{ id: number, text: string, sender: 'user' | 'bot', timestamp: Date }>>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const isMobile = useIsMobile();

    const subMenuMap: Record<string, any[]> = {
        'school-info': schoolInfoMenu,
        'wellbeing': wellbeingFlowMenu,
    };



    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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

    const handleMenuClick = (txt: string) => {
        if (txt === 'question') {
            setChatMode(true);
            setSelectedMenu(null);
        } else {
            setSelectedMenu(txt);
            setChatMode(false);
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
        if (item.url) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        } else {
            // For items without URL, show inside widget
            setSelectedItem(item);
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
    const currentSubMenu = selectedMenu ? subMenuMap[selectedMenu] || [] : [];
    const widgetStyle = getWidgetSize();



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
                    <Header setOpen={setOpen} isMobile={isMobile} onTeacherLogin={() => { }} />

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
                        /* --- Chat mode view (unchanged) --- */
                        <div className="flex-1 flex flex-col min-h-0">{/* ...chat UI here... */}</div>
                    ) : (
                        <div className="flex-1 overflow-auto p-4 text-gray-700">
                            {!selectedMenu ? (
                                <>
                                    {selectedAvatarObj && (
                                        <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                                            {selectedAvatarObj.svg}
                                        </div>
                                    )}
                                    <div className="text-center mb-6">
                                        <h2 className="text-xl font-semibold text-blue-700">👋 Hi! I'm your School Assistant</h2>
                                        <p className="text-sm text-gray-600 mt-1">How can I help you today?</p>
                                        <button
                                            onClick={() => setShowAvatarSelection(true)}
                                            className="inline-flex items-center gap-2 px-3 py-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors"
                                        >
                                            <User size={18} />
                                            <span className="text-sm font-medium">Choose Your Avatar</span>
                                        </button>
                                    </div>

                                    <div className="space-y-4" role="menu">

                                        {parentMenu.map((menu) => {
                                            const Icon = menu.icon;
                                            return (
                                                <MenuButton
                                                    key={menu.id}
                                                    id={menu.id}
                                                    name={menu.name}
                                                    Icon={menu.icon}
                                                    onClick={handleMenuClick}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            ) : selectedItem ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <button
                                            onClick={() => setSelectedItem(null)}
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                                        >
                                            <ArrowLeft size={18} />
                                        </button>
                                        <h3 className="text-lg font-semibold text-blue-700">{selectedItem.name}</h3>
                                    </div>

                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        {selectedItem.component ? (
                                            <selectedItem.component />
                                        ) : (
                                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                                {selectedItem.content ?? 'No content provided.'}
                                            </p>
                                        )}
                                    </div>


                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="mb-4 flex justify-between items-center">
                                        <h3 className="text-base font-semibold text-blue-700">
                                            {parentMenu.find(m => m.id === selectedMenu)?.name}
                                        </h3>
                                        <button
                                            onClick={resetMenu}
                                            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            ← Back
                                        </button>
                                    </div>



                                    {currentSubMenu.length > 0 ? (
                                        currentSubMenu.map((item, idx) => (
                                            <MenuButton
                                                key={idx}
                                                id={item.id}
                                                name={item.name}
                                                Icon={item.icon}
                                                onClick={() => handleItemClick(item)}
                                            />
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-600">
                                            No submenu available for this section yet.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <Footer />
                </div>
            ) : (
                <ChatLauncher onOpen={() => setOpen(true)} />
            )}
        </div>
    );
}
