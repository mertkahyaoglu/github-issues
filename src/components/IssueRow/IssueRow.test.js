import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import IssueRow from './IssueRow';
import TestProviders from 'utils/TestProviders';

describe('component/IssueRow', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <TestProviders>
        <IssueRow data={data} />
      </TestProviders>,
      div
    );
  });

  it('renders markup correctly', () => {
    const tree = renderer
      .create(
        <TestProviders>
          <IssueRow data={data} />
        </TestProviders>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const data = {
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
