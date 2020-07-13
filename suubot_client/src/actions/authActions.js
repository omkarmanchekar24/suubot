import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {Actions} from 'react-native-router-flux';
import 'react-native-get-random-values';
import {uuid} from 'uuidv4';

import {
  GET_ERRORS,
  SIGNIN,
  SET_CURRENT_USER,
  REGISTER_UPDATE,
  LOGOUT_USER,
  GENERATE_OTP,
  GENERATE_OTP_SUCCESS,
  GENERATE_OTP_FAILED,
} from './types';

export const registerUpdate = ({prop, value}) => {
  //console.log({prop, value});
  return {
    type: REGISTER_UPDATE,
    payload: {prop, value},
  };
};

//Generate otp
export const generateOtp = (mobile) => {
  return (dispatch) => {
    dispatch({
      type: GENERATE_OTP,
    });

    const id = uuid();

    dispatch({
      type: REGISTER_UPDATE,
      payload: {prop: 'id', value: id},
    });

    const data = {
      id: id,
      mobile: mobile,
    };

    axios
      .post('http://192.168.0.10:5000/api/users/otp', data)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: GENERATE_OTP_SUCCESS,
        });
        Actions.otp();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };
};

//Register User
export const registeruser = (userData) => (dispatch) => {
  axios
    .post('http://192.168.0.10:5000/api/users/register', userData)
    .then((response) => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: response.data.token,
      });
      Actions.main();
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
    });
    Actions.auth();
  };
};
