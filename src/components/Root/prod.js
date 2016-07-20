import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

const NOOP = () => null;

export const instrument = NOOP;
export const persist = NOOP;

export default ({ store, routes, history }) => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);