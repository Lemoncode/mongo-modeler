import { parseJsonToFieldVm } from './import-panel.business';

describe('parseJsonToFieldVm', () => {
	it('should return an empty array for an empty object', () => {
		// Arrange
		const input = {};

		// Act
		const result = parseJsonToFieldVm(input);

		// Assert
		expect(result).toEqual([]);
	});

	it('should parse a simple object with a string field', () => {
		// Arrange
		const input = { name: 'prueba' };

		// Act
		const result = parseJsonToFieldVm(input);

		// Assert
		expect(result).toEqual([
			{ id: expect.any(String), PK: false, FK: false, name: 'name', type: 'string', isArray: false, isNN: false }
		]);
	});

	it('should parse an object with various MongoDB-specific fields', () => {
		// Arrange
		const input = {
			_id: { $oid: '650041fe064ea46de0a96a60' },
			search: 'Desayuno',
			results: { $numberInt: '10' },
			page: { $numberInt: '1' },
			pageSize: { $numberInt: '10' },
			date: { $date: { $numberLong: '1694515710261' } }
		};

		// Act
		const result = parseJsonToFieldVm(input);

		// Assert
		expect(result).toEqual(
			expect.arrayContaining([
				{ id: expect.any(String), PK: true, FK: false, name: '_id', type: 'objectId', isArray: false, isNN: true },
				{ id: expect.any(String), PK: false, FK: false, name: 'search', type: 'string', isArray: false, isNN: false },
				{ id: expect.any(String), PK: false, FK: false, name: 'results', type: 'int', isArray: false, isNN: false },
				{ id: expect.any(String), PK: false, FK: false, name: 'page', type: 'int', isArray: false, isNN: false },
				{ id: expect.any(String), PK: false, FK: false, name: 'pageSize', type: 'int', isArray: false, isNN: false },
				{ id: expect.any(String), PK: false, FK: false, name: 'date', type: 'date', isArray: false, isNN: false }
			])
		);
	});

	it('should parse an object with boolean and URL fields', () => {
		// Arrange
		const input = {
			_id: { $oid: '631ef8d39fa25b8b2668b400' },
			description: 'Listado de cartas',
			isDirectLanding: true,
			name: 'Restaurantes sin gluten Málaga provincia',
			urlName: 'restaurantes-sin-gluten-malaga-provincia'
		};

		// Act
		const result = parseJsonToFieldVm(input);

		// Assert
		expect(result).toEqual(
			expect.arrayContaining([
				{ id: expect.any(String), PK: true, FK: false, name: '_id', type: 'objectId', isArray: false, isNN: true },
				{ id: expect.any(String), PK: false, FK: false, name: 'description', type: 'string', isArray: false, isNN: false },
				{ id: expect.any(String), PK: false, FK: false, name: 'isDirectLanding', type: 'bool', isArray: false, isNN: false },
				{ id: expect.any(String), PK: false, FK: false, name: 'name', type: 'string', isArray: false, isNN: false },
				{ id: expect.any(String), PK: false, FK: false, name: 'urlName', type: 'string', isArray: false, isNN: false }
			])
		);
	});

	it('should parse an object with nested fields', () => {
		// Arrange
		const input = {
			user: {
				id: { $oid: '631ef8d39fa25b8b2668b400' },
				name: 'John Doe',
				address: {
					city: 'Madrid',
					zip: { $numberInt: '28001' }
				}
			}
		};

		// Act
		const result = parseJsonToFieldVm(input);

		// Assert
		expect(result).toEqual([
			{
				id: expect.any(String),
				PK: false,
				FK: false,
				name: 'user',
				type: 'object',
				isArray: false,
				isNN: false,
				children: expect.arrayContaining([
					{ id: expect.any(String), PK: false, FK: false, name: 'id', type: 'objectId', isArray: false, isNN: false },
					{ id: expect.any(String), PK: false, FK: false, name: 'name', type: 'string', isArray: false, isNN: false },
					{
						id: expect.any(String),
						PK: false,
						FK: false,
						name: 'address',
						type: 'object',
						isArray: false,
						isNN: false,
						children: expect.arrayContaining([
							{ id: expect.any(String), PK: false, FK: false, name: 'city', type: 'string', isArray: false, isNN: false },
							{ id: expect.any(String), PK: false, FK: false, name: 'zip', type: 'int', isArray: false, isNN: false }
						])
					}
				])
			}
		]);
	});
});
