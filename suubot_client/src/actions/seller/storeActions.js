import {ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  FETCH_PRODUCT_CATEGORIES,
  FETCH_PRODUCT_CATEGORIES_SUCCESS,
  FETCH_PRODUCT_CATEGORIES_FAILED,
  UPDATE_ADD_ITEMS,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILED,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILED,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILED,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAILED,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILED,
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

export const addProduct = ({
  name,
  unit,
  price,
  quantity,
  weight,
  category,
  sub_category,
  store,
}) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PRODUCT,
    });

    axios
      .post(ip + '/api/seller/stores/addproduct', {
        name,
        unit,
        cost: price,
        quantity,
        weight,
        category,
        sub_category,
        store,
      })
      .then(
        (response) =>
          dispatch({
            type: ADD_PRODUCT_SUCCESS,
          }),
        ToastAndroid.show('Added successfully!', ToastAndroid.SHORT),
      )
      .catch((err) =>
        dispatch({
          type: ADD_PRODUCT_FAILED,
          payload: err.response.data,
        }),
      );
  };
};

export const fetchProducts = (store_id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_PRODUCTS,
    });

    axios
      .post(ip + '/api/seller/stores/getproducts', {_id: store_id})
      .then((response) => {
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: FETCH_PRODUCTS_FAILED,
          payload: err.response.data,
        }),
      );
  };
};

export const editProduct = ({_id, name, weight, unit, quantity, cost}) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_PRODUCT,
    });

    axios
      .post(ip + '/api/seller/stores/editproduct', {
        _id,
        name,
        weight,
        unit,
        quantity,
        cost,
      })
      .then((response) => {
        Actions.editstock();
        ToastAndroid.show('Changes Saved!', ToastAndroid.SHORT);
      })
      .catch((err) => {
        ToastAndroid.show(err.response.data.error, ToastAndroid.LONG);
      });
  };
};

export const removeProduct = ({_id}) => {
  console.log('id:' + _id);
  return (dispatch) => {
    dispatch({
      type: REMOVE_PRODUCT,
    });

    axios
      .delete(ip + '/api/seller/stores/deleteproduct', {
        data: {
          _id: _id,
        },
      })
      .then((response) => {
        console.log('success');
        console.log(response.data);
        ToastAndroid.show('Product removed!', ToastAndroid.LONG);
        Actions.editstock();
      })
      .catch((err) => {
        console.log('error');
        console.log(err.response.data);
      });
  };
};

export const editProfile = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_PROFILE,
    });

    axios
      .post(ip + '/api/seller/profiles/editprofile', data)
      .then((response) => {
        ToastAndroid.show('Profile Updated!', ToastAndroid.LONG);
        dispatch({
          type: EDIT_PROFILE_SUCCESS,
        });
      })
      .catch((err) => {
        ToastAndroid.show(
          'Something went wrong! Please try again later ',
          ToastAndroid.SHORT,
        );
        dispatch({
          type: EDIT_PROFILE_FAILED,
          payload: err.response.data,
        });
      });
  };
};
