import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {widthToDp, heightToDp} from '../../Responsive';

class SellerWiseItem extends Component {
  render() {
    const {name, value, _id} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          Actions.sellerwiseorder({_id});
        }}>
        <View style={styles.container}>
          <View style={styles.box1}>
            <Text style={styles.label}>{name}</Text>
          </View>
          <View style={styles.box2}>
            <Text style={styles.label}>{value}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    minHeight: heightToDp(10),
    marginBottom: heightToDp(2),
    borderWidth: 0.5,
    borderRadius: widthToDp(2),
    flexDirection: 'row',
    alignItems: 'center',
    padding: widthToDp(2),
  },
  box1: {flex: 0.6},
  box2: {flex: 0.4, alignItems: 'center'},
  label: {fontWeight: 'bold'},
};

export default SellerWiseItem;
