interface Props {
  onClick?: () => void;
  icon: JSX.Element;
  disabled?: boolean;
  onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void;
}

export const CommandIconButton: React.FC<Props> = props => {
  const { onClick, icon, disabled, onPointerDown } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onPointerDown={e => onPointerDown && onPointerDown(e)}
    >
      {icon}
    </button>
  );
};
