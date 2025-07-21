import React, { useState } from 'react';
import MenuHeader from './MenuHeader';

interface BullyingReportFormProps {
    onBack: () => void;
}

const BullyingReportForm: React.FC<BullyingReportFormProps> = ({ onBack }) => {
    const [incidentDate, setIncidentDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [involvedParties, setInvolvedParties] = useState('');
    const [anonymous, setAnonymous] = useState(false);
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
            incidentDate,
            location,
            description,
            involvedParties,
            anonymous,
            confirmationMethods,
        };
        console.log('📤 Bullying report submitted:', formData);
        alert('✅ Bullying report submitted successfully!');
    };

    return (
        <div className="px-5 flex-1 overflow-auto bg-gray-50">
            <div className="max-w-lg mx-auto space-y-0">
                
                <MenuHeader onBack={onBack} title={"Report Bullying"} />

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-md px-6 py-4 space-y-4">
                    {/* Incident Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Incident Date
                        </label>
                        <input
                            type="date"
                            value={incidentDate}
                            onChange={(e) => setIncidentDate(e.target.value)}
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 pt-2">
                            Location (Optional)
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Playground, Hallway"
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 pt-2">
                            Description of Incident
                        </label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what happened..."
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                        />
                    </div>

                    {/* Involved Parties */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 pt-2">
                            People Involved (Optional)
                        </label>
                        <input
                            type="text"
                            value={involvedParties}
                            onChange={(e) => setInvolvedParties(e.target.value)}
                            placeholder="Names of students, if known"
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                        />
                    </div>

                    {/* Anonymous Submission */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={anonymous}
                            onChange={() => setAnonymous(!anonymous)}
                            className="accent-blue-600"
                            id="anonymous"
                        />
                        <label htmlFor="anonymous" className="text-sm text-gray-700">
                            Submit anonymously
                        </label>
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

export default BullyingReportForm;
