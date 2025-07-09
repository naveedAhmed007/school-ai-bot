'use client';

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

type QuickChatFabProps = {
  onClick?: () => void;
};

export default function QuickChatFab({ onClick }: QuickChatFabProps) {
  const [primaryColor, setPrimaryColor] = useState<string>('#0080FF');
  const [hoverColor, setHoverColor] = useState<string>('#0066cc');

  useEffect(() => {
    const hostPrimary = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    if (hostPrimary) {
      const color = hostPrimary.trim();
      setPrimaryColor(color);

      setHoverColor(darkenHex(color, 0.2));
    }
  }, []);

  function darkenHex(hex: string, amount: number): string {
    hex = hex.replace('#', '');
    const num = parseInt(hex, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;

    r = Math.max(0, Math.min(255, Math.floor(r * (1 - amount))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - amount))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - amount))));

    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  return (
    <button
      aria-label="chat"
      onClick={onClick}
      style={{
        backgroundColor: primaryColor,
        bottom: `calc(env(safe-area-inset-bottom, 0px) + 16px)`,
        right: `calc(env(safe-area-inset-right, 0px) + 16px)`,
      }}
      className="
        fixed z-[1300] rounded-full text-white
        w-[60px] h-[60px]
        flex items-center justify-center
        transition-colors duration-200
        hover:brightness-90
        sm:bottom-[calc(env(safe-area-inset-bottom,0px)+12px)]
        sm:right-[calc(env(safe-area-inset-right,0px)+12px)]
        sm:w-[52px] sm:h-[52px]
        xs:bottom-[calc(env(safe-area-inset-bottom,0px)+8px)]
        xs:right-[calc(env(safe-area-inset-right,0px)+8px)]
        xs:w-[44px] xs:h-[44px]
      "
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = primaryColor)}
    >
      <MessageCircle
        size={30} // adjust sizes as needed
        strokeWidth={1.5}
        color="white"
      />
    </button>
  );
}
