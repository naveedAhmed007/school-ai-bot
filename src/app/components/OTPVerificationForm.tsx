import React, { useState } from "react";
import MenuHeader from "./MenuHeader";

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

                <MenuHeader onBack={onBack} title={"Verify OTP"} />

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
