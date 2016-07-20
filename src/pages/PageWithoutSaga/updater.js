import { Updater } from 'redux-elm';

const initialModel = {
  title: 'Page Without Saga'
};

// Swap these comment lines in order to change the number of console.logs
// occuring in src/App/updater.js take(RAWR):

// export default new Updater(initialModel, function*(){})
export default new Updater(initialModel)
  .toReducer();
