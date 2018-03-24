import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import { Filters, Filter } from './Filters';
import { FILTER_AUTHOR, filterAuthor, removeAuthor } from 'ducks/filters';

Enzyme.configure({ adapter: new Adapter() });

describe('Filters', () => {
  let wrapper, store, props;

  beforeEach(() => {
    props = {
      removeAuthor: jest.fn(),
      removeLabel: jest.fn(),
      filteredAuthor: { login: 'mert' },
      filteredLabel: { name: 'stale' },
    };

    wrapper = shallow(<Filters {...props} />);
  });

  it('capturing snapshot of Filters', () => {
    const tree = renderer.create(<Filters {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('check removeAuthor on dispatching ', () => {
    wrapper
      .find(Filter)
      .at(0)
      .simulate('click');
    expect(props.removeAuthor.mock.calls.length).toBe(1);
  });

  it('check removeLabel on dispatching ', () => {
    wrapper
      .find(Filter)
      .at(1)
      .simulate('click');
    expect(props.removeLabel).toHaveBeenCalledTimes(1);
  });
});
