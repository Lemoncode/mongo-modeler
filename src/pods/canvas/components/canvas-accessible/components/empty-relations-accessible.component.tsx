import React from 'react';

interface Props {
  onAddRelationModal: () => void;
  isTabletOrMobileDevice: boolean;
}

export const EmptyRelationsAccessible: React.FC<Props> = props => {
  const { onAddRelationModal, isTabletOrMobileDevice } = props;

  return (
    <>
      <h2>Relations</h2>
      <p>This canvas has no relations</p>
      {!isTabletOrMobileDevice ? (
        <button onClick={onAddRelationModal}>Create a new relation</button>
      ) : null}
    </>
  );
};
