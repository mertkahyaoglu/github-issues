import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, {
  CONTRIBUTORS_REQUEST,
  CONTRIBUTORS_SUCCESS,
  CONTRIBUTORS_FAILED,
  getContributors,
  API_URL,
} from './contributors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Contributors actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates CONTRIBUTORS_SUCCESS when fetching contributors has been done', () => {
    fetchMock.getOnce(API_URL, [mockContributor]);
    const expectedActions = [
      { type: CONTRIBUTORS_REQUEST },
      { type: CONTRIBUTORS_SUCCESS, payload: [mockContributor] },
    ];
    const store = mockStore({ contibutors: [] });

    return store.dispatch(getContributors()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Contributors reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      contributors: [],
    });
  });

  it('should handle CONTRIBUTORS_REQUEST', () => {
    expect(
      reducer(
        {
          loading: false,
          contributors: [],
          error: null,
        },
        {
          type: CONTRIBUTORS_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
      contributors: [],
      error: null,
    });
  });

  it('should handle CONTRIBUTORS_FAILED', () => {
    expect(
      reducer(
        { loading: true, contributors: [], error: null },
        {
          type: CONTRIBUTORS_FAILED,
          payload: 'error',
        }
      )
    ).toEqual({
      loading: false,
      contributors: [],
      error: 'error',
    });
  });
  it('should handle CONTRIBUTORS_SUCCESS', () => {
    expect(
      reducer(
        { loading: true, contributors: [], error: null },
        {
          type: CONTRIBUTORS_SUCCESS,
          payload: [{ login: 'mert' }],
        }
      )
    ).toEqual({
      loading: false,
      contributors: [{ login: 'mert' }],
      error: null,
    });
  });
});

const mockContributor = {
  login: 'mertkahyaoglu',
  id: 7414026,
  avatar_url: 'https://avatars0.githubusercontent.com/u/7414026?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/mertkahyaoglu',
  html_url: 'https://github.com/mertkahyaoglu',
  followers_url: 'https://api.github.com/users/mertkahyaoglu/followers',
  following_url:
    'https://api.github.com/users/mertkahyaoglu/following{/other_user}',
  gists_url: 'https://api.github.com/users/mertkahyaoglu/gists{/gist_id}',
  starred_url:
    'https://api.github.com/users/mertkahyaoglu/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/mertkahyaoglu/subscriptions',
  organizations_url: 'https://api.github.com/users/mertkahyaoglu/orgs',
  repos_url: 'https://api.github.com/users/mertkahyaoglu/repos',
  events_url: 'https://api.github.com/users/mertkahyaoglu/events{/privacy}',
  received_events_url:
    'https://api.github.com/users/mertkahyaoglu/received_events',
  type: 'User',
  site_admin: false,
  contributions: 810,
};
