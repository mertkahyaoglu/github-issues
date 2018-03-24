import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import reducer, {
  LABELS_REQUEST,
  LABELS_SUCCESS,
  LABELS_FAILED,
  getLabels,
  API_URL,
} from './labels';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Issues actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates LABELS_SUCCESS when fetching labels has been done', () => {
    fetchMock.getOnce(API_URL, [mockLabel]);
    const expectedActions = [
      { type: LABELS_REQUEST },
      { type: LABELS_SUCCESS, payload: [mockLabel] },
    ];
    const store = mockStore({ contibutors: [] });

    return store.dispatch(getLabels()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Labels reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      error: null,
      labels: [],
    });
  });

  it('should handle LABELS_REQUEST', () => {
    expect(
      reducer(
        {
          loading: false,
          labels: [],
          error: null,
        },
        {
          type: LABELS_REQUEST,
        }
      )
    ).toEqual({
      loading: true,
      labels: [],
      error: null,
    });
  });

  it('should handle LABELS_FAILED', () => {
    expect(
      reducer(
        { loading: true, labels: [], error: null },
        {
          type: LABELS_FAILED,
          payload: 'error',
        }
      )
    ).toEqual({
      loading: false,
      labels: [],
      error: 'error',
    });
  });
  it('should handle LABELS_SUCCESS', () => {
    expect(
      reducer(
        { loading: true, labels: [], error: null },
        {
          type: LABELS_SUCCESS,
          payload: [{ id: 12312312 }],
        }
      )
    ).toEqual({
      loading: false,
      labels: [{ id: 12312312 }],
      error: null,
    });
  });
});

const mockLabel = {
  id: 549257748,
  url: 'https://api.github.com/repos/jekyll/jekyll-admin/labels/accepted',
  name: 'accepted',
  color: '4bc865',
  default: false,
};
