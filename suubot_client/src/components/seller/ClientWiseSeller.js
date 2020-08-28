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
import {fetchOrdersClientWise} from '../../actions/seller/storeActions';

class ClientWiseSeller extends Component {
  state = {
    clientWise: null,
    loading: false,
  };

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  componentWillMount() {
    this.props.fetchOrdersClientWise({
      store_id: this.props.selected_store._id,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.setState({
        loading: nextProps.loading,
      });
    } else if (nextProps.clientWise) {
      this.setState({
        loading: false,
        clientWise: nextProps.clientWise,
      });
    }
  }
  renderItem({item}) {
    return (
      <ItemWiseItem
        name={item.client[0].name}
        value={'\u20B9 ' + item.total_amt}
      />
      //{'\u20B9 '}
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
    } else if (this.state.clientWise) {
      if (this.state.clientWise.length > 0) {
        content = (
          <View>
            <FlatList
              data={this.state.clientWise}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={(item) => item._id}
            />
          </View>
        );
      } else {
        content = (
          <View>
            <Text>You haven't sell anything yet</Text>
          </View>
        );
      }
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
  itemContainer: {
    flexDirection: 'row',
    height: 80,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemLabel: {fontSize: heightToDp(2), fontWeight: 'bold'},
};

const mapStateToProps = (state) => {
  return {
    selected_store: state.auth.selected_store,
    loading: state.seller.loading,
    clientWise: state.seller.clientWise,
    error: state.seller.error,
  };
};

export default connect(mapStateToProps, {fetchOrdersClientWise})(
  ClientWiseSeller,
);
