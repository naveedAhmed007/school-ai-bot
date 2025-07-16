import React from 'react';
import { ExternalLink } from 'lucide-react';
import { POLICY_URL } from '../constants/urls';


export default function PoliciesAndProcedures({

}) {
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow border border-gray-200">
            <a
                href={POLICY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
                <span>View Policies & Procedures</span>
                <ExternalLink size={20} />
            </a>
        </div>
    );
}
