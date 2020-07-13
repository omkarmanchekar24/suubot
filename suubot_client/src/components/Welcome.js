import React, {Component} from 'react';
import {Text, View, Picker, ScrollView, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {widthToDp, heightToDp} from '../Responsive';

import {Header} from '../components';
import {TextInput} from 'react-native';

export default class Welcome extends Component {
  state = {pickerValue: ''};
  clickme() {
    alert(this.state.pickerValue);
  }
  render() {
    return (
      <View>
        <Header profile={true} logout={true} />
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Welcome</Text>

            <Text style={styles.label}>How can I help you?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.pickerValue}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({pickerValue: itemValue});
                  Actions.select();
                }}>
                <Picker.Item label="Select an option" value="" />
                <Picker.Item label="Would you like to shop?" value="shop" />
                <Picker.Item label="Saloon booking?" value="saloon" />
                <Picker.Item label="Spa booking?" value="spa" />
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
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({pickerValue: itemValue})
                }>
                <Picker.Item label="Select an option" value="" />
                <Picker.Item label="Item wise" value="shop" />
                <Picker.Item label="Seller wise" value="saloon" />
              </Picker>
            </View>
            <View style={styles.search}>
              <Text style={styles.inputLabel}>Search</Text>
              <TextInput style={styles.input} />
            </View>

            <TouchableOpacity
              style={{
                marginTop: heightToDp(3),
              }}>
              <Text style={styles.invite}>Invite your seller on suubot</Text>
            </TouchableOpacity>

            <View style={{height: heightToDp(25)}} />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {padding: widthToDp(10)},
  title: {fontSize: widthToDp(5), fontWeight: 'bold'},
  label: {fontSize: widthToDp(5), marginTop: heightToDp(5)},
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'rgb(204, 204, 204)',
    width: '80%',
    borderRadius: widthToDp(2),
    marginTop: heightToDp(2),
  },
  picker: {},
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
  invite: {color: 'blue'},
};
