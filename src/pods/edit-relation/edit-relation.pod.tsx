import React from 'react';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import { DropdownOptionVm } from '@/common/components';
import {
  createInitialIdValues,
  createInitialValues,
  mapRelationFormVmToRelaionVM,
  mapRelationsTipeToDropdonwVm,
  mapTableListToDropdonwVm,
} from './edit-relation.business';
import { EditRelationComponent } from './edit-relation.component';
import classes from './edit-relation.pod.module.css';
import { Form, Formik } from 'formik';
import { formValidation } from './edit-relation.validation';
import { RelationFormVm } from './edit-relation.vm';
import { GUID } from '@/core/model';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onChangeRelation: (relation: RelationVm) => void;
  relationId?: GUID;
}

export const EditRelationPod: React.FC<Props> = props => {
  const { canvasSchema, onChangeRelation, relationId } = props;

  const relationsTypeOptions = mapRelationsTipeToDropdonwVm();

  const tablesNameOptions: DropdownOptionVm[] =
    mapTableListToDropdonwVm(canvasSchema);

  const handleSubmit = (values: RelationFormVm) => {
    onChangeRelation(mapRelationFormVmToRelaionVM(values, relationId));
  };

  const initialValues = relationId
    ? createInitialIdValues(relationId, canvasSchema)
    : createInitialValues();

  return (
    <Formik
      initialValues={initialValues}
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
