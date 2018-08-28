import React from 'react';
import { shallow } from 'enzyme';
import { RedditListPage } from '../../../src/features/demo/RedditListPage';

describe('demo/RedditListPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      demo: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RedditListPage {...props} />
    );

    expect(
      renderedComponent.find('.demo-reddit-list-page').length
    ).toBe(1);
  });
});
