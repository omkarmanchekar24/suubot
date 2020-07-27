import {ADD_ITEMS_TO_CART, RESET_CART} from '../actions/types';

const INITIAL_STATE = {
  cart: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEMS_TO_CART: {
      return {
        cart: action.payload,
      };
    }
    case RESET_CART: {
      return {
        cart: [],
      };
    }
    default: {
      return state;
    }
  }
};
