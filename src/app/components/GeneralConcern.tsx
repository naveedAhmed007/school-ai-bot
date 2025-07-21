import React, { useState } from 'react';
import MenuHeader from './MenuHeader';

interface GeneralConcernFormProps {
    onBack: () => void;
}

const GeneralConcernForm: React.FC<GeneralConcernFormProps> = ({ onBack }) => {
    const [concernDate, setConcernDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
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
            concernDate,
            title,
            description,
            confirmationMethods,
        };
        console.log('Submitted Concern:', formData);
        alert('📤 General concern submitted!');
    };

    return (
        <div className="px-5 flex-1 overflow-auto bg-gray-50">
            <div className="max-w-lg mx-auto space-y-0">
                <MenuHeader onBack={onBack} title="General Concern" />

                <div className="bg-white rounded-2xl shadow-md px-6 py-4 space-y-4">
                    {/* Concern Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Concern Date
                        </label>
                        <input
                            type="date"
                            value={concernDate}
                            onChange={(e) => setConcernDate(e.target.value)}
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 pt-2">
                            Title / Subject
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                            placeholder="Short summary"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 pt-2">
                            Description
                        </label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                            placeholder="Provide more details here"
                        />
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

export default GeneralConcernForm;
