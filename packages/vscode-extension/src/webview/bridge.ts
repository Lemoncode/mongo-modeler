import {
  type AppMessage,
  HOST_MESSAGE_TYPE,
  type HostMessage,
} from '@lemoncode/mongo-modeler-bridge-protocol';

declare function acquireVsCodeApi(): { postMessage(msg: AppMessage): void };

const vscode = acquireVsCodeApi();

const FORWARDED_TO_IFRAME: ReadonlySet<string> = new Set([
  HOST_MESSAGE_TYPE.SAVED,
  HOST_MESSAGE_TYPE.LOAD_FILE,
]);

export const setupBridge = (
  iframe: HTMLIFrameElement,
  appOrigin: string
): void => {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin === appOrigin) {
      vscode.postMessage(event.data as AppMessage);
    } else {
      const msg = event.data as HostMessage;
      if (FORWARDED_TO_IFRAME.has(msg.type)) {
        iframe.contentWindow?.postMessage(msg, appOrigin);
      }
    }
  });
};
