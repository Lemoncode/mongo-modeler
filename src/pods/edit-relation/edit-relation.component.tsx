import React from 'react';
import { DropdownOptionVm } from '@/common/components/dropdown';
import { DatabaseSchemaVm } from '@/core/providers/canvas-schema';
import { mapTablesFieldsToPkOptionVm } from './edit-relation.business';
import { PkOptionVm } from '@/common/components';
import { RelationFormVm } from './edit-relation.vm';
import { DropdownFormik, TablePkPickerFormik } from '@/common/components/forms';

const DROPDOWN_ORIGIN_TABLE_TITLE = 'Select origin collection';
const DROPDOWN_DESTINATION_TABLE_TITLE = 'Select destination collection';
const DROPDOWN_ORIGIN_FIELD = 'Select origin field';
const DROPDOWN_DESTINATION_FIELD = 'Select destination field';

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
    values.fromTableId,
    canvasSchema
  );

  const fieldsTableDestination: PkOptionVm[] = mapTablesFieldsToPkOptionVm(
    values.toTableId,
    canvasSchema
  );

  return (
    <>
      <DropdownFormik
        name="type"
        label="Type of relation"
        options={relationsTypeOptions}
        selectTitle="Select type"
      ></DropdownFormik>
      <DropdownFormik
        name="fromTableId"
        label="Origin Collection"
        options={tablesNameOptions}
        selectTitle={DROPDOWN_ORIGIN_TABLE_TITLE}
      ></DropdownFormik>
      <TablePkPickerFormik
        key={`fromFieldId-${values.fromTableId}`}
        name="fromFieldId"
        label="Origin field"
        options={fieldsTableOrigin}
        selectTitle={DROPDOWN_ORIGIN_FIELD}
        disabled={!values.fromTableId}
      ></TablePkPickerFormik>
      <DropdownFormik
        name="toTableId"
        label="Destination Collection"
        options={tablesNameOptions}
        selectTitle={DROPDOWN_DESTINATION_TABLE_TITLE}
      ></DropdownFormik>
      <TablePkPickerFormik
        key={`toFieldId-${values.toTableId}`}
        name="toFieldId"
        label="Destination field"
        options={fieldsTableDestination}
        selectTitle={DROPDOWN_DESTINATION_FIELD}
        disabled={!values.toTableId}
      ></TablePkPickerFormik>
    </>
  );
};
