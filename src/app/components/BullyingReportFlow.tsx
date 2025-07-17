import React, { useState } from 'react';

const steps = [
    'CONFIDENTIALITY_NOTICE',
    'REPORTING_TYPE',
    'INCIDENT_DETAILS',
    'SUPPORT_RESOURCES',
    'FOLLOW_UP',
    'CONFIRMATION',
] as const;

type Step = typeof steps[number];

const BullyingReportFlow = () => {
    const [step, setStep] = useState<Step>('CONFIDENTIALITY_NOTICE');
    const [reportType, setReportType] = useState<'anonymous' | 'identified' | null>(null);
    const [incidentDetails, setIncidentDetails] = useState('');
    const [followUp, setFollowUp] = useState(false);

    const goNext = () => {
        const currentIndex = steps.indexOf(step);
        setStep(steps[currentIndex + 1]);
    };

    const handleReportType = (type: 'anonymous' | 'identified') => {
        setReportType(type);
        goNext();
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-3xl shadow space-y-6">
            {step === 'CONFIDENTIALITY_NOTICE' && (
                <>
                    <h2 className="text-xl font-semibold text-blue-800">Confidentiality Notice</h2>
                    <p className="text-gray-700">
                        Your report will be treated with respect and privacy. You can choose to remain anonymous.
                    </p>
                    <button onClick={goNext} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full">Continue</button>
                </>
            )}

            {step === 'REPORTING_TYPE' && (
                <>
                    <h2 className="text-xl font-semibold text-blue-800">Report Type</h2>
                    <p className="text-gray-700 mb-4">Would you like to report anonymously or with your name?</p>
                    <div className="flex gap-4">
                        <button onClick={() => handleReportType('anonymous')} className="bg-gray-300 px-4 py-2 rounded-full">Anonymous</button>
                        <button onClick={() => handleReportType('identified')} className="bg-blue-600 text-white px-4 py-2 rounded-full">Identified</button>
                    </div>
                </>
            )}

            {step === 'INCIDENT_DETAILS' && (
                <>
                    <h2 className="text-xl font-semibold text-blue-800">Incident Details</h2>
                    <textarea
                        rows={5}
                        placeholder="Describe the bullying incident..."
                        value={incidentDetails}
                        onChange={(e) => setIncidentDetails(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                    />
                    <button onClick={goNext} disabled={!incidentDetails.trim()} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full disabled:opacity-50">
                        Next
                    </button>
                </>
            )}

            {step === 'SUPPORT_RESOURCES' && (
                <>
                    <h2 className="text-xl font-semibold text-blue-800">Immediate Support</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Talk to a school counselor</li>
                        <li>Join a peer support group</li>
                        <li>Access mental health tools</li>
                    </ul>
                    <button onClick={goNext} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full">Continue</button>
                </>
            )}

            {step === 'FOLLOW_UP' && (
                <>
                    <h2 className="text-xl font-semibold text-blue-800">Follow-Up</h2>
                    <p className="text-gray-700 mb-3">Would you like a member of staff to follow up with you?</p>
                    <div className="flex gap-4">
                        <button onClick={() => { setFollowUp(true); goNext(); }} className="bg-blue-600 text-white px-4 py-2 rounded-full">Yes</button>
                        <button onClick={() => { setFollowUp(false); goNext(); }} className="bg-gray-300 px-4 py-2 rounded-full">No</button>
                    </div>
                </>
            )}

            {step === 'CONFIRMATION' && (
                <>
                    <h2 className="text-xl font-semibold text-green-700">Report Submitted</h2>
                    <p className="text-gray-700">Thank you for reporting. We’ll take it seriously.</p>
                    {followUp && (
                        <p className="text-sm text-gray-600 mt-2">A staff member will contact you shortly.</p>
                    )}
                    <p className="text-sm text-gray-600 mt-4">You can close this window or go back to the main support menu.</p>
                </>
            )}
        </div>
    );
};

export default BullyingReportFlow;
