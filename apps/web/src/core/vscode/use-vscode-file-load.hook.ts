import {
  useCanvasSchemaContext,
  useCanvasViewSettingsContext,
} from '@/core/providers';
import {
  APP_MESSAGE_TYPE,
  HOST_MESSAGE_TYPE,
  type LoadFilePayload,
} from '@lemoncode/mongo-modeler-bridge-protocol';
import { useEffect, useRef, type MutableRefObject } from 'react';
import { isVSCodeEnv } from './env.helpers';
import { onMessage, sendToExtension } from './vscode-bridge.helpers';
import { deserializeSchema } from './vscode-sync.helpers';

export const useVSCodeFileLoad = (): MutableRefObject<boolean> => {
  const { loadSchema } = useCanvasSchemaContext();
  const { setFilename, setLoadSample } = useCanvasViewSettingsContext();

  const loadSchemaRef = useRef(loadSchema);
  const setFilenameRef = useRef(setFilename);
  const setLoadSampleRef = useRef(setLoadSample);

  useEffect(() => {
    loadSchemaRef.current = loadSchema;
    setFilenameRef.current = setFilename;
    setLoadSampleRef.current = setLoadSample;
  });

  const hasReceivedFileRef = useRef(false);

  useEffect(() => {
    if (!isVSCodeEnv()) return;

    const unsubscribe = onMessage(
      HOST_MESSAGE_TYPE.LOAD_FILE,
      (payload: LoadFilePayload) => {
        hasReceivedFileRef.current = true;
        setFilenameRef.current(payload.fileName);
        setLoadSampleRef.current(false);
        loadSchemaRef.current(deserializeSchema(payload.data));
      }
    );

    sendToExtension({ type: APP_MESSAGE_TYPE.WEBVIEW_READY });

    return unsubscribe;
  }, []);

  return hasReceivedFileRef;
};
