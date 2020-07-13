import {
  REGISTER_UPDATE,
  SIGNIN,
  SIGNINSUCCESS,
  SIGNINFAILED,
  SET_CURRENT_USER,
  LOGOUT_USER,
  GENERATE_OTP,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAILED,
} from '../actions/types';

import isEmpty from '../validation/is-empty';

const INITIAL_STATE = {
  id: '',
  name: 'omkar',
  email: 'omkar@gmail.com',
  mobile: '7045564124',
  address: 'test',
  street: 'test',
  town: 'test',
  city: 'test',
  states: 'test',
  pincode: '400012',
  country: 'test',
  username: 'test',
  password: 'test',
  isAuthenticated: false,
  user: {},
  token: '',
  generating: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_UPDATE: {
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    }
    case GENERATE_OTP: {
      return {
        ...state,
        generating: true,
      };
    }
    case GENERATE_OTP_SUCCESS: {
      return {
        ...state,
        generating: false,
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
