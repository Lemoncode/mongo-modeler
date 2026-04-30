export type FieldType =
	| 'any'
	| 'array'
	| 'binData'
	| 'bool'
	| 'date'
	| 'dbPointer'
	| 'decimal'
	| 'double'
	| 'enum'
	| 'int'
	| 'javascript'
	| 'long'
	| 'maxKey'
	| 'minKey'
	| 'null'
	| 'object'
	| 'objectId'
	| 'regex'
	| 'string'
	| 'symbol'
	| 'timestamp'
	| 'undefined';

export interface FieldVm {
	id: string;
	PK: boolean;
	FK: boolean;
	name: string;
	type: FieldType;
	children?: FieldVm[];
	isCollapsed?: boolean;
	isArray?: boolean;
	isNN?: boolean;
}