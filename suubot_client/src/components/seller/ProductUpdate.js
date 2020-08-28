import React, {Component} from 'react';
import {Text, View, Picker, Share} from 'react-native';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer, ProductInput} from '../../components';

//Actions
import {editProduct, removeProduct} from '../../actions/seller/storeActions';

class ProductUpdate extends Component {
  state = {
    _id: this.props.product._id,
    name: this.props.product.name,
    weight: this.props.product.weight,
    unit: this.props.product.unit,
    quantity: this.props.product.quantity,
    cost: this.props.product.cost,
  };

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  onChangeText({text, name}) {
    this.setState({
      [name]: text,
    });
  }

  render() {
    const {_id, name, weight, quantity, cost, unit} = this.state;
    return (
      <View style={styles.container}>
        <Header
          profile={true}
          style={styles.header}
          onBack={() => Actions.pop()}
        />
        <View style={styles.body}>
          <ProductInput
            label="Name"
            value={this.state.name}
            onChangeText={this.onChangeText.bind(this)}
            name="name"
          />
          <ProductInput
            label="Weight"
            value={this.state.weight}
            onChangeText={this.onChangeText.bind(this)}
            name="weight"
          />
          <ProductInput
            label="Unit"
            value={this.state.unit}
            onChangeText={this.onChangeText.bind(this)}
            name="unit"
          />
          <ProductInput
            label="Quantity"
            value={this.state.quantity.toString()}
            onChangeText={this.onChangeText.bind(this)}
            name="quantity"
          />
          <ProductInput
            label="Cost"
            value={this.state.cost.toString()}
            onChangeText={this.onChangeText.bind(this)}
            name="cost"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              marginTop: heightToDp(4),
            }}>
            <Button
              mode="outlined"
              style={styles.button}
              onPress={() => {
                this.props.editProduct({
                  _id,
                  name,
                  weight,
                  quantity,
                  cost,
                  unit,
                });
              }}>
              Save
            </Button>
            <Button
              mode="outlined"
              style={styles.button}
              contentStyle={{backgroundColor: '#546'}}
              color="white"
              onPress={() => {
                this.props.removeProduct({_id});
              }}>
              Remove
            </Button>
          </View>
        </View>
        <Footer style={styles.footer}>
          <Button style={styles.invite} onPress={this.invite.bind(this)}>
            Invite your buyer on suubot
          </Button>
        </Footer>
      </View>
    );
  }
}

const styles = {
  container: {flex: 1},
  header: {flex: 0.13},
  body: {flex: 0.74, padding: widthToDp(8)},
  button: {width: widthToDp(30)},
  footer: {padding: widthToDp(1), flex: 0.13, justifyContent: 'flex-end'},

  invite: {alignSelf: 'flex-start'},
};

export default connect(null, {editProduct, removeProduct})(ProductUpdate);
