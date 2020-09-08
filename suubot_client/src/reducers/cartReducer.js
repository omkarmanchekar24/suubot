import {
  ADD_ITEMS_TO_CART,
  RESET_CART,
  PURCHASE,
  SAVE_ORDER_FAILED,
  SAVE_ORDER_SUCCESS,
  PURCHASE_SUCCESS,
  PURCHASE_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  cart: [],

  loading: false,
  order: {},
  errors: {},
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
    case PURCHASE: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    }
    case SAVE_ORDER_FAILED: {
      return {
        ...state,
        cart: [],
        loading: false,
        errors: action.payload,
      };
    }
    case PURCHASE_SUCCESS: {
      return {
        ...state,
        cart: [],
        loading: false,
        errors: {},
      };
    }
    case PURCHASE_FAILED: {
      return {
        ...state,
        loading: false,
        errors: {},
      };
    }
    default: {
      return state;
    }
  }
};
