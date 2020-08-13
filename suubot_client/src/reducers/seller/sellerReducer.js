import {
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_FAILED,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  UPDATE_ADD_ITEMS,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
} from '../../actions/types';

const INITIAL_STATE = {
  loading: false,
  categories: {},
  sub_categories: {},
  error: {},
  name: '',
  unit: '',
  quantity: '',
  price: '',
  weight: '',
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
        error: {},
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
        error: {},
      };
    }
    case ADD_PRODUCT: {
      return {
        ...state,
        loading: true,
        error: {},
      };
    }
    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        name: '',
        unit: '',
        quantity: '',
        price: '',
        weight: '',
        products: [],
        error: {},
      };
    }
    case ADD_PRODUCT_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case FETCH_PRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        categories: action.payload.categories,
        sub_categories: action.payload.sub_categories,
        error: {},
      };
    }
    case FETCH_PRODUCTS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
