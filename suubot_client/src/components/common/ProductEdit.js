import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {widthToDp, heightToDp} from '../../Responsive';

const ProductEdit = ({item, onPress}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => Actions.productUpdate({product: item})}>
        <View style={styles.box1}>
          <Text>{item.name}</Text>
        </View>
        <View style={styles.box2}>
          <Text>
            {'\u20B9 '}
            {item.cost}
          </Text>
        </View>
        <View style={styles.box3}>
          <Text>{item.weight}</Text>
        </View>
        <View style={styles.box4}>
          <Text>{item.quantity}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    height: heightToDp(10),
    borderWidth: 0.5,
    borderRadius: widthToDp(4),
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: heightToDp(2),
  },
  box1: {flex: 0.25, alignItems: 'center'},
  box2: {flex: 0.25, alignItems: 'center'},
  box3: {flex: 0.25, alignItems: 'center'},
  box4: {flex: 0.25, alignItems: 'center'},
};

export default ProductEdit;
