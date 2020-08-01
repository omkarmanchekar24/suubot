import {
  GET_STORES,
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_CATEGORIES_FAILED,
  FETCH_STORES_BY_PRODUCT_CATEGORY,
  FETCH_STORES_BY_PRODUCT_CATEGORY_SUCCESS,
  FETCH_STORES_BY_PRODUCT_CATEGORY_FAILED,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID_SUCCESS,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID_FAILED,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID,
  SET_VALUE,
  FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID,
  FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID_FAILED,
  FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID_SUCCESS,
  FETCH_PURCHASE_HISTORY_SELLER_WISE,
  FETCH_PURCHASE_HISTORY_SELLER_WISE_FAILED,
  FETCH_PURCHASE_HISTORY_SELLER_WISE_SUCCESS,
  FETCH_PURCHASE_HISTORY,
  FETCH_PURCHASE_HISTORY_FAILED,
  FETCH_PURCHASE_HISTORY_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  stores: [],
  product_categories: [],
  product_sub_categories: [],
  products: [],
  selected_product_category: {},
  selected_store: {},
  selected_sub_category: {},
  fetching: false,
  errors: {},
  purchaseHistorySellerWise: [],
  purchaseHistory: [],
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
    case FETCH_PRODUCT_CATEGORIES: {
      return {
        ...state,
        fetching: true,
        errors: {},
      };
    }
    case FETCH_PRODUCT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        fetching: false,
        product_categories: action.payload,
        errors: {},
      };
    }
    case FETCH_PRODUCT_CATEGORIES_FAILED: {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    case FETCH_STORES_BY_PRODUCT_CATEGORY: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_STORES_BY_PRODUCT_CATEGORY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        stores: action.payload,
      };
    }
    case FETCH_STORES_BY_PRODUCT_CATEGORY_FAILED: {
      return {
        ...state,
        fetching: false,
      };
    }
    case FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID_SUCCESS: {
      return {
        ...state,
        fetching: false,
        products: action.payload,
      };
    }
    case FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID_FAILED: {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    case FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID_SUCCESS: {
      return {
        ...state,
        fetching: false,
        product_sub_categories: action.payload,
      };
    }
    case FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID_FAILED: {
      return {
        ...state,
        fetching: false,
        errors: action.payload,
      };
    }
    case FETCH_PURCHASE_HISTORY_SELLER_WISE: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_PURCHASE_HISTORY_SELLER_WISE_SUCCESS: {
      return {
        ...state,
        fetching: false,
        purchaseHistorySellerWise: action.payload,
      };
    }
    case FETCH_PURCHASE_HISTORY_SELLER_WISE_FAILED: {
      return {
        ...state,
        fetching: false,
      };
    }
    case FETCH_PURCHASE_HISTORY: {
      return {
        ...state,
        fetching: true,
      };
    }
    case FETCH_PURCHASE_HISTORY_SUCCESS: {
      return {
        ...state,
        fetching: false,
        purchaseHistory: action.payload,
      };
    }
    case FETCH_PURCHASE_HISTORY_FAILED: {
      return {
        ...state,
        fetching: false,
      };
    }
    default: {
      return state;
    }
  }
};
