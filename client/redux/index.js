import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import configStore from './configStore';

export {
    createAction,
    configStore,
    Provider,
    withRedux
};
