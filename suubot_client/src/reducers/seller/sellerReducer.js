import {
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_FAILED,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  UPDATE_ADD_ITEMS,
} from '../../actions/types';

const INITIAL_STATE = {
  loading: false,
  categories: {},
  error: {},
  name: '',
  unit: '',
  quantity: '',
  price: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_CATEGORIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_PRODUCT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    }
    case FETCH_PRODUCT_CATEGORIES_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case UPDATE_ADD_ITEMS: {
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    }
    default: {
      return state;
    }
  }
};
