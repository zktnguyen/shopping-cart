import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import './index.css';
import App from './App';
import Reducers from './components/reducers';
import registerServiceWorker from './registerServiceWorker';

const middleware = applyMiddleware(logger);
const store = createStore(Reducers, middleware);

render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
