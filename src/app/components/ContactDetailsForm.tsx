import React, { useState } from "react";
import OTPVerificationForm from "./OTPVerificationForm";
import ReportTypeSelector from "./ReportTypeSelector";
import MedicalAbsenceForm from "./MedicalAbsenceForm";

const yearGroups = ["Year 7", "Year 8", "Year 9", "Year 10", "Year 11"];

interface Props {
    onBack: () => void;
}

const ContactVerification: React.FC<Props> = ({ onBack }) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [studentName, setStudentName] = useState("");
    const [yearGroup, setYearGroup] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState("");
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [showReportType, setShowReportType] = useState(false);
    const [selectedReportType, setSelectedReportType] = useState<string | null>(null);

    const handleSendOtp = () => {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        alert(`🔐 OTP Sent: ${otp}`);
        setShowOtpForm(true);
    };

    const handleOtpBack = () => {
        setShowOtpForm(false);
    };

    const handleVerified = () => {
        setShowOtpForm(false);
        setShowReportType(true);
        setEmail("");
        setPhone("");
        setStudentName("");
        setYearGroup("");
        setGeneratedOtp("");
    };

    const handleReportTypeSelect = (id: string) => {
        setSelectedReportType(id);
        setShowReportType(false);
    };

    const handleReportTypeBack = () => {
        setShowReportType(false);
    };

    const isFormValid = email && phone && studentName && yearGroup;

    // Handle OTP Flow
    if (showOtpForm) {
        return (
            <OTPVerificationForm
                email={email}
                phone={phone}
                studentName={studentName}
                yearGroup={yearGroup}
                otp={generatedOtp}
                onVerified={handleVerified}
                onBack={handleOtpBack}
            />
        );
    }

    // Handle Medical Form
    if (selectedReportType === "medical") {
        return (
            <MedicalAbsenceForm
                onBack={() => setSelectedReportType(null)}
            />
        );
    }

    // Handle Report Type Selector
    if (showReportType) {
        return (
            <ReportTypeSelector
                onSelect={handleReportTypeSelect}
                onBack={handleReportTypeBack}
            />
        );
    }

    // Default: Contact Verification
    return (
        <div className="px-5 flex-1 overflow-auto bg-gray-50">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6">
                <div className="flex items-center space-x-3">
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
                    <h2 className="text-xl font-semibold text-blue-700 flex-grow">
                        Verify Contact Details
                    </h2>
                </div>

                <input
                    type="email"
                    placeholder="Parent Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Student Full Name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={yearGroup}
                    onChange={(e) => setYearGroup(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Year Group</option>
                    {yearGroups.map((group) => (
                        <option key={group} value={group}>
                            {group}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleSendOtp}
                    disabled={!isFormValid}
                    className={`mt-4 w-full py-3 rounded-lg text-white font-medium text-sm transition-all ${isFormValid
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-300 cursor-not-allowed"
                        }`}
                >
                    Send OTP
                </button>
            </div>
        </div>
    );
};

export default ContactVerification;
