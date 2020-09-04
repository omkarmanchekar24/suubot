import React, {Component} from 'react';
import {Text, View, Share, ScrollView, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {widthToDp, heightToDp} from '../../Responsive';
import Spinner from 'react-native-loading-spinner-overlay';

//Components
import {Header, Footer, ItemWiseItem} from '../../components';

//Actions
import {fetchOrdersProductWise} from '../../actions/user/storeActions';

class ItemWise extends Component {
  state = {
    productWise: [],
    fetching: false,
  };

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  componentWillMount() {
    const {id} = this.props.auth.user;
    this.props.fetchOrdersProductWise(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetching === true) {
      this.setState({
        fetching: true,
      });
    } else if (nextProps.fetching === false) {
      this.setState({
        fetching: false,
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
      if (this.state.productWise.length > 0) {
        content = (
          <FlatList
            data={this.state.productWise}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item) => item._id}
          />
        );
      } else {
        content = (
          <View style={styles.empty}>
            <Text>You haven't purchased anything yet</Text>
          </View>
        );
      }
    }

    // content = this.state.fetching ? (
    //   <View>
    //     <Spinner
    //       visible={true}
    //       textContent={'Loading...'}
    //       textStyle={styles.spinnerTextStyle}
    //     />
    //   </View>
    // ) : (
    //   <FlatList
    //     data={this.state.productWise}
    //     renderItem={this.renderItem.bind(this)}
    //     keyExtractor={(item) => item._id}
    //   />
    // );

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
        <View style={styles.body}>
          <ScrollView>{content}</ScrollView>
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
  container: {flex: 1},
  header: {flex: 0.13},
  body: {flex: 0.74, padding: widthToDp(8)},
  footer: {padding: widthToDp(1), flex: 0.13, justifyContent: 'flex-end'},
  spinnerTextStyle: {color: '#546'},
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
    auth: state.auth,
    productWise: state.store.purchaseHistoryProductWise,
    fetching: state.store.fetching,
  };
};

export default connect(mapStateToProps, {fetchOrdersProductWise})(ItemWise);
