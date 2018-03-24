import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, {
  ISSUES_REQUEST,
  ISSUES_SUCCESS,
  ISSUES_FAILED,
  getIssues,
  API_URL,
} from './issues';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Issues', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates ISSUES_SUCCESS when fetching issues has been done', () => {
    fetchMock.getOnce(API_URL, [mockIssue]);
    const expectedActions = [
      { type: ISSUES_REQUEST },
      { type: ISSUES_SUCCESS, payload: [mockIssue] },
    ];
    const store = mockStore({ contibutors: [] });

    return store.dispatch(getIssues()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('issues reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      issues: [],
    });
  });

  it('should handle ISSUES_REQUEST', () => {
    expect(
      reducer(
        {
          loading: false,
          issues: [],
          error: null,
        },
        {
          type: ISSUES_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
      issues: [],
      error: null,
    });
  });

  it('should handle ISSUES_FAILED', () => {
    expect(
      reducer(
        { loading: true, issues: [], error: null },
        {
          type: ISSUES_FAILED,
          payload: 'error',
        }
      )
    ).toEqual({
      loading: false,
      issues: [],
      error: 'error',
    });
  });
  it('should handle ISSUES_SUCCESS', () => {
    expect(
      reducer(
        { loading: true, issues: [], error: null },
        {
          type: ISSUES_SUCCESS,
          payload: [{ id: 12312312 }],
        }
      )
    ).toEqual({
      loading: false,
      issues: [{ id: 12312312 }],
      error: null,
    });
  });
});

const mockIssue = {
  url: 'https://api.github.com/repos/jekyll/jekyll-admin/issues/456',
  repository_url: 'https://api.github.com/repos/jekyll/jekyll-admin',
  labels_url:
    'https://api.github.com/repos/jekyll/jekyll-admin/issues/456/labels{/name}',
  comments_url:
    'https://api.github.com/repos/jekyll/jekyll-admin/issues/456/comments',
  events_url:
    'https://api.github.com/repos/jekyll/jekyll-admin/issues/456/events',
  html_url: 'https://github.com/jekyll/jekyll-admin/issues/456',
  id: 307287639,
  number: 456,
  title: 'Security issues',
  user: {
    login: 'theunluckyone1',
    id: 37171438,
    avatar_url: 'https://avatars2.githubusercontent.com/u/37171438?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/theunluckyone1',
    html_url: 'https://github.com/theunluckyone1',
    followers_url: 'https://api.github.com/users/theunluckyone1/followers',
    following_url:
      'https://api.github.com/users/theunluckyone1/following{/other_user}',
    gists_url: 'https://api.github.com/users/theunluckyone1/gists{/gist_id}',
    starred_url:
      'https://api.github.com/users/theunluckyone1/starred{/owner}{/repo}',
    subscriptions_url:
      'https://api.github.com/users/theunluckyone1/subscriptions',
    organizations_url: 'https://api.github.com/users/theunluckyone1/orgs',
    repos_url: 'https://api.github.com/users/theunluckyone1/repos',
    events_url: 'https://api.github.com/users/theunluckyone1/events{/privacy}',
    received_events_url:
      'https://api.github.com/users/theunluckyone1/received_events',
    type: 'User',
    site_admin: false,
  },
  labels: [],
  state: 'open',
  locked: false,
  assignee: null,
  assignees: [],
  milestone: null,
  comments: 0,
  created_at: '2018-03-21T15:13:00Z',
  updated_at: '2018-03-21T15:13:00Z',
  closed_at: null,
  author_association: 'NONE',
};
