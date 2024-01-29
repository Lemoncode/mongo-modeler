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
M -270 50 
H -290 
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
M -220 50 
H -240 
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
M 370 50
H 390
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
M -270 50 
H -290 
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
M -230 50
H -240
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
M 380 50
H 390
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
      expect(result).toEqual({ x: -230, y: 50 });
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
      expect(result).toEqual({ x: 380, y: 50 });
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
      expect(result).toEqual({ x: -280, y: 50 });
    });
  });
});
