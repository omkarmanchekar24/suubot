import {
  GET_STORES,
  FETCH_PRODUCT_TYPES,
  FETCH_PRODUCT_TYPES_SUCCESS,
  FETCH_PRODUCT_TYPES_FAILED,
  FETCH_STORES_BY_PRODUCT_TYPE,
  FETCH_STORES_BY_PRODUCT_TYPE_FAILED,
  FETCH_STORES_BY_PRODUCT_TYPE_SUCCESS,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID_FAILED,
  FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID_SUCCESS,
  SET_VALUE,
  FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID,
  FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID_FAILED,
  FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID_SUCCESS,
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

export const fetchSProductTypes = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCT_TYPES,
    });

    axios
      .get(ip + '/api/stores/product_types')
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCT_TYPES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_PRODUCT_TYPES_FAILED,
          payload: err.response.data,
        });
      });
  };
};

export const fetchStoresByProductType = (type_id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_STORES_BY_PRODUCT_TYPE,
    });

    const product_type_id = type_id;

    axios
      .post(ip + '/api/stores/product_type_id', {
        product_type_id: product_type_id,
      })
      .then((response) => {
        dispatch({
          type: FETCH_STORES_BY_PRODUCT_TYPE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_STORES_BY_PRODUCT_TYPE_FAILED,
          payload: err.response.data,
        });
      });
  };
};

export const fetchProductsByStoreIdSubTypeId = ({store_id, sub_type_id}) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID,
    });

    axios
      .post(ip + '/api/products', {
        store_id: store_id,
        sub_type_id: sub_type_id,
      })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_PRODUCTS_BY_STORE_ID_SUB_TYPE_ID_FAILED,
          payload: err.response.data,
        });
      });
  };
};

export const fetchProductSubTypesByStoreIdTypeId = ({
  selected_store_id,
  selected_product_type_id,
}) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID,
    });

    axios
      .post(ip + '/api/products/product_sub_types', {
        store_id: selected_store_id,
        product_type_id: selected_product_type_id,
      })
      .then((response) => {
        dispatch({
          type: FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_PROD_SUB_TYPES_STORE_ID_PROD_ID_FAILED,
          payload: err.response.data,
        });
      });
  };
};
