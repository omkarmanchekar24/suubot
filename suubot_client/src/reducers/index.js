import {combineReducers} from 'redux';
import registerReducer from './registerReducer';
import authReducer from './authReducer';
import loginReducer from './loginReducer';
import errorReducer from './authReducer';
import storeReducer from './storeReducer';

import {LOGOUT_USER} from '../actions/types';

const appReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  auth: authReducer,
  error: errorReducer,
  store: storeReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
