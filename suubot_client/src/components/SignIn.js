import React, {Component} from 'react';
import {TextInput, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

//Components
import {Header, Spinner} from '../components';
import {widthToDp, heightToDp} from '../Responsive';

//Actions
import {
  registerUpdate,
  registeruser,
  generateOtp,
} from '../actions/authActions';

import validateRegisterInput from '../validation/register';

class SignIn extends Component {
  state = {
    errors: {},
  };

  onClick() {
    const data = {
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
      isAuthenticated: this.props.isAuthenticated,
    };

    //const {errors, isValid} = validateRegisterInput(data);

    this.props.generateOtp(data.mobile);
  }

  onChange(prop, value) {
    this.props.registerUpdate({prop, value});
  }

  render() {
    const {errors} = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.form}>
          <ScrollView>
            <Text style={styles.title}>Signin</Text>

            <Text style={styles.label}>*Email</Text>
            <TextInput
              value={this.props.email}
              onChangeText={(text) => {
                this.onChange('email', text);
              }}
              style={styles.input}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>*Mobile</Text>
            <TextInput
              keyboardType="number-pad"
              value={this.props.mobile}
              onChangeText={(text) => {
                this.onChange('mobile', text);
              }}
              style={styles.input}
            />
            {errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

            <Text style={styles.label}>*Address</Text>
            <TextInput
              value={this.props.address}
              onChangeText={(text) => {
                this.onChange('address', text);
              }}
              style={styles.input}
            />
            {errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
            )}

            <Text style={styles.label}>*Street</Text>
            <TextInput
              value={this.props.street}
              onChangeText={(text) => {
                this.onChange('street', text);
              }}
              style={styles.input}
            />
            {errors.street && <Text style={styles.error}>{errors.street}</Text>}

            <Text style={styles.label}>*Town/Suburb</Text>
            <TextInput
              value={this.props.town}
              onChangeText={(text) => {
                this.onChange('town', text);
              }}
              style={styles.input}
            />
            {errors.town && <Text style={styles.error}>{errors.town}</Text>}

            <Text style={styles.label}>*City</Text>
            <TextInput
              value={this.props.city}
              onChangeText={(text) => {
                this.onChange('city', text);
              }}
              style={styles.input}
            />
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}

            <Text style={styles.label}>*State</Text>
            <TextInput
              value={this.props.states}
              onChangeText={(text) => {
                this.onChange('states', text);
              }}
              style={styles.input}
            />
            {errors.states && <Text style={styles.error}>{errors.states}</Text>}

            <Text style={styles.label}>*Picode</Text>
            <TextInput
              keyboardType="number-pad"
              value={this.props.pincode}
              onChangeText={(text) => {
                this.onChange('pincode', text);
              }}
              style={styles.input}
            />
            {errors.pincode && (
              <Text style={styles.error}>{errors.pincode}</Text>
            )}

            <Text style={styles.label}>*Country</Text>
            <TextInput
              value={this.props.country}
              onChangeText={(text) => {
                this.onChange('country', text);
              }}
              style={styles.input}
            />
            {errors.country && (
              <Text style={styles.error}>{errors.country}</Text>
            )}

            <Text style={styles.label}>*Username</Text>
            <TextInput
              value={this.props.username}
              onChangeText={(text) => {
                this.onChange('username', text);
              }}
              style={styles.input}
            />
            {errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <Text style={styles.label}>*Password</Text>
            <TextInput
              value={this.props.password}
              onChangeText={(text) => {
                this.onChange('password', text);
              }}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <Button
              style={styles.button}
              mode="outlined"
              onPress={this.onClick.bind(this)}>
              Signin
            </Button>
            <View style={{height: heightToDp(10)}} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {display: 'flex', flex: 1, justifyContent: 'flex-start'},
  form: {padding: widthToDp(4)},
  title: {alignSelf: 'center', fontSize: widthToDp(8)},
  label: {fontWeight: 'bold', marginTop: heightToDp(2), color: 'grey'},
  input: {
    backgroundColor: 'white',
    marginTop: heightToDp(1),
    borderBottomWidth: heightToDp(0.1),
    marginLeft: widthToDp(4),
    marginRight: widthToDp(4),
  },
  button: {marginTop: heightToDp(4), width: widthToDp(50), alignSelf: 'center'},
  error: {
    color: 'tomato',
    fontSize: widthToDp(4),
  },
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    mobile: state.auth.mobile,
    address: state.auth.address,
    street: state.auth.street,
    town: state.auth.town,
    city: state.auth.city,
    states: state.auth.states,
    pincode: state.auth.pincode,
    country: state.auth.country,
    username: state.auth.username,
    password: state.auth.password,
    isAuthenticated: state.auth.isAuthenticated,
    generating: state.auth.generating,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  registerUpdate,
  registeruser,
  generateOtp,
})(SignIn);
