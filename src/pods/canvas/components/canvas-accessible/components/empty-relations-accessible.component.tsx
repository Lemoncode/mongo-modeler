import React from 'react';

interface Props {
  onAddRelationModal: () => void;
  isTabletOrMobileDevice: boolean;
}

export const EmptyRelationsAccessible: React.FC<Props> = props => {
  const { onAddRelationModal, isTabletOrMobileDevice } = props;

  return (
    <>
      <h2>No relations in canvas</h2>
      <p>Create a new relation</p>
      {!isTabletOrMobileDevice ? (
        <button onClick={onAddRelationModal}>Add Relation</button>
      ) : null}
    </>
  );
};
