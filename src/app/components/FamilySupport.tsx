import React from 'react';

interface Props {
    onBack?: () => void; // optional back handler
}

const FamilySupport: React.FC<Props> = ({ onBack }) => {
    const resources = [
        { title: 'Family Lives - Parenting Support', link: 'https://www.familylives.org.uk/' },
        { title: 'Relate - Relationship Support', link: 'https://www.relate.org.uk/' },
        { title: 'National Family Mediation', link: 'https://www.nfm.org.uk/' },
        { title: 'Mind - Family Mental Health', link: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/family/' },
    ];

    const tips = [
        'Set regular family time without distractions.',
        'Keep communication open and honest.',
        'Create routines to provide stability.',
        'Encourage everyone to express their feelings.',
        'Seek help early if family stress increases.',
    ];

    const contacts = [
        { name: 'Family Helpline', number: '0808 800 2222' },
        { name: 'Childline', number: '0800 1111' },
        { name: 'Samaritans', number: '116 123' },
    ];

    return (
        <div className="px-5 flex-1  overflow-auto bg-gray-50">

            {/* Intro */}
            <p className="mb-3 text-gray-700 mt-5">
                Supporting your family’s wellbeing is important. Here are some helpful resources, practical tips, and contacts to help you through difficult times.
            </p>

            {/* Resources */}
            <section className="mb-6 mt-10">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Helpful Resources</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-700">
                    {resources.map((r, i) => (
                        <li key={i}>
                            <a
                                href={r.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-blue-900"
                            >
                                {r.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Practical Tips */}
            <section className="mb-6 mt-10">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Practical Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                    ))}
                </ul>
            </section>

            {/* Support Contacts */}
            <section className="mb-6">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Support Contacts</h3>
                <ul className="list-inside space-y-2 text-gray-700">
                    {contacts.map((c, i) => (
                        <li key={i}>
                            <span className="font-semibold">{c.name}:</span> <a href={`tel:${c.number}`} className="underline hover:text-blue-900">{c.number}</a>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Call to action */}
            <section className="mb-8">
                <h3 className="text-md font-semibold text-gray-800 mb-2">Upcoming Events & Workshops</h3>
                <p className="text-gray-700">
                    Join local family wellbeing workshops and support groups to connect with others and learn helpful skills.
                    <br />
                    <a
                        href="https://www.localcommunityevents.org/family-support"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-blue-900"
                    >
                        View Events
                    </a>
                </p>
            </section>
        </div>
    );
};

export default FamilySupport;
