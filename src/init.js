import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, combineReducers } from 'redux';
import reduxElm from 'redux-elm';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routing';
import reducers from './reducers';
import Root, { instrument, persist } from './components/Root';

const storeFactory = compose(reduxElm, instrument, persist)(createStore);
let store;

export default (domNode) => () => {
  const rootReducer = combineReducers(reducers);

  if (!store) {
    store = storeFactory(rootReducer);
  } else {
    store.replaceReducer(rootReducer);
  }

  const history = syncHistoryWithStore(browserHistory, store);

  render(
  <Root store={store} history={history} routes={routes} />,
    domNode
);
};
