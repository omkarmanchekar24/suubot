import {
  ADD_ITEMS_TO_CART,
  RESET_CART,
  PURCHASE_SUCCESS,
  PURCHASE_FAILED,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAILED,
  PURCHASE,
} from './types';

import axios from 'axios';
import {ip} from '../config/config';
import {ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';

export const addItemsToCart = (items) => {
  return {
    type: ADD_ITEMS_TO_CART,
    payload: items,
  };
};

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
};

export const purchaseItems = ({
  user,
  mobile,
  txn_id,
  txn_amount,
  status,
  resp_code,
  store,
  products,
}) => {
  const data = {
    user,
    mobile,
    txn_id,
    txn_amount,
    status,
    resp_code,
    store,
    products,
  };

  return (dispatch) => {
    dispatch({
      type: PURCHASE,
    });

    axios
      .post(ip + '/api/customers/paytm/save_order', data)
      .then((response) => {
        dispatch({
          type: SAVE_ORDER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: SAVE_ORDER_FAILED,
          payload: err.response.data,
        });
      });

    if (status === 'SUCCESS') {
      dispatch(transactionSuccess({cart: products}));
      ToastAndroid.show('Transaction Successfull!', ToastAndroid.LONG);
      Actions.products();
    } else {
      dispatch(transactionFailed());
      ToastAndroid.show(
        'Transaction Failed! Please try again',
        ToastAndroid.LONG,
      );
    }
  };
};

export const transactionSuccess = ({cart}) => {
  return (dispatch) => {
    dispatch({
      type: PURCHASE_SUCCESS,
    });
    axios
      .post(ip + '/api/customers/paytm/update_order_quantity', {cart: cart})
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err.response.data));
  };
};

export const transactionFailed = () => {
  return (dispatch) => {
    dispatch({
      type: PURCHASE_FAILED,
    });
  };
};
