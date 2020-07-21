import {SET_CURRENT_USER} from '../actions/types';

import isEmpty from '../validation/is-empty';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {},
  token: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload.decoded),
        token: action.payload.token,
        user: action.payload.decoded,
      };
    }

    default:
      return state;
  }
};
