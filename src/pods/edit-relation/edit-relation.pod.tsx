import React from 'react';
import { Form, Formik } from 'formik';

import { GUID } from '@/core/model';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import { DropdownOptionVm } from '@/common/components';

import {
  createInitialIdValues,
  createInitialValues,
  mapRelationFormVmToRelationVM,
  mapRelationsTypeToDropdownVm,
  mapTableListToDropdownVm,
} from './edit-relation.business';
import { EditRelationComponent } from './edit-relation.component';
import classes from './edit-relation.pod.module.css';
import { formValidation } from './edit-relation.validation';
import { RelationFormVm } from './edit-relation.vm';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onChangeRelation: (relation: RelationVm) => void;
  relationId?: GUID;
  onClose: () => void;
}

export const EditRelationPod: React.FC<Props> = props => {
  const { canvasSchema, onChangeRelation, relationId, onClose } = props;

  const relationsTypeOptions = mapRelationsTypeToDropdownVm();

  const tablesNameOptions: DropdownOptionVm[] =
    mapTableListToDropdownVm(canvasSchema);

  const handleSubmit = (values: RelationFormVm) => {
    onChangeRelation(mapRelationFormVmToRelationVM(values, relationId));
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
          <div className="two-buttons">
            <button type="submit" className="button-secondary">
              Apply
            </button>
            <button type="button" className="button-tertiary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
