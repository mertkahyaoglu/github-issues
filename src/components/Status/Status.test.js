import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Status from './Status';
import TestProviders from 'utils/TestProviders';
import Success from 'react-icons/lib/fa/check';
import Warning from 'react-icons/lib/fa/exclamation';
import Error from 'react-icons/lib/fa/bell';

describe('component/Status', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <TestProviders>
        <Status status="success" icon={Success}>
          Success
        </Status>
      </TestProviders>,
      div
    );
  });

  it('renders markup correctly', () => {
    const tree = renderer
      .create(
        <TestProviders>
          <Status status="success" icon={Success}>
            Success
          </Status>
        </TestProviders>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders warning status correctly ', () => {
    const tree = renderer
      .create(
        <TestProviders>
          <Status status="warning" icon={Warning}>
            Warning
          </Status>
        </TestProviders>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders error status correctly', () => {
    const tree = renderer
      .create(
        <TestProviders>
          <Status status="error" icon={Error}>
            Error
          </Status>
        </TestProviders>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
