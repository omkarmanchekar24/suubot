import React, {Component} from 'react';
import {Text, View, FlatList, Share} from 'react-native';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer} from '../../components';

//Actions
import {fetchOrdersInventoryWise} from '../../actions/seller/storeActions';

class InventoryWiseSeller extends Component {
  state = {
    inventoryWise: null,
    loading: false,
  };

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  componentWillMount() {
    this.props.fetchOrdersInventoryWise({
      store_id: this.props.selected_store._id,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.setState({
        loading: nextProps.loading,
      });
    } else if (nextProps.inventoryWise) {
      this.setState({
        loading: false,
        inventoryWise: nextProps.inventoryWise,
      });
    }
  }
  renderItem({item}) {
    return (
      <View style={styles.itemContainer}>
        <Text style={[styles.itemLabel, {flex: 0.5}]}>{item.name}</Text>
        <Text style={[styles.itemLabel, {flex: 0.25}]}>{item.quantity}</Text>
        <Text style={[styles.itemLabel, {flex: 0.25}]}>
          {'\u20B9 ' + item.quantity * item.cost}
        </Text>
      </View>
    );
  }

  FlatListHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={[styles.listLabel, {flex: 0.5}]}>Item</Text>
        <Text style={[styles.listLabel, {flex: 0.25}]}>Qty</Text>
        <Text style={[styles.listLabel, {flex: 0.25}]}>Amount</Text>
      </View>
    );
  };

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
    } else if (this.state.inventoryWise) {
      content = (
        <FlatList
          data={this.state.inventoryWise}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={this.FlatListHeader}
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
  invite: {alignSelf: 'flex-start'},
  spinnerTextStyle: {color: '#546'},
  itemContainer: {
    flexDirection: 'row',
    height: heightToDp(10),
    borderWidth: 0.5,
    borderRadius: 5,
    marginBottom: heightToDp(2),
    //justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  itemLabel: {fontSize: heightToDp(2), fontWeight: 'bold'},
  listHeader: {flexDirection: 'row', marginBottom: heightToDp(2)},
  listLabel: {fontSize: heightToDp(2.5), fontWeight: 'bold'},
};

const mapStateToProps = (state) => {
  return {
    selected_store: state.auth.selected_store,
    loading: state.seller.loading,
    inventoryWise: state.seller.inventoryWise,
    error: state.seller.error,
  };
};

export default connect(mapStateToProps, {fetchOrdersInventoryWise})(
  InventoryWiseSeller,
);
