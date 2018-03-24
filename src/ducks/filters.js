export const FILTER_AUTHOR = 'filters/FILTER_AUTHOR';
export const REMOVE_AUTHOR = 'filters/REMOVE_AUTHOR';
export const FILTER_LABEL = 'filters/FILTER_LABEL';
export const REMOVE_LABEL = 'filters/REMOVE_LABEL';

const initialState = {
  filteredAuthor: null,
  filteredLabel: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FILTER_AUTHOR:
      return {
        ...state,
        filteredAuthor: payload,
      };
    case FILTER_LABEL:
      return {
        ...state,
        filteredLabel: payload,
      };
    case REMOVE_AUTHOR:
      return {
        ...state,
        filteredAuthor: null,
      };
    case REMOVE_LABEL:
      return {
        ...state,
        filteredLabel: null,
      };
    default:
      return state;
  }
}

export const filterAuthor = id => ({
  type: FILTER_AUTHOR,
  payload: id,
});

export const filterLabel = id => ({
  type: FILTER_LABEL,
  payload: id,
});

export const removeAuthor = () => ({
  type: REMOVE_AUTHOR,
});

export const removeLabel = () => ({
  type: REMOVE_LABEL,
});
