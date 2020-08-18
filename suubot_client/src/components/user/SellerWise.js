import React, {Component} from 'react';
import {View, Share, Text, FlatList, ScrollView} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

//Actions
import {fetchPurchaseHistorySellerWise} from '../../actions/storeActions';

import {widthToDp, heightToDp} from '../../Responsive';

import {
  Header,
  Footer,
  SellerWiseItem,
  SellerWiseOrder,
} from '../../components';
import {ToastAndroid} from 'react-native';

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
    return <SellerWiseItem item={item} />;
  }

  renderList() {
    if (this.state.purchaseHistorySellerWise.length === 0) {
      return (
        <View style={styles.empty}>
          <Text>You haven't bought anything yet</Text>
        </View>
      );
    }

    return (
      <View>
        <ScrollView>
          <FlatList
            data={this.state.purchaseHistorySellerWise}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    );
  }

  hideModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  render() {
    let content;

    content = this.state.fetching ? (
      <View>
        <Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    ) : (
      <View>{this.renderList()}</View>
    );

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
  body: {flex: 0.74, padding: widthToDp(8)},
  footer: {padding: widthToDp(1), flex: 0.13, justifyContent: 'flex-end'},
  invite: {alignSelf: 'flex-start'},
  empty: {
    justifySelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: widthToDp(10),
    borderWidth: 0.3,
    borderRadius: widthToDp(5),
  },
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
