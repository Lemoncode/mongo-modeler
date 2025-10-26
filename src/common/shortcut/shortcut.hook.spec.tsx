import { renderHook } from '@testing-library/react';
import useShortcut from './shortcut.hook';
import { vi } from 'vitest';
import { useModalDialogContext } from '@/core/providers';

vi.mock('@/core/providers', () => ({
  useModalDialogContext: vi.fn(),
}));

describe('useShortcut', () => {
  let targetKey: string[];
  let callback: () => void;

  beforeEach(() => {
    vi.mocked(useModalDialogContext).mockReturnValue({
      modalDialog: {
        isOpen: false,
        selectedComponent: null,
        title: '',
      },
      openModal: vi.fn(),
      closeModal: vi.fn(),
    });

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
      metaKey: true,
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

  it('should add "Ctrl" to the event if the user is on Windows or Linux', async () => {
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

    expect(callback).toHaveBeenCalled();
  });

  it('should add "⌘" to the event if the user is on MacOS', async () => {
    renderHook(() => useShortcut({ targetKey, callback }));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      metaKey: true,
    });

    window.dispatchEvent(event);

    expect(callback).toHaveBeenCalled();
  });

  it('should not call the callback when the user is on Mac and "Ctrl" is pressed', async () => {
    renderHook(() => useShortcut({ targetKey, callback }));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      ctrlKey: true,
    });

    window.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call the callback when the user is on Windows or Linux and "⌘" is pressed', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Windows',
      configurable: true,
    });

    renderHook(() => useShortcut({ targetKey, callback }));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      metaKey: true,
    });

    window.dispatchEvent(event);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call callback with alt modifier', () => {
    renderHook(() =>
      useShortcut({
        targetKey,
        callback,
        modifierType: 'alt',
      })
    );

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      altKey: true,
    });

    window.dispatchEvent(event);
    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback if other modifiers are pressed with alt', () => {
    renderHook(() =>
      useShortcut({
        targetKey,
        callback,
        modifierType: 'alt',
      })
    );

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      altKey: true,
      ctrlKey: true, // No debería funcionar con otros modificadores
    });

    window.dispatchEvent(event);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should call callback with no modifiers', () => {
    renderHook(() =>
      useShortcut({
        targetKey,
        callback,
        modifierType: 'none',
      })
    );

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
    });

    window.dispatchEvent(event);
    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback if any modifier is pressed', () => {
    renderHook(() =>
      useShortcut({
        targetKey,
        callback,
        modifierType: 'none',
      })
    );

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      code: 'KeyA',
      altKey: true,
    });

    window.dispatchEvent(event);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call callback when modal is open', () => {
    vi.mocked(useModalDialogContext).mockReturnValueOnce({
      modalDialog: {
        isOpen: true,
        selectedComponent: null,
        title: '',
      },
      openModal: vi.fn(),
      closeModal: vi.fn(),
    });

    renderHook(() =>
      useShortcut({
        targetKey,
        callback,
        modifierType: 'none',
      })
    );

    const event = new KeyboardEvent('keydown', {
      key: 'r',
      code: 'KeyR',
    });

    window.dispatchEvent(event);
    expect(callback).not.toHaveBeenCalled();
  });
});
