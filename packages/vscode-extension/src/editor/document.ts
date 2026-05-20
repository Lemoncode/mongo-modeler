import * as vscode from 'vscode';

export type MongoModelerDocument = vscode.CustomDocument & {
  readonly uri: vscode.Uri;
  content: string;
};

export const openDocument = async (
  uri: vscode.Uri,
  openContext: vscode.CustomDocumentOpenContext
): Promise<MongoModelerDocument> => {
  const source = openContext.backupId
    ? vscode.Uri.parse(openContext.backupId)
    : uri;
  const content = await readFile(source);
  return { uri, content, dispose: () => { } }; // no resources to release
};

export const readFile = async (uri: vscode.Uri): Promise<string> => {
  const bytes = await vscode.workspace.fs.readFile(uri);
  return new TextDecoder().decode(bytes);
};

export const writeFile = async (
  uri: vscode.Uri,
  content: string
): Promise<void> => {
  await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(content));
};
