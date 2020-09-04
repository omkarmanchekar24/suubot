import React, {Component} from 'react';
import {View, Share, Text, FlatList, ScrollView} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

//Actions
import {fetchPurchaseHistorySellerWise} from '../../actions/user/storeActions';

import {widthToDp, heightToDp} from '../../Responsive';

import {
  Header,
  Footer,
  SellerWiseItem,
  SellerWiseOrder,
} from '../../components';

class SellerWise extends Component {
  state = {
    purchaseHistorySellerWise: [],
    fetching: false,
  };

  componentWillMount() {
    this.props.fetchPurchaseHistorySellerWise(this.props.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetching === true) {
      this.setState({
        fetching: true,
      });
    } else if (nextProps.purchaseHistorySellerWise) {
      this.setState({
        purchaseHistorySellerWise: nextProps.purchaseHistorySellerWise,
        fetching: false,
      });
    }
  }

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  renderItem({item}) {
    return (
      <SellerWiseItem
        name={item.store.name}
        value={'\u20B9 ' + item.total_amt}
        _id={item._id}
      />
    );
  }

  hideModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    let content;

    if (this.state.fetching) {
      content = (
        <View>
          <Spinner
            visible={true}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      );
    } else {
      if (this.state.purchaseHistorySellerWise.length > 0) {
        content = (
          <View style={styles.listBody}>
            <ScrollView style={styles.scroll}>
              <FlatList
                data={this.state.purchaseHistorySellerWise.overAll}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={(item) => item._id}
              />

              <View style={{height: heightToDp(10)}}></View>
            </ScrollView>
            <View style={{flex: 0.1}}></View>
            <View style={styles.summary}>
              <Text style={styles.summaryLabel}>This month</Text>
              <Text style={styles.summaryLabel}>
                {'\u20B9 ' +
                  this.state.purchaseHistorySellerWise.thisMonth[0].total_amt}
              </Text>
            </View>
          </View>
        );
      } else {
        content = (
          <View style={styles.empty}>
            <Text>You haven't purchased anything yet</Text>
          </View>
        );
      }
    }

    return (
      <View style={styles.container}>
        <Header
          profile={true}
          style={styles.header}
          onBack={() => {
            Actions.welcome();
          }}
          bell={true}
        />
        <View style={styles.body}>{content}</View>
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
  container: {flex: 1},
  header: {flex: 0.13},
  body: {flex: 0.8, padding: widthToDp(8)},
  footer: {padding: widthToDp(1), flex: 0.07, justifyContent: 'flex-end'},
  invite: {alignSelf: 'flex-start'},
  empty: {
    justifySelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: widthToDp(10),
    borderWidth: 0.3,
    borderRadius: widthToDp(5),
  },
  listBody: {height: '100%'},
  scroll: {flex: 0.7},
  summary: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  summaryLabel: {fontWeight: 'bold', fontSize: heightToDp(3), color: '#546'},
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    fetching: state.store.fetching,
    purchaseHistorySellerWise: state.store.purchaseHistorySellerWise,
    purchaseHistory: state.store.purchaseHistory,
  };
};

export default connect(mapStateToProps, {fetchPurchaseHistorySellerWise})(
  SellerWise,
);
