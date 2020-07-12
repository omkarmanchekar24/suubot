import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {widthToDp, heightToDp} from '../Responsive';
import {connect} from 'react-redux';
import {Button} from 'react-native-paper';
import {Header} from '../components';

//Actions
import {registeruser} from '../actions/authActions';

class Otp extends Component {
  onClick() {
    const {
      name,
      email,
      mobile,
      address,
      street,
      town,
      city,
      states,
      pincode,
      country,
      username,
      password,
    } = this.props;
    const userData = {
      name,
      email,
      mobile,
      address,
      street,
      town,
      city,
      states,
      pincode,
      country,
      username,
      password,
    };

    this.props.registeruser(userData);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.otpContainer}>
          <Text style={styles.title}>Enter Otp :</Text>
          <TextInput style={styles.input} />
          <Button
            style={styles.button}
            mode="outlined"
            onPress={this.onClick.bind(this)}>
            Enter
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {},
  otpContainer: {
    padding: widthToDp(5),
  },
  title: {fontSize: widthToDp(5)},
  input: {borderWidth: 1, marginTop: heightToDp(2), borderRadius: widthToDp(2)},
  button: {
    width: widthToDp(30),
    marginTop: heightToDp(5),
    alignSelf: 'center',
  },
};

const mapStateToProps = (state) => {
  const {
    name,
    email,
    mobile,
    address,
    street,
    town,
    city,
    states,
    pincode,
    country,
    username,
    password,
  } = state.auth;

  return {
    name,
    email,
    mobile,
    address,
    street,
    town,
    city,
    states,
    pincode,
    country,
    username,
    password,
  };
};

export default connect(mapStateToProps, {registeruser})(Otp);
