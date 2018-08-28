import React from 'react';
import { shallow } from 'enzyme';
import { CounterPage } from '../../../src/features/demo/CounterPage';

describe('demo/CounterPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      demo: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CounterPage {...props} />
    );

    expect(
      renderedComponent.find('.demo-counter-page').length
    ).toBe(1);
  });
});
