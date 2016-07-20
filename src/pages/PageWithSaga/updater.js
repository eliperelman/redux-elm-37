import { Updater } from 'redux-elm';

const initialModel = {
  title: 'Page Without Saga'
};

export default new Updater(initialModel, function*(){})
  .toReducer();
