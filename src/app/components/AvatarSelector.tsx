import React from 'react';
import { Avatar } from '@heroui/react';
import { AvatarSelectorProps } from '../types';
import { TEXTS } from '../constants/texts';


export default function AvatarSelector({
  avatars,
  selectedId,
  onSelect,
}: AvatarSelectorProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-8 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
      <p className="text-gray-800 text-lg md:text-xl font-semibold mb-6">
        {TEXTS.selectAvatarPrompt}
      </p>

      <div className="grid grid-cols-3 gap-6 w-full">
        {avatars.map((av) => {
          const isSelected = selectedId === av.id;

          return (
            <button
              key={av.id}
              onClick={() => onSelect(av.id)}
              aria-pressed={isSelected}
              aria-label={av.name}
              title={av.name}
              className={`flex flex-col items-center justify-center p-3 rounded-3xl border-4 transition-all
                focus:outline-none focus:ring-4 focus:ring-blue-400
                ${isSelected
                  ? 'border-blue-600 bg-blue-100 shadow-lg scale-105'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
                }
              `}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-3 rounded-full overflow-hidden">
                <Avatar
                  src={av.src}
                  name={av.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="text-sm font-medium text-gray-900 text-center truncate max-w-[5rem]">
                {av.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
