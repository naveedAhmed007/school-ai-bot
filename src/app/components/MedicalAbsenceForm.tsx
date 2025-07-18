import React, { useState } from 'react';

const MedicalAbsenceForm = () => {
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
        // Add form validation here if needed
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
            <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-lg space-y-4">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                    Medical Absence
                </h2>

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

                {/* Expected Return Date */}
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

                {/* Medical Certificate */}
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
    );
};

export default MedicalAbsenceForm;
