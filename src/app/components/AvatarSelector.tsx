import React from 'react';
import { TEXTS } from '../constants/texts';
import { AvatarSelectorProps } from '../types';




export default function AvatarSelector({
  avatars,
  selectedId,
  onSelect,
}: AvatarSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 px-4 py-6 text-center">
      <p className="text-gray-600 text-sm md:text-base mb-2">
        {TEXTS.selectAvatarPrompt}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-md">
        {avatars.map((av) => (
          <button
            key={av.id}
            onClick={() => onSelect(av.id)}
            aria-pressed={selectedId === av.id}
            className={`flex flex-col items-center p-3 md:p-4 rounded-xl border-2 ${
              selectedId === av.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 mb-2">{av.svg}</div>
            <div className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">
              {av.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
