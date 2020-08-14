import React, {Component} from 'react';
import {Text, View, Picker, Share} from 'react-native';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer, SwitchAccount} from '../../components';

//Actions
import {setAccount} from '../../actions/authActions';

class SellerWelcome extends Component {
  state = {pickerValue: ''};

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  render() {
    const {name} = this.props.auth.selected_store;
    return (
      <View style={styles.container}>
        <Header bell={true} style={styles.header} />
        <View style={styles.body}>
          <View style={styles.switch}>
            <Text style={styles.title}>{name}</Text>

            <View>
              <Button
                mode="outlined"
                onPress={() => {
                  this.props.setAccount({name: 'selected_store', item: {}});
                  Actions.main();
                }}
                contentStyle={{height: heightToDp(3)}}
                style={[styles.switchButton, {marginBottom: heightToDp(2)}]}>
                Personal
              </Button>

              {this.props.auth.user.seller.length > 1 && (
                <Button
                  mode="outlined"
                  onPress={() => {
                    Actions.switchPage();
                  }}
                  contentStyle={{height: heightToDp(3)}}
                  style={styles.switchButton}>
                  Work
                </Button>
              )}
            </View>
          </View>

          <View style={[styles.switch, {marginTop: heightToDp(5)}]}>
            <Button
              mode="outlined"
              color="#546"
              onPress={() => {
                Actions.additems();
              }}>
              Add Items
            </Button>
            <Button
              mode="outlined"
              color="#546"
              onPress={() => {
                Actions.editstock();
              }}>
              Edit Stock
            </Button>
          </View>

          <View style={[styles.switch, {marginTop: heightToDp(3)}]}>
            <Button
              mode="outlined"
              color="#546"
              onPress={() => {
                Actions.pendingOrders();
              }}>
              Pending Orders
            </Button>
            <Button mode="outlined" color="#546" onPress={() => {}}>
              Statistics
            </Button>
          </View>

          <View style={[styles.switch, {marginTop: heightToDp(3)}]}>
            <Button
              mode="outlined"
              color="#546"
              onPress={() => {
                Actions.message();
              }}>
              New Product Messages
            </Button>
          </View>

          <View style={[styles.switch, {marginTop: heightToDp(3)}]}>
            <Button
              mode="outlined"
              color="#546"
              onPress={() => {
                Actions.reviews();
              }}>
              View Reviews / Complains
            </Button>
          </View>

          <View style={[styles.switch, {marginTop: heightToDp(3)}]}>
            <Button
              mode="outlined"
              color="#546"
              onPress={() => {
                Actions.editProfile();
              }}>
              Edit Profile
            </Button>
          </View>
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
  body: {flex: 0.74, padding: widthToDp(8)},
  footer: {padding: widthToDp(1), flex: 0.13, justifyContent: 'flex-end'},
  title: {fontSize: widthToDp(5), fontWeight: 'bold'},
  label: {fontSize: widthToDp(5), marginTop: heightToDp(5)},
  invite: {alignSelf: 'flex-start'},
  switch: {flexDirection: 'row', justifyContent: 'space-between'},
  switchButton: {alignSelf: 'center', maxWidth: widthToDp(50)},
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {setAccount})(SellerWelcome);
