import React, {Component} from 'react';
import {TextInput, Text, View, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

//Components
import {Header} from '../components';
import {widthToDp, heightToDp} from '../Responsive';

//Actions
import {registerUpdate, registeruser} from '../actions/authActions';

class SignIn extends Component {
  onClick() {
    Actions.otp();
  }

  state = {
    errors: {},
  };

  onChange(prop, value) {
    this.props.registerUpdate({prop: prop, value: value});
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  //   if (nextProps.auth.isAuthenticated) {
  //   }

  //   if (nextProps.errors) {
  //     console.log(nextProps.errors);
  //     this.setState({
  //       errors: nextProps.errors,
  //     });
  //   }
  // }

  render() {
    const {errors} = this.state;
    //console.log(errors);
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.form}>
          <ScrollView>
            <Text style={styles.title}>Signin</Text>

            <Text style={styles.label}>*Name</Text>
            <TextInput
              value={this.props.name}
              onChangeText={(text) => {
                this.onChange('name', text);
              }}
              style={styles.input}
            />
            {errors.email && <Text>{errors.email}</Text>}

            <Text style={styles.label}>*Email</Text>
            <TextInput
              value={this.props.email}
              onChangeText={(text) => {
                this.onChange('email', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*Mobile</Text>
            <TextInput
              value={this.props.mobile}
              onChangeText={(text) => {
                this.onChange('mobile', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*Address</Text>
            <TextInput
              value={this.props.address}
              onChangeText={(text) => {
                this.onChange('address', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*Street</Text>
            <TextInput
              value={this.props.street}
              onChangeText={(text) => {
                this.onChange('street', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*Town/Suburb</Text>
            <TextInput
              value={this.props.town}
              onChangeText={(text) => {
                this.onChange('town', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*City</Text>
            <TextInput
              value={this.props.city}
              onChangeText={(text) => {
                this.onChange('city', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*State</Text>
            <TextInput
              value={this.props.states}
              onChangeText={(text) => {
                this.onChange('states', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*Picode</Text>
            <TextInput
              value={this.props.pincode}
              onChangeText={(text) => {
                this.onChange('pincode', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*Country</Text>
            <TextInput
              value={this.props.country}
              onChangeText={(text) => {
                this.onChange('country', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*Username</Text>
            <TextInput
              value={this.props.username}
              onChangeText={(text) => {
                this.onChange('username', text);
              }}
              style={styles.input}
            />

            <Text style={styles.label}>*Password</Text>
            <TextInput
              value={this.props.password}
              onChangeText={(text) => {
                this.onChange('password', text);
              }}
              style={styles.input}
            />
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
    isAuthenticated,
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
    isAuthenticated,
    errors: state.error,
  };
};

export default connect(mapStateToProps, {registerUpdate, registeruser})(SignIn);
