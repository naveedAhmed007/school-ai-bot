import React from 'react';
import MenuHeader from './MenuHeader';

interface Props {
    onBack: () => void; // optional back handler
}

const AgeAppropriateResources: React.FC<Props> = ({ onBack }) => {
    const resources = [
        { title: 'Teen Mental Health Tips', link: 'https://example.com/teen-mental-health' },
        { title: 'Study and Exam Advice', link: 'https://example.com/study-advice' },
        { title: 'Youth Counselling Services', link: 'https://example.com/youth-counselling' },
    ];

    return (
        <div className="flex flex-col max-w-md mx-auto h-full bg-gray-50 p-6">

            <MenuHeader title={'Age-Appropriate Resources'} onBack={onBack} />

            {/* Card container */}
            <div className="bg-white rounded-2xl shadow-md px-6 flex flex-col space-y-5 flex-grow overflow-auto">
                <p className="text-gray-700 leading-relaxed text-base">
                    Below are some carefully selected resources to support your wellbeing and development.
                </p>

                <ul className="list-disc list-inside space-y-4 text-blue-700">
                    {resources.map((resource, idx) => (
                        <li key={idx} className="hover:underline">
                            <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-base font-medium hover:text-blue-900 transition"
                            >
                                {resource.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AgeAppropriateResources;
