import React from 'react';

interface Props {
  handleNewTableModal: () => void;
}

export const EmptyCanvasAccessible: React.FC<Props> = props => {
  const { handleNewTableModal } = props;

  return (
    <>
      <h2>The canvas is empty</h2>
      <p>Create a collection to start working</p>
      <button onClick={handleNewTableModal}>Add Collection</button>
    </>
  );
};
