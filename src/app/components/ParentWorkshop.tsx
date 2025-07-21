import React from 'react';
import { Users } from 'lucide-react';

const ParentWorkshop = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-white px-6 py-1 rounded-2xl shadow-md space-y-0">
            <p className="text-gray-700 mt-3 mb-2">
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
