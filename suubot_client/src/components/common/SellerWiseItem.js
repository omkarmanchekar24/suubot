import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {widthToDp, heightToDp} from '../../Responsive';

class SellerWiseItem extends Component {
  render() {
    const {total_amt, store, _id} = this.props.item;
    return (
      <TouchableOpacity
        onPress={() => {
          Actions.sellerwiseorder({_id});
        }}>
        <View style={styles.container}>
          <View style={styles.box1}>
            <Text>{store.name}</Text>
          </View>
          <View style={styles.box2}>
            <Text>
              {'\u20B9 '}
              {total_amt}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    height: heightToDp(10),
    marginBottom: heightToDp(2),
    borderWidth: 0.5,
    borderRadius: widthToDp(2),
    flexDirection: 'row',
    alignItems: 'center',
    padding: widthToDp(2),
  },
  box1: {flex: 0.6},
  box2: {flex: 0.4},
};

export default SellerWiseItem;
