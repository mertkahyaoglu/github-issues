import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Label from './Label';
import TestProviders from 'utils/TestProviders';

const label = {
  id: 418438082,
  url: 'https://api.github.com/repos/jekyll/jekyll-admin/labels/stale',
  name: 'stale',
  color: 'bfd4f2',
  default: false,
};

describe('component/Status', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <TestProviders>
        <Label label={label} />
      </TestProviders>,
      div
    );
  });

  it('renders markup correctly', () => {
    const tree = renderer
      .create(
        <TestProviders>
          <Label label={label} />
        </TestProviders>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
