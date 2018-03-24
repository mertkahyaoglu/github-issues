import reducer, {
  FILTER_AUTHOR,
  REMOVE_AUTHOR,
  FILTER_LABEL,
  REMOVE_LABEL,
  filterAuthor,
  filterLabel,
  removeAuthor,
  removeLabel,
} from './filters';

describe('Filters actions', () => {
  it('should create an action to add a filter', () => {
    const expectedAction = {
      type: FILTER_AUTHOR,
      payload: 1,
    };
    expect(filterAuthor(1)).toEqual(expectedAction);
  });
  it('should create an action to add a label', () => {
    const expectedAction = {
      type: FILTER_LABEL,
      payload: 1,
    };
    expect(filterLabel(1)).toEqual(expectedAction);
  });
  it('should create an action to remove a filter', () => {
    const expectedAction = {
      type: REMOVE_AUTHOR,
    };
    expect(removeAuthor()).toEqual(expectedAction);
  });
  it('should create an action to remove a label', () => {
    const expectedAction = {
      type: REMOVE_LABEL,
    };
    expect(removeLabel()).toEqual(expectedAction);
  });
});

describe('Filters reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      filteredAuthor: null,
      filteredLabel: null,
    });
  });

  it('should handle FILTER_AUTHOR', () => {
    expect(
      reducer(
        {
          filteredAuthor: null,
          filteredLabel: null,
        },
        {
          type: FILTER_AUTHOR,
          payload: 1,
        }
      )
    ).toEqual({
      filteredAuthor: 1,
      filteredLabel: null,
    });
  });

  it('should handle REMOVE_AUTHOR', () => {
    expect(
      reducer(
        {
          filteredAuthor: 1,
          filteredLabel: null,
        },
        {
          type: REMOVE_AUTHOR,
        }
      )
    ).toEqual({
      filteredAuthor: null,
      filteredLabel: null,
    });
  });

  it('should handle FILTER_LABEL', () => {
    expect(
      reducer(
        {
          filteredAuthor: null,
          filteredLabel: null,
        },
        {
          type: FILTER_LABEL,
          payload: 1,
        }
      )
    ).toEqual({
      filteredAuthor: null,
      filteredLabel: 1,
    });
  });

  it('should handle REMOVE_LABEL', () => {
    expect(
      reducer(
        {
          filteredAuthor: null,
          filteredLabel: 1,
        },
        {
          type: REMOVE_LABEL,
        }
      )
    ).toEqual({
      filteredAuthor: null,
      filteredLabel: null,
    });
  });
});
