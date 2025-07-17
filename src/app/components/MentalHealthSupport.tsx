import React from 'react';
import { Heart, MessageCircle, BookOpen, AlertTriangle, User } from 'lucide-react';

type SupportItem = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

const mentalHealthSupportOptions: SupportItem[] = [
    {
        icon: <Heart className="w-6 h-6 text-pink-600" />,
        title: 'Emotional Wellbeing',
        description: 'Support for anxiety, stress, sadness, or overwhelm.',
    },
    {
        icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
        title: 'Talk to Someone',
        description: 'Request a check-in or book time with a counselor.',
    },
    {
        icon: <BookOpen className="w-6 h-6 text-green-600" />,
        title: 'Self-Help Tools',
        description: 'Mindfulness, breathing, and journaling exercises.',
    },
    {
        icon: <User className="w-6 h-6 text-violet-600" />,
        title: 'Learn About Mental Health',
        description: 'Guides on anxiety, burnout, and supporting others.',
    },
    {
        icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
        title: 'Crisis or Urgent Help',
        description: 'Emergency contacts and urgent care guidance.',
    },
];

const MentalHealthSupport = () => {
    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold text-blue-800">Mental Health Support</h2>
            <p className="text-gray-700">We're here to support your mental wellbeing. Please select what you'd like help with:</p>

            <div className="grid grid-cols-1 gap-4">
                {mentalHealthSupportOptions.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 transition shadow-sm cursor-pointer"
                    >
                        <div className="mt-1">{item.icon}</div>
                        <div>
                            <h3 className="text-lg font-medium text-blue-900">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MentalHealthSupport;
