import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  DEMO_FETCH_REDDIT_LIST_BEGIN,
  DEMO_FETCH_REDDIT_LIST_SUCCESS,
  DEMO_FETCH_REDDIT_LIST_FAILURE,
  DEMO_FETCH_REDDIT_LIST_DISMISS_ERROR,
} from '../../../../src/features/demo/redux/constants';

import {
  fetchRedditList,
  dismissFetchRedditListError,
  reducer,
} from '../../../../src/features/demo/redux/fetchRedditList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('demo/redux/fetchRedditList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchRedditList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchRedditList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_FETCH_REDDIT_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_FETCH_REDDIT_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when fetchRedditList fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchRedditList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_FETCH_REDDIT_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_FETCH_REDDIT_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchRedditListError', () => {
    const expectedAction = {
      type: DEMO_FETCH_REDDIT_LIST_DISMISS_ERROR,
    };
    expect(dismissFetchRedditListError()).toEqual(expectedAction);
  });

  it('handles action type DEMO_FETCH_REDDIT_LIST_BEGIN correctly', () => {
    const prevState = { fetchRedditListPending: false };
    const state = reducer(
      prevState,
      { type: DEMO_FETCH_REDDIT_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRedditListPending).toBe(true);
  });

  it('handles action type DEMO_FETCH_REDDIT_LIST_SUCCESS correctly', () => {
    const prevState = { fetchRedditListPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_FETCH_REDDIT_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRedditListPending).toBe(false);
  });

  it('handles action type DEMO_FETCH_REDDIT_LIST_FAILURE correctly', () => {
    const prevState = { fetchRedditListPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_FETCH_REDDIT_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRedditListPending).toBe(false);
    expect(state.fetchRedditListError).toEqual(expect.anything());
  });

  it('handles action type DEMO_FETCH_REDDIT_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { fetchRedditListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DEMO_FETCH_REDDIT_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchRedditListError).toBe(null);
  });
});

