import type { APP_MESSAGE_TYPE, HOST_MESSAGE_TYPE } from './constant';

export interface LoadFilePayload {
  data: unknown;
  fileName: string;
}

export interface ThemePayload {
  background: string;
  backgroundSecondary: string;
  foreground: string;
}

export type HostMessage =
  | { type: typeof HOST_MESSAGE_TYPE.SAVED }
  | { type: typeof HOST_MESSAGE_TYPE.LOAD_FILE; payload: LoadFilePayload }
  | { type: typeof HOST_MESSAGE_TYPE.THEME; payload: ThemePayload };

export type AppMessage =
  | { type: typeof APP_MESSAGE_TYPE.READY }
  | { type: typeof APP_MESSAGE_TYPE.WEBVIEW_READY }
  | { type: typeof APP_MESSAGE_TYPE.SAVE; payload: { content: string } };

export type PayloadOf<U extends { type: string }, T extends U['type']> =
  Extract<U, { type: T }> extends { payload: infer P } ? P : undefined;
