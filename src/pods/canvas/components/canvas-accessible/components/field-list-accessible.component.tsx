import React from 'react';
import { FieldVm } from '@/core/providers';
import { Field } from './field-accessible.component';

interface Props {
  fieldList: FieldVm[];
  listName: string;
}

export const FieldList: React.FC<Props> = props => {
  const { fieldList, listName } = props;

  return fieldList.map(field => (
    <Field field={field} listName={listName} key={field.id} />
  ));
};
