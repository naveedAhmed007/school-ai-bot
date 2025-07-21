import React from 'react';
import { GraduationCap } from 'lucide-react';
import MenuHeader from './MenuHeader';

interface Props {
    onBack: () => void;
}

const CareersUniversities: React.FC<Props> = ({ onBack }) => {
    return (
        <div className="px-5 flex-1 overflow-auto bg-gray-50 my-5">
            <MenuHeader onBack={onBack} title='Careers & Universities' />

            <p className="text-gray-700">
                Helping students in Sixth Form prepare for life after school — whether that’s university, apprenticeships, or entering the workforce.
            </p>

            <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Explore different career paths and university courses.</li>
                <li>Attend career fairs, university open days, and workshops.</li>
                <li>Get support with UCAS applications and personal statements.</li>
                <li>Practice interview techniques and build your CV.</li>
                <li>Learn about apprenticeships and vocational routes.</li>
            </ul>

            <div className="mt-4">
                <a
                    href="https://www.ucas.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit UCAS website (opens in new tab)"
                    className="inline-block px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    Visit UCAS
                </a>
            </div>
        </div>
    );
};

export default CareersUniversities;
