import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';

import {Header, LabelValue} from '../../components';

import {widthToDp, heightToDp} from '../../Responsive';

class Payment extends Component {
  state = {
    checked: '',
  };

  render() {
    const {checked} = this.state;
    return (
      <View style={styles.container}>
        <Header profile={true} logout={true} />
        <View style={styles.body}>
          <View style={styles.radio}>
            <Text style={styles.label}>Payment Option:</Text>
            <RadioButton
              value="first"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => this.setState({checked: 'first'})}
            />
            <Text>Paytm</Text>
            <RadioButton
              value="second"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => this.setState({checked: 'second'})}
            />
            <Text>Pepay</Text>
          </View>
          <LabelValue
            style={styles.labelValue}
            label="Total Ammount"
            value="1000"
          />
          <LabelValue style={styles.labelValue} label="GST" value="200" />
          <LabelValue
            style={styles.labelValue}
            label="Fast Delivery Charges"
            value="50"
          />
          <LabelValue
            style={styles.labelValue}
            label="Total Bill Amount"
            value="1500"
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    height: '100%',
    flex: 1,
  },
  header: {flex: 0.13},
  body: {
    flex: 0.87,
    paddingLeft: widthToDp(4),
    paddingTop: widthToDp(4),
    alignItems: 'flex-start',
  },
  label: {fontSize: widthToDp(4), fontWeight: 'bold'},
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: widthToDp(2),
    marginBottom: heightToDp(5),
  },
  labelValue: {marginBottom: heightToDp(2)},
};

export default Payment;
