import React from 'react';
import { BookOpen, Lightbulb, ClipboardList, GraduationCap } from 'lucide-react';

const academicResources = [
    {
        title: 'Study Skills & Strategies',
        description:
            'Discover practical techniques to improve your study habits — including time management, note-taking methods, and exam preparation routines.',
        icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    },
    {
        title: 'Homework Help & Tutoring',
        description:
            'Access tools and platforms that offer guidance with assignments, subject-specific tutoring, and help understanding difficult topics.',
        icon: <ClipboardList className="w-6 h-6 text-emerald-600" />,
    },
    {
        title: 'Support for Learning Differences',
        description:
            'Explore personalized support for learners with ADHD, dyslexia, and other learning challenges, including specialist strategies and technology tools.',
        icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    },
    {
        title: 'Pathways to Academic Success',
        description:
            'Get advice on course selection, career planning, and how to set realistic academic goals that align with personal interests and strengths.',
        icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
    },
];

const AcademicSupport = () => {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-md space-y-6">
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-800">Academic Support</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Whether you're struggling with homework, preparing for exams, or looking for advice on future academic choices — we're here to support you.
                    The resources below are designed to help students build confidence, develop learning skills, and reach their full potential.
                </p>
            </div>

            <div className="space-y-5">
                {academicResources.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-4 bg-gray-50 p-4 rounded-xl hover:shadow transition-all border border-gray-100"
                    >
                        <div className="shrink-0">{item.icon}</div>
                        <div>
                            <h4 className="text-md font-semibold text-gray-800">{item.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AcademicSupport;
