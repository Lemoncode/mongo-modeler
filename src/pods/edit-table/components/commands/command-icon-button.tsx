interface Props {
  onClick: () => void;
  icon: JSX.Element;
  disabled?: boolean;
}

export const CommandIconButton: React.FC<Props> = props => {
  const { onClick, icon, disabled } = props;

  return (
    <button onClick={onClick} disabled={disabled ? true : false}>
      {icon}
    </button>
  );
};
