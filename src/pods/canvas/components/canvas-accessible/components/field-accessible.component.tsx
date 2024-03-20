import React from 'react';
import { FieldVm } from '@/core/providers';
import { FieldList } from './field-list-accessible.component';

interface Props {
  field: FieldVm;
  listName: string;
}

export const Field: React.FC<Props> = props => {
  const { field, listName } = props;

  const renderNNElement = (NN?: boolean) => {
    if (NN) return <span>NN</span>;
  };

  const renderChildrenElement = (name: string, children?: FieldVm[]) => {
    if (children)
      return <FieldList fieldList={children} listName={`${name} nested`} />;
  };

  return (
    <li aria-label={`${listName} field`}>
      <span>{field.name}</span>
      <span>{field.type}</span>
      {renderNNElement(field.isNN)}
      {renderChildrenElement(field.name, field.children)}
    </li>
  );
};
