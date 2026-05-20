import { basename } from 'node:path';
import {
  APP_MESSAGE_TYPE,
  type AppMessage,
  HOST_MESSAGE_TYPE,
  type HostMessage,
} from '@lemoncode/mongo-modeler-bridge-protocol';
import { type MongoModelerDocument, writeFile } from './document';

type PostMessageFn = (msg: HostMessage) => void;

export const handleWebviewMessage = async (
  msg: AppMessage,
  doc: MongoModelerDocument,
  postMessage: PostMessageFn
): Promise<void> => {
  switch (msg.type) {
    case APP_MESSAGE_TYPE.WEBVIEW_READY: {
      let data: unknown;
      try {
        data = JSON.parse(doc.content);
      } catch {
        data = doc.content;
      }
      postMessage({
        type: HOST_MESSAGE_TYPE.LOAD_FILE,
        payload: { data, fileName: basename(doc.uri.fsPath) },
      });
      break;
    }

    case APP_MESSAGE_TYPE.SAVE:
      doc.content = msg.payload.content;
      await writeFile(doc.uri, doc.content);
      postMessage({ type: HOST_MESSAGE_TYPE.SAVED });
      break;
  }
};
