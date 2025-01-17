import React from 'react';

export const useOnTwoKeys = (
  ref: React.RefObject<HTMLElement>,
  keys: string[],
  keyPressed: string,
  callback: (e: KeyboardEvent) => void
) => {
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const isCtrlKeyPressed = e.getModifierState(keyPressed);
      if (keys.includes(e.key) && isCtrlKeyPressed) {
        callback(e);
      }
    };

    ref.current?.addEventListener('keydown', handleKeyPress);

    return () => {
      ref.current?.removeEventListener('keydown', handleKeyPress);
    };
  }, [keys]);
};
