import R from 'ramda';
import React from 'react';
import { connect as _connect } from 'react-redux';
import { forwardTo } from 'redux-elm';
import { basename, dirname } from 'path';

/**
 * getModelKey :: String -> String
 */
const getModelKey = R.converge(R.concat, [
  R.pipe(R.head, R.toLower),
  R.tail
]);

/**
 * extractPageName :: String -> String
 */
const extractPageName = R.pipe(dirname, basename);

/**
 * connect :: Component -> String -> [String] -> Component
 */
const connect = (View, modelKey, ...nesting) => {
  const factory = _connect(state => ({ model: state[modelKey] }))

  return factory(props => (
    modelKey === 'app' ?
      <View {...props} /> :
      <View {...props} dispatch={forwardTo(props.dispatch, ...nesting)} />
  ));
};

/**
 * getActionKey :: String -> String
 */
const getActionKey = R.pipe(
  R.split(/(?=[A-Z])/),
  R.map(R.toUpper),
  R.join('_')
);

const req = require.context(`./pages`, true, /index\.js/igm);
export const pages = req
  .keys()
  .reduce((childRoutes, f) => {
    const name = extractPageName(f);
    const value = req(f);

    childRoutes[name] = R.merge(value, {
      component: connect(value.default, getModelKey(name), getActionKey(name))
    });

    return childRoutes;
  }, {});

export const { Home, NotFound } = pages;

/**
 * toRoutes :: Object -> List Object
 */
const toRoutes = R.pipe(
  R.dissoc('Home'),
  R.dissoc('NotFound'),
  R.values,
  R.append(NotFound)
);

export default {
  path: '/',
  component: connect(require('./App').default, 'app', 'APP'),
  indexRoute: Home,
  childRoutes: toRoutes(pages)
};
