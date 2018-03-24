import React from 'react';
import renderer from 'react-test-renderer';
import { capitalize, timeDifference } from './helpers';

describe('helpers', () => {
  it(`calculates the difference between two date`, () => {
    expect(timeDifference(1520207526598, 1520007526598)).toBe('2 days ago');
  });
});
