import React from 'react';
import { Dropdown, DropdownOptionVm } from '@/common/components/dropdown';
import {
  RelationType,
  RelationVm,
  useCanvasSchemaContext,
} from '@/core/providers/canvas-schema';
import { useModalDialogContext } from '@/core/providers';

export const EditRelationComponent: React.FC = () => {
  const { closeModal } = useModalDialogContext();
  const { canvasSchema, addRelation } = useCanvasSchemaContext();

  //Se iniciará con la relación existente
  const [relation, setRelation] = React.useState<RelationVm>({
    fromFieldId: '',
    fromTableId: '',
    toFieldId: '',
    toTableId: '',
    type: '1:1',
  });

  //Maper para las relaciones, aunque aquí si se que opciones hay

  const relationsTipe: DropdownOptionVm[] = [
    { id: '1', label: '1:1' },
    { id: '2', label: '1:M' },
    { id: '3', label: 'M:1' },
  ];
  const data = [
    { id: '1', label: 'tabla1' },
    { id: '2', label: 'tabla2' },
    { id: '3', label: 'tabla3' },
  ];

  return (
    <>
      <Dropdown
        name="selectone"
        label="Type"
        options={relationsTipe}
        onKeySelected={field =>
          setRelation({ ...relation, type: field.label as RelationType })
        }
        selectedField={{ id: '1', label: '1:1' }}
      ></Dropdown>
      <Dropdown
        name="selecttwo"
        label="Origen Collection"
        options={data}
        onKeySelected={field =>
          setRelation({ ...relation, fromTableId: field.id })
        }
        selectTitle="Select origin table"
      ></Dropdown>
      <Dropdown
        name="selecttwo"
        label="Destination Collection"
        options={data}
        onKeySelected={field =>
          setRelation({ ...relation, toTableId: field.id })
        }
        selectTitle="Select destination table"
      ></Dropdown>
    </>
  );
};
