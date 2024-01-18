import React from 'react';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import { DropdownOptionVm } from '@/common/components';
import {
  mapRelationFormVmToRelaionVM,
  mapRelationsTipeToDropdonwVm,
  mapTablesToDropdonwVm,
} from './edit-relation.business';
import { EditRelationComponent } from './edit-relation.component';
import classes from './edit-relation.pod.module.css';
import { Form, Formik } from 'formik';
import { formValidation } from './edit-relation.validation';
import { RelationFormVm } from './edit-relation.vm';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onChangeRelation: (relation: RelationVm) => void;
}

export const EditRelationPod: React.FC<Props> = props => {
  const { canvasSchema, onChangeRelation } = props;

  const relationsTypeOptions = mapRelationsTipeToDropdonwVm();

  const tablesNameOptions: DropdownOptionVm[] =
    mapTablesToDropdonwVm(canvasSchema);

  const handleSubmit = (values: RelationFormVm) => {
    console.log(values);
    onChangeRelation(mapRelationFormVmToRelaionVM(values));
  };

  return (
    <Formik
      initialValues={
        {
          fromFieldId: { id: '', label: '' },
          fromTableId: { id: '', label: '' },
          toFieldId: { id: '', label: '' },
          toTableId: { id: '', label: '' },
          type: { id: '1', label: '1:1' },
        } as RelationFormVm
      }
      onSubmit={handleSubmit}
      validate={formValidation.validateForm}
    >
      {({ values }) => (
        <Form className={classes.form}>
          <EditRelationComponent
            relationsTypeOptions={relationsTypeOptions}
            tablesNameOptions={tablesNameOptions}
            values={values}
            canvasSchema={canvasSchema}
          />
          <button type="submit">Apply</button>
        </Form>
      )}
    </Formik>
  );
};
