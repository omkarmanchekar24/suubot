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
            <Text style={styles.label}>What would you like to shop?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.pickerValue}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({pickerValue: itemValue});
                }}>
                <Picker.Item label="Select an option" value="" />
                <Picker.Item label="Groceries" value="groceries" />
                <Picker.Item label="Clothes" value="clothes" />
                <Picker.Item label="Shoes" value="shoes" />
                <Picker.Item label="Fashion Accesories" value="fashion" />
                <Picker.Item label="Medicines" value="medicines" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            <TouchableOpacity
              style={{
                marginTop: heightToDp(3),
                justifySelf: 'flex-end',
              }}>
              <Text style={styles.invite}>Invite your seller on suubot</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    padding: widthToDp(10),
    display: 'flex',
    height: '100%',
  },
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
  invite: {color: 'blue', bottom: 0, marginTop: heightToDp(50)},
};
