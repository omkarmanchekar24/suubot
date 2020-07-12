import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {Actions} from 'react-native-router-flux';

import {
  GET_ERRORS,
  SIGNIN,
  REGISTER_UPDATE,
  SIGNINSUCCESS,
  LOGOUT_USER,
} from './types';

export const registerUpdate = ({prop, value}) => {
  return {
    type: REGISTER_UPDATE,
    payload: {prop, value},
  };
};

//Register User
export const registeruser = (userData) => (dispatch) => {
  axios
    .post('http://192.168.0.10:5000/api/users/register', userData)
    .then((response) => {
      dispatch({
        type: SIGNINSUCCESS,
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
