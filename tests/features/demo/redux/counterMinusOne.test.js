import {
  DEMO_COUNTER_MINUS_ONE,
} from '../../../../src/features/demo/redux/constants';

import {
  counterMinusOne,
  reducer,
} from '../../../../src/features/demo/redux/counterMinusOne';

describe('demo/redux/counterMinusOne', () => {
  it('returns correct action by counterMinusOne', () => {
    expect(counterMinusOne()).toHaveProperty('type', DEMO_COUNTER_MINUS_ONE);
  });

  it('handles action type DEMO_COUNTER_MINUS_ONE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DEMO_COUNTER_MINUS_ONE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
