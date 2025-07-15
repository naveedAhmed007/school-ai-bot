// types.ts
export type MenuCategory = 'parent-student' | 'school-info'; // extendable

import SchoolCalender from "../components/SchoolCalender";
// menuOptions.ts
import { StudentParentMenuOption, SchoolInformationMenuItem } from "../types";
import {
    BookOpen, Heart, Users, AlertCircle, MessageCircle,
    Calendar, Clock, Phone
} from 'lucide-react';

export const menus = {
    'parent-student': [
        { id: 'school-info', name: 'School Information', icon: BookOpen },
        { id: 'wellbeing', name: 'Wellbeing & Support', icon: Heart },
        { id: 'parent-resources', name: 'Parent Resources', icon: Users },
        { id: 'careers', name: 'Careers & Universities (6th Form)', icon: BookOpen },
        { id: 'report', name: 'Report Incident/Absence', icon: AlertCircle },
        { id: 'question', name: 'Ask a Question', icon: MessageCircle },
    ] satisfies StudentParentMenuOption[],

    'school-info': [
        { id: 'school-calendar', name: 'School Calendar', icon: Calendar, component: SchoolCalender },
        { id: 'term-dates', name: 'Term Dates', icon: Clock, component: SchoolCalender },
        { id: "uniform-Information", name: 'Uniform Information', icon: Users, content: 'All students must wear uniforms...' },
        { id: 'canteen-menu', name: 'Canteen Menu', icon: BookOpen, component: SchoolCalender },
        { id: 'contact-info', name: 'Contact Information', icon: Phone, component: SchoolCalender },
        { id: 'policies', name: 'Policies & Procedures', icon: BookOpen, component: SchoolCalender },
    ] satisfies SchoolInformationMenuItem[]
};

// const teacherPortalMenu: SubMenuItem[] = [
//     { name: 'AI Lesson Planner', icon: BookOpen, content: 'Generate personalized lesson plans using AI technology.' },
//     { name: 'Classroom Analytics', icon: BookOpen, content: 'Track student engagement and performance metrics.' },
//     { name: 'Teacher Wellbeing Hub', icon: Heart, content: 'Resources and support for teacher mental health and work-life balance.' },
//     { name: 'Student Support Centre', icon: Users, content: 'Tools for identifying and supporting students who need additional help.' },
//     { name: 'Resource Library', icon: BookOpen, content: 'Access to teaching materials, worksheets, and digital resources.' },
//     { name: 'Progress Tracking', icon: BookOpen, content: 'Monitor student progress and generate reports for parents.' },
// ];
