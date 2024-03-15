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
M -280 50 
H -300 
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
M 430 50
H 450
V 100
H 100
`);
    });

    it('should return leftHandSideOneToOnePath when relationType is 1:1 and startCoords.x equals endCoords.x', () => {
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
M -330 50 
H -350 
V 100 
H 50
`);
    });

    it('should return leftHandSideOneToManyPath when relationType is 1:M and startCoords.x > endCoords.x', () => {
      // Arrange
      const relationType = '1:M';
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
M -280 50 
H -300 
V 100 
H 40
`);
    });

    it('should return rightHandSideOneToManyPath when relationType is 1:M and startCoords.x < endCoords.x', () => {
      // Arrange
      const relationType = '1:M';
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
M 430 50
H 450
V 100
H 110
`);
    });

    it('should return leftHandSideOneToManyPath when relationType is 1:M and startCoords.x equals endCoords.x', () => {
      // Arrange
      const relationType = '1:M';
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
M -330 50 
H -350 
V 100 
H 40
`);
    });

    it('should return leftHandSideManyToOnePath when relationType is M:1 and startCoords.x > endCoords.x', () => {
      // Arrange
      const relationType = 'M:1';
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
M -290 50
H -300
V 100
H 50
`);
    });

    it('should return rightHandSideManyToOnePath when relationType is M:1 and startCoords.x < endCoords.x', () => {
      // Arrange
      const relationType = 'M:1';
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
M 440 50
H 450
V 100
H 100
`);
    });
  });

  describe('getForkCoords', () => {
    it('should return leftForkCoordsOneToManyPath when relationType is 1:M and startCoords.x > endCoords.x', () => {
      // Arrange
      const relationType = '1:M';
      const startCoords = { x: 100, y: 50 };
      const endCoords = { x: 50, y: 100 };

      // Act
      const result = databaseRelationTwoTablesPathBusiness.getForkCoords(
        relationType,
        startCoords,
        endCoords
      );

      // Assert
      expect(result).toEqual({ x: 40, y: 100 });
    });

    it('should return rightForkCoordsOneToManyPath when relationType is 1:M and startCoords.x < endCoords.x', () => {
      // Arrange
      const relationType = '1:M';
      const startCoords = { x: 50, y: 50 };
      const endCoords = { x: 100, y: 100 };

      // Act
      const result = databaseRelationTwoTablesPathBusiness.getForkCoords(
        relationType,
        startCoords,
        endCoords
      );

      // Assert
      expect(result).toEqual({ x: 110, y: 100 });
    });

    it('should return leftForkCoordsOneToManyPath when relationType is 1:M and startCoords.x equals endCoords.x', () => {
      // Arrange
      const relationType = '1:M';
      const startCoords = { x: 50, y: 50 };
      const endCoords = { x: 50, y: 100 };

      // Act
      const result = databaseRelationTwoTablesPathBusiness.getForkCoords(
        relationType,
        startCoords,
        endCoords
      );

      // Assert
      expect(result).toEqual({ x: 40, y: 100 });
    });

    it('should return leftForkCoordsManyToOnePath when relationType is M:1 and startCoords.x > endCoords.x', () => {
      // Arrange
      const relationType = 'M:1';
      const startCoords = { x: 100, y: 50 };
      const endCoords = { x: 50, y: 100 };

      // Act
      const result = databaseRelationTwoTablesPathBusiness.getForkCoords(
        relationType,
        startCoords,
        endCoords
      );

      // Assert
      expect(result).toEqual({ x: -290, y: 50 });
    });

    it('should return rightForkCoordsManyToOnePath when relationType is M:1 and startCoords.x < endCoords.x', () => {
      // Arrange
      const relationType = 'M:1';
      const startCoords = { x: 50, y: 50 };
      const endCoords = { x: 100, y: 100 };

      // Act
      const result = databaseRelationTwoTablesPathBusiness.getForkCoords(
        relationType,
        startCoords,
        endCoords
      );

      // Assert
      expect(result).toEqual({ x: 440, y: 50 });
    });

    it('should return leftForkCoordsManyToOnePath when relationType is M:1 and startCoords.x equals endCoords.x', () => {
      // Arrange
      const relationType = 'M:1';
      const startCoords = { x: 50, y: 50 };
      const endCoords = { x: 50, y: 100 };

      // Act
      const result = databaseRelationTwoTablesPathBusiness.getForkCoords(
        relationType,
        startCoords,
        endCoords
      );

      // Assert
      expect(result).toEqual({ x: -340, y: 50 });
    });
  });
});
