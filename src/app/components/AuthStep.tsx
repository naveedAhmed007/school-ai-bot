import React, { useState } from 'react';

const yearGroups = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13'];

const AuthStep = ({ onVerified }: { onVerified: () => void }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [studentName, setStudentName] = useState('');
    const [yearGroup, setYearGroup] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpInput, setOtpInput] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidPhone = (phone: string) =>
        /^\+?[0-9]{10,15}$/.test(phone); // basic phone number validation

    const sendOtp = () => {
        if (!isValidEmail(email) || !isValidPhone(phone)) {
            alert('Please enter a valid email and phone number.');
            return;
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        setOtpSent(true);

        // Simulate sending OTP
        alert(`🔐 OTP Sent: ${otp}`);
    };

    const verifyOtp = () => {
        if (otpInput === generatedOtp) {
            alert('✅ Verified!');
            onVerified();
        } else {
            alert('❌ Incorrect OTP');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow space-y-4">
            <h2 className="text-2xl font-semibold text-blue-800">Verify Your Contact Details</h2>

            <input
                type="text"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            />

            <input
                type="text"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            />

            <input
                type="text"
                placeholder="Student Full Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            />

            <select
                value={yearGroup}
                onChange={(e) => setYearGroup(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            >
                <option value="">Select Year Group</option>
                {yearGroups.map((group) => (
                    <option key={group} value={group}>
                        {group}
                    </option>
                ))}
            </select>

            {!otpSent ? (
                <button
                    onClick={sendOtp}
                    disabled={
                        !email || !phone || !studentName || !yearGroup
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
                >
                    Send OTP
                </button>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                    />
                    <button
                        onClick={verifyOtp}
                        className="bg-green-600 text-white px-4 py-2 rounded-full"
                    >
                        Verify OTP
                    </button>
                </>
            )}
        </div>
    );
};

export default AuthStep;
