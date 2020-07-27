import {
  REGISTER_UPDATE,
  GENERATE_OTP,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAILED,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../actions/types';

import isEmpty from '../validation/is-empty';

const INITIAL_STATE = {
  id: '',
  name: 'Omkar Manchekar',
  email: 'omkar@gmail.com',
  mobile: '7045564124',
  address: 'test',
  street: 'test',
  town: 'test',
  city: 'test',
  states: 'test',
  pincode: 'test',
  country: 'test',
  username: 'omkar',
  password: '444444',
  generating: false,
  registering: false,
  errors: {},
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
        errors: {},
      };
    }
    case GENERATE_OTP_SUCCESS: {
      return {
        ...state,
        id: action.payload,
        generating: false,
        errors: {},
      };
    }
    case GENERATE_OTP_FAILED: {
      return {
        ...state,
        generating: false,
        errors: action.payload,
      };
    }
    case REGISTER: {
      return {
        ...state,
        registering: true,
        errors: {},
      };
    }
    case REGISTER_SUCCESS: {
      return INITIAL_STATE;
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registering: false,
        errors: action.payload,
      };
    }
    default:
      return state;
  }
};
