import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {widthToDp, heightToDp} from '../../Responsive';

const ItemWiseItem = ({name, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}> {name} </Text>
      <Text style={styles.label}>{value}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    height: heightToDp(10),
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: heightToDp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  label: {fontSize: heightToDp(2), fontWeight: 'bold'},
};

export default ItemWiseItem;
