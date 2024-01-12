import React from 'react';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import { DropdownOptionVm, PkOptionVm } from '@/common/components';
import {
  mapRelationsTipeToDropdonwVm,
  mapTablesFieldsToPkOptionVm,
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

  //TODO: Initialize 'relation' with existing values when the user clicks on 'relation' SVG
  const [relation, setRelation] = React.useState<RelationVm>({
    fromFieldId: '',
    fromTableId: '',
    toFieldId: '',
    toTableId: '',
    type: '1:1',
  });

  const relationsTypeOptions = mapRelationsTipeToDropdonwVm();

  const tablesNameOptions: DropdownOptionVm[] =
    mapTablesToDropdonwVm(canvasSchema);

  const fieldsTableOrigin: PkOptionVm[] = mapTablesFieldsToPkOptionVm(
    relation.fromTableId || '1',
    canvasSchema
  );

  const fieldsTableDestination: PkOptionVm[] = mapTablesFieldsToPkOptionVm(
    relation.toTableId || '1',
    canvasSchema
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //TODO: Add validations with Formik
    onChangeRelation(relation);
    console.log(relation);
  };

  return (
    <>
      <form className={classes.form} onSubmit={e => handleSubmit(e)}>
        <EditRelationComponent
          relationsTypeOptions={relationsTypeOptions}
          tablesNameOptions={tablesNameOptions}
          fieldsTableOrigin={fieldsTableOrigin}
          fieldsTableDestination={fieldsTableDestination}
          relation={relation}
          setRelation={setRelation}
        />
        <button>Apply</button>
      </form>
    </>
  );
};
