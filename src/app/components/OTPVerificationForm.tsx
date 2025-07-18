import React, { useState } from "react";

interface Props {
    email: string;
    phone: string;
    studentName: string;
    yearGroup: string;
    otp: string;
    onVerified: () => void;
    onBack: () => void;
}

const OTPVerificationForm: React.FC<Props> = ({
    otp,
    onVerified,
    onBack,
}) => {
    const [otpInput, setOtpInput] = useState("");

    const verifyOtp = () => {
        if (otpInput === otp) {
            onVerified();
        } else {
            alert("❌ Incorrect OTP");
        }
    };

    return (
        <div className="bg-gray-50 flex items-start justify-center px-5 pt-10  flex-1 overflow-auto">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 space-y-6">
                {/* Back button and shorter heading aligned left */}
                <div className="flex items-center space-x-3 mb-2">
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
                    <h2 className="text-xl font-semibold text-blue-700">
                        Verify OTP
                    </h2>
                </div>
                <div className="pt-5">

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={verifyOtp}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition"
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default OTPVerificationForm;
