import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import validateLoginInput from '../validation/login';

import {widthToDp, heightToDp} from '../Responsive';

//Components
import {Header, Footer, Input, SelectRole} from '../components';

//Actions
import {loginUser, loginUpdate} from '../actions/authActions';

class Login extends Component {
  state = {
    errors: {},
    logging: false,
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      Actions.main();
    }
  }

  // componentDidMount() {
  //   BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.handleBackPress.bind(this),
  //   );
  // }

  // handleBackPress() {
  //   BackHandler.exitApp();
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logging) {
      this.setState({
        logging: true,
        errors: {},
      });
    } else {
      this.setState({
        logging: false,
        errors: nextProps.errors,
      });
    }
  }

  onClick() {
    const {email, password} = this.props;
    const {errors, isValid} = validateLoginInput({email, password});

    if (!isValid) {
      this.setState({
        errors,
      });
    } else {
      this.props.loginUser({email, password});
    }
  }

  onChange(prop, value) {
    this.props.loginUpdate({prop, value});
  }

  render() {
    const {errors} = this.state;
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <View style={styles.form}>
          <Text style={styles.title}>Log in</Text>

          <Input
            label="*Email"
            name="email"
            editable={!this.state.logging}
            value={this.props.email}
            onChangeText={this.onChange.bind(this)}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Input
            label="*Password"
            name="password"
            editable={!this.state.logging}
            value={this.props.password}
            onChangeText={this.onChange.bind(this)}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          <Button
            mode="outlined"
            disabled={this.state.logging}
            style={styles.button}
            onPress={this.onClick.bind(this)}>
            Log in
          </Button>
          <Text style={styles.note}>Dont have an account?</Text>
          <Button
            mode="outlined"
            disabled={this.state.logging}
            style={[
              styles.button,
              {marginTop: heightToDp(1), width: widthToDp(60)},
            ]}
            onPress={() => Actions.signin()}>
            Click here to Sign in
          </Button>
        </View>
        <Footer style={styles.footer} />
      </View>
    );
  }
}

const styles = {
  container: {display: 'flex', flex: 1},
  header: {flex: 0.13},
  form: {
    flex: 0.74,
    padding: widthToDp(4),
  },
  footer: {flex: 0.13},
  button: {marginTop: heightToDp(4), width: widthToDp(30), alignSelf: 'center'},
  title: {alignSelf: 'center', fontSize: widthToDp(8)},
  label: {fontWeight: 'bold', marginTop: heightToDp(2), color: 'grey'},
  input: {
    backgroundColor: 'white',
    marginTop: heightToDp(1),
    borderBottomWidth: heightToDp(0.1),
    marginLeft: widthToDp(4),
    marginRight: widthToDp(4),
  },

  error: {
    color: 'tomato',
    fontSize: widthToDp(4),
  },
  note: {
    alignSelf: 'center',
    marginTop: heightToDp(6),
  },
};

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
    logging: state.login.logging,
    errors: state.login.errors,
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps, {loginUpdate, loginUser})(Login);
