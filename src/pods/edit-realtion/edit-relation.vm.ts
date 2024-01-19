export interface FormValueVm {
  id: string;
  label: string;
}

export interface RelationFormVm {
  fromFieldId: FormValueVm;
  fromTableId: FormValueVm;
  toFieldId: FormValueVm;
  toTableId: FormValueVm;
  type: FormValueVm;
}
