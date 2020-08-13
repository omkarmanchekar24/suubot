import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {widthToDp, heightToDp} from '../../Responsive';

const ProductInput = ({label, onChangeText, value, name, editable}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText({text, name})}
        editable={editable}
        value={value}
      />
    </View>
  );
};

const styles = {
  container: {flexDirection: 'row', alignItems: 'center'},
  label: {fontWeight: 'bold', fontSize: widthToDp(4), flex: 0.3},
  input: {borderBottomWidth: 0.5, flex: 0.7, height: 40},
};

export default ProductInput;
