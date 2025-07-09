'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

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
  'School Information',
  'Wellbeing & Support',
  'Parent Resources',
  'Careers & Universities (6th Form)',
  'Report Incident/Absence',
  'Ask a Question',
  'Teacher Portal',
];

const schoolInfoSubMenu = [
  'School Calendar',
  'Term Dates',
  'Uniform Information',
  'Canteen Menu',
  'Contact Information',
  'Policies & Procedures',
];

const teacherPortalMenu = [
  'AI Lesson Planner',
  'Classroom Analytics',
  'Teacher Wellbeing Hub',
  'Student Support Centre',
  'Resource Library',
  'Progress Tracking',
];

export default function SchoolAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [avatarSelected, setAvatarSelected] = useState<number | null>(null);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const resetMenu = () => {
    setSelectedMenu(null);
  };

  const getSubMenuItems = (menu: string): string[] => {
    switch (menu) {
      case 'School Information':
        return schoolInfoSubMenu;
      case 'Teacher Portal':
        return teacherPortalMenu;
      default:
        return [];
    }
  };

  const selectedAvatarObj = avatarSelected
    ? CartoonAvatars.find((a) => a.id === avatarSelected)
    : null;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white p-4 rounded-full shadow-xl shadow-indigo-300 animate-pulse"
          aria-label="Open School Assistant Chat"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="w-96 h-[34rem] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {selectedAvatarObj && (
                <span aria-label={selectedAvatarObj.name} title={selectedAvatarObj.name}>
                  {selectedAvatarObj.svg}
                </span>
              )}
              Hello! I'm your School Assistant
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="hover:text-gray-300"
              aria-label="Close School Assistant Chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Avatar Selection */}
          {avatarSelected === null ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-6 px-6 text-center">
              <p className="text-gray-600 mb-4">
                To personalize your experience, please choose an avatar:
              </p>
              <div className="grid grid-cols-3 gap-6">
                {CartoonAvatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    className="rounded-full border border-gray-300 p-3 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-110"
                    onClick={() => setAvatarSelected(avatar.id)}
                    aria-label={`Select avatar ${avatar.name}`}
                  >
                    {avatar.svg}
                    <div className="mt-2 text-xs font-semibold text-gray-700">{avatar.name}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto px-5 py-4 text-gray-700">
              {!selectedMenu ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 mb-1">Main Menu:</p>
                  {menuOptions.map((menu, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleMenuClick(menu)}
                      className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-blue-50 rounded-xl border border-gray-200 shadow-sm"
                    >
                      {menu}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="mb-3 flex justify-between items-center">
                    <h3 className="text-md font-semibold text-blue-700">{selectedMenu}</h3>
                    <button
                      onClick={resetMenu}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      ← Back
                    </button>
                  </div>

                  {getSubMenuItems(selectedMenu).map((item, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-blue-50"
                    >
                      <p className="text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="p-4 text-center text-xs text-gray-400 border-t">
            © {new Date().getFullYear()} School Assistant. All rights reserved.
          </div>
        </div>
      )}
    </div>
  );
}
