import React from 'react';
import { EditRelationComponent } from './edit-relation.component';
import classes from './edit-relation.pod.module.css';

export const EditRelationPod: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
    //Asegurar que sea una relación válida
    console.log(relation);
    addRelation(relation);
  };
  return (
    <>
      <form className={classes.form} onSubmit={e => handleSubmit(e)}>
        <EditRelationComponent />
        <button onClick={() => handleSubmit(editTable)}>Apply</button>
      </form>
    </>
  );
};
