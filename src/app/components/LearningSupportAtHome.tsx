import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

const LearningSupportAtHome = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-white px-6 py-1 rounded-2xl shadow-md space-y-0">

            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed my-3">
                Helping your child succeed at home starts with the right environment and resources.
                Try these strategies:
            </p>

            {/* Tips List */}
            <ul className="space-y-3 pl-5 list-disc text-gray-800 text-base">
                <li>Establish a consistent and positive homework routine.</li>
                <li>Designate a quiet, distraction-free space for studying.</li>
                <li>Incorporate learning apps and websites to boost engagement.</li>
                <li>Maintain regular communication with your child’s teachers.</li>
                <li>Foster a love for reading through books, ebooks, or audiobooks.</li>
            </ul>

            {/* External Resource Button */}
            <div className="mt-6">
                <a
                    href="https://www.bbc.co.uk/bitesize"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Explore BBC Bitesize <ExternalLink size={18} />
                </a>
            </div>
        </div>
    );
};

export default LearningSupportAtHome;
