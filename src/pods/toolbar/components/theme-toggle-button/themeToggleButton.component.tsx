import { useThemeContext } from '@/core/providers';
import { DarkIcon, LightIcon } from '@/common/components/icons';
import { ActionButton } from '@/common/components/action-button';

interface Props {
  darkLabel: string;
  lightLabel: string;
}
export const ThemeToggleButton: React.FC<Props> = ({
  darkLabel,
  lightLabel,
}) => {
  const { theme, toggleTheme } = useThemeContext();
  const label = theme.themeMode === 'dark' ? lightLabel : darkLabel;
  return (
    <ActionButton
      className="hide-mobile"
      icon={theme.themeMode === 'dark' ? <LightIcon /> : <DarkIcon />}
      label={label}
      onClick={toggleTheme}
    />
  );
};
