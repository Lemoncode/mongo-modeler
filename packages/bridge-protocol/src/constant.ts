export const HOST_MESSAGE_TYPE = {
  LOAD: 'mm:load',
  SAVED: 'mm:saved',
  LOAD_FILE: 'LOAD_FILE',
} as const;

export const APP_MESSAGE_TYPE = {
  READY: 'mm:ready',
  SAVE: 'mm:save',
  WEBVIEW_READY: 'WEBVIEW_READY',
} as const;
