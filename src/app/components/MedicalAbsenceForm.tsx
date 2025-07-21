import React, { useState } from 'react';

interface MedicalAbsenceFormProps {
    onBack?: () => void;
}

const MedicalAbsenceForm: React.FC<MedicalAbsenceFormProps> = ({ onBack }) => {
    const [absenceDate, setAbsenceDate] = useState('');
    const [reason, setReason] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [needsCertificate, setNeedsCertificate] = useState(false);
    const [confirmationMethods, setConfirmationMethods] = useState<string[]>([]);

    const toggleConfirmation = (method: string) => {
        setConfirmationMethods((prev) =>
            prev.includes(method)
                ? prev.filter((m) => m !== method)
                : [...prev, method]
        );
    };

    const handleSubmit = () => {
        const formData = {
            absenceDate,
            reason,
            returnDate,
            needsCertificate,
            confirmationMethods,
        };
        console.log('Submitted:', formData);
        alert('📤 Medical absence submitted!');
    };

    return (
        <div className="px-5 flex-1 overflow-auto bg-gray-50">
            <div className="max-w-lg mx-auto space-y-4">
                {/* Back Button + Heading in One Row */}
                <div className="flex items-center justify-between mb-2">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="flex items-center text-sm text-blue-600 hover:underline"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                    )}
                    <h2 className="text-xl font-semibold text-blue-700">
                        Medical Absence
                    </h2>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                    {/* Absence Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Absence Date
                        </label>
                        <input
                            type="date"
                            value={absenceDate}
                            onChange={(e) => setAbsenceDate(e.target.value)}
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                        />
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Reason / Description
                        </label>
                        <textarea
                            rows={3}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                        />
                    </div>

                    {/* Return Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Expected Return Date
                        </label>
                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                        />
                    </div>

                    {/* Certificate */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Medical Certificate Required?
                        </label>
                        <div className="flex gap-4">
                            <button
                                className={`px-4 py-2 rounded-lg border ${needsCertificate ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                                onClick={() => setNeedsCertificate(true)}
                            >
                                Yes
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg border ${!needsCertificate ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                                onClick={() => setNeedsCertificate(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>

                    {/* Confirmation Methods */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Send Confirmation Via:
                        </label>
                        <div className="flex flex-col gap-2">
                            {['WhatsApp', 'Email', 'SMS'].map((method) => (
                                <label key={method} className="inline-flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={confirmationMethods.includes(method)}
                                        onChange={() => toggleConfirmation(method)}
                                        className="accent-blue-600"
                                    />
                                    <span className="text-sm text-gray-700">{method}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicalAbsenceForm;
