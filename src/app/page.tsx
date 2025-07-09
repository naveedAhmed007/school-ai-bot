'use client';

import React, { useCallback, useState } from 'react';
import QuickChatFab from './components/QuickChatFab';
import { TeachWellAISystem } from './components/BottomRightModal/BottomRightModal';

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);

  const toggleChat = useCallback(() => {
    setOpen((prev) => !prev);
  }, [open]);

  return (
    <>
      <QuickChatFab onClick={toggleChat} />
       <TeachWellAISystem open={open} onClose={() => setOpen(false)} />
    </>
  );
}
