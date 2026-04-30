import React from 'react';
import { FieldVm } from '@/core/providers';
import { FieldList } from './field-list-accessible.component';

interface Props {
  field: FieldVm;
  listName: string;
}

export const Field: React.FC<Props> = props => {
  const { field } = props;

  const renderNNElement = (NN?: boolean) => {
    if (NN) return <span>Not Null</span>;
  };
  const renderArrayElement = (isArray?: boolean) => {
    if (isArray)
      return (
        <>
          <span>array</span>&nbsp;
        </>
      );
  };

  const renderChildrenElement = (name: string, children?: FieldVm[]) => {
    if (children)
      return (
        <ul>
          <FieldList fieldList={children} listName={`${name} nested`} />
        </ul>
      );
  };

  return (
    <li>
      <span>{field.name}</span>&nbsp;
      <span>{field.type}</span>&nbsp;
      {renderArrayElement(field.isArray)}
      {renderNNElement(field.isNN)}
      {renderChildrenElement(field.name, field.children)}
    </li>
  );
};
