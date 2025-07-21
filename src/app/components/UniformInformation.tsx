import React, { useState } from 'react';
import { Mail, Star, CheckCircle, ShoppingCart } from 'lucide-react';
import { TEXTS } from '../constants/texts';
import EmailSummaryForm from './EmailSummaryForm';
import MenuHeader from './MenuHeader';

type Props = { onBack: () => void };

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Year 14'];

const UNIFORM_BY_YEAR: Record<string, string[]> = {
  'Year 7': [
    'White cotton shirt (long or short‑sleeve)',
    'Navy blazer with school crest',
    'Grey trousers or pleated skirt',
    'Black leather shoes (no trainers)',
    'House‑colour tie',
  ],
  'Year 8': ['Same as Year 7'],
  'Year 9': ['Same as Year 7'],
  'Year 10': ['Same as Year 7'],
  'Year 11': ['Same as Year 7'],
  'Year 12': ['Same as Year 7'],
  'Year 13': ['Same as Year 7'],
  'Year 14': ['Same as Year 7'],
};

export default function UniformInformation({ onBack }: Props) {
  const [year, setYear] = useState<string | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  const summary =
    year &&
    [
      `Uniform requirements for ${year}`,
      ...UNIFORM_BY_YEAR[year],
      '',
      'Local supplier:',
      '• SchoolWear Ltd – 123 High St (schoolwear.example.com)',
      '',
      'Second‑hand shop:',
      '• PTA Uniform Hub – open Wed 3–4 pm, Main Hall',
    ].join('\n');

  const handleBack = () => {
    if (showEmail) setShowEmail(false);
    else if (year) setYear(null);
    else onBack();
  };

  return (
    <div className="space-y-2">

      {<MenuHeader title={
        showEmail
          ? "Send Uniform Info via Email"
          : year
            ? `Uniform Info for ${year}`
            : "Uniform Information"
      } onBack={handleBack} />}

      {/* 0. Choose Year */}
      {!year && (
        <>
          <p className="text-gray-600 text-sm mb-4 mt-0">{TEXTS.uniformYearGroupPrompt}</p>
          <div className="grid grid-cols-2 gap-3">
            {YEAR_GROUPS.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className="px-5 py-3 bg-blue-50 border border-blue-300 text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {y}
              </button>
            ))}
          </div>
        </>
      )}

      {/* 1. Email Form */}
      {year && showEmail && summary && (
        <EmailSummaryForm summary={summary} onBack={() => setShowEmail(false)} />
      )}

      {/* 2. Uniform Details */}
      {year && !showEmail && (
        <>
          <section className="p-5 bg-blue-50 border border-blue-200 rounded-lg shadow-inner  mt-2">
            <h3 className="text-blue-800 font-semibold mb-3 flex items-center gap-2 text-lg">
              <CheckCircle size={22} className="text-blue-600" />
              Requirements List
            </h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2 text-sm">
              {UNIFORM_BY_YEAR[year].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="p-5 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-blue-800 font-semibold mb-3 flex items-center gap-2 text-lg">
              <ShoppingCart size={22} className="text-blue-600" />
              Suppliers & Second-hand Shop
            </h3>

            <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <div>
                <h4 className="font-semibold text-blue-700 mb-1">Local Supplier</h4>
                <p>
                  <a
                    href="https://schoolwear.example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    SchoolWear Ltd
                  </a>{' '}
                  – 123 High St (10% discount with student ID)
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-1">Second-hand Uniform Shop</h4>
                <p>PTA Uniform Hub – Wednesday 3–4 pm, Main Hall</p>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => setShowEmail(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md transition focus:outline-none focus:ring-4 focus:ring-blue-400"
              aria-label="Email uniform summary"
            >
              <Mail size={20} /> Email this to me
            </button>
            <button
              onClick={() => alert('⭐ Added to favourites')}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50 font-semibold transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
              aria-label="Add uniform information to favourites"
            >
              <Star size={20} /> Add to favourites
            </button>
          </div>
        </>
      )}
    </div>
  );
}
