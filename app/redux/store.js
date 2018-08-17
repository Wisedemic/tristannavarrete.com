import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga';
// import { promiseMiddleware, localStorageMiddleware, drizzleMiddleware } from './middleware';
import createReducers from './reducers';

const sagaMiddleware = createSagaMiddleware();

let _store = null;
export function getStore() {
	return _store;
}
function setStore(store) {
  _store = store;
}

// Init store
export const configureStore = (history) => {
  let store = {};

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedSagas = {}; // Saga registry

  const middleware = [
    routerMiddleware(history),
		// promiseMiddleware,
		// localStorageMiddleware,
    sagaMiddleware
  ];
  if (process.env.NODE_ENV === 'development') {
    const { composeWithDevTools } = require('redux-devtools-extension');
		const { createLogger } = require('redux-logger');
    middleware.push(createLogger({
      collapse: true,
      stateTransformer: state => state.toJS()
    }));
    const enhancer = composeWithDevTools(applyMiddleware(...middleware));

    store = createStore(createReducers(), enhancer);

    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(createReducers());
        store.dispatch({ type: '@@REDUCER_INJECTED' });
      });
    }
		setStore(store);
    return store;
  } else {
    store = applyMiddleware(...middleware)(createStore)(createReducers());
    setStore(store);
    return store;
  }
};

export default configureStore;
