import React from 'react';
import { view } from 'redux-elm';
import { RAWR } from './updater';

export default view(({ model, dispatch, children }) => {
  const rawr = () => dispatch({ type: RAWR });

  return (
    <div id="wrapper">
      <button onClick={rawr}>rawr!</button>
      {children}
    </div>
  );
});
