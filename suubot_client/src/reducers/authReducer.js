import {
  REGISTER_UPDATE,
  SIGNIN,
  SIGNINSUCCESS,
  SIGNINFAILED,
  SET_CURRENT_USER,
  LOGOUT_USER,
} from '../actions/types';

import isEmpty from '../validation/is-empty';

const INITIAL_STATE = {
  name: '',
  email: '',
  mobile: '',
  address: '',
  street: '',
  town: '',
  city: '',
  states: '',
  pincode: '',
  country: '',
  username: '',
  password: '',
  isAuthenticated: false,
  user: {},
  token: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_UPDATE: {
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    }
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        token: action.payload,
      };
    }
    case LOGOUT_USER: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
