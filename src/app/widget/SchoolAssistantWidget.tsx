import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import AvatarSelector from '../components/AvatarSelector';
import { CartoonAvatars } from '../constants/cartoonAvatars';
import { ArrowLeft, User } from 'lucide-react';
import { menus } from '../constants/menuOptions';
import Footer from '../components/Footer';
import ChatLauncher from '../components/ChatLauncher';
import { useIsMobile } from '../hooks/useIsMobile';
import MenuButton from '../components/MenuButton';
import ContactDetailsForm from '../components/ContactDetailsForm';
import CareersUniversities from '../components/CareersUniversities';
import ChatSupport from '../components/ChatSupport';
import AgeAppropriateResources from '../components/AgeAppropriateResources';
import MenuHeader from '../components/MenuHeader';
import { Avatar } from '@heroui/react';
import { useDispatch } from 'react-redux';
import { setAvatarId } from '../redux/features/avatarSlice';

const parentMenu = menus['parent-student'];
const schoolInfoMenu = menus['school-info'];
const wellbeingFlowMenu = menus['wellbeing-flow'];
const wellbeingInitMenu = menus['wellbeing-init'];
const parentResourcesMenu = menus['parent-Resources'];

export default function SchoolAssistantWidget() {
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch()
    const [currentMenu, setCurrentMenu] = useState<
        'parent-student' | 'school-info' | 'wellbeing-init' | 'wellbeing-flow' | 'parent-Resources'
    >('parent-student');

    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const [avatarSelected, setAvatarSelected] = useState<number | null>(null);
    const [showAvatarSelection, setShowAvatarSelection] = useState(false);
    const [chatMode, setChatMode] = useState(false);
    const [showIncidentReport, setShowIncidentReport] = useState(false);
    const [showCareers, setShowCareers] = useState(false);
    const [showAgeResources, setShowAgeResources] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const subMenuMap: Record<string, any[]> = {
        'parent-student': parentMenu,
        'school-info': schoolInfoMenu,
        'wellbeing-init': wellbeingInitMenu,
        'wellbeing-flow': wellbeingFlowMenu,
        'parent-Resources': parentResourcesMenu,
    };

    const menuHeadings: Record<string, string> = {
        'parent-student': 'Main Menu',
        'school-info': 'School Information',
        'wellbeing-init': 'Wellbeing Initial Assessment',
        'wellbeing-flow': 'Wellbeing Support Flow',
        'parent-Resources': 'Parent Resources',
    };

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

    const handleMenuClick = (id: string) => {
        if (id === 'wellbeing') {
            setCurrentMenu('wellbeing-init');
            setSelectedItem(null);
            setChatMode(false);
            setShowIncidentReport(false);
            setShowCareers(false);
        } else if (id === 'report') {
            setSelectedItem(null);
            setChatMode(false);
            setShowIncidentReport(true);
            setShowCareers(false);
        } else if (id === 'careers') {
            setSelectedItem(null);
            setChatMode(false);
            setShowIncidentReport(false);
            setShowCareers(true);
        } else if (id === 'question') {
            setChatMode(true);
            setShowIncidentReport(false);
            setSelectedItem(null);
            setShowCareers(false);
        } else {
            setCurrentMenu(id as any);
            setSelectedItem(null);
            setChatMode(false);
            setShowIncidentReport(false);
            setShowCareers(false);
        }
    };

    const handleSubMenuClick = (item: any) => {
        if (currentMenu === 'wellbeing-init') {
            if (item.id === 'for-my-child') {
                setCurrentMenu('wellbeing-flow');
                setSelectedItem(null);
            } else if (item.id === 'for-myself') {
                setShowAgeResources(true);
            }
        } else if (item.url) {
            window.open(item.url, '_blank', 'noopener,noreferrer');
        } else if (item.component) {
            setSelectedItem(item);
        } else {
            setSelectedItem(item);
        }
    };

    const resetMenu = () => {
        setSelectedItem(null);
        setCurrentMenu('parent-student');
        setChatMode(false);
        setShowIncidentReport(false);
        setShowCareers(false);
    };

    const selectedAvatarObj: any | null =
        avatarSelected ? CartoonAvatars.find((a) => a.id === avatarSelected) ?? null : null;

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

    const currentMenuItems = subMenuMap[currentMenu] || [];

    const handleBackFromIncidentForm = () => {
        setShowIncidentReport(false);
    };

    const handleBackFromCareers = () => {
        setShowCareers(false);
    };

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
                                dispatch(setAvatarId(id));
                                setShowAvatarSelection(false);
                            }}
                        />
                    ) : chatMode ? (
                        <ChatSupport onClose={() => setChatMode(false)} />
                    ) : showAgeResources ? (
                        <AgeAppropriateResources onBack={() => setShowAgeResources(false)} />
                    ) : showIncidentReport ? (
                        <ContactDetailsForm onBack={handleBackFromIncidentForm} />
                    ) : showCareers ? (
                        <CareersUniversities onBack={handleBackFromCareers} />
                    ) : (
                        <div className="flex-1 overflow-auto p-4 text-gray-700">
                            {!currentMenu || currentMenu === 'parent-student' ? (
                                <>
                                    {selectedAvatarObj ? (
                                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg border-4 border-blue-300 animate-fadeIn">
                                            <Avatar
                                                src={selectedAvatarObj.src}
                                                name={selectedAvatarObj.name}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-400 border-4 border-blue-300 animate-pulse">
                                            <User size={48} />
                                        </div>
                                    )}

                                    <div className="text-center mb-8 px-4">
                                        <h2 className="text-2xl font-bold text-blue-700 mb-2">👋 Hi! I'm your School Assistant</h2>
                                        {!selectedAvatarObj && (
                                            <p className="text-sm text-blue-600 mb-4">Please choose your avatar to get started.</p>
                                        )}
                                        <button
                                            onClick={() => setShowAvatarSelection(true)}
                                            className="inline-flex items-center gap-3 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                                        >
                                            <User size={20} />
                                            <span className="text-base font-semibold">Choose Your Avatar</span>
                                        </button>
                                    </div>

                                    <div className="space-y-5" role="menu">
                                        {parentMenu.map((menu) => (
                                            <MenuButton key={menu.id} id={menu.id} name={menu.name} Icon={menu.icon} onClick={handleMenuClick} />
                                        ))}
                                    </div>
                                </>
                            ) : selectedItem ? (
                                <div className="">
                                    {selectedItem.name !== 'Uniform Information' && (
                                        <MenuHeader title={selectedItem.name} onBack={() => setSelectedItem(null)} />
                                    )}

                                    <div className="bg-blue-50 px-4 rounded-xl border border-blue-100">
                                        {selectedItem.component ? (
                                            <selectedItem.component onBack={() => setSelectedItem(null)} />
                                        ) : (
                                            <p className="text-sm text-gray-700 whitespace-pre-line">
                                                {selectedItem.content ?? 'No content provided.'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <MenuHeader title={menuHeadings[currentMenu] || ''} onBack={resetMenu} />

                                    {currentMenuItems.length > 0 ? (
                                        currentMenuItems.map((item, idx) => (
                                            <MenuButton key={idx} id={item.id} name={item.name} Icon={item.icon} onClick={() => handleSubMenuClick(item)} />
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-600">No submenu available for this section yet.</p>
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
