import React, {Component} from 'react';
import {Text, View, Picker, Share} from 'react-native';
import {Button} from 'react-native-paper';
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
        <Header profile={true} style={styles.header} logout={true} />
        <View style={styles.body}>
          <Text style={styles.title}>Welcome {this.props.user.username}</Text>

          <Text style={styles.label}>How can I help you?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.pickerValue}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({pickerValue: itemValue});
                if (itemIndex === 1) {
                  Actions.select({value: itemValue});
                }
              }}>
              <Picker.Item label="Select an option" value="" />
              <Picker.Item
                label="Would you like to shop?"
                value="products"
                id={1}
              />
              <Picker.Item label="Saloon booking" value="saloon" id={2} />
              <Picker.Item label="Spa booking" value="spa" id={3} />
            </Picker>
          </View>

          <Text style={styles.label}>My List</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.pickerValue}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({pickerValue: itemValue})
              }>
              <Picker.Item label="Select an option" value="" />
              <Picker.Item label="Raj Store" value="shop" />
              <Picker.Item label="Dr. Mihir" value="saloon" />
              <Picker.Item label="V B Saloon" value="spa" />
              <Picker.Item label="Super Bakery" value="spa" />
            </Picker>
          </View>

          <Text style={styles.label}>Statistics</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.pickerValue}
              onValueChange={(itemValue, itemIndex) => {
                {
                  this.setState({pickerValue: itemValue});
                  if (itemValue === '2') Actions.sellerwise();
                }
              }}>
              <Picker.Item label="Select an option" value="0" />
              <Picker.Item label="Item wise" value="1" />
              <Picker.Item label="Seller wise" value="2" />
            </Picker>
          </View>
          <View style={styles.search}>
            <Text style={styles.inputLabel}>Search</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={{height: heightToDp(25)}} />
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
  label: {fontSize: widthToDp(5), marginTop: heightToDp(5)},
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'rgb(204, 204, 204)',
    width: '90%',
    borderRadius: widthToDp(2),
    marginTop: heightToDp(2),
  },
  picker: {height: heightToDp(5)},
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
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    stores: state.store.stores,
  };
};

export default connect(mapStateToProps, null)(Welcome);
