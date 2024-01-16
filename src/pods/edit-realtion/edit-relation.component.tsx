import React from 'react';
import { Dropdown, DropdownOptionVm } from '@/common/components/dropdown';
import { DatabaseSchemaVm, RelationVm } from '@/core/providers/canvas-schema';
import { mapTablesFieldsToPkOptionVm } from './edit-relation.business';
import { PkOptionVm, TablePkPicker } from '@/common/components';
import { FormikErrors, FormikTouched } from 'formik';

interface Props {
  relationsTypeOptions: DropdownOptionVm[];
  tablesNameOptions: DropdownOptionVm[];
  canvasSchema: DatabaseSchemaVm;
  relation: RelationVm;
  errors: FormikErrors<RelationVm>;
  touched: FormikTouched<RelationVm>;
}

export const EditRelationComponent: React.FC<Props> = props => {
  const {
    relationsTypeOptions,
    tablesNameOptions,
    relation,
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
        selectedField={{ id: '1', label: '1:1' }}
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
