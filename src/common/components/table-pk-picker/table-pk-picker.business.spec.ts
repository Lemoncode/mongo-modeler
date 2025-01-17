import { GUID } from '@/core/model';
import { findPath } from './table-pk-picker.business';
import { PkOptionVm } from './table-pk-picker.model';
import { A11yNestedSelectOption } from '@/common/a11y';

describe(' findPath', () => {
  it('Should returns undefined if the option does not match the id of an array of options', () => {
    //Arrange
    const options: A11yNestedSelectOption<PkOptionVm>[] = [
      {
        id: '1',
        label: 'Hi',
        isSelectable: true,
        tabIndex: 0,
      },
      {
        id: '2',
        label: 'Bye',
        isSelectable: true,
        tabIndex: -1,
      },
    ];

    const valueId: GUID = '3';

    // Act
    const result = findPath(valueId, options);

    // Assert
    expect(result).toBe('');
  });

  it('Should returns the option label that matches the id of an array of options', () => {
    //Arrange
    const options: A11yNestedSelectOption<PkOptionVm>[] = [
      {
        id: '1',
        label: 'Hi',
        isSelectable: true,
        tabIndex: -1,
      },
      {
        id: '2',
        label: 'Bye',
        isSelectable: true,
        tabIndex: 0,
      },
    ];

    const valueId: GUID = '2';

    // Act
    const result = findPath(valueId, options);

    // Assert
    expect(result).toBe('Bye');
  });

  it('should return the names of the parents and the name of the label that matches the id of an array of options', () => {
    //Arrange
    const options: A11yNestedSelectOption<PkOptionVm>[] = [
      {
        id: '1',
        label: 'Hi',
        isSelectable: true,
        tabIndex: -1,
      },
      {
        id: '2',
        label: 'Bye',
        isSelectable: false,
        tabIndex: -1,
        children: [{ id: '3', label: 'Pie', isSelectable: true, tabIndex: 0 }],
      },
    ];
    const valueId: GUID = '3';

    // Act
    const result = findPath(valueId, options);

    // Assert
    const expected = 'Bye > Pie';

    expect(result).toEqual(expected);
  });

  it('should return the names of the parents and the name of the label that matches the id of an array of options with children with option', () => {
    //Arrange
    const options: A11yNestedSelectOption<PkOptionVm>[] = [
      {
        id: '1',
        label: 'Hi',
        isSelectable: true,
        tabIndex: -1,
      },
      {
        id: '2',
        label: 'Bye',
        isSelectable: false,
        tabIndex: -1,
        children: [
          { id: '3', label: 'Pie', isSelectable: true, tabIndex: -1 },
          {
            id: '4',
            label: 'Age',
            isSelectable: false,
            tabIndex: -1,
            children: [
              { id: '5', label: 'Cup', isSelectable: true, tabIndex: 0 },
            ],
          },
        ],
      },
    ];
    const valueId: GUID = '5';

    // Act
    const result = findPath(valueId, options);

    // Assert
    const expected = 'Bye > Age > Cup';

    expect(result).toEqual(expected);
  });
  it('Should returns the option label that matches the id of an array of options', () => {
    //Arrange
    const options: A11yNestedSelectOption<PkOptionVm>[] = [
      {
        id: '1',
        label: 'Hi',
        isSelectable: true,
        tabIndex: -1,
      },
      {
        id: '2',
        label: 'Bye',
        isSelectable: false,
        tabIndex: -1,
        children: [
          { id: '3', label: 'Pie', isSelectable: true, tabIndex: -1 },
          {
            id: '4',
            label: 'Age',
            isSelectable: false,
            tabIndex: -1,
            children: [
              { id: '5', label: 'Cup', isSelectable: true, tabIndex: -1 },
            ],
          },
        ],
      },
      { id: '6', label: 'Hidden', isSelectable: true, tabIndex: -1 },
    ];
    const valueId: GUID = '6';

    // Act
    const result = findPath(valueId, options);

    // Assert
    const expected = 'Hidden';

    expect(result).toEqual(expected);
  });
});
