import React from 'react';
import { DropdownOptionVm } from '@/common/components/dropdown';
import { DatabaseSchemaVm } from '@/core/providers/canvas-schema';
import { mapTablesFieldsToPkOptionVm } from './edit-relation.business';
import { PkOptionVm, TablePkPicker } from '@/common/components';
import { FormikErrors, FormikTouched } from 'formik';
import { RelationFormVm } from './edit-relation.vm';
import { DropdownFormik } from '@/common/components/forms/dropdown';

interface Props {
  relationsTypeOptions: DropdownOptionVm[];
  tablesNameOptions: DropdownOptionVm[];
  canvasSchema: DatabaseSchemaVm;
  values: RelationFormVm;
  setFieldValue: (field: string, value: any) => void;
  errors: FormikErrors<RelationFormVm>;
  touched: FormikTouched<RelationFormVm>;
}

export const EditRelationComponent: React.FC<Props> = props => {
  const {
    relationsTypeOptions,
    tablesNameOptions,
    values: relation,
    canvasSchema,
    errors,
    touched,
    setFieldValue,
  } = props;

  //No veo como subirlas un nivel
  const fieldsTableOrigin: PkOptionVm[] = mapTablesFieldsToPkOptionVm(
    relation.fromTableId,
    canvasSchema
  );
  const fieldsTableDestination: PkOptionVm[] = mapTablesFieldsToPkOptionVm(
    relation.toTableId,
    canvasSchema
  );

  return (
    <>
      <DropdownFormik
        name="type"
        label="Type"
        options={relationsTypeOptions}
        selectTitle="Select type"
        selectedField={relation['type']}
        onChange={value => setFieldValue('type', value.label)}
      ></DropdownFormik>
      <DropdownFormik
        name="fromTableId"
        label="Origin Collection"
        options={tablesNameOptions}
        selectTitle="Select origin table"
        onChange={value => setFieldValue('fromTableId', value.id)}
      ></DropdownFormik>
      <TablePkPicker
        name="fromFieldId"
        label="Origin field"
        options={fieldsTableOrigin}
        selectTitle="Select origin field"
        error={errors.fromFieldId}
        touched={touched.fromFieldId}
        disabled={relation.fromTableId ? false : true}
      ></TablePkPicker>
      <DropdownFormik
        name="toTableId"
        label="Destination Collection"
        options={tablesNameOptions}
        selectTitle="Select destination table"
        onChange={value => setFieldValue('toTableId', value.id)}
      ></DropdownFormik>
      <TablePkPicker
        name="toFieldId"
        label="Destination field"
        options={fieldsTableDestination}
        selectTitle="Select destination field"
        error={errors.toFieldId}
        touched={touched.toFieldId}
        disabled={relation.toTableId ? false : true}
      ></TablePkPicker>
    </>
  );
};
