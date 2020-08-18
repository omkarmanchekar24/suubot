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

export const purchaseItems = ({user, txn_amount, status, store, products}) => {
  //console.log({user, txn_amount, status, store, products});

  const data = {
    user,
    txn_amount,
    status,
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
    ToastAndroid.show(
      'Your order has been placed successfully!!!',
      ToastAndroid.LONG,
    );
    Actions.welcome();
  };
};

export const transactionFailed = () => {
  return (dispatch) => {
    dispatch({
      type: PURCHASE_FAILED,
    });

    // axios
    //   .post(ip + '/api/customers/paytm/update_order_status', {
    //     status: 'failed',
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((err) => console.log(err.response.data));

    ToastAndroid.show(
      'Oops! Something went wrong. Please try again later.',
      ToastAndroid.LONG,
    );
    Actions.product2();
  };
};
