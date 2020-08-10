import {
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_CATEGORIES_FAILED,
  UPDATE_ADD_ITEMS,
} from '../types';

import axios from 'axios';
import {ip} from '../../config/config';

export const fetchProductCategories = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCT_CATEGORIES,
    });

    axios
      .post(ip + '/api/seller/stores/getcategories')
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

export const updateAddItems = ({prop, value}) => {
  return {
    type: UPDATE_ADD_ITEMS,
    payload: {prop, value},
  };
};
