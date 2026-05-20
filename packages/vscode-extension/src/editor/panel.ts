import * as vscode from 'vscode';

const escapeAttr = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export const getHtml = (
  webview: vscode.Webview,
  extensionUri: vscode.Uri,
  appUrl: string
): string => {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'dist', 'webview.js')
  );
  const appOrigin = new URL(appUrl).origin;
  const wsOrigin = appOrigin.replace(/^http/, 'ws');

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${appOrigin}; connect-src ${appOrigin} ${wsOrigin}; script-src ${webview.cspSource}; style-src 'unsafe-inline';" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { overflow: hidden; background: transparent; }
    iframe { display: block; width: 100%; height: 100vh; border: none; }
  </style>
</head>
<body data-app-url="${escapeAttr(appUrl)}">
  <script src="${scriptUri}"></script>
</body>
</html>`;
};
