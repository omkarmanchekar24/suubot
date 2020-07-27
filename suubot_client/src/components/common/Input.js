import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';

import {widthToDp, heightToDp} from '../../Responsive';

class Input extends Component {
  render() {
    const {label, editable, value, onChangeText, name} = this.props;
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          editable={editable}
          value={value}
          onChangeText={(text) => onChangeText(name, text)}
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = {
  label: {fontWeight: 'bold', marginTop: heightToDp(2), color: 'grey'},
  input: {
    backgroundColor: 'white',
    marginTop: heightToDp(1),
    borderBottomWidth: heightToDp(0.1),
    marginLeft: widthToDp(4),
    marginRight: widthToDp(4),
  },

  error: {
    color: 'tomato',
    fontSize: widthToDp(4),
  },
};

export default Input;
