import { X, ArrowDownRight } from 'lucide-react'
import React from 'react'
import { TEXTS } from '../constants/texts'
import clsx from 'clsx';
interface HeaderProps {
    isMobile: boolean,
    onClose: () => void,
    onTeacherLogin: () => void
}

export default function Header({ isMobile, onTeacherLogin, onClose }: HeaderProps) {
    return (
        <header className="relative bg-blue-600 text-white shadow-md h-16 flex items-center px-4">
            {/* Centered Login Button */}
            <button
                onClick={onTeacherLogin}
                className={clsx(
                    'absolute left-1/2 transform -translate-x-1/2 bg-white text-blue-600 font-semibold rounded-full px-5 text-sm flex items-center gap-2 shadow-md hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95',
                    isMobile ? 'py-1' : 'py-3'
                )}
                aria-label={TEXTS.teacherAccessLogin}
            >
                {TEXTS.teacherAccessLogin}
                <ArrowDownRight
                    size={18}
                    className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                />
            </button>

            {/* Close Button on the Right */}
            <button
                onClick={onClose}
                aria-label={TEXTS.closeButtonLabel}
                className="ml-auto p-2 rounded-full hover:bg-white/20 transition-colors"
                style={{ zIndex: 10 }}
            >
                <X size={isMobile ? 18 : 24} />
            </button>
        </header>)
}
