import React from 'react';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import { DropdownOptionVm } from '@/common/components';
import {
  mapRelationsTipeToDropdonwVm,
  mapTablesToDropdonwVm,
} from './edit-relation.business';
import { EditRelationComponent } from './edit-relation.component';
import classes from './edit-relation.pod.module.css';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onChangeRelation: (relation: RelationVm) => void;
}

export const EditRelationPod: React.FC<Props> = props => {
  const { canvasSchema, onChangeRelation } = props;

  const [relation, setRelation] = React.useState<RelationVm>({
    fromFieldId: '',
    fromTableId: '',
    toFieldId: '',
    toTableId: '',
    type: '1:1',
  });

  const relationsTipeOptions = mapRelationsTipeToDropdonwVm();

  const tablesNameOptions: DropdownOptionVm[] =
    mapTablesToDropdonwVm(canvasSchema);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChangeRelation(relation);

    //Asegurar que sea una relación válida
    console.log(relation);
  };

  return (
    <>
      <form className={classes.form} onSubmit={e => handleSubmit(e)}>
        <EditRelationComponent
          relationsTipeOptions={relationsTipeOptions}
          tablesNameOptions={tablesNameOptions}
          relation={relation}
          setRelation={setRelation}
        />
        <button>Apply</button>
      </form>
    </>
  );
};
