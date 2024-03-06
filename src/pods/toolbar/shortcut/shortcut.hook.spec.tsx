import { renderHook } from '@testing-library/react';
import useShortcut from './shortcut.hook';
import { vi } from 'vitest';

describe('useShortcut', () => {
  let targetKey: string[];
  let callback: () => void;

  beforeEach(() => {
    targetKey = ['a'];
    callback = vi.fn();

    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mac',
      configurable: true,
    });
  });

  it('should call the callback when the right key is pressed', async () => {
    renderHook(() => useShortcut({ targetKey, callback }));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      ctrlKey: true,
    });

    window.dispatchEvent(event);

    expect(callback).toHaveBeenCalled();
  });

  it('should not call the callback when the wrong key is pressed', async () => {
    renderHook(() => useShortcut({ targetKey, callback }));

    const event = new KeyboardEvent('keydown', {
      key: 'b',
      code: 'KeyB',
      ctrlKey: true,
    });

    window.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should add "Alt" to the event if the user is on Windows or Linux', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Windows',
      configurable: true,
    });

    renderHook(() => useShortcut({ targetKey, callback }));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      altKey: true,
    });

    window.dispatchEvent(event);

    expect(callback).toHaveBeenCalled();
  });

  it('should add "Ctrl" to the event if the user is on MacOS', async () => {
    renderHook(() => useShortcut({ targetKey, callback }));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      ctrlKey: true,
    });

    window.dispatchEvent(event);

    expect(callback).toHaveBeenCalled();
  });

  it('should not call the callback when the user is on Mac and "Alt" is pressed', async () => {
    renderHook(() => useShortcut({ targetKey, callback }));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      altKey: true,
    });

    window.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call the callback when the user is on Windows or Linux and "Ctrl" is pressed', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Windows',
      configurable: true,
    });

    renderHook(() => useShortcut({ targetKey, callback }));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      ctrlKey: true,
    });

    window.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });
});
