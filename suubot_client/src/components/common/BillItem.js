import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {widthToDp, heightToDp} from '../../Responsive';

class BillItem extends Component {
  render() {
    const {_id, name, cost, quantity, unit, weight} = this.props.item;
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <Text>{name}</Text>
        </View>
        <View style={styles.box2}>
          <Text>{quantity}</Text>
        </View>
        <View style={styles.box3}>
          <Text>{cost}</Text>
        </View>
        <View style={styles.box4}>
          <Text>{quantity * cost}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  box1: {
    flex: 0.25,
    alignItems: 'flex-start',
  },
  box2: {
    flex: 0.25,
    alignItems: 'flex-start',
    marginLeft: widthToDp(4),
  },
  box3: {
    flex: 0.25,
    alignItems: 'flex-start',
  },
  box4: {
    flex: 0.25,
    alignItems: 'flex-start',
  },
};

export default BillItem;
