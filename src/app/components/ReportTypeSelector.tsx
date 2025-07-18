import React, { useState } from "react";
import MenuButton from "./MenuButton";  // your component path
import { Stethoscope, AlertCircle, HeartCrack, FileText } from "lucide-react";

interface Props {
    onSelect: (id: string) => void;
    onBack: () => void;
}

const reportTypes = [
    { id: "medical", name: "Medical Absence", icon: Stethoscope },
    { id: "incident", name: "Incident Report", icon: AlertCircle },
    { id: "bullying", name: "Bullying", icon: HeartCrack },
    { id: "general", name: "General Concern", icon: FileText },
];

const ReportTypeSelection: React.FC<Props> = ({ onSelect, onBack }) => {





    return (
        <div className="bg-gray-50 flex items-start justify-center pt-8 flex-1 overflow-auto">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-md px-5 space-y-6">
                {/* Back button */}
                <div className="flex items-center space-x-3 mb-5">
                    <button
                        onClick={onBack}
                        className="text-blue-600 hover:text-blue-800 focus:outline-none"
                        aria-label="Go Back"
                        type="button"
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
                    <h2 className="text-xl font-semibold text-blue-700">Select Report Type</h2>
                </div>

                {/* Use your MenuButton for each option */}
                <div className="space-y-4 my-5" role="menu">
                    {reportTypes.map(({ id, name, icon }) => (
                        <MenuButton key={id} id={id} name={name} Icon={icon} onClick={onSelect} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportTypeSelection;
