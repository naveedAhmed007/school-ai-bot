import React, { FC } from 'react';

interface MenuButtonProps {
    id: string | number;
    name: string;
    Icon: React.FC<{ size?: number; className?: string }>;
    onClick: (item: any) => void;
}

const MenuButton: FC<MenuButtonProps> = ({ id, name, Icon, onClick }) => {
    return (
        <button
            key={id}
            role="menuitem"
            onClick={() => onClick(id)}
            className="w-full text-left px-5 py-3 bg-white hover:bg-blue-50 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition flex items-center gap-3"
        >
            <Icon size={22} className="text-blue-600" />
            <span className="text-base font-medium text-gray-700">{name}</span>
        </button>
    );
};

export default MenuButton;
