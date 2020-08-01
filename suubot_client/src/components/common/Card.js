import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

import NumericInput from 'react-native-numeric-input';
import {heightToDp, widthToDp} from '../../Responsive';

class Card extends Component {
  state = {
    quantity: '',
  };

  render() {
    const {_id, name, cost, unit, weight} = this.props.item;
    return (
      <View style={styles.container}>
        <View style={styles.box1}>
          <View>
            <Text>{name}</Text>
            <Text>
              {'\u20B9 '}
              {cost}
            </Text>
            <Text>{`Unit: ${unit}`}</Text>
          </View>
        </View>
        <View style={styles.box2}>
          <Image
            source={require('../../assets/empty.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.box3}>
          <NumericInput
            type="plus-minus"
            rounded
            minValue={0}
            maxValue={99}
            totalHeight={widthToDp(10)}
            value={this.state.quantity}
            onChange={(value) => {
              this.props.onQuantityChange({
                id: _id,
                quantity: value,
                name: name,
                cost: cost,
                unit: unit,
                weight: weight,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    height: heightToDp(15),
    marginTop: heightToDp(2),
    alignItems: 'center',
    borderRadius: widthToDp(3),
    padding: widthToDp(5),
    justifyContent: 'space-between',
    borderWidth: 0.3,
    flex: 1,
  },
  box1: {flex: 0.4},
  box2: {flex: 0.3},
  box3: {flex: 0.3, flexDirection: 'row', justifyContent: 'space-between'},
  image: {
    width: widthToDp(20),
    height: heightToDp(8),
  },
  input: {borderWidth: 0.5, borderRadius: widthToDp(1)},
  button: {
    alignSelf: 'center',
    paddingTop: widthToDp(0),
    height: heightToDp(6),
    backgroundColor: '#546',
    width: widthToDp(6),
    alignItems: 'center',
    borderRadius: widthToDp(1),
  },
  buttinText: {fontSize: widthToDp(7), color: 'white'},
};

export default Card;
