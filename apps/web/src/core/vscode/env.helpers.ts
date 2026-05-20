export const isVSCodeEnv = (): boolean =>
  new URLSearchParams(window.location.search).get('env') === 'vscode';
