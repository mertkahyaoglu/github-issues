export const LABELS_REQUEST = 'labels/REQUEST';
export const LABELS_SUCCESS = 'labels/SUCCESS';
export const LABELS_FAILED = 'labels/FAILED';

const initialState = {
  loading: false,
  error: null,
  labels: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LABELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LABELS_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LABELS_SUCCESS:
      return {
        ...state,
        labels: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const API_URL =
  'https://api.github.com/repos/jekyll/jekyll-admin/labels';

export const getLabels = () => async dispatch => {
  dispatch({ type: LABELS_REQUEST });
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    dispatch({ type: LABELS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: LABELS_FAILED, payload: error });
  }
};
