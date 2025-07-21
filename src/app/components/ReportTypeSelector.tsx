import React, { useState } from "react";
import MenuButton from "./MenuButton";  // your component path
import { Stethoscope, AlertCircle, HeartCrack, FileText } from "lucide-react";
import MenuHeader from "./MenuHeader";

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

                <MenuHeader onBack={onBack} title={"Select Report Type"} />


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
