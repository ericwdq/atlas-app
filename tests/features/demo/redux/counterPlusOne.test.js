import {
  DEMO_COUNTER_PLUS_ONE,
} from '../../../../src/features/demo/redux/constants';

import {
  counterPlusOne,
  reducer,
} from '../../../../src/features/demo/redux/counterPlusOne';

describe('demo/redux/counterPlusOne', () => {
  it('returns correct action by counterPlusOne', () => {
    expect(counterPlusOne()).toHaveProperty('type', DEMO_COUNTER_PLUS_ONE);
  });

  it('handles action type DEMO_COUNTER_PLUS_ONE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DEMO_COUNTER_PLUS_ONE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
