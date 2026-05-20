import type {
  AppMessage,
  HostMessage,
  PayloadOf,
} from '@lemoncode/mongo-modeler-bridge-protocol';
import { isVSCodeEnv } from './env.helpers';

type HandlerFor<T extends HostMessage['type']> = (
  payload: PayloadOf<HostMessage, T>
) => void;

type AnyHandler = (payload: unknown) => void;

const handlers = new Map<string, Set<AnyHandler>>();

export const sendToExtension = (msg: AppMessage): void => {
  if (!isVSCodeEnv()) return;
  // In VS Code webviews the parent origin is not a stable app URL.
  // We post to parent and rely on origin/source checks in the bridge listeners.
  window.parent.postMessage(msg, '*');
};

export const onMessage = <T extends HostMessage['type']>(
  type: T,
  handler: HandlerFor<T>
): (() => void) => {
  if (!isVSCodeEnv()) return () => { };

  const existing = handlers.get(type) ?? new Set<AnyHandler>();
  existing.add(handler as AnyHandler);
  handlers.set(type, existing);

  return () => {
    const set = handlers.get(type);
    if (!set) return;
    set.delete(handler as AnyHandler);
    if (set.size === 0) handlers.delete(type);
  };
};

if (typeof window !== 'undefined' && isVSCodeEnv()) {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.source !== window.parent) return;

    const msg = event.data as Partial<HostMessage> | undefined;
    if (!msg?.type) return;

    const set = handlers.get(msg.type);
    if (!set) return;

    const payload = (msg as { payload?: unknown }).payload;
    for (const handler of set) handler(payload);
  });
}
