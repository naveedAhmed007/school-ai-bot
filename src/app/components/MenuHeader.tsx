// components/Header.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
    title: string;
    onBack: () => void;
}

const MenuHeader: React.FC<HeaderProps> = ({ title, onBack }) => {
    return (
        <div className="flex items-center gap-3">
            <button
                onClick={onBack}
                className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
            >
                <ArrowLeft size={18} />
            </button>
            <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
        </div>
    );
};

export default MenuHeader;
