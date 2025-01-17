import React from 'react';

export const useClickOutside = (
  isOpen: boolean,
  ref: React.RefObject<HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  const handleClickOutside = (e: MouseEvent) => {
    callback(e);
  };

  React.useEffect(() => {
    ref.current?.addEventListener('click', handleClickOutside);

    return () => {
      ref.current?.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
};
