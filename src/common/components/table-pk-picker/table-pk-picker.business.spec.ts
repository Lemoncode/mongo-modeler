import { GUID } from '@/core/model';
import { generateLabel } from './table-pk-picker.business';
import { PkOptionVm } from './table-pk-picker.model';

describe('generateLabel', () => {
  it('Should returns undefined if the option does not match the id of an array of options', () => {
    //Arrange
    const options: PkOptionVm[] = [
      {
        id: '1',
        label: 'Hi',
      },
      {
        id: '2',
        label: 'Bye',
      },
    ];

    const valueId: GUID = '3';

    // Act
    const result = generateLabel(options, valueId, []);

    // Assert
    expect(result).toBe(undefined);
  });

  it('Should returns the option label that matches the id of an array of options', () => {
    //Arrange
    const options: PkOptionVm[] = [
      {
        id: '1',
        label: 'Hi',
      },
      {
        id: '2',
        label: 'Bye',
      },
    ];

    const valueId: GUID = '2';

    // Act
    const result = generateLabel(options, valueId, []);

    // Assert
    expect(result).toBe('Bye');
  });

  it('should return the names of the parents and the name of the label that matches the id of an array of options', () => {
    //Arrange
    const options: PkOptionVm[] = [
      {
        id: '1',
        label: 'Hi',
      },
      {
        id: '2',
        label: 'Bye',
        children: [{ id: '3', label: 'Pie' }],
      },
    ];
    const valueId: GUID = '3';

    // Act
    const result = generateLabel(options, valueId, []);

    // Assert
    const expected = 'Bye > Pie';

    expect(result).toEqual(expected);
  });

  it('should return the names of the parents and the name of the label that matches the id of an array of options with children with option', () => {
    //Arrange
    const options: PkOptionVm[] = [
      {
        id: '1',
        label: 'Hi',
      },
      {
        id: '2',
        label: 'Bye',
        children: [
          { id: '3', label: 'Pie' },
          {
            id: '4',
            label: 'Age',
            children: [{ id: '5', label: 'Cup' }],
          },
        ],
      },
    ];
    const valueId: GUID = '5';

    // Act
    const result = generateLabel(options, valueId, []);

    // Assert
    const expected = 'Bye > Age > Cup';

    expect(result).toEqual(expected);
  });
  it('Should returns the option label that matches the id of an array of options', () => {
    //Arrange
    const options: PkOptionVm[] = [
      {
        id: '1',
        label: 'Hi',
      },
      {
        id: '2',
        label: 'Bye',
        children: [
          { id: '3', label: 'Pie' },
          {
            id: '4',
            label: 'Age',
            children: [{ id: '5', label: 'Cup' }],
          },
        ],
      },
      { id: '6', label: 'Hidden' },
    ];
    const valueId: GUID = '6';

    // Act
    const result = generateLabel(options, valueId, []);

    // Assert
    const expected = 'Hidden';

    expect(result).toEqual(expected);
  });
});
