import * as vscode from 'vscode';

const SECTION = 'mongo-modeler';
const APP_URL_KEY = 'appUrl';
const FULL_KEY = `${SECTION}.${APP_URL_KEY}`;
const DEFAULT_APP_URL = 'https://mongomodeler.com/editor.html';

const EDITOR_PARAMS = { env: 'vscode' } as const;

const readRawAppUrl = (): string => {
  const value = vscode.workspace
    .getConfiguration(SECTION)
    .get<string>(APP_URL_KEY);
  return value?.trim() || DEFAULT_APP_URL;
};

const withParams = (url: string, params: Record<string, string>): string => {
  const parsed = new URL(url);
  for (const [k, v] of Object.entries(params)) parsed.searchParams.set(k, v);
  return parsed.toString();
};

export const getEditorAppUrl = (): string =>
  withParams(readRawAppUrl(), EDITOR_PARAMS);

export const onAppUrlChange = (listener: () => void): vscode.Disposable =>
  vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration(FULL_KEY)) listener();
  });
