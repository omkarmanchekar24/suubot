import React, {Component} from 'react';
import {Text, View, ScrollView, Share, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {fetchProductsByStoreIdSubTypeId} from '../actions/storeActions';
import {Actions} from 'react-native-router-flux';

import {widthToDp, heightToDp} from '../Responsive';

import {Header, Footer, Card} from '../components';

class Product2 extends Component {
  state = {
    products: [],
    cart: [],
  };

  onChange({id, quantity}) {
    this.setState({cart: [...this.state.cart, {id: id, quantity: quantity}]});
  }

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  componentWillMount() {
    const {store_id, sub_type_id} = this.props;
    console.log({store_id, sub_type_id});
    this.props.fetchProductsByStoreIdSubTypeId({store_id, sub_type_id});
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.products) {
      this.setState({
        products: nextProps.products,
      });
    }
  };

  renderItem({item}) {
    return <Card item={item} />;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} profile={true} logout={true} />
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Products</Text>
            <FlatList
              data={this.state.products}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        </View>
        <Footer style={styles.footer}>
          <Button
            mode="outlined"
            style={styles.cart}
            onPress={() => Actions.welcome()}>
            Add to cart
          </Button>
          <Button
            mode="outlined"
            style={styles.payment}
            onPress={() => {
              console.log(this.state.cart);
            }}>
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
  body: {flex: 0.77},
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
    store_id: state.store.selected_store_id,
    sub_type_id: state.store.selected_sub_type,
    products: state.store.products,
  };
};

export default connect(mapStateToProps, {fetchProductsByStoreIdSubTypeId})(
  Product2,
);
