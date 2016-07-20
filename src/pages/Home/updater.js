import { Updater } from 'redux-elm';

const initialModel = {
  title: 'Home Page'
};

export default new Updater(initialModel)
  .toReducer();
