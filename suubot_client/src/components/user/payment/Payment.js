import React, {Component} from 'react';
import {View, ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import RNUpiPayment from 'react-native-upi-payment';

//Components
import {Header, Footer} from '../../../components';
import Products from './Products';
import FinalBill from './FinalBill';

//Actions
import {
  purchaseItems,
  transactionSuccess,
  transactionFailed,
} from '../../../actions/cartActions';

import {widthToDp, heightToDp} from '../../../Responsive';

class Payment extends Component {
  state = {
    cart: [],
  };

  componentWillMount() {
    this.setState({
      cart: this.props.cart,
    });
  }

  onCheckoutPayment() {
    RNUpiPayment.initializePayment(
      {
        vpa: 'aniketkanal97-1@okaxis', // upi id of seller
        payeeName: 'Aniket Kanal', // name of seller
        amount: '1',
        transactionRef: 'aasf-332-aoei-fn',
      },

      (data) => {
        this.transactionSuccess(data);
      },
      (data) => {
        this.transactionFailed(data);
      },
    );
  }

  transactionSuccess(data) {}

  transactionFailed(data) {
    if (data.txnId) {
      this.props.purchaseItems({
        user: this.props.user._id,
        mobile: this.props.user.mobile,
        txn_id: data.txnId,
        txn_amount: 500,
        status: data.Status,
        resp_code: data.responseCode,
        store: this.props.store._id,
        products: this.props.cart,
      });
    } else {
      ToastAndroid.show(
        `Transaction Failed: ${data.message}`,
        ToastAndroid.LONG,
      );
    }
  }

  render() {
    const {cart, store, user} = this.props;

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
        <Header profile={true} onBack={() => Actions.product2()} bell={true} />
        <View style={styles.body}>
          <Products
            style={styles.products}
            total_amount={total_amount}
            data={this.state.cart}
          />
          <FinalBill
            style={styles.bill}
            store={store}
            total_amount={total_amount}
            gst={gst}
            fast_delivery_charges={fast_delivery_charges}
            total_bill_amount={total_bill_amount}
          />
        </View>
        <Footer style={styles.footer}>
          <Button mode="outlined" onPress={this.onCheckoutPayment.bind(this)}>
            Check out
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

  products: {
    flex: 0.6,
  },
  bill: {
    flex: 0.4,
    width: '100%',
  },
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    order: state.cart.order,
    errors: state.cart.errors,
    store: state.store.selected_store,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  purchaseItems,
  transactionSuccess,
  transactionFailed,
})(Payment);
