import { isMacOS, isWindowsOrLinux } from '@/common/helpers/platform.helpers';
import { useEffect } from 'react';

export interface ShortcutHookProps {
  targetKey: string[];
  callback: () => void;
}

/**
 * This hook is used to create a keyboard shortcut
 * it uses Ctrl + key for Windows and Cmd + key for Mac
 * to avoid conflicts with the browser shortcuts
 * @param  {String[]} targetKey The key that will trigger the shortcut
 * @param  {Function} callback  The function to be called when the shortcut is triggered
 * @return {void}
 */

const useShortcut = ({ targetKey, callback }: ShortcutHookProps) => {
  const handleKeyPress = (event: KeyboardEvent) => {
    const isAltKeyPressed = event.getModifierState('Alt');
    const isCtrlKeyPressed = event.getModifierState('Control');
    console.log('===event.key==>', event.key);
    if (
      (isWindowsOrLinux() && isAltKeyPressed) ||
      (isMacOS() && isCtrlKeyPressed)
    ) {
      if (targetKey.includes(event.key)) {
        console.log('===event.key==>', event.key);
        event.preventDefault();
        callback();
      }
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handleKeyPress(event);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKey, callback]);
};

export default useShortcut;
