import React, { useState } from 'react';
import { PhoneCall, AlertTriangle, MessageCircle, ShieldCheck, HeartHandshake } from 'lucide-react';
import ChatSupport from './ChatSupport';

type Props = {
    onBack: () => void; // to go back to previous menu
};

export default function UrgentHelp({ onBack }: Props) {
    const [showChat, setShowChat] = useState(false);

    if (showChat) {
        return (
            <div className="space-y-4">
                <ChatSupport onClose={() => setShowChat(false)} title="Urgent Help Needed" />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl shadow-lg space-y-3 border border-red-200 mt-3">


           
            <p className="text-sm text-gray-700 leading-relaxed">
                If you're in immediate danger or need urgent help, please use one of the following options. All communication is private and confidential.
            </p>

            <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
                    <PhoneCall className="text-red-600 w-5 h-5" />
                    <div>
                        <p className="font-semibold text-gray-900">Emergency Services</p>
                        <p className="text-sm text-gray-600">
                            <a href="tel:999" className="text-blue-600 hover:underline">
                                Call 999
                            </a>{' '}
                            if you or someone else is in immediate danger.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
                    <HeartHandshake className="text-red-600 w-5 h-5" />
                    <div>
                        <p className="font-semibold text-gray-900">Childline – Free Support</p>
                        <p className="text-sm text-gray-600">
                            <a href="tel:08001111" className="text-blue-600 hover:underline">
                                0800 1111
                            </a>{' '}
                            (Available 24/7, confidential and safe)
                        </p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow flex items-center space-x-4">
                    <ShieldCheck className="text-red-600 w-5 h-5" />
                    <div>
                        <p className="font-semibold text-gray-900">School Safeguarding Lead</p>
                        <p className="text-sm text-gray-600">
                            Speak to your school's designated safeguarding lead for help.
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-center pt-5">
                <button
                    onClick={() => setShowChat(true)}
                    className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-blue-700 transition"
                    aria-label="Chat with support"
                >
                    <MessageCircle className="mr-2 w-4 h-4" /> Chat with Support
                </button>
                <p className="text-xs text-gray-500 mt-2 italic">
                    Chat with our AI assistant — available anytime to support you.
                </p>
            </div>
        </div>
    );
}
