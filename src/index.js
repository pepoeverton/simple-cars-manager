import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';
import './style/index.less';

/* eslint-disable */
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ }) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
const store = createStore(rootReducer, enhancer);

render(
  <Provider store={store}>
    <Router />
  </Provider>, document.getElementById('app')
);
/* eslint-enable */
registerServiceWorker();
