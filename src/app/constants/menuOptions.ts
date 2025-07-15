// types.ts
export type MenuCategory = 'parent-student' | 'school-info'; // extendable

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
    {
      name: 'School Calendar',
      icon: Calendar,
      content: 'View important dates and events for the academic year.',
    },
    {
      name: 'Term Dates',
      icon: Clock,
      content:
        'Term 1: Sept 4 - Dec 15, 2024\nTerm 2: Jan 8 - Mar 28, 2025\nTerm 3: Apr 14 - Jul 18, 2025',
    },
    {
      name: 'Uniform Information',
      icon: Users,
      content:
        'Navy blazer, white shirt, school tie, grey trousers/skirt. PE kit includes house t-shirt and navy shorts.',
    },
    {
      name: 'Canteen Menu',
      icon: BookOpen,
      content:
        'Weekly rotating menu available. Healthy options include salad bar, jacket potatoes, and fresh fruit daily.',
    },
    {
      name: 'Contact Information',
      icon: Phone,
      content:
        'Main Office: 01234 567890\nEmail: office@school.edu\nAddress: 123 Education Street, Learning City, LC1 2AB',
    },
    {
      name: 'Policies & Procedures',
      icon: BookOpen,
      content:
        'Access to behavior policy, safeguarding procedures, and academic guidelines.',
    },
  ] satisfies SchoolInformationMenuItem[],
};

// const teacherPortalMenu: SubMenuItem[] = [
//     { name: 'AI Lesson Planner', icon: BookOpen, content: 'Generate personalized lesson plans using AI technology.' },
//     { name: 'Classroom Analytics', icon: BookOpen, content: 'Track student engagement and performance metrics.' },
//     { name: 'Teacher Wellbeing Hub', icon: Heart, content: 'Resources and support for teacher mental health and work-life balance.' },
//     { name: 'Student Support Centre', icon: Users, content: 'Tools for identifying and supporting students who need additional help.' },
//     { name: 'Resource Library', icon: BookOpen, content: 'Access to teaching materials, worksheets, and digital resources.' },
//     { name: 'Progress Tracking', icon: BookOpen, content: 'Monitor student progress and generate reports for parents.' },
// ];
