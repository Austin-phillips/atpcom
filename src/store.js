import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import apiMiddleware from 'redux-devise-axios';
import rootReducer from './reducers/index';
import axios from 'axios';
var env = process.env.NODE_ENV;

const options = { axios };

const ChromeExtension = env === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f : null;

const enhancers = compose(
  applyMiddleware(thunk, apiMiddleware(options)),
  ChromeExtension,
);

const store = createStore(rootReducer, {}, enhancers);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;