import React, {Component} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {widthToDp, heightToDp} from '../../../Responsive';

import {BillItem} from '../../../components';

class Products extends Component {
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
          {'\u20B9 ' + total_amount}
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

  renderItem({item}) {
    return <BillItem item={item} />;
  }

  render() {
    return (
      <View style={this.props.style}>
        <ScrollView>
          <FlatList
            data={this.props.data}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={this.FlatListHeader}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            ListFooterComponent={this.FlatListFooter(this.props.total_amount)}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  label: {fontSize: widthToDp(4), fontWeight: 'bold'},
  head: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
  },
};

export default Products;
