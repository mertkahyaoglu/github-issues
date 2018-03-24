export const CONTRIBUTORS_REQUEST = 'contributors/REQUEST';
export const CONTRIBUTORS_SUCCESS = 'contributors/SUCCESS';
export const CONTRIBUTORS_FAILED = 'contributors/FAILED';

const initialState = {
  loading: false,
  error: null,
  contributors: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case CONTRIBUTORS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONTRIBUTORS_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CONTRIBUTORS_SUCCESS:
      return {
        ...state,
        contributors: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const API_URL =
  'https://api.github.com/repos/jekyll/jekyll-admin/contributors';

export const getContributors = () => async dispatch => {
  dispatch({ type: CONTRIBUTORS_REQUEST });
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    dispatch({ type: CONTRIBUTORS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CONTRIBUTORS_FAILED, payload: error });
  }
};
