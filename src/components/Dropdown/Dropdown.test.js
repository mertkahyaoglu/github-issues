import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Dropdown from './Dropdown';
import TestProviders from 'utils/TestProviders';

describe('component/Dropdown', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <TestProviders>
        <Dropdown
          isOpen={true}
          data={labels}
          title="Sort by label"
          onItemClick={f => f}
          renderListItem={item => {
            return <span>{item.name}</span>;
          }}
        />
      </TestProviders>,
      div
    );
  });

  it('renders markup correctly', () => {
    const tree = renderer
      .create(
        <TestProviders>
          <Dropdown
            isOpen={true}
            data={labels}
            title="Sort by label"
            onItemClick={f => f}
            renderListItem={item => {
              return <span>{item.name}</span>;
            }}
          />
        </TestProviders>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

const labels = [
  {
    id: 418438082,
    url: 'https://api.github.com/repos/jekyll/jekyll-admin/labels/stale',
    name: 'stale',
    color: 'bfd4f2',
    default: false,
  },
  {
    id: 418468082,
    url: 'https://api.github.com/repos/jekyll/jekyll-admin/labels/api',
    name: 'api',
    color: 'f6f6f6',
    default: false,
  },
];
