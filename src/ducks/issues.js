export const ISSUES_REQUEST = 'issues/REQUEST';
export const ISSUES_SUCCESS = 'issues/SUCCESS';
export const ISSUES_FAILED = 'issues/FAILED';

const initialState = {
  loading: false,
  error: null,
  issues: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ISSUES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ISSUES_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case ISSUES_SUCCESS:
      return {
        ...state,
        issues: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const API_URL =
  'https://api.github.com/repos/jekyll/jekyll-admin/issues';

export const getIssues = () => async dispatch => {
  dispatch({ type: ISSUES_REQUEST });
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    dispatch({ type: ISSUES_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ISSUES_FAILED, payload: error });
  }
};

const issuesSelector = state => state.issues;

export const issuesByAuthorSelector = (state, author) => {
  const issues = issuesSelector(state);
  const selectedIssues = author
    ? issues.filter(issue => issue.user.id === author.id)
    : issues;
  return {
    ...state,
    issues: selectedIssues,
  };
};

export const issuesByLabelSelector = (state, label) => {
  const issues = issuesSelector(state);
  const selectedIssues = label
    ? issues.filter(issue => issue.labels.find(l => l.id === label.id))
    : issues;
  return {
    ...state,
    issues: selectedIssues,
  };
};
