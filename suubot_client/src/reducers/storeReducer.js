import {
  GET_STORES,
  FETCH_PRODUCT_TYPES,
  FETCH_PRODUCT_TYPES_SUCCESS,
  FETCH_PRODUCT_TYPES_FAILED,
  FETCH_STORES_BY_PRODUCT_TYPE,
  FETCH_STORES_BY_PRODUCT_TYPE_SUCCESS,
  FETCH_STORES_BY_PRODUCT_TYPE_FAILED,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID_SUCCESS,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID_FAILED,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID,
  SET_VALUE,
  FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID,
  FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID_FAILED,
  FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  stores: {},
  product_types: {},
  product_sub_types: [],
  fetching: false,
  errors: {},
  selected_product_type_id: '',
  selected_store_id: '',
  selected_sub_type: '',
  products: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_VALUE: {
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    }

    case GET_STORES: {
      return {stores: action.payload};
    }
    case FETCH_PRODUCT_TYPES: {
      return {
        ...state,
        fetching: true,
        errors: {},
      };
    }
    case FETCH_PRODUCT_TYPES_SUCCESS: {
      return {
        ...state,
        fetching: false,
        product_types: action.payload,
        errors: {},
      };
    }
    case FETCH_PRODUCT_TYPES_FAILED: {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    case FETCH_STORES_BY_PRODUCT_TYPE: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_STORES_BY_PRODUCT_TYPE_SUCCESS: {
      return {
        ...state,
        fetching: false,
        stores: action.payload,
      };
    }
    case FETCH_STORES_BY_PRODUCT_TYPE_FAILED: {
      return {
        ...state,
        fetching: false,
      };
    }
    case FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID_SUCCESS: {
      return {
        ...state,
        fetching: false,
        products: action.payload,
      };
    }
    case FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID_FAILED: {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    case FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID_SUCCESS: {
      return {
        ...state,
        fetching: false,
        product_sub_types: action.payload,
      };
    }
    case FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID_FAILED: {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
