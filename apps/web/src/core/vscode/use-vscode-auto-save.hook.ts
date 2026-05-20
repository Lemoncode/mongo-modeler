import { APP_MESSAGE_TYPE } from '@lemoncode/mongo-modeler-bridge-protocol';
import { useEffect, useRef, type MutableRefObject } from 'react';
import { useCanvasSchemaContext } from '@/core/providers';
import { isVSCodeEnv } from './env.helpers';
import { sendToExtension } from './vscode-bridge.helpers';
import { serializeSchema } from './vscode-sync.helpers';

const AUTO_SAVE_DEBOUNCE_MS = 500;

export const useVSCodeAutoSave = (
  hasReceivedFileRef: MutableRefObject<boolean>
): void => {
  const { canvasSchema } = useCanvasSchemaContext();

  const lastSavedContentRef = useRef<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isVSCodeEnv() || !hasReceivedFileRef.current) return;

    const content = serializeSchema(canvasSchema);

    if (lastSavedContentRef.current === null) {
      lastSavedContentRef.current = content;
      return;
    }

    if (content === lastSavedContentRef.current) return;

    debounceTimerRef.current = setTimeout(() => {
      sendToExtension({
        type: APP_MESSAGE_TYPE.SAVE,
        payload: { content },
      });
      lastSavedContentRef.current = content;
      debounceTimerRef.current = null;
    }, AUTO_SAVE_DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current !== null) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [canvasSchema]);
};
