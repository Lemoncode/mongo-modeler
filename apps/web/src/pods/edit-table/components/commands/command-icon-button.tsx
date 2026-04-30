interface Props {
  onClick: () => void;
  icon: JSX.Element;
  disabled?: boolean;
  ariaLabel?: string;
}

export const CommandIconButton: React.FC<Props> = props => {
  const { onClick, icon, disabled, ariaLabel } = props;

  return (
    <button onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {icon}
    </button>
  );
};
