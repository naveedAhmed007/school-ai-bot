import React from 'react';

interface Props {
    onBack?: () => void; // optional back handler
}

const AgeAppropriateResources: React.FC<Props> = ({ onBack }) => {
    const resources = [
        { title: 'Teen Mental Health Tips', link: 'https://example.com/teen-mental-health' },
        { title: 'Study and Exam Advice', link: 'https://example.com/study-advice' },
        { title: 'Youth Counselling Services', link: 'https://example.com/youth-counselling' },
    ];

    return (
        <div className="flex flex-col max-w-md mx-auto h-full bg-gray-50 p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
                <button
                    onClick={() => onBack && onBack()}
                    aria-label="Go back"
                    type="button"
                    className="text-gray-600 hover:text-gray-900 transition focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold text-gray-900 flex-grow">Age-Appropriate Resources</h2>
            </div>

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
