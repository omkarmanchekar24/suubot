import {
  SET_CURRENT_USER,
  SET_ACCOUNT,
  EDIT_PROFILE_USER,
  EDIT_PROFILE_USER_SUCCESS,
  EDIT_PROFILE_USER_FAILED,
} from '../actions/types';

import isEmpty from '../validation/is-empty';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  token: '',
  selected_store: {},
  selected_profession: {},
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload.decoded),
        token: action.payload.token,
        user: action.payload.newObj,
      };
    }
    case SET_ACCOUNT: {
      return {
        ...state,
        [action.payload.name]: action.payload.item,
      };
    }
    case EDIT_PROFILE_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case EDIT_PROFILE_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    }
    case EDIT_PROFILE_USER_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }

    default:
      return state;
  }
};
