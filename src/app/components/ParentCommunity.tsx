import React from 'react';
import { Users } from 'lucide-react';

const ParentCommunity = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-white px-6 py-1 rounded-2xl shadow-md space-y-0">

            <p className="text-gray-700  my-3">
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
