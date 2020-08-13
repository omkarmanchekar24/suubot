import React, {Component} from 'react';
import {Text, View, Picker, Share, ScrollView, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer, Input} from '../../components';

class EditProfile extends Component {
  state = {
    name: this.props.selected_store.name,
    email: this.props.selected_store.email,
    username: this.props.selected_store.username,
    gst: this.props.selected_store.gst,
    pan: this.props.selected_store.pan,
    country: this.props.selected_store.address.country,
    street: this.props.selected_store.address.street,
    town: this.props.selected_store.address.town,
    city: this.props.selected_store.address.city,
    state: this.props.selected_store.address.state,
    pincode: this.props.selected_store.address.pincode,
    paytm: this.props.selected_store.paytm,
    phonepay: this.props.selected_store.phonepay,
    aboutUs: this.props.selected_store.aboutUs,
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
    console.log(this.state);
  }

  render() {
    let screenHeight = Dimensions.get('window').height;
    const {
      name,
      email,
      username,
      gst,
      pan,
      country,
      street,
      town,
      city,
      state,
      pincode,
      paytm,
      phonepay,
      aboutUs,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          profile={true}
          style={styles.header}
          logout={true}
          onBack={() => Actions.sellerwelcome()}
          bell={true}
        />
        <View style={styles.body}>
          <KeyboardAwareScrollView>
            <View style={{height: screenHeight, flex: 1}}>
              <Input
                label="Name"
                editable={true}
                value={name}
                onChangeText={this.onChangeText.bind(this)}
                name="name"
              />
              <Input
                label="Email"
                editable={true}
                value={email}
                onChangeText={this.onChangeText.bind(this)}
                name="email"
              />
              <Input
                label="Username"
                editable={true}
                value={username}
                onChangeText={this.onChangeText.bind(this)}
                name="username"
              />
              <Input
                label="Gst"
                editable={true}
                value={gst.toString()}
                onChangeText={this.onChangeText.bind(this)}
                name="gst"
              />
              <Input
                label="Pan"
                editable={true}
                value={pan}
                onChangeText={this.onChangeText.bind(this)}
                name="pan"
              />
              <Input
                label="Street"
                editable={true}
                value={street}
                onChangeText={this.onChangeText.bind(this)}
                name="street"
              />
              <Input
                label="Town"
                editable={true}
                value={town}
                onChangeText={this.onChangeText.bind(this)}
                name="town"
              />
              <Input
                label="City"
                editable={true}
                value={city}
                onChangeText={this.onChangeText.bind(this)}
                name="city"
              />
              <Input
                label="State"
                editable={true}
                value={state}
                onChangeText={this.onChangeText.bind(this)}
                name="state"
              />
              <Input
                label="Pincode"
                editable={true}
                value={pincode}
                onChangeText={this.onChangeText.bind(this)}
                name="pincode"
              />
              <Input
                label="Country"
                editable={true}
                value={country}
                onChangeText={this.onChangeText.bind(this)}
                name="country"
              />
              <Input
                label="About us"
                editable={true}
                value={aboutUs}
                onChangeText={this.onChangeText.bind(this)}
                name="aboutUs"
              />
              <Button
                style={styles.button}
                mode="outlined"
                onPress={this.onSubmit.bind(this)}>
                Save
              </Button>
            </View>
            <View style={{height: heightToDp(80)}}></View>
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
    selected_store: state.auth.selected_store,
  };
};

export default connect(mapStateToProps, null)(EditProfile);
