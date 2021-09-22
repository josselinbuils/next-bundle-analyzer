import { filterObject } from '../filterObject';

describe('filterObject', () => {
  it('should act as pass through with a null filter ', () => {
    // Given
    const obj = {
      key1: 'value',
    };
    const filter = null;

    // When
    const result = filterObject(obj, filter);

    // Then
    expect(result).toEqual(obj);
  });

  it('should filter an object ', () => {
    // Given
    const obj = {
      key1: 'value',
      key2: {
        key21: 'value',
        key22: {
          key221: 'value',
          key222: {
            key2221: 'value',
          },
        },
        key23: 'value',
      },
    };
    const filter = {
      key2: {
        key21: true,
        key22: {
          key221: true,
          key222: true,
        },
      },
    };

    // When
    const result = filterObject(obj, filter);

    // Then
    expect(result).toEqual({
      key2: {
        key21: 'value',
        key22: {
          key221: 'value',
          key222: {
            key2221: 'value',
          },
        },
      },
    });
  });
});
