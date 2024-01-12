import React from 'react';
import { Dropdown, DropdownOptionVm } from '@/common/components/dropdown';
import { RelationType, RelationVm } from '@/core/providers/canvas-schema';

interface Props {
  relationsTypeOptions: DropdownOptionVm[];
  tablesNameOptions: DropdownOptionVm[];
  relation: RelationVm;
  setRelation: (relation: RelationVm) => void;
}

export const EditRelationComponent: React.FC<Props> = props => {
  const { relationsTypeOptions, tablesNameOptions, relation, setRelation } =
    props;

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
      <Dropdown
        name="selecttwo"
        label="Destination Collection"
        options={tablesNameOptions}
        onKeySelected={field =>
          setRelation({ ...relation, toTableId: field.id })
        }
        selectTitle="Select destination table"
      ></Dropdown>
    </>
  );
};
