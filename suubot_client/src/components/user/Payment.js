import React, {Component} from 'react';
import {Text, View, FlatList, ScrollView, Modal} from 'react-native';
import {WebView} from 'react-native-webview';
import {RadioButton, Button} from 'react-native-paper';
import {connect} from 'react-redux';

//Components
import {Header, LabelValue, BillItem, Footer} from '../../components';

//Actions
import {
  purchaseItems,
  transactionSuccess,
  transactionFailed,
} from '../../actions/cartActions';

import {widthToDp, heightToDp} from '../../Responsive';

class Payment extends Component {
  state = {
    checked: '',
    cart: [],
    showModal: false,
    ack: '',
    order: {},
  };

  renderItem({item}) {
    return <BillItem item={item} />;
  }

  componentWillMount() {
    this.setState({
      cart: this.props.cart,
    });
  }

  FlatListHeader = () => {
    return (
      <View style={styles.head}>
        <Text style={[styles.label, {flex: 0.25}]}>Name</Text>
        <Text style={[styles.label, {flex: 0.25, marginLeft: widthToDp(3)}]}>
          Qty
        </Text>
        <Text style={[styles.label, {flex: 0.25}]}>Cost</Text>
        <Text style={[styles.label, {flex: 0.25}]}>Total</Text>
      </View>
    );
  };

  FlatListFooter = (total_amount) => {
    return (
      <View style={[styles.head, {marginTop: heightToDp(2)}]}>
        <Text style={[styles.label, {flex: 0.75}]}>Total Amount</Text>
        <Text style={[styles.label, {flex: 0.25, justifySelf: 'flex-end'}]}>
          {total_amount}
        </Text>
      </View>
    );
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: widthToDp(2),
          width: '100%',
        }}
      />
    );
  };

  handleResponse(title) {
    if (title === 'true') {
      this.props.transactionSuccess();
    } else if (title === 'false') {
      this.props.transactionFailed();
    } else {
      return;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal === true) {
      this.setState({
        order: nextProps.order,
        showModal: nextProps.showModal,
        ack: nextProps.ack,
      });
    } else if (nextProps.showModal === false) {
      this.setState({
        ack: nextProps.ack,
        showModal: nextProps.showModal,
      });
    }
  }

  render() {
    const {cart, store, user} = this.props;
    const {checked, showModal, ack, ORDER_ID, order} = this.state;

    let total_amount = 0,
      gst = 0,
      fast_delivery_charges = 0,
      total_bill_amount = 0;

    cart.forEach((item) => {
      total_amount =
        total_amount + parseFloat(item.cost) * parseFloat(item.quantity);
    });

    gst = (total_amount * store.gst) / 100;

    if (store.fast_delivery_charges)
      fast_delivery_charges = store.fast_delivery_charges;

    total_bill_amount = total_amount + gst + fast_delivery_charges;

    return (
      <View style={styles.container}>
        <Header profile={true} logout={true} />
        <View style={styles.body}>
          <View style={styles.products}>
            <ScrollView>
              <FlatList
                data={this.state.cart}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={this.FlatListHeader}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                ListFooterComponent={this.FlatListFooter(total_amount)}
              />
            </ScrollView>
          </View>

          <View style={styles.bill}>
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
              <Text>Phone pay</Text>
            </View>
            <LabelValue
              style={styles.labelValue}
              label="Total Ammount"
              value={total_amount}
            />
            <LabelValue
              style={styles.labelValue}
              label={`GST(${store.gst}%)`}
              value={gst}
            />
            <LabelValue
              style={styles.labelValue}
              label="Fast Delivery"
              value={fast_delivery_charges}
            />
            <LabelValue
              style={styles.labelValue}
              label="Total Bill Amount"
              value={total_bill_amount}
            />
          </View>
        </View>
        <Footer style={styles.footer}>
          <Button
            mode="outlined"
            onPress={() => {
              this.props.purchaseItems({
                user: user.id,
                txn_amount: total_bill_amount,
                status: 'pending',
                store: store._id,
                products: cart,
              });
            }}>
            Check out
          </Button>
        </Footer>
        <Modal
          visible={showModal}
          onRequestClose={() => {
            this.setState({
              showModal: !showModal,
            });
          }}>
          <WebView
            source={{
              uri: 'http://192.168.0.9:5000/api/customers/paytm/request',
            }}
            mixedContentMode={'compatibility'}
            injectedJavaScript={`document.getElementById('ORDER_ID').value = "${order._id}"; document.getElementById('TXN_AMOUNT').value = "1"; document.getElementById('CUST_ID').value = "${order.user}"; document.f1.submit();`}
            onNavigationStateChange={(data) => {
              this.handleResponse(data.title);
            }}
          />
        </Modal>
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
    flex: 0.77,
    paddingLeft: widthToDp(4),
    paddingTop: widthToDp(4),
    alignItems: 'flex-start',
  },
  footer: {
    flex: 0.25,
    justifyContent: 'flex-end',
  },
  label: {fontSize: widthToDp(4), fontWeight: 'bold'},
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: widthToDp(2),
    marginBottom: heightToDp(2),
  },
  labelValue: {marginBottom: heightToDp(2)},
  products: {
    flex: 0.6,
  },
  bill: {
    flex: 0.4,
  },
  head: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
  },
};

const mapStateToProps = (state) => {
  return {
    showModal: state.cart.showModal,
    loading: state.cart.loading,
    cart: state.cart.cart,
    order: state.cart.order,
    errors: state.cart.errors,
    ack: state.cart.ack,
    store: state.store.selected_store,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  purchaseItems,
  transactionSuccess,
  transactionFailed,
})(Payment);
