import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ActionButton } from './action-button.component';
import { ShortcutOptions } from '@/common/shortcut';
import { useModalDialogContext } from '@/core/providers';

vi.mock('@/core/providers', () => ({
  useModalDialogContext: vi.fn(),
}));

describe('ActionButton', () => {
  let onClick: () => void;
  let shortcutOptions: ShortcutOptions;

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

    onClick = vi.fn();

    shortcutOptions = {
      description: 'TestDescription',
      id: 'shortcut',
      targetKey: ['a'],
      targetKeyLabel: 'A',
    };

    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mac',
      configurable: true,
    });
  });

  it('should render the button with the provided label and icon', () => {
    render(
      <ActionButton
        icon={<span>Icon</span>}
        label="Label"
        onClick={onClick}
        shortcutOptions={shortcutOptions}
      />
    );

    expect(screen.getByText('Icon')).not.toBeNull();
    expect(screen.getByText('Label')).not.toBeNull();
  });

  it('should call the onClick callback when the button is clicked', () => {
    const { getByText } = render(
      <ActionButton
        icon={<span>Icon</span>}
        label="Label"
        onClick={onClick}
        shortcutOptions={shortcutOptions}
      />
    );

    fireEvent.click(getByText('Label'));

    expect(onClick).toHaveBeenCalled();
  });

  describe('tooltip display', () => {
    it('should render system modifier correctly', () => {
      // Test Mac
      const { getByRole, rerender } = render(
        <ActionButton
          icon={<span>Icon</span>}
          label="Label"
          onClick={onClick}
          shortcutOptions={{
            ...shortcutOptions,
            modifierType: 'system',
          }}
        />
      );
      expect(getByRole('tooltip').textContent).toBe('(⌘ + A)');

      // Test Windows
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Windows',
        configurable: true,
      });
      rerender(
        <ActionButton
          icon={<span>Icon</span>}
          label="Label"
          onClick={onClick}
          shortcutOptions={{
            ...shortcutOptions,
            modifierType: 'system',
          }}
        />
      );
      expect(getByRole('tooltip').textContent).toBe('(Ctrl + A)');
    });

    it('should render alt tooltip correctly', () => {
      const { getByRole } = render(
        <ActionButton
          icon={<span>Icon</span>}
          label="Label"
          onClick={onClick}
          shortcutOptions={{
            ...shortcutOptions,
            modifierType: 'alt',
          }}
        />
      );
      expect(getByRole('tooltip').textContent).toBe('(Alt + A)');
    });

    it('should render mo-modifier tooltip correctly', () => {
      const { getByRole } = render(
        <ActionButton
          icon={<span>Icon</span>}
          label="Label"
          onClick={onClick}
          shortcutOptions={{
            ...shortcutOptions,
            modifierType: 'none',
          }}
        />
      );
      expect(getByRole('tooltip').textContent).toBe('(A)');
    });

    it('should not show tooltip when disabled', () => {
      const { queryByRole } = render(
        <ActionButton
          icon={<span>Icon</span>}
          label="Label"
          onClick={onClick}
          disabled
          shortcutOptions={shortcutOptions}
        />
      );

      expect(queryByRole('tooltip')).toBeNull();
    });
  });

  it('should disable the button if the disabled prop is true', () => {
    const { getByText } = render(
      <ActionButton
        icon={<span>Icon</span>}
        label="Label"
        onClick={onClick}
        disabled
        shortcutOptions={shortcutOptions}
      />
    );

    const button = getByText('Label').closest('button');

    expect(button).toHaveProperty('disabled', true);
  });

  it('should hide the label when showLabel is false', () => {
    render(
      <ActionButton
        icon={<span>Icon</span>}
        label="Label"
        onClick={onClick}
        showLabel={false}
        shortcutOptions={shortcutOptions}
      />
    );

    expect(screen.queryByText('Label')).toBeNull();
  });

  it('should apply tooltipBottom by default when tooltipPosition is not provided', () => {
    const { getByRole } = render(
      <ActionButton
        icon={<span>Icon</span>}
        label="Label"
        onClick={onClick}
        shortcutOptions={shortcutOptions}
      />
    );

    const tooltip = getByRole('tooltip');
    expect(tooltip.className).toContain('tooltipBottom');
  });

  it('should apply tooltipTop class when tooltipPosition is top', () => {
    const { getByRole } = render(
      <ActionButton
        icon={<span>Icon</span>}
        label="Label"
        onClick={onClick}
        tooltipPosition="top"
        shortcutOptions={shortcutOptions}
      />
    );

    const tooltip = getByRole('tooltip');
    expect(tooltip.className).toContain('tooltipTop');
  });
});
