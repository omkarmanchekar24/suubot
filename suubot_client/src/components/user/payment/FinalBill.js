import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {widthToDp, heightToDp} from '../../../Responsive';

import {LabelValue} from '../../../components';

class FinalBill extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <LabelValue
          style={styles.labelValue}
          label="Total Ammount"
          value={'\u20B9 ' + this.props.total_amount}
        />
        <LabelValue
          style={styles.labelValue}
          label={`GST(${this.props.store.gst}%)`}
          value={'\u20B9 ' + this.props.gst}
        />
        <LabelValue
          style={styles.labelValue}
          label="Fast Delivery"
          value={'\u20B9 ' + this.props.fast_delivery_charges}
        />
        <LabelValue
          style={styles.labelValue}
          label="Total Bill Amount"
          value={'\u20B9 ' + this.props.total_bill_amount}
        />
      </View>
    );
  }
}

const styles = {
  labelValue: {marginBottom: heightToDp(2)},
};

export default FinalBill;
