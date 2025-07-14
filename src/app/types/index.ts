import React from 'react';
export interface Avatar {
    id: number;
    name: string;
    svg: React.ReactElement;
}
export interface AvatarSelectorProps {
    avatars: Avatar[];
    selectedId: number | null;
    onSelect: (id: number) => void;
}
export interface StudentParentMenuOption {
    id: string;
    name: string;
    icon: any;
}
export interface SchoolInformationMenuItem {
    name: string;
    icon: any;
    content: string;
}
