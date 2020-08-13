import React, {Component} from 'react';
import {Text, View, Share, ScrollView, FlatList} from 'react-native';
import {Button} from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';

import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer, ProductEdit} from '../../components';

//Actions
import {fetchProducts} from '../../actions/seller/storeActions';

class EditStock extends Component {
  state = {
    category: '',
    sub_category: '',
    categories: [],
    sub_categories: [],
    products: [],
    errors: {},
  };

  componentWillMount() {
    this.props.fetchProducts(this.props.auth.selected_store);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.seller.products) {
      this.setState({
        products: nextProps.seller.products,
        categories: nextProps.seller.categories,
        sub_categories: nextProps.seller.sub_categories,
      });
    }
  }

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  renderItem({item}) {
    return <ProductEdit item={item} />;
  }

  render() {
    const {errors} = this.state;

    let data = [];
    let sub = [];
    if (this.state.categories) {
      data = this.state.categories.map((item) => {
        return {label: item.category, value: item._id};
      });

      sub = this.state.sub_categories
        .filter((item) => {
          return item.category_id === this.state.category;
        })
        .map((item) => {
          return {label: item.name, value: item._id};
        });
    }
    let filtered = [];
    if (this.state.products.length > 0)
      filtered = this.state.products.filter((item) => {
        return (
          item.category === this.state.category &&
          item.sub_category === this.state.sub_category
        );
      });

    return (
      <View style={styles.container}>
        <Header
          bell={true}
          onBack={() => Actions.sellerwelcome()}
          style={styles.header}
          logout={true}
        />

        <View style={styles.body}>
          <View style={styles.container1}>
            <DropDownPicker
              placeholder="Select Category"
              items={data}
              defaultValue={this.state.category}
              containerStyle={{height: 40}}
              style={styles.dropdown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) =>
                this.setState({
                  category: item.value,
                })
              }
              searchableError={() => {
                return <Text>Loading...</Text>;
              }}
            />
            {errors.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}

            <DropDownPicker
              placeholder="Select Sub-Category"
              items={sub}
              defaultValue={this.state.sub_category}
              containerStyle={{height: 40}}
              style={styles.dropdown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) =>
                this.setState({
                  sub_category: item.value,
                })
              }
              searchableError={() => {
                if (this.state.category === '') {
                  return <Text>Please select category</Text>;
                }
                return <Text>Not Available</Text>;
              }}
            />
            {errors.sub_category && (
              <Text style={styles.error}>{errors.sub_category}</Text>
            )}
          </View>
          <View style={styles.container2}>
            <FlatList
              data={filtered.length === 0 ? this.state.products : filtered}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={(item) => item._id}
            />
            <View style={{height: heightToDp(2)}}></View>
          </View>
        </View>

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
  body: {
    flex: 0.82,
    padding: widthToDp(4),
  },
  footer: {padding: widthToDp(1), flex: 0.05, justifyContent: 'flex-end'},

  invite: {alignSelf: 'flex-start'},

  container1: {flex: 0.2, justifyContent: 'space-between'},
  container2: {
    flex: 0.8,
    borderWidth: 0.3,
    paddingLeft: widthToDp(4),
    paddingRight: widthToDp(4),
    marginTop: heightToDp(2),
    borderRadius: widthToDp(2),
    justifyContent: 'space-between',
  },
  btnSubmit: {alignSelf: 'center'},
  modal: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: heightToDp(15),
    marginBottom: heightToDp(15),
    marginLeft: widthToDp(10),
    marginRight: widthToDp(10),
    borderRadius: widthToDp(4),
    padding: widthToDp(4),
    justifyContent: 'space-between',
  },
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    seller: state.seller,
  };
};

export default connect(mapStateToProps, {fetchProducts})(EditStock);
