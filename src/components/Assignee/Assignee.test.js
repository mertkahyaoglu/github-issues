import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Assignee from './Assignee';
import TestProviders from 'utils/TestProviders';

describe('component/Assignee', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <TestProviders>
        <Assignee assignee={assignee} />
      </TestProviders>,
      div
    );
  });

  it('renders markup correctly', () => {
    const tree = renderer
      .create(
        <TestProviders>
          <Assignee assignee={assignee} />
        </TestProviders>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const assignee = {
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
};
