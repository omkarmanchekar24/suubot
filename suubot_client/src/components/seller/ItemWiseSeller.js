import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class ItemWiseSeller extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default connect(null, null)(ItemWiseSeller);
