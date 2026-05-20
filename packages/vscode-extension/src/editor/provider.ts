import { getEditorAppUrl, onAppUrlChange } from '#core';
import {
  type AppMessage,
  HOST_MESSAGE_TYPE,
  type HostMessage,
} from '@lemoncode/mongo-modeler-bridge-protocol';
import { basename } from 'node:path';
import * as vscode from 'vscode';
import {
  type MongoModelerDocument,
  openDocument,
  readFile,
  writeFile,
} from './document';
import { handleWebviewMessage } from './handlers';
import { getHtml } from './panel';

export class MongoModelerEditorProvider
  implements vscode.CustomEditorProvider<MongoModelerDocument> {
  static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new MongoModelerEditorProvider(context.extensionUri);
    const editorRegistration = vscode.window.registerCustomEditorProvider(
      'mongo-modeler.editor',
      provider,
      {
        supportsMultipleEditorsPerDocument: false,
        webviewOptions: { retainContextWhenHidden: true },
      }
    );
    const configListener = onAppUrlChange(() => provider.refreshAllPanels());
    return vscode.Disposable.from(editorRegistration, configListener);
  }

  constructor(private readonly extensionUri: vscode.Uri) { }

  private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<
    vscode.CustomDocumentContentChangeEvent<MongoModelerDocument>
  >();
  readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

  private readonly panels = new Map<string, vscode.WebviewPanel[]>();

  async openCustomDocument(
    uri: vscode.Uri,
    openContext: vscode.CustomDocumentOpenContext
  ): Promise<MongoModelerDocument> {
    return openDocument(uri, openContext);
  }

  async saveCustomDocument(
    doc: MongoModelerDocument,
    _cancel: vscode.CancellationToken
  ): Promise<void> {
    await writeFile(doc.uri, doc.content);
  }

  async saveCustomDocumentAs(
    doc: MongoModelerDocument,
    dest: vscode.Uri,
    _cancel: vscode.CancellationToken
  ): Promise<void> {
    await writeFile(dest, doc.content);
  }

  async revertCustomDocument(
    doc: MongoModelerDocument,
    _cancel: vscode.CancellationToken
  ): Promise<void> {
    doc.content = await readFile(doc.uri);
    let data: unknown;
    try {
      data = JSON.parse(doc.content);
    } catch {
      data = doc.content;
    }
    this.broadcast(doc, {
      type: HOST_MESSAGE_TYPE.LOAD_FILE,
      payload: { data, fileName: basename(doc.uri.fsPath) },
    });
  }

  async backupCustomDocument(
    doc: MongoModelerDocument,
    context: vscode.CustomDocumentBackupContext,
    _cancel: vscode.CancellationToken
  ): Promise<vscode.CustomDocumentBackup> {
    await writeFile(context.destination, doc.content);
    return {
      id: context.destination.toString(),
      delete: () => {
        vscode.workspace.fs
          .delete(context.destination)
          .then(undefined, () => { });
      },
    };
  }

  resolveCustomEditor(
    doc: MongoModelerDocument,
    panel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): void {
    const key = doc.uri.toString();
    this.panels.set(key, [...(this.panels.get(key) ?? []), panel]);
    panel.onDidDispose(() => {
      const remaining = (this.panels.get(key) ?? []).filter(p => p !== panel);
      this.panels.set(key, remaining);
    });

    panel.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };

    panel.webview.onDidReceiveMessage(async (msg: AppMessage) => {
      await handleWebviewMessage(msg, doc, reply =>
        panel.webview.postMessage(reply satisfies HostMessage)
      );
    });

    panel.webview.html = getHtml(
      panel.webview,
      this.extensionUri,
      getEditorAppUrl()
    );
  }

  private broadcast(doc: MongoModelerDocument, msg: HostMessage): void {
    for (const panel of this.panels.get(doc.uri.toString()) ?? []) {
      panel.webview.postMessage(msg);
    }
  }

  refreshAllPanels(): void {
    const url = getEditorAppUrl();
    for (const panels of this.panels.values()) {
      for (const panel of panels) {
        panel.webview.html = getHtml(panel.webview, this.extensionUri, url);
      }
    }
  }
}
