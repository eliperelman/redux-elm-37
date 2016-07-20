import create from './init';

const start = create(document.getElementById('root'));

if (module.hot) {
  module.hot.accept(start);
}

start();
