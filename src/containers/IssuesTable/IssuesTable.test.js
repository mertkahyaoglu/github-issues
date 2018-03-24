import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { IssuesTable } from './IssuesTable';
import { FILTER_AUTHOR, filterAuthor, removeAuthor } from 'ducks/filters';

Enzyme.configure({ adapter: new Adapter() });

describe('IssuesTable', () => {
  let wrapper, store, props;

  beforeEach(() => {
    props = {
      getIssues: jest.fn(),
      getContributors: jest.fn(),
      getLabels: jest.fn(),
      filterAuthor: jest.fn(),
      filterLabel: jest.fn(),
      data: {
        issues: [mockIssue],
        loading: false,
        error: null,
      },
      contributors: {
        contributors: [mockContributor],
        loading: false,
        error: null,
      },
      labels: {
        labels: [mockLabel],
        loading: false,
        error: null,
      },
    };

    wrapper = shallow(<IssuesTable {...props} />);
  });

  it('capturing snapshot of IssuesTable', () => {
    const tree = renderer.create(<IssuesTable {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('check actions on dispatching when mounted', () => {
    expect(props.getIssues.mock.calls.length).toBe(1);
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

const mockLabel = {
  id: 549257748,
  url: 'https://api.github.com/repos/jekyll/jekyll-admin/labels/accepted',
  name: 'accepted',
  color: '4bc865',
  default: false,
};
