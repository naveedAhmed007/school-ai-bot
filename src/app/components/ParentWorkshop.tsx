import React from 'react';
import { Users } from 'lucide-react';

const ParentWorkshop = () => {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center space-x-3">
                <Users className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Parent Workshops</h2>
            </div>

            <p className="text-gray-700">
                Join our parent workshops to better support your child's learning and wellbeing:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Learn effective strategies for homework support and time management.</li>
                <li>Understand child development and emotional needs.</li>
                <li>Connect with other parents and share experiences.</li>
                <li>Gain insights from teachers and educational professionals.</li>
                <li>Receive free resources and follow-up materials.</li>
            </ul>

            <div className="mt-4">
                <a
                    href="https://educationendowmentfoundation.org.uk/support-for-parents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Learn More
                </a>
            </div>
        </div>
    );
};

export default ParentWorkshop;
