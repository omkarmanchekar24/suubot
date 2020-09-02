import {ip} from '../../config/config';
import {
  EDIT_PROFILE_USER,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_USER_FAILED,
  EDIT_PROFILE_USER_SUCCESS,
} from '../types';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';

export const editProfile = (profileData) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_PROFILE_USER,
    });

    axios
      .post(ip + '/api/customers/users/editprofile', profileData)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: EDIT_PROFILE_USER_SUCCESS,
          payload: response.data,
        });
        Actions.welcome();
        ToastAndroid.show('Profile updated successfully!', ToastAndroid.LONG);
      })
      .catch((err) => {
        dispatch({
          type: EDIT_PROFILE_USER_FAILED,
          payload: err.response.data,
        });
        ToastAndroid.show(
          'Something went wrong. Please try again later.',
          ToastAndroid.LONG,
        );
      });
  };
};
