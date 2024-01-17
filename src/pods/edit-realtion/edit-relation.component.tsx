import React from 'react';
import { Dropdown, DropdownOptionVm } from '@/common/components/dropdown';
import { RelationType, RelationVm } from '@/core/providers/canvas-schema';
import { PkOptionVm, TablePkPicker } from '@/common/components';

interface Props {
  relationsTypeOptions: DropdownOptionVm[];
  tablesNameOptions: DropdownOptionVm[];
  fieldsTableOrigin: PkOptionVm[];
  fieldsTableDestination: PkOptionVm[];
  relation: RelationVm;
  setRelation: (relation: RelationVm) => void;
}

export const EditRelationComponent: React.FC<Props> = props => {
  const {
    relationsTypeOptions,
    tablesNameOptions,
    relation,
    setRelation,
    fieldsTableDestination,
    fieldsTableOrigin,
  } = props;

  return (
    <>
      <Dropdown
        name="selectone"
        label="Type"
        options={relationsTypeOptions}
        onKeySelected={field =>
          setRelation({ ...relation, type: field.label as RelationType })
        }
        selectedField={{ id: '1', label: '1:1' }}
      ></Dropdown>
      <Dropdown
        name="selecttwo"
        label="Origen Collection"
        options={tablesNameOptions}
        onKeySelected={field =>
          setRelation({ ...relation, fromTableId: field.id })
        }
        selectTitle="Select origin table"
      ></Dropdown>
      {relation.fromTableId && (
        <TablePkPicker
          name="selecttwo"
          label="Origin field"
          options={fieldsTableOrigin}
          onKeySelected={field =>
            setRelation({ ...relation, fromFieldId: field.id })
          }
          selectTitle="Select origin field"
        ></TablePkPicker>
      )}
      <Dropdown
        name="selecttwo"
        label="Destination Collection"
        options={tablesNameOptions}
        onKeySelected={field =>
          setRelation({ ...relation, toTableId: field.id })
        }
        selectTitle="Select destination table"
      ></Dropdown>
      {relation.toTableId && (
        <TablePkPicker
          name="selecttwo"
          label="Destination field"
          options={fieldsTableDestination}
          onKeySelected={field =>
            setRelation({ ...relation, toFieldId: field.id })
          }
          selectTitle="Select destination field"
        ></TablePkPicker>
      )}
    </>
  );
};
