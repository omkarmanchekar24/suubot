import React, {Component} from 'react';
import {Text, View, Share} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {
  fetchProductSubCategoriesByStoreIdCategoryId,
  setValue,
} from '../../actions/user/storeActions';

import {resetCart} from '../../actions/cartActions';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer} from '../../components';

class Products extends Component {
  state = {
    pickerValue: '',
    product_sub_categories: [],
    showAlert: false,
  };
  clickme() {
    alert(this.state.pickerValue);
  }

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  componentWillMount() {
    const {selected_store, selected_product_category} = this.props;
    this.props.fetchProductSubCategoriesByStoreIdCategoryId(
      selected_store._id,
      selected_product_category._id,
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product_sub_categories) {
      this.setState({
        product_sub_categories: nextProps.product_sub_categories,
      });
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  onBack() {
    if (this.props.cart.length > 0) {
      this.showAlert();
    } else {
      Actions.stores();
    }
  }

  render() {
    const {selected_product_category} = this.props;
    const {product_sub_categories} = this.state;
    let data = product_sub_categories.map((item) => {
      return {label: item.name, value: item._id};
    });
    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          bell={true}
          onBack={this.onBack.bind(this)}
        />
        <View style={styles.body}>
          <View style={styles.labelDrop}>
            <Text style={styles.label}>
              {selected_product_category.category}
            </Text>

            <DropDownPicker
              placeholder="Select an option"
              items={data}
              containerStyle={{height: 40}}
              style={styles.dropdown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => {
                let sub_category = product_sub_categories.filter((sub) => {
                  return sub._id === item.value;
                });
                this.props.setValue({
                  prop: 'selected_sub_category',
                  value: sub_category[0],
                });
                Actions.product2();
              }}
              searchableError={() => {
                return <Text>Loading...</Text>;
              }}
            />
          </View>
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title="Are You Sure?"
            message="Going back will remove all the items from the cart"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, Go Back"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.props.resetCart();
              this.hideAlert();
              Actions.stores();
            }}
          />
        </View>
        <Footer style={styles.footer}>
          <Button style={styles.invite} onPress={this.invite.bind(this)}>
            Invite your seller on suubot
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
  body: {flex: 0.8, padding: widthToDp(8)},
  footer: {padding: widthToDp(1), flex: 0.07, justifyContent: 'flex-end'},
  title: {fontSize: widthToDp(5), fontWeight: 'bold'},
  label: {fontSize: widthToDp(5)},
  dropdown: {backgroundColor: '#fafafa'},
  labelDrop: {
    height: 80,
    justifyContent: 'space-between',
    marginTop: heightToDp(1),
  },
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
  invite: {alignSelf: 'flex-start'},
};

const mapStateToProps = (state) => {
  return {
    product_sub_categories: state.store.product_sub_categories,
    selected_store: state.store.selected_store,
    selected_product_category: state.store.selected_product_category,
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps, {
  fetchProductSubCategoriesByStoreIdCategoryId,
  setValue,
  resetCart,
})(Products);
