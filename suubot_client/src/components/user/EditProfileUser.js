import React, {Component} from 'react';
import {Text, View, Picker, Share, ScrollView, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer, Input} from '../../components';

//Actions
import {editProfile} from '../../actions/user/profileActions';

class EditProfileUser extends Component {
  state = {
    _id: this.props.user._id,
    name: this.props.user.name,
    email: this.props.user.email,
    username: this.props.user.username,
    mobile: this.props.user.mobile,
    country: this.props.user.address.country,
    street: this.props.user.address.street,
    town: this.props.user.address.town,
    city: this.props.user.address.city,
    state: this.props.user.address.state,
    pincode: this.props.user.address.pincode,
    editable: true,
  };

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  onChangeText(name, text) {
    this.setState({
      [name]: text,
    });
  }

  onSubmit() {
    const profileData = {
      _id: this.state._id,
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      mobile: this.state.mobile,
      country: this.state.country,
      street: this.state.street,
      town: this.state.town,
      city: this.state.city,
      state: this.state.state,
      pincode: this.state.pincode,
    };
    console.log(profileData);

    this.props.editProfile(profileData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading === true) {
      this.setState({
        editable: false,
      });
    } else {
      this.setState({
        editable: true,
      });
    }
  }

  render() {
    let screenHeight = Dimensions.get('window').height;
    const {
      name,
      email,
      username,
      mobile,
      country,
      street,
      town,
      city,
      state,
      pincode,
      editable,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          profile={true}
          style={styles.header}
          onBack={() => Actions.welcome()}
          bell={true}
        />
        <View style={styles.body}>
          <KeyboardAwareScrollView>
            <View style={{height: screenHeight, flex: 1}}>
              <Input
                label="Name"
                editable={editable}
                value={name}
                onChangeText={this.onChangeText.bind(this)}
                name="name"
              />
              <Input
                label="Email"
                editable={editable}
                value={email}
                onChangeText={this.onChangeText.bind(this)}
                name="email"
              />
              <Input
                label="Username"
                editable={editable}
                value={username}
                onChangeText={this.onChangeText.bind(this)}
                name="username"
              />
              <Input
                label="Mobile"
                editable={editable}
                value={mobile}
                onChangeText={this.onChangeText.bind(this)}
                name="mobile"
              />
              <Input
                label="Street"
                editable={editable}
                value={street}
                onChangeText={this.onChangeText.bind(this)}
                name="street"
              />
              <Input
                label="Town"
                editable={editable}
                value={town}
                onChangeText={this.onChangeText.bind(this)}
                name="town"
              />
              <Input
                label="City"
                editable={editable}
                value={city}
                onChangeText={this.onChangeText.bind(this)}
                name="city"
              />
              <Input
                label="State"
                editable={editable}
                value={state}
                onChangeText={this.onChangeText.bind(this)}
                name="state"
              />
              <Input
                label="Pincode"
                editable={editable}
                value={pincode}
                onChangeText={this.onChangeText.bind(this)}
                name="pincode"
              />
              <Input
                label="Country"
                editable={editable}
                value={country}
                onChangeText={this.onChangeText.bind(this)}
                name="country"
              />
              <Button
                editable={editable}
                style={styles.button}
                mode="outlined"
                onPress={this.onSubmit.bind(this)}>
                Save
              </Button>
            </View>
            <View style={{height: heightToDp(50)}}></View>
          </KeyboardAwareScrollView>
        </View>
        <Footer style={styles.footer}>
          <Button style={styles.invite} onPress={this.invite.bind(this)}>
            Invite your buyer on suubot
          </Button>
        </Footer>
      </View>
    );
  }
}

const styles = {
  container: {flex: 1},
  header: {flex: 0.13},
  body: {flex: 0.74, padding: widthToDp(4)},
  footer: {padding: widthToDp(1), flex: 0.13, justifyContent: 'flex-end'},
  title: {fontSize: widthToDp(5), fontWeight: 'bold'},
  label: {fontSize: widthToDp(5), marginTop: heightToDp(5)},
  button: {marginTop: heightToDp(4), alignSelf: 'center'},
  invite: {alignSelf: 'flex-start'},
  switch: {flexDirection: 'row', justifyContent: 'space-between'},
  switchButton: {alignSelf: 'center'},
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    loading: state.auth.loading,
  };
};

export default connect(mapStateToProps, {editProfile})(EditProfileUser);
