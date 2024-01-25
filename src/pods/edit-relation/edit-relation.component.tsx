import React from 'react';
import { DropdownOptionVm } from '@/common/components/dropdown';
import { DatabaseSchemaVm } from '@/core/providers/canvas-schema';
import { mapTablesFieldsToPkOptionVm } from './edit-relation.business';
import { PkOptionVm } from '@/common/components';
import { RelationFormVm } from './edit-relation.vm';
import { DropdownFormik, TablePkPickerFormik } from '@/common/components/forms';

interface Props {
  relationsTypeOptions: DropdownOptionVm[];
  tablesNameOptions: DropdownOptionVm[];
  canvasSchema: DatabaseSchemaVm;
  values: RelationFormVm;
}

export const EditRelationComponent: React.FC<Props> = props => {
  const { relationsTypeOptions, tablesNameOptions, values, canvasSchema } =
    props;

  const fieldsTableOrigin: PkOptionVm[] = mapTablesFieldsToPkOptionVm(
    values.fromTableId.id,
    canvasSchema
  );
  const fieldsTableDestination: PkOptionVm[] = mapTablesFieldsToPkOptionVm(
    values.toTableId.id,
    canvasSchema
  );

  return (
    <>
      <DropdownFormik
        name="type"
        label="Type"
        options={relationsTypeOptions}
        selectTitle="Select type"
      ></DropdownFormik>
      <DropdownFormik
        name="fromTableId"
        label="Origin Collection"
        options={tablesNameOptions}
        selectTitle="Select origin table"
      ></DropdownFormik>
      <TablePkPickerFormik
        name="fromFieldId"
        label="Origin field"
        options={fieldsTableOrigin}
        selectTitle="Select origin field"
        disabled={values.fromTableId.id ? false : true}
      ></TablePkPickerFormik>
      <DropdownFormik
        name="toTableId"
        label="Destination Collection"
        options={tablesNameOptions}
        selectTitle="Select destination table"
      ></DropdownFormik>
      <TablePkPickerFormik
        name="toFieldId"
        label="Destination field"
        options={fieldsTableDestination}
        selectTitle="Select destination field"
        disabled={values.toTableId.id ? false : true}
      ></TablePkPickerFormik>
    </>
  );
};
