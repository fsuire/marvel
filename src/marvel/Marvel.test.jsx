import React from 'react';
import {shallow, mount} from 'enzyme';

import fixtures from './fixtures.json';
import Marvel from './Marvel';

describe('marvel/Marvel', function() {

  // window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, '{"id":"1234"}')));

  let initialState;

  beforeEach(function() {
    initialState = {
      characters: fixtures.data.results,
      currentCharacter: null
    };
  });

  afterEach(function() {

  });

  it('should', async function() {
    expect(window.fetch.polyfill).toBe(true);
    const wrapper = shallow(<Marvel />);
  });

});
