import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {widthToDp, heightToDp} from '../../Responsive';

class LabelValue extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.leftView}>
          <Text style={styles.label}>{this.props.label}</Text>
        </View>
        <View style={styles.rightView}>
          <Text style={styles.label}>{this.props.value}</Text>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {flexDirection: 'row'},
  leftView: {flex: 0.5},
  rightView: {flex: 0.5},
  label: {fontSize: widthToDp(4), fontWeight: 'bold'},
};

export default LabelValue;
