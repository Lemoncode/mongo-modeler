interface Props {
  onClick: () => void;
  icon: JSX.Element;
  disabled?: boolean;
  title?: string;
  ariaLabel?: string;
}

export const CommandIconButton: React.FC<Props> = props => {
  const { onClick, icon, disabled, title, ariaLabel } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};
