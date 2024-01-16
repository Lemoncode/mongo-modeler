import React from 'react';
import { Dropdown, DropdownOptionVm } from '@/common/components/dropdown';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import { mapTablesFieldsToPkOptionVm } from './edit-relation.business';
import { PkOptionVm, TablePkPicker } from '@/common/components';
import { FormikErrors, FormikTouched } from 'formik';
import { RelationFormVm } from './edit-relation.vm';

interface Props {
  relationsTypeOptions: DropdownOptionVm[];
  tablesNameOptions: DropdownOptionVm[];
  canvasSchema: DatabaseSchemaVm;
  values: RelationFormVm;
  setFieldValue: (field: string, value: any) => void;
  errors: FormikErrors<RelationVm>;
  touched: FormikTouched<RelationVm>;
}

export const EditRelationComponent: React.FC<Props> = props => {
  const {
    relationsTypeOptions,
    tablesNameOptions,
    values: relation,
    canvasSchema,
    errors,
    touched,
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
      <Dropdown
        name="type"
        label="Type"
        options={relationsTypeOptions}
        selectedField={values['type']}
        onChange={value => setFieldValue('type', value)}
        error={errors.type}
        touched={touched.type}
      ></Dropdown>
      <Dropdown
        name="fromTableId"
        label="Origen Collection"
        options={tablesNameOptions}
        selectTitle="Select origin table"
        error={errors.fromTableId}
        touched={touched.fromTableId}
      ></Dropdown>
      <TablePkPicker
        name="fromFieldId"
        label="Origin field"
        options={fieldsTableOrigin}
        selectTitle="Select origin field"
        error={errors.fromFieldId}
        touched={touched.fromFieldId}
        disabled={relation.fromTableId ? false : true}
      ></TablePkPicker>
      <Dropdown
        name="toTableId"
        label="Destination Collection"
        options={tablesNameOptions}
        selectTitle="Select destination table"
        error={errors.toTableId}
        touched={touched.toTableId}
      ></Dropdown>
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
