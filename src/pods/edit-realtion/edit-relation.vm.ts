export interface RelationFormVm {
  fromFieldId: { id: string; label: string };
  fromTableId: { id: string; label: string };
  toFieldId: { id: string; label: string };
  toTableId: { id: string; label: string };
  type: { id: string; label: string };
}
