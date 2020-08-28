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
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
  FETCH_PURCHASE_HISTORY_PRODUCT_WISE_SELLER,
  FETCH_PURCHASE_HISTORY_PRODUCT_WISE_SUCCESS_SELLER,
  FETCH_PURCHASE_HISTORY_PRODUCT_WISE_FAILED_SELLER,
  FETCH_PURCHASE_HISTORY_CLIENT_WISE_SELLER,
  FETCH_PURCHASE_HISTORY_CLIENT_WISE_SUCCESS_SELLER,
  FETCH_PURCHASE_HISTORY_CLIENT_WISE_FAILED_SELLER,
  FETCH_PURCHASE_HISTORY_INVENTORY_WISE_FAILED_SELLER,
  FETCH_PURCHASE_HISTORY_INVENTORY_WISE_SELLER,
  FETCH_PURCHASE_HISTORY_INVENTORY_WISE_SUCCESS_SELLER,
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
  productWise: null,
  clientWise: null,
  inventoryWise: null,
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
    case EDIT_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case EDIT_PROFILE_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case FETCH_PURCHASE_HISTORY_PRODUCT_WISE_SELLER: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_PURCHASE_HISTORY_PRODUCT_WISE_SUCCESS_SELLER: {
      return {
        ...state,
        productWise: action.payload,
        loading: false,
      };
    }
    case FETCH_PURCHASE_HISTORY_PRODUCT_WISE_FAILED_SELLER: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case FETCH_PURCHASE_HISTORY_CLIENT_WISE_SELLER: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_PURCHASE_HISTORY_CLIENT_WISE_SUCCESS_SELLER: {
      return {
        ...state,
        clientWise: action.payload,
        loading: false,
      };
    }
    case FETCH_PURCHASE_HISTORY_CLIENT_WISE_FAILED_SELLER: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case FETCH_PURCHASE_HISTORY_INVENTORY_WISE_SELLER: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_PURCHASE_HISTORY_INVENTORY_WISE_SUCCESS_SELLER: {
      return {
        ...state,
        inventoryWise: action.payload,
        loading: false,
      };
    }
    case FETCH_PURCHASE_HISTORY_INVENTORY_WISE_FAILED_SELLER: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
