import initialState from './initialState';
import { reducer as fetchPurchasePriceListReducer } from './fetchPurchasePriceList';
import { reducer as fetchForecastPriceListReducer } from './fetchForecastPriceList';
import { reducer as cleanForecastDataReducer } from './cleanForecastData';

const reducers = [
  fetchPurchasePriceListReducer,
  fetchForecastPriceListReducer,
  cleanForecastDataReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
