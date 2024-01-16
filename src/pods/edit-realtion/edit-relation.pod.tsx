import React from 'react';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import { DropdownOptionVm } from '@/common/components';
import {
  mapRelationsTipeToDropdonwVm,
  mapTablesToDropdonwVm,
} from './edit-relation.business';
import { EditRelationComponent } from './edit-relation.component';
import classes from './edit-relation.pod.module.css';
import { Form, Formik } from 'formik';
import { formValidation } from './edit-relation.validation';

interface Props {
  canvasSchema: DatabaseSchemaVm;
  onChangeRelation: (relation: RelationVm) => void;
}

export const EditRelationPod: React.FC<Props> = props => {
  const { canvasSchema, onChangeRelation } = props;

  //TODO: Initialize 'relation' with existing values when the user clicks on 'relation' SVG

  const relationsTypeOptions = mapRelationsTipeToDropdonwVm();

  const tablesNameOptions: DropdownOptionVm[] =
    mapTablesToDropdonwVm(canvasSchema);

  const handleSubmitRelation = (relation: RelationVm) => {
    //TODO: Add validations with Formik
    onChangeRelation(relation);
    console.log(relation);
  };

  return (
    <Formik
      initialValues={
        {
          fromFieldId: '',
          fromTableId: '',
          toFieldId: '',
          toTableId: '',
          type: '1:1',
        } as RelationVm
      }
      onSubmit={handleSubmitRelation}
      validate={formValidation.validateForm}
    >
      {({ values, errors, touched }) => (
        <Form className={classes.form}>
          <EditRelationComponent
            relationsTypeOptions={relationsTypeOptions}
            tablesNameOptions={tablesNameOptions}
            relation={values}
            canvasSchema={canvasSchema}
            errors={errors}
            touched={touched}
          />
          <button type="submit">Apply</button>
        </Form>
      )}
    </Formik>
  );
};
