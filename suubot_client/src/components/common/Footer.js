import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Footer extends Component {
  render() {
    return <View style={this.props.style}>{this.props.children}</View>;
  }
}
