import { GenerateGUID } from '@/core/model';
import { FieldType, FieldVm } from './import-panel.model';

function inferMongoType(value: object | string | number | boolean | null | undefined): FieldType {
	if (value === null) return 'null';
	if (value === undefined) return 'undefined';
	if (Array.isArray(value)) return 'array';

	if (typeof value === 'object') {
		if ('$oid' in value) return 'objectId';
		if ('$date' in value) return 'date';
		if ('$numberInt' in value) return 'int';
		if ('$numberLong' in value) return 'long';
		if ('$numberDouble' in value) return 'double';
		if ('$numberDecimal' in value) return 'decimal';
		if ('$regex' in value) return 'regex';
		if ('$timestamp' in value) return 'timestamp';
		return 'object';
	}

	switch (typeof value) {
		case 'string': return 'string';
		case 'number': return 'double';
		case 'boolean': return 'bool';
		case 'symbol': return 'symbol';
		case 'function': return 'javascript';
		default: return 'any';
	}
}

export function parseJsonToFieldVm(obj: Record<string, unknown>): FieldVm[] {
	const result: FieldVm[] = [];

	for (const key of Object.keys(obj)) {
		const value = obj[key];
		const isArray = Array.isArray(value);
		const baseValue = isArray ? value[0] : value;

		const type = inferMongoType(baseValue);

		// Check if the field has isNN in the value or if it is _id
		const isNN = isObjectWithIsNN(value) ? value.isNN === true : key === '_id';

		const field: FieldVm = {
			id: GenerateGUID(),
			PK: key === '_id',
			FK: false,
			name: key,
			type,
			isArray,
			isNN,
		};

		const isPlainObject = (
			type === 'object' &&
			baseValue &&
			typeof baseValue === 'object' &&
			!('$oid' in baseValue || '$date' in baseValue || '$numberInt' in baseValue)
		);

		if (isPlainObject) {
			field.children = parseJsonToFieldVm(baseValue);
		}

		result.push(field);
	}

	return result;
}

// Function to check if an object has the isNN property
function isObjectWithIsNN(value: unknown): value is { isNN: boolean } {
	return typeof value === 'object' && value !== null && 'isNN' in value;
}

export const validateJsonSchema = (jsonString: string): string | null => {
	try {
		const parsed = JSON.parse(jsonString);

		if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
			return 'Current version only accepts a single document object';
		}

		if (Array.isArray(parsed) && parsed.length === 1 && typeof parsed[0] === 'object' && Object.keys(parsed[0]).length === 0) {
			return 'The JSON is not valid';
		}

		return null;
	} catch {
		return 'The JSON is not valid';
	}
};
