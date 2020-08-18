import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {widthToDp, heightToDp} from '../../Responsive';

class ItemWiseItem extends Component {
  render() {
    const {_id, total, product} = this.props.item;

    return (
      <View style={styles.container}>
        <Text style={styles.label}> {product[0].name} </Text>
        <Text style={styles.label}>
          {'\u20B9 '} {total}{' '}
        </Text>
      </View>
    );
  }
}

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
