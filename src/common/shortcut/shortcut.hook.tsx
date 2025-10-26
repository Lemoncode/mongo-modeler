import { isMacOS, isWindowsOrLinux } from '@/common/helpers/platform.helpers';
import { useModalDialogContext } from '@/core/providers';
import { useEffect } from 'react';
import { ModifierType } from './shortcut.model';

export interface ShortcutHookProps {
  targetKey: string[];
  callback: () => void;
  modifierType?: ModifierType;
}

/**
 * This hook is used to create a keyboard shortcut
 * it uses Ctrl + key for Windows and Cmd + key for Mac
 * to avoid conflicts with the browser shortcuts
 * @param  {String[]} targetKey The key that will trigger the shortcut
 * @param  {Function} callback  The function to be called when the shortcut is triggered
 * @return {void}
 */

const useShortcut = ({
  targetKey,
  callback,
  modifierType = 'system',
}: ShortcutHookProps) => {
  const { modalDialog } = useModalDialogContext();

  const handleKeyPress = (event: KeyboardEvent) => {
    if (modalDialog.isOpen) {
      return;
    }

    const isMetaKeyPressed = event.getModifierState('Meta');
    const isCtrlKeyPressed = event.getModifierState('Control');
    const isAltKeyPressed = event.getModifierState('Alt');

    const isValidModifier = {
      none: !isMetaKeyPressed && !isCtrlKeyPressed && !isAltKeyPressed,
      system:
        (isWindowsOrLinux() && isCtrlKeyPressed) ||
        (isMacOS() && isMetaKeyPressed),
      alt: isAltKeyPressed && !isCtrlKeyPressed && !isMetaKeyPressed,
    }[modifierType];

    if (isValidModifier && targetKey.includes(event.key)) {
      event.preventDefault();
      callback();
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
