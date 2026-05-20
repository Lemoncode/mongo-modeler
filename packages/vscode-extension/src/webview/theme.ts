import {
  APP_MESSAGE_TYPE,
  HOST_MESSAGE_TYPE,
  type ThemePayload,
} from '@lemoncode/mongo-modeler-bridge-protocol';

const readVar = (style: CSSStyleDeclaration, name: string): string =>
  style.getPropertyValue(name).trim();

export const extractTheme = (): ThemePayload => {
  const style = getComputedStyle(document.documentElement);
  return {
    background: readVar(style, '--vscode-editor-background'),
    backgroundSecondary: readVar(style, '--vscode-sideBar-background'),
    foreground: readVar(style, '--vscode-editor-foreground'),
  };
};

const IFRAME_READY_TYPES: ReadonlySet<string> = new Set([
  APP_MESSAGE_TYPE.WEBVIEW_READY,
  APP_MESSAGE_TYPE.READY,
]);

export const setupThemeSync = (
  iframe: HTMLIFrameElement,
  appOrigin: string
): (() => void) => {
  const sendTheme = (): void => {
    iframe.contentWindow?.postMessage(
      { type: HOST_MESSAGE_TYPE.THEME, payload: extractTheme() },
      appOrigin
    );
  };

  const onIframeReady = (event: MessageEvent): void => {
    if (event.origin !== appOrigin) return;
    const type = (event.data as { type?: string } | undefined)?.type;
    if (type && IFRAME_READY_TYPES.has(type)) sendTheme();
  };
  window.addEventListener('message', onIframeReady);

  const observer = new MutationObserver(sendTheme);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class', 'style'],
  });

  return () => {
    window.removeEventListener('message', onIframeReady);
    observer.disconnect();
  };
};
