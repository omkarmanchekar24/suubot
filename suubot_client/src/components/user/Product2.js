import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Share,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {fetchProductsByStoreIdSubCategoryId} from '../../actions/storeActions';
import {addItemsToCart, resetCart} from '../../actions/cartActions';
import {Actions} from 'react-native-router-flux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer, Card} from '../../components';

class Product2 extends Component {
  state = {
    products: [],
    cart: [],
  };

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  componentWillMount() {
    const {selected_store, selected_sub_category} = this.props;

    this.props.fetchProductsByStoreIdSubCategoryId(
      selected_store._id,
      selected_sub_category._id,
    );
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.products) {
      this.setState({
        products: nextProps.products,
      });
    }
  };

  renderItem({item}) {
    return (
      <Card
        item={item}
        onQuantityChange={({id, quantity, name, cost, unit, weight}) => {
          if (this.state.cart.length === 0) {
            this.setState({
              cart: [
                ...this.state.cart,
                {id, quantity, name, cost, unit, weight},
              ],
            });
          } else {
            const found = this.state.cart.some((el) => el.id === id);
            if (found) {
              let arr = [...this.state.cart];
              let index = this.state.cart.findIndex((obj) => obj.id === id);
              let itemm = {...arr[index]};

              itemm.quantity = quantity;
              arr[index] = itemm;

              this.setState({
                cart: arr,
              });
            } else {
              this.setState({
                cart: [
                  ...this.state.cart,
                  {id, quantity, name, cost, unit, weight},
                ],
              });
            }
          }
        }}
      />
    );
  }

  upsert(array, item) {
    const i = array.findIndex((_item) => _item.id === item.id);
    if (i > -1) array[i] = item;
    else array.push(item);
  }

  onAddPress() {
    let data = this.state.cart.filter((item) => {
      return item.quantity !== 0;
    });

    if (data.length === 0) {
      ToastAndroid.show('Select at least one item', ToastAndroid.SHORT);
    } else {
      let arr = this.state.cart.filter((item) => {
        return item.quantity > 0;
      });

      //Check if products already present in the main cart
      let main = [...this.props.cart];

      if (main.length === 0) {
        this.props.addItemsToCart(arr);
        Actions.products();
      } else {
        arr.forEach((item) => {
          this.upsert(main, item);
        });
        this.props.addItemsToCart(main);
        Actions.products();
      }
    }
  }

  onPaymentPress() {
    console.log('payment');
    let data = this.state.cart.filter((item) => {
      return item.quantity !== 0;
    });

    if (data.length === 0) {
      ToastAndroid.show('Select at least one item', ToastAndroid.SHORT);
    } else {
      let arr = this.state.cart.filter((item) => {
        return item.quantity > 0;
      });

      //Check if products already present in the main cart
      let main = [...this.props.cart];

      if (main.length === 0) {
        this.props.addItemsToCart(arr);
        Actions.payment();
      } else {
        arr.forEach((item) => {
          this.upsert(main, item);
        });
        this.props.addItemsToCart(main);
        Actions.payment();
      }
    }
  }

  render() {
    console.log(this.state.cart);
    const {selected_sub_category} = this.props;
    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          bell={true}
          onBack={() => {
            Actions.products();
          }}
        />
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>{selected_sub_category.name}</Text>
            <FlatList
              data={this.state.products}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={(item) => item._id}
            />
          </ScrollView>
        </View>
        <Footer style={styles.footer}>
          <Button
            mode="outlined"
            style={styles.cart}
            onPress={this.onAddPress.bind(this)}>
            Add to cart
          </Button>
          <Button
            mode="outlined"
            style={styles.payment}
            onPress={() => {
              this.props.resetCart();
            }}>
            Reset Cart
          </Button>
          <Button
            mode="outlined"
            style={styles.payment}
            onPress={this.onPaymentPress.bind(this)}>
            Make payment
          </Button>
        </Footer>
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
  body: {flex: 0.77, padding: widthToDp(2)},
  footer: {
    flex: 0.1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  title: {fontSize: widthToDp(5), fontWeight: 'bold'},
  label: {
    fontSize: widthToDp(5),
    marginTop: heightToDp(5),
    marginLeft: widthToDp(2),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'rgb(204, 204, 204)',
    width: '80%',
    borderRadius: widthToDp(2),
    marginTop: heightToDp(2),
  },
  picker: {},
  search: {
    flexDirection: 'row',
    marginTop: heightToDp(5),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderRadius: widthToDp(1),
    marginLeft: widthToDp(1),
  },
  inputLabel: {fontSize: widthToDp(5)},
  cart: {flex: 0.5},
  payment: {flex: 0.5},
};

const mapStateToProps = (state) => {
  return {
    selected_store: state.store.selected_store,
    selected_sub_category: state.store.selected_sub_category,
    products: state.store.products,
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, {
  fetchProductsByStoreIdSubCategoryId,
  addItemsToCart,
  resetCart,
})(Product2);
