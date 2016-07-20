import React from 'react';
import { view } from 'redux-elm';

export default view(({ model, dispatch, children }) => {
  return (
    <h1>{model.title}</h1>
  );
});
