import React, {Component} from 'react';
import {View, Share, Text, FlatList, ScrollView} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import {connect} from 'react-redux';
import moment from 'moment';
import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer} from '../../components';
import {Actions} from 'react-native-router-flux';

class SellerWiseOrder extends Component {
  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  renderItem({item}) {
    return (
      <View style={styles.order}>
        <View style={styles.head}>
          <Text style={styles.date}>
            {moment(item.date).format('DD-MM-YYYY')}
          </Text>
          <Text style={styles.day}>{moment(item.date).format('dddd')}</Text>
        </View>
        <View style={styles.orderBody}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{flex: 0.5, fontWeight: 'bold'}}>Item</Text>
            <Text style={{flex: 0.5, fontWeight: 'bold'}}>Cost</Text>
          </View>
          {item.products.map((item, i) => {
            return (
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={{flex: 0.5}}>{item.name}</Text>
                <Text style={{flex: 0.5}}>
                  {'\u20B9 '}
                  {item.cost}
                </Text>
              </View>
            );
          })}
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
              marginTop: heightToDp(5),
            }}
          />
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={{flex: 0.5, fontWeight: 'bold'}}>Totals</Text>
            <Text style={{flex: 0.5, fontWeight: 'bold'}}>
              {'\u20B9 '}
              {item.txn_amount}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    let data = this.props.purchaseHistory.filter((item) => {
      return item.store.toString() === this.props._id.toString();
    });
    console.log(data);
    return (
      <View style={styles.container}>
        <Header
          profile={true}
          style={styles.header}
          onBack={() => {
            Actions.sellerwise();
          }}
          bell={true}
        />
        <View style={styles.body}>
          <ScrollView>
            <FlatList
              data={data}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={(item) => item._id}
            />
          </ScrollView>
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
  invite: {alignSelf: 'flex-start'},
  order: {
    padding: widthToDp(3),
    borderWidth: 0.5,
    marginBottom: heightToDp(4),
    borderRadius: widthToDp(2),
  },
  head: {flexDirection: 'row', flex: 1},
  date: {flex: 0.8, fontWeight: 'bold'},
  day: {flex: 0.2, fontWeight: 'bold'},
  orderBody: {marginTop: heightToDp(4)},
  listHead: {flexDirection: 'row', justifyContent: 'space-between'},
  listLabel: {},
};

const mapStateToProps = (state) => {
  return {
    purchaseHistory: state.store.purchaseHistory,
  };
};

export default connect(mapStateToProps, null)(SellerWiseOrder);
