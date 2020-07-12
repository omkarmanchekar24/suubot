import React, {Component} from 'react';
import {Text, View, Picker} from 'react-native';

export default class pickers extends Component {
  render() {
    return (
      <View>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.pickerValue}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({pickerValue: itemValue})
            }>
            <Picker.Item label="Select an option" value="" />
            <Picker.Item label="Would you like to shop?" value="shop" />
            <Picker.Item label="Saloon booking?" value="saloon" />
            <Picker.Item label="Spa booking?" value="spa" />
          </Picker>
        </View>
      </View>
    );
  }
}
