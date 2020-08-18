import {
  LOGIN_UPDATE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  email: 'brad@gmail.com',
  password: '333333',
  logging: false,
  errors: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_UPDATE: {
      return {...state, [action.payload.prop]: action.payload.value};
    }
    case LOGIN: {
      return {
        ...state,
        logging: true,
        errors: {},
      };
    }
    case LOGIN_SUCCESS: {
      return INITIAL_STATE;
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        logging: false,
        errors: action.payload,
      };
    }
    default:
      return state;
  }
};
