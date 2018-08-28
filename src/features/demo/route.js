// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  CounterPage,
  RedditListPage,
} from './';

export default {
  path: 'demo',
  name: 'Demo',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'counter', name: 'Counter page', component: CounterPage },
    { path: 'reddit-list', name: 'Reddit list page', component: RedditListPage },
  ],
};
