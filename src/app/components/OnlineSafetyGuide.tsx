import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

const OnlineSafetyGuide = () => {
    return (
        <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-md space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                    <ShieldCheck className="text-purple-700" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-purple-800">Online Safety Guide</h2>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-base leading-relaxed">
                Help your child stay safe online by following these essential safety tips:
            </p>

            {/* Safety Tips */}
            <ul className="space-y-3 pl-5 list-disc text-gray-800 text-base">
                <li>Teach your child to never share personal information online.</li>
                <li>Use parental controls and privacy settings on devices and apps.</li>
                <li>Encourage open communication about online experiences.</li>
                <li>Keep screens in shared spaces for easier supervision.</li>
                <li>Talk about cyberbullying and how to respond appropriately.</li>
            </ul>

            {/* External Resource Button */}
            <div className="mt-6">
                <a
                    href="https://www.nspcc.org.uk/keeping-children-safe/online-safety/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
                >
                    Visit NSPCC Online Safety <ExternalLink size={18} />
                </a>
            </div>
        </div>
    );
};

export default OnlineSafetyGuide;
