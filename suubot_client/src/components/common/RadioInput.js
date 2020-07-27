import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {RadioButton} from 'react-native-paper';

import {widthToDp, heightToDp} from '../../Responsive';

class RadioInput extends Component {
  render() {
    return (
      <View>
        <RadioButton
          value="first"
          status={this.props.status}
          onPress={this.props.onChange}
        />
      </View>
    );
  }
}

export default RadioInput;

// <RadioButton
//   value="second"
//   status={checked === 'second' ? 'checked' : 'unchecked'}
//   onPress={() => this.setState({checked: 'second'})}
// />;
