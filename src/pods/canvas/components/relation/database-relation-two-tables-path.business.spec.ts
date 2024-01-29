import * as databaseRelationTwoTablesPathBusiness from './database-relation-two-tables-path.business';

describe('database-relation-two-tables-path.business', () => {
  describe('getRelationPath', () => {
    it('should return leftHandSideOneToOnePath when relationType is 1:1 and startCoords.x > endCoords.x', () => {
      // Arrange
      const relationType = '1:1';
      const startCoords = { x: 100, y: 50 };
      const endCoords = { x: 50, y: 100 };

      // Act
      const result = databaseRelationTwoTablesPathBusiness.getRelationPath(
        relationType,
        startCoords,
        endCoords
      );

      // Assert
      expect(result).toEqual(`
M -220 50 
H -240 
V 100 
H 50
`);
    });

    it('should return rightHandSideOneToOnePath when relationType is 1:1 and startCoords.x < endCoords.x', () => {
      // Arrange
      const relationType = '1:1';
      const startCoords = { x: 50, y: 50 };
      const endCoords = { x: 100, y: 100 };

      // Act
      const result = databaseRelationTwoTablesPathBusiness.getRelationPath(
        relationType,
        startCoords,
        endCoords
      );

      // Assert
      expect(result).toEqual(`
M 370 50
H 390
V 100
H 100
`);
    });

    it('should return  when relationType is 1:1 and startCoords.x = endCoords.x', () => {
      // Arrange
      const relationType = '1:1';
      const startCoords = { x: 50, y: 50 };
      const endCoords = { x: 50, y: 100 };

      // Act
      const result = databaseRelationTwoTablesPathBusiness.getRelationPath(
        relationType,
        startCoords,
        endCoords
      );

      // Assert
      expect(result).toEqual(`
M -270 50 
H -290 
V 100 
H 50
`);
    });
  });
});
