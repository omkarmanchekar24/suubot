import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Spinner = ({size, style}) => {
  return (
    <View style={[styles.spinnerStyle, style]}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Spinner;
