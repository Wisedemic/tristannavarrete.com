import { fromJS } from 'immutable';
import {
  CLOSE_ERROR
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: ''
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_ERROR:
      return state
        .set('error', '');
    default:
      return state;
  }
}

export default appReducer;
