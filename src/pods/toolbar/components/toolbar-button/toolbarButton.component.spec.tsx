import { fireEvent, render, screen } from '@testing-library/react';
import { ShortcutOptions, ToolbarButton } from './toolbarButton.component';
import { vi } from 'vitest';

describe('ToolbarButton', () => {
  let onClick: () => void;
  let shortcutOptions: ShortcutOptions;

  beforeEach(() => {
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
      <ToolbarButton
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
      <ToolbarButton
        icon={<span>Icon</span>}
        label="Label"
        onClick={onClick}
        shortcutOptions={shortcutOptions}
      />
    );

    fireEvent.click(getByText('Label'));

    expect(onClick).toHaveBeenCalled();
  });

  it('should render the tooltip with the correct shortcut key', () => {
    const { getByRole } = render(
      <ToolbarButton
        icon={<span>Icon</span>}
        label="Label"
        onClick={onClick}
        shortcutOptions={shortcutOptions}
      />
    );

    const tooltip = getByRole('tooltip');

    expect(tooltip.textContent).toContain('Ctrl + A');
  });

  it('should disable the button if the disabled prop is true', () => {
    const { getByText } = render(
      <ToolbarButton
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
});
