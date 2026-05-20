export const HOST_MESSAGE_TYPE = {
  SAVED: 'mm:saved',
  LOAD_FILE: 'mm:load-file',
  THEME: 'mm:theme',
} as const;

export const APP_MESSAGE_TYPE = {
  READY: 'mm:ready',
  SAVE: 'mm:save',
  WEBVIEW_READY: 'mm:webview-ready',
} as const;
