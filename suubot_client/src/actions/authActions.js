import {ToastAndroid} from 'react-native';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {Actions} from 'react-native-router-flux';
import 'react-native-get-random-values';
import {uuid} from 'uuidv4';
import jwt_decode from 'jwt-decode';
import {getStores} from '../actions/storeActions';
import validateLoginInput from '../validation/login';

import {
  LOGIN_UPDATE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  SIGNIN,
  SET_CURRENT_USER,
  REGISTER_UPDATE,
  LOGOUT_USER,
  GENERATE_OTP,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAILED,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './types';

import {ip} from '../config/config';

export const registerUpdate = ({prop, value}) => {
  return {
    type: REGISTER_UPDATE,
    payload: {prop, value},
  };
};

export const loginUpdate = ({prop, value}) => {
  return {
    type: LOGIN_UPDATE,
    payload: {prop, value},
  };
};

//Generate otp
export const generateOtp = ({email, mobile}) => {
  return (dispatch) => {
    dispatch({
      type: GENERATE_OTP,
    });

    const data = {
      email: email,
      mobile: mobile,
    };

    axios
      .post(ip + '/api/users/otp', data)
      .then((response) => {
        dispatch({
          type: GENERATE_OTP_SUCCESS,
          payload: response.data.id,
        });
        Actions.otp();
      })
      .catch((err) => {
        dispatch({
          type: GENERATE_OTP_FAILED,
          payload: err.response.data,
        });
      });
  };
};

//Register User
export const registeruser = (userData) => (dispatch) => {
  dispatch({
    type: REGISTER,
  });

  axios
    .post(ip + '/api/users/register', userData)
    .then((response) => {
      const {token} = response.data;

      //Set token to auth header
      setAuthToken(token);

      //Decode token to get user data
      const decoded = jwt_decode(token);

      //Set current user
      dispatch(setCurrentUser({decoded, token}));

      Actions.main();
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_FAILED,
        payload: err.response.data,
      });
    });
};

export const loginUser = ({email, password}) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
    });

    axios
      .post(ip + '/api/users/login', {email, password})
      .then((response) => {
        const {token} = response.data;

        //Set token to auth header
        setAuthToken(token);

        //Decode token to get user data
        const decoded = jwt_decode(token);

        //Set current user
        dispatch(setCurrentUser({decoded, token}));

        Actions.main();

        dispatch({
          type: LOGIN_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
          payload: err.response.data,
        });
      });
  };
};

//Set logged in user
export const setCurrentUser = ({decoded, token}) => {
  return {
    type: SET_CURRENT_USER,
    payload: {decoded, token},
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
    });
    Actions.auth();
  };
};
