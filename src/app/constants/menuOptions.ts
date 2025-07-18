export type MenuCategory = 'parent-student' | 'school-info'; // extendable

import CanteenMenu from "../components/CanteenMenu";
import ContactInformation from "../components/ContactInformation";
import SchoolCalender from "../components/SchoolCalender";
import UniformInformation from "../components/UniformInformation";
// menuOptions.ts
import { StudentParentMenuOption, SchoolInformationMenuItem, WellbeingSupportMenuItem, WellbeingInitialAssessmentMenuItem } from "../types";
import {
    BookOpen, Heart, Users, AlertCircle, MessageCircle,
    Calendar, Clock, Phone, Shirt,
    Brain,
    MessageSquareWarning,
    BookOpenCheck,
    User,
    ShieldCheck,
    Link
} from 'lucide-react';
import { POLICY_URL } from "./urls";
import UrgentHelp from "../components/UrgentHelp";
import MentalHealthSupport from "../components/MentalHealthSupport";
import BullyingReportFlow from "../components/BullyingReportFlow";
import LearningSupportAtHome from "../components/LearningSupportAtHome";
import OnlineSafetyGuide from "../components/OnlineSafetyGuide";
import ParentWorkshop from "../components/ParentWorkshop";
import ParentCommunity from "../components/ParentCommunity";



export const menus = {
    'parent-student': [
        { id: 'school-info', name: 'School Information', icon: BookOpen },
        { id: 'wellbeing', name: 'Wellbeing & Support', icon: Heart },
        { id: 'parent-Resources', name: 'Parent Resources', icon: Users },
        { id: 'careers', name: 'Careers & Universities (6th Form)', icon: BookOpen },
        { id: 'report', name: 'Report Incident/Absence', icon: AlertCircle },
        { id: 'question', name: 'Ask a Question', icon: MessageCircle },
    ] satisfies StudentParentMenuOption[],

    'school-info': [
        { id: 'school-calendar', name: 'School Calendar', icon: Calendar, component: SchoolCalender },
        { id: 'term-dates', name: 'Term Dates', icon: Clock, component: SchoolCalender },
        { id: "uniform-Information", name: 'Uniform Information', icon: Shirt, component: UniformInformation },
        { id: 'canteen-menu', name: 'Canteen Menu', icon: BookOpen, component: CanteenMenu },
        { id: 'contact-info', name: 'Contact Information', icon: Phone, component: ContactInformation },
        { id: 'policies', name: 'Policies & Procedures', icon: BookOpen, url: POLICY_URL }

    ] satisfies SchoolInformationMenuItem[],

    'wellbeing-flow': [
        {
            id: 'urgent',
            name: 'Urgent Help Needed',
            icon: AlertCircle,
            component: UrgentHelp
        },
        {
            id: 'mental-health',
            name: 'Mental Health Support',
            icon: Brain,
            component: MentalHealthSupport
        },
        {
            id: 'bullying',
            name: 'Bullying Report',
            icon: MessageSquareWarning,
            component: BullyingReportFlow
        },
        {
            id: 'academic',
            name: 'Academic Support',
            icon: BookOpenCheck,
        },
        {
            id: 'family',
            name: 'Family Support',
            icon: Users,
        },
    ] satisfies WellbeingSupportMenuItem[],

    'wellbeing-init': [
        { id: 'for-myself', name: 'For Myself', icon: User },
        { id: 'for-my-child', name: 'For My Child', icon: Users },
    ] satisfies WellbeingInitialAssessmentMenuItem[],
    'parent-Resources': [
        {
            id: 'learning-home',
            name: 'Learning at Home Tips',
            icon: BookOpenCheck,
            component: LearningSupportAtHome,
        },
        {
            id: 'online-safety',
            name: 'Online Safety Guide',
            icon: ShieldCheck,
            component: OnlineSafetyGuide,
        },

        {
            id: 'workshops',
            name: 'Parent Workshops',
            icon: Calendar,
            component: ParentWorkshop,
        },
        {
            id: 'community',
            name: 'Community Support',
            icon: Users,
            
            component: ParentCommunity,
        },
    ]


};

// const teacherPortalMenu: SubMenuItem[] = [
//     { name: 'AI Lesson Planner', icon: BookOpen, content: 'Generate personalized lesson plans using AI technology.' },
//     { name: 'Classroom Analytics', icon: BookOpen, content: 'Track student engagement and performance metrics.' },
//     { name: 'Teacher Wellbeing Hub', icon: Heart, content: 'Resources and support for teacher mental health and work-life balance.' },
//     { name: 'Student Support Centre', icon: Users, content: 'Tools for identifying and supporting students who need additional help.' },
//     { name: 'Resource Library', icon: BookOpen, content: 'Access to teaching materials, worksheets, and digital resources.' },
//     { name: 'Progress Tracking', icon: BookOpen, content: 'Monitor student progress and generate reports for parents.' },
// ];
