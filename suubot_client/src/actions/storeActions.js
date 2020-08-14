import {
  GET_STORES,
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_CATEGORIES_FAILED,
  FETCH_STORES_BY_PRODUCT_CATEGORY,
  FETCH_STORES_BY_PRODUCT_CATEGORY_FAILED,
  FETCH_STORES_BY_PRODUCT_CATEGORY_SUCCESS,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID_FAILED,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID_SUCCESS,
  SET_VALUE,
  FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID,
  FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID_FAILED,
  FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID_SUCCESS,
  FETCH_PURCHASE_HISTORY_SELLER_WISE,
  FETCH_PURCHASE_HISTORY_SELLER_WISE_SUCCESS,
  FETCH_PURCHASE_HISTORY_SELLER_WISE_FAILED,
  FETCH_PURCHASE_HISTORY,
  FETCH_PURCHASE_HISTORY_SUCCESS,
  FETCH_PURCHASE_HISTORY_FAILED,
} from '../actions/types';
import {ToastAndroid} from 'react-native';
import axios from 'axios';

import {ip} from '../config/config';

export const setValue = ({prop, value}) => {
  return {
    type: SET_VALUE,
    payload: {prop, value},
  };
};

export const getStores = () => {
  return (dispatch) => {
    axios.get(ip + '/api/stores').then((response) => {
      dispatch({
        type: GET_STORES,
        payload: response.data,
      });
    });
  };
};

export const fetchProductCategories = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCT_CATEGORIES,
    });

    axios
      .get(ip + '/api/customers/products/categories')
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCT_CATEGORIES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_PRODUCT_CATEGORIES_FAILED,
          payload: err.response.data,
        });
      });
  };
};

export const fetchStoresByProductCategory = (type_id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_STORES_BY_PRODUCT_CATEGORY,
    });

    const product_category_id = type_id;

    axios
      .post(ip + '/api/customers/stores/', {category_id: product_category_id})
      .then((response) => {
        dispatch({
          type: FETCH_STORES_BY_PRODUCT_CATEGORY_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_STORES_BY_PRODUCT_CATEGORY_FAILED,
          payload: err.response.data,
        });
      });
  };
};

export const fetchProductsByStoreIdSubCategoryId = (
  selected_store,
  selected_sub_category,
) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID,
    });

    axios
      .post(ip + '/api/customers/products', {
        store_id: selected_store,
        sub_category_id: selected_sub_category,
      })
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_PRODUCTS_BY_STORE_ID_SUB_CATEGORY_ID_FAILED,
          payload: err.response.data,
        });
      });
  };
};

export const fetchProductSubCategoriesByStoreIdCategoryId = (
  selected_store,
  selected_product_category,
) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID,
    });

    axios
      .post(ip + '/api/customers/products/product_sub_categories', {
        store: selected_store,
        product_category: selected_product_category,
      })
      .then((response) => {
        dispatch({
          type: FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: FETCH_PROD_SUB_CATEGORIES_STORE_ID_PROD_ID_FAILED,
          payload: err.response.data,
        });
      });
  };
};

export const fetchPurchaseHistorySellerWise = (user_id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PURCHASE_HISTORY_SELLER_WISE,
    });
    dispatch(fetchPurchaseHistory(user_id));
    axios
      .post(ip + '/api/customers/products/fetch_orders_sellerwise', {
        user_id: user_id,
      })
      .then((response) => {
        dispatch({
          type: FETCH_PURCHASE_HISTORY_SELLER_WISE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_PURCHASE_HISTORY_SELLER_WISE_FAILED,
          payload: err.response.data,
        });
      });
  };
};

export const fetchPurchaseHistory = (user_id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PURCHASE_HISTORY,
    });

    axios
      .post(ip + '/api/customers/products/fetch_orders', {
        user_id: user_id,
      })
      .then((response) => {
        dispatch({
          type: FETCH_PURCHASE_HISTORY_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_PURCHASE_HISTORY_FAILED,
          payload: err.response.data,
        });
      });
  };
};
