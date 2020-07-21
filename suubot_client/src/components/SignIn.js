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
    generating: false,
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

    const {errors, isValid} = validateRegisterInput(data);

    if (isValid) {
      const {email, mobile} = data;
      this.props.generateOtp({email, mobile});
    } else {
      this.refs._scrollView.scrollTo(0);
      this.setState({
        errors,
      });
    }
  }

  onChange(prop, value) {
    this.props.registerUpdate({prop, value});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.generating) {
      this.setState({
        generating: true,
      });
    } else {
      this.setState({
        generating: false,
        errors: nextProps.errors,
      });
      this.refs._scrollView.scrollTo(0);
    }
  }

  render() {
    let button;
    if (this.state.generating) {
      button = <Spinner />;
    } else {
      button = (
        <Button
          mode="outlined"
          style={styles.button}
          onPress={this.onClick.bind(this)}>
          Signin
        </Button>
      );
    }

    const {errors} = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.form}>
          <ScrollView ref="_scrollView">
            <Text style={styles.title}>Sign in</Text>

            <Text style={styles.label}>*Email</Text>
            <TextInput
              editable={!this.state.generating}
              value={this.props.email}
              onChangeText={(text) => {
                this.onChange('email', text);
              }}
              style={styles.input}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>*Mobile</Text>
            <TextInput
              editable={!this.state.generating}
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
              editable={!this.state.generating}
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
              editable={!this.state.generating}
              value={this.props.street}
              onChangeText={(text) => {
                this.onChange('street', text);
              }}
              style={styles.input}
            />
            {errors.street && <Text style={styles.error}>{errors.street}</Text>}

            <Text style={styles.label}>*Town/Suburb</Text>
            <TextInput
              editable={!this.state.generating}
              value={this.props.town}
              onChangeText={(text) => {
                this.onChange('town', text);
              }}
              style={styles.input}
            />
            {errors.town && <Text style={styles.error}>{errors.town}</Text>}

            <Text style={styles.label}>*City</Text>
            <TextInput
              editable={!this.state.generating}
              value={this.props.city}
              onChangeText={(text) => {
                this.onChange('city', text);
              }}
              style={styles.input}
            />
            {errors.city && <Text style={styles.error}>{errors.city}</Text>}

            <Text style={styles.label}>*State</Text>
            <TextInput
              editable={!this.state.generating}
              value={this.props.states}
              onChangeText={(text) => {
                this.onChange('states', text);
              }}
              style={styles.input}
            />
            {errors.states && <Text style={styles.error}>{errors.states}</Text>}

            <Text style={styles.label}>*Picode</Text>
            <TextInput
              editable={!this.state.generating}
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
              editable={!this.state.generating}
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
              editable={!this.state.generating}
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
              editable={!this.state.generating}
              value={this.props.password}
              onChangeText={(text) => {
                this.onChange('password', text);
              }}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {button}

            <Text style={styles.note}>Already Registered?</Text>
            <Button
              mode="outlined"
              disabled={this.state.logging}
              style={[
                styles.button,
                {marginTop: heightToDp(1), width: widthToDp(60)},
              ]}
              onPress={() => Actions.login()}>
              Click here to Log in
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
  block: {backgroundColor: 'yellow', height: heightToDp(15), flex: 1},
  note: {
    alignSelf: 'center',
    marginTop: heightToDp(4),
  },
};

const mapStateToProps = (state) => {
  return {
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
    isAuthenticated: state.register.isAuthenticated,
    generating: state.register.generating,
    errors: state.register.errors,
  };
};

export default connect(mapStateToProps, {
  registerUpdate,
  registeruser,
  generateOtp,
})(SignIn);
