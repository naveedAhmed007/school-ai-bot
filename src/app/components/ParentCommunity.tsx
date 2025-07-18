import React from 'react';
import { Users } from 'lucide-react';

const ParentCommunity = () => {
    return (
        <div className="p-6 bg-white rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center space-x-3">
                <Users className="text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-800">Community Support</h2>
            </div>

            <p className="text-gray-700">
                Our community programs aim to create a strong support network for families:
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Join local parent groups and discussion circles.</li>
                <li>Participate in community-led educational events.</li>
                <li>Get involved with school volunteer opportunities.</li>
                <li>Access support services for mental health and wellbeing.</li>
                <li>Stay informed through community newsletters and bulletins.</li>
            </ul>

            <div className="mt-4">
                <a
                    href="https://www.nspcc.org.uk/keeping-children-safe/support-for-parents/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Find Support Resources
                </a>
            </div>
        </div>
    );
};

export default ParentCommunity;
