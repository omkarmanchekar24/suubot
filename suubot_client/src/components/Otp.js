import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import {widthToDp, heightToDp} from '../Responsive';
import {connect} from 'react-redux';
import {Button} from 'react-native-paper';
import {Header, Spinner} from '../components';

//Actions
import {registeruser} from '../actions/authActions';

class Otp extends Component {
  state = {
    otp: '',
    errors: {},
    registering: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.registering) {
      this.setState({
        registering: true,
        errors: {},
      });
    } else if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        registering: false,
      });
    }
  }

  onClick() {
    if (this.state.otp.length === 0) {
      this.setState({
        errors: {otp: 'otp is required'},
      });
    } else {
      const userData = {
        otp: this.state.otp,
        id: this.props.id,
        email: this.props.email,
        mobile: this.props.mobile,
        address: this.props.address,
        street: this.props.street,
        town: this.props.town,
        city: this.props.city,
        states: this.props.states,
        pincode: this.props.pincode,
        country: this.props.country,
        username: this.props.username,
        password: this.props.password,
      };
      this.props.registeruser(userData);
    }
  }

  render() {
    const {errors} = this.state;

    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.otpContainer}>
          <Text style={styles.title}>Enter Otp :</Text>
          <TextInput
            style={styles.input}
            value={this.state.otp}
            editable={!this.state.registering}
            onChangeText={(text) => {
              this.setState({
                otp: text,
              });
            }}
          />
          {errors.otp && <Text style={styles.error}>{errors.otp}</Text>}
          <Button
            style={styles.button}
            mode="outlined"
            disabled={this.state.registering}
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
  error: {
    color: 'tomato',
    fontSize: widthToDp(4),
  },
};

const mapStateToProps = (state) => {
  return {
    id: state.register.id,
    email: state.register.email,
    mobile: state.register.mobile,
    address: state.register.address,
    street: state.register.street,
    town: state.register.town,
    city: state.register.city,
    states: state.register.states,
    pincode: state.register.pincode,
    country: state.register.country,
    username: state.register.username,
    password: state.register.password,
    errors: state.register.errors,
    registering: state.register.registering,
  };
};

export default connect(mapStateToProps, {registeruser})(Otp);
