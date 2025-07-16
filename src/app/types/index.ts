import { JSX, ReactElement } from 'react';
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
    component?: React.ComponentType<any> | (() => JSX.Element);
    content?: string;
    url?: string,
}

export interface WellbeingSupportMenuItem {
    id: 'urgent' | 'mental-health' | 'bullying' | 'academic' | 'family';
    name: string;
    icon: LucideIcon;
    component?: React.ComponentType<any> | (() => JSX.Element);
    content?: string;
    url?: string;
}

export interface WellbeingAssessmentChoice {
    who: 'self' | 'child';
}

export interface BullyingReportFormValues {
    anonymous: boolean;
    description: string;
    date?: string; // YYYY-MM-DD
    individuals?: string;
    wantsFollowUp: boolean;
    contactMethod?: 'email' | 'phone' | 'in-app';
}
