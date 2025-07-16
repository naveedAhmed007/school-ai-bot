// src/components/ContactInformation.tsx
import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
  X,
} from 'lucide-react';

type ContactRow = {
  label: string;
  value: string;
  icon: React.ReactNode;
  href?: string;           // tel:, mailto:, https://…
  copyable?: boolean;      // show copy‑to‑clipboard button
};

const CONTACTS: ContactRow[] = [
  {
    label: 'Main office',
    value: '+44 1234 567890',
    icon: <Phone size={18} />,
    href: 'tel:+441234567890',
    copyable: true,
  },
  {
    label: 'Attendance / Absence line',
    value: '+44 1234 567891 (before 9 am)',
    icon: <Phone size={18} />,
    href: 'tel:+441234567891',
    copyable: true,
  },
  {
    label: 'General e‑mail',
    value: 'info@greenoak‑school.org',
    icon: <Mail size={18} />,
    href: 'mailto:info@greenoak‑school.org',
    copyable: true,
  },
  {
    label: 'Admissions',
    value: 'admissions@greenoak‑school.org',
    icon: <Mail size={18} />,
    href: 'mailto:admissions@greenoak‑school.org',
    copyable: true,
  },
  {
    label: 'Address',
    value: 'Green Oak School\n123 High Street\nSomewhere AB1 2CD',
    icon: <MapPin size={18} />,
    href: 'https://maps.google.com/?q=Green+Oak+School+AB1+2CD',
  },
  {
    label: 'Office hours',
    value: 'Mon – Fri · 8 :30 am – 4 :30 pm',
    icon: <Clock size={18} />,
  },
];

export default function ContactInformation() {
  const [copiedRow, setCopiedRow] = useState<string | null>(null);

  const handleCopy = (row: ContactRow) => {
    navigator.clipboard.writeText(row.value.replace(/\n/g, ' ')).then(
      () => {
        setCopiedRow(row.label);
        setTimeout(() => setCopiedRow(null), 2000);
      },
      () => alert('Copy failed'),
    );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200 space-y-5">
      {CONTACTS.map((row) => (
        <div
          key={row.label}
          className="flex items-start gap-3 text-gray-800 text-sm"
        >
          <span className="text-blue-700 mt-0.5 shrink-0">{row.icon}</span>

          {/* Text block / link */}
          {row.href ? (
            <a
              href={row.href}
              target={row.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="whitespace-pre-line hover:underline flex-1"
            >
              <strong className="font-medium">{row.label}</strong>
              <br />
              {row.value}
            </a>
          ) : (
            <p className="whitespace-pre-line flex-1">
              <strong className="font-medium">{row.label}</strong>
              <br />
              {row.value}
            </p>
          )}

          {/* Copy button (optional) */}
          {row.copyable && (
            <button
              onClick={() => handleCopy(row)}
              className="p-1 rounded hover:bg-gray-100 transition"
              aria-label={`Copy ${row.label}`}
            >
              {copiedRow === row.label ? (
                <Check size={16} className="text-green-600" />
              ) : (
                <Copy size={16} className="text-gray-500" />
              )}
            </button>
          )}
        </div>
      ))}

      {/* Optional footer note */}
      <p className="pt-4 text-xs text-gray-500 border-t">
        We aim to respond to e‑mails within one working day.
      </p>
    </div>
  );
}
