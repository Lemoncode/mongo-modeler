import React from 'react';

interface Props {
  onNewTableModal: () => void;
}

export const EmptyCanvasAccessible: React.FC<Props> = props => {
  const { onNewTableModal } = props;

  return (
    <>
      <h2>The canvas is empty</h2>
      <p>Create a collection to start working</p>
      <button onClick={onNewTableModal}>Add Collection</button>
    </>
  );
};
