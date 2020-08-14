import React, {Component} from 'react';
import {Text, View, Picker, Share, ScrollView, Dimensions} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer, Input} from '../../components';

//Actions
import {editProfile} from '../../actions/seller/storeActions';

class EditProfile extends Component {
  state = {
    _id: this.props.user.id,
    seller_id: this.props.selected_store._id,
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
    this.props.editProfile(this.state);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.seller.loading === true) {
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
      editable,
    } = this.state;

    return (
      <View style={styles.container}>
        <Header
          profile={true}
          style={styles.header}
          onBack={() => Actions.sellerwelcome()}
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
                label="Gst"
                editable={editable}
                value={gst.toString()}
                onChangeText={this.onChangeText.bind(this)}
                name="gst"
              />
              <Input
                label="Pan"
                editable={editable}
                value={pan}
                onChangeText={this.onChangeText.bind(this)}
                name="pan"
              />
              <Input
                label="Paytm"
                editable={editable}
                value={paytm}
                onChangeText={this.onChangeText.bind(this)}
                name="paytm"
              />
              <Input
                label="Phonepay"
                editable={editable}
                value={phonepay}
                onChangeText={this.onChangeText.bind(this)}
                name="phonepay"
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
              <Input
                label="About us"
                editable={editable}
                value={aboutUs}
                onChangeText={this.onChangeText.bind(this)}
                name="aboutUs"
              />
              <Button
                editable={editable}
                style={styles.button}
                mode="outlined"
                onPress={this.onSubmit.bind(this)}>
                Save
              </Button>
            </View>
            <View style={{height: heightToDp(110)}}></View>
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
    seller: state.seller,
  };
};

export default connect(mapStateToProps, {editProfile})(EditProfile);
