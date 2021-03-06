import React, {Component} from 'react';
import {Text, View, FlatList, Share} from 'react-native';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer, ItemWiseItem} from '../../components';

//Actions
import {fetchOrdersProductWise} from '../../actions/seller/storeActions';

class ItemWiseSeller extends Component {
  state = {
    productWise: null,
    loading: false,
  };

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  componentWillMount() {
    this.props.fetchOrdersProductWise({
      store_id: this.props.selected_store._id,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.setState({
        loading: nextProps.loading,
      });
    } else if (nextProps.productWise) {
      this.setState({
        loading: false,
        productWise: nextProps.productWise,
      });
    }
  }
  renderItem({item}) {
    return (
      <ItemWiseItem
        name={item.product[0].name}
        value={'\u20B9 ' + item.total}
      />
    );
  }

  render() {
    let content;

    if (this.state.loading) {
      content = (
        <View>
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      );
    } else if (this.state.productWise) {
      content = (
        <FlatList
          data={this.state.productWise}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item) => item._id}
        />
      );
    } else {
      content = (
        <View>
          <Text>You haven't sell anything yet...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header
          bell={true}
          style={styles.header}
          onBack={() => Actions.sellerwelcome()}
        />
        <View style={styles.body}>{content}</View>
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
  footer: {padding: widthToDp(1), flex: 0.13, justifyContent: 'flex-end'},
  title: {fontSize: widthToDp(5), fontWeight: 'bold'},
  label: {fontSize: widthToDp(5), marginTop: heightToDp(5)},
  invite: {alignSelf: 'flex-start'},
  switch: {flexDirection: 'row', justifyContent: 'space-between'},
  switchButton: {alignSelf: 'center', maxWidth: widthToDp(50)},
  dropdown: {backgroundColor: 'white', width: widthToDp(35)},
  spinnerTextStyle: {color: '#546'},
};

const mapStateToProps = (state) => {
  return {
    selected_store: state.auth.selected_store,
    loading: state.seller.loading,
    productWise: state.seller.productWise,
    error: state.seller.error,
  };
};

export default connect(mapStateToProps, {fetchOrdersProductWise})(
  ItemWiseSeller,
);
