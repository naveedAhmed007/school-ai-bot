import React, { useState } from 'react';
import MenuHeader from './MenuHeader';

interface IncidentReportFormProps {
    onBack: () => void;
}

const IncidentReportForm: React.FC<IncidentReportFormProps> = ({ onBack }) => {
    const [incidentDate, setIncidentDate] = useState('');
    const [incidentType, setIncidentType] = useState('');
    const [description, setDescription] = useState('');
    const [anonymousReport, setAnonymousReport] = useState(false);
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
            incidentType,
            description,
            anonymousReport,
            confirmationMethods,
        };
        console.log('Submitted:', formData);
        alert('🚨 Incident report submitted!');
    };

    return (
        <div className="px-5 flex-1 overflow-auto bg-gray-50">
            <div className="max-w-lg mx-auto space-y-0 mt-3">
                <MenuHeader onBack={onBack} title={"Incident Report"} />

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

                    {/* Incident Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 pt-2">
                            Incident Type
                        </label>
                        <select
                            value={incidentType}
                            onChange={(e) => setIncidentType(e.target.value)}
                            className="w-full mt-1 border px-3 py-2 rounded-lg text-sm"
                        >
                            <option value="">Select Incident Type</option>
                            <option value="bullying">Bullying</option>
                            <option value="property_damage">Property Damage</option>
                            <option value="injury">Injury</option>
                            <option value="other">Other</option>
                        </select>
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
                            placeholder="Describe the incident in detail"
                        />
                    </div>

                    {/* Anonymous Report */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Submit Anonymously?
                        </label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setAnonymousReport(true)}
                                className={`px-4 py-2 rounded-lg border ${anonymousReport ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => setAnonymousReport(false)}
                                className={`px-4 py-2 rounded-lg border ${!anonymousReport ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
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

                    {/* Submit Button */}
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

export default IncidentReportForm;
