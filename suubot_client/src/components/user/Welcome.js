import React, {Component} from 'react';
import {Text, View, Share} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import {Button, IconButton} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer} from '../../components';
import {TextInput} from 'react-native';

class Welcome extends Component {
  state = {pickerValue: '', stores: {}};

  componentWillReceiveProps(nextProps) {
    if (nextProps.stores) {
      this.setState({
        stores: nextProps.stores,
      });
    }
  }

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} bell={true} logout={true} />

        <View style={styles.body}>
          <View style={styles.switch}>
            <View>
              <Text style={styles.title}>
                Welcome {this.props.user.username}
              </Text>
              <Button
                mode="outlined"
                onPress={() => {
                  Actions.editProfileUser();
                }}
                contentStyle={{height: heightToDp(3)}}
                style={[
                  styles.switchButton,
                  {alignSelf: 'flex-start', marginTop: 10},
                ]}>
                Edit Profile
              </Button>
            </View>
            {(this.props.user.seller.length > 0 ||
              this.props.user.professional.length > 0) && (
              <Button
                mode="outlined"
                onPress={() => {
                  Actions.switchPage();
                }}
                contentStyle={{height: heightToDp(3)}}
                style={[styles.switchButton, {alignSelf: 'flex-start'}]}>
                Work
              </Button>
            )}
          </View>

          <View style={styles.labelDrop}>
            <Text style={styles.label}>How can I help you?</Text>

            <DropDownPicker
              placeholder="Select an option"
              items={[
                {label: 'Would you like to shop?', value: '0'},
                {label: 'Saloon Booking', value: '1'},
                {label: 'Spa Booking', value: '2'},
              ]}
              containerStyle={{height: 40}}
              style={styles.dropdown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => {
                if (item.value === '0') Actions.select();
              }}
              searchableError={() => {
                return <Text>Loading...</Text>;
              }}
            />
          </View>

          <View style={styles.labelDrop}>
            <Text style={styles.label}>My List</Text>

            <DropDownPicker
              placeholder="Select an option"
              items={[
                {label: 'Milan Store'},
                {label: 'Apna Super Market'},
                {label: 'Dr. Arun Jain'},
              ]}
              containerStyle={{height: 40}}
              style={styles.dropdown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => {}}
              searchableError={() => {
                return <Text>Loading...</Text>;
              }}
            />
          </View>
          <View style={styles.labelDrop}>
            <Text style={styles.label}>Statistics</Text>

            <DropDownPicker
              placeholder="Select an option"
              items={[
                {label: 'Item wise', value: '0'},
                {label: 'Seller wise', value: '1'},
              ]}
              containerStyle={{height: 40}}
              style={styles.dropdown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => {
                if (item.value === '1') {
                  Actions.sellerwise();
                } else if (item.value === '0') {
                  Actions.itemwise();
                }
              }}
              searchableError={() => {
                return <Text>Loading...</Text>;
              }}
            />
          </View>
          <View style={styles.search}>
            <Text style={styles.inputLabel}>Search</Text>
            <TextInput style={styles.input} />
          </View>
        </View>

        <Footer style={styles.footer}>
          <Button style={styles.invite} onPress={this.invite.bind(this)}>
            Invite your seller on suubot
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
  label: {fontSize: widthToDp(5)},
  dropdown: {backgroundColor: '#fafafa'},
  labelDrop: {
    height: 80,
    justifyContent: 'space-between',
    marginTop: heightToDp(4),
  },
  search: {
    flexDirection: 'row',
    marginTop: heightToDp(5),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderRadius: widthToDp(1),
    marginLeft: widthToDp(1),
  },
  inputLabel: {fontSize: widthToDp(5)},
  invite: {alignSelf: 'flex-start'},
  switch: {flexDirection: 'row', justifyContent: 'space-between'},
  switchButton: {alignSelf: 'center'},
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(Welcome);
