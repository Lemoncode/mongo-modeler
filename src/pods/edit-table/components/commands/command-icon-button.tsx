interface Props {
  onClick: () => void;
  icon: JSX.Element;
}

export const CommandIconButton: React.FC<Props> = props => {
  const { onClick, icon } = props;

  return <button onClick={onClick}>{icon}</button>;
};
