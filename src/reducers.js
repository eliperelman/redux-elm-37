import R from 'ramda';
import { routerReducer } from 'react-router-redux';
import { basename, dirname } from 'path';

/**
 * getModelKey :: String -> String
 */
const getModelKey = R.converge(R.concat, [
  R.pipe(R.head, R.toLower),
  R.tail
]);

/**
 * getReducerName :: String -> String
 */
const getReducerName = R.pipe(dirname, basename, getModelKey);

const req = require.context('./pages', true, /updater\.js/igm);
const reducers = req
  .keys()
  .reduce((reducers, f) => {
    reducers[getReducerName(f)] = req(f).default;

    return reducers;
  }, {});

export default {
  routing: routerReducer,
  app: require('./App/updater').default,
  ...reducers
};
