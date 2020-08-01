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
  showModal: false,
  ack: '',
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
        ack: '',
      };
    }
    case SAVE_ORDER_SUCCESS: {
      return {
        ...state,
        loading: false,
        order: action.payload,
        showModal: true,
      };
    }
    case SAVE_ORDER_FAILED: {
      return {
        ...state,
        cart: [],
        loading: false,
        errors: action.payload,
        showModal: false,
        ack: 'Server error. Please try again later.',
      };
    }
    case PURCHASE_SUCCESS: {
      return {
        ...state,
        cart: [],
        loading: false,
        errors: {},
        showModal: false,
        ack: 'Your order has been placed successfully!!!',
      };
    }
    case PURCHASE_FAILED: {
      return {
        ...state,
        cart: [],
        loading: false,
        errors: {},
        showModal: false,
        ack: 'Oops! Something went wrong. Please try again later.',
      };
    }
    default: {
      return state;
    }
  }
};
