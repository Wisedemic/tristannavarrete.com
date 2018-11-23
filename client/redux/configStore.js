import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

// This will fetch and combine all our reducers
const getReducers = () => combineReducers({
    // internetStatus: require('./reducers/interStatus'
});

// Configure the store for next-redux-wrapper
const configStore = (initialState, options) => {

    // Init middleware /* Note: This is mutable. 
    let middleware = [];

    if (process.env.NODE_ENV === 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        const { createLogger } = require('redux-logger');
        middleware.push(createLogger({
            collapse: true
            // stateTransformer: state => state.toJS()
        }));
        const withEnhancer = composeWithDevTools(applyMiddleware(...middleware));
        const store = createStore(getReducers(), initialState, withEnhancer);
        return store;
    } else {
        const withEnhancer = compose(applyMiddleware(...middleware));
        const store = createStore(getReducers(), initialState, withEnhancer);
        return store;
    }

};

// Export configureStore
export default configStore;