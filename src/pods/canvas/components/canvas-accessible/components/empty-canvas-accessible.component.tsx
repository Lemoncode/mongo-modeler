import React from 'react';

interface Props {
  onAddTableModal: () => void;
  isTabletOrMobileDevice: boolean;
}

export const EmptyCanvasAccessible: React.FC<Props> = props => {
  const { onAddTableModal, isTabletOrMobileDevice } = props;

  return (
    <>
      <h2>The canvas is empty</h2>
      <p>Create a collection to start working</p>
      {!isTabletOrMobileDevice ? (
        <button onClick={onAddTableModal}>Add Collection</button>
      ) : null}
    </>
  );
};
