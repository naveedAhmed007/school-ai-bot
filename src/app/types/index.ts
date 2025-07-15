import { ReactElement } from 'react';
import { LucideIcon } from 'lucide-react';

export interface Avatar {
    id: number;
    name: string;
    svg: ReactElement;
}

export interface AvatarSelectorProps {
    avatars: Avatar[];
    selectedId: number | null;
    onSelect: (id: number) => void;
}

export interface StudentParentMenuOption {
    id: string;
    name: string;
    icon: LucideIcon;
}

export interface SchoolInformationMenuItem {
    id: string;
    name: string;
    icon: LucideIcon;
    component?: React.FC;
    content?: string;
}