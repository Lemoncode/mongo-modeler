import React from 'react';

export const useOnKey = (
  ref: React.RefObject<HTMLElement>,
  keys: string[],
  callback: (e: KeyboardEvent) => void
) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keys.includes(e.key)) {
        callback(e);
      }
    };

    ref.current?.addEventListener('keydown', handleKeyDown);

    return () => {
      ref.current?.removeEventListener('keydown', handleKeyDown);
    };
  }, [keys]);
};
