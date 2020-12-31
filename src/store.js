import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import apiMiddleware from 'redux-devise-axios';
import rootReducer from './reducers/index';
import axios from 'axios';
var env = process.env.NODE_ENV;

const options = { axios };

const devTools = () => {
  if(env === 'development') {
    const enhancers = compose(
      applyMiddleware(thunk, apiMiddleware(options)),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    );
    return enhancers
  } else {
    const enhancers = compose(
      applyMiddleware(thunk, apiMiddleware(options)),
    );
    return enhancers
  }
}

const store = createStore(rootReducer, {}, devTools());

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;