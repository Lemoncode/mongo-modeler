import React from 'react';

interface Props {
  onAddTableModal: () => void;
}

export const EmptyCanvasAccessible: React.FC<Props> = props => {
  const { onAddTableModal } = props;

  return (
    <>
      <h2>The canvas is empty</h2>
      <p>Create a collection to start working</p>
      <button onClick={onAddTableModal}>Add Collection</button>
    </>
  );
};
