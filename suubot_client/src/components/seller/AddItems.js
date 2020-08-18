import React, {Component} from 'react';
import {Text, View, TextInput, Share, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer} from '../../components';

//Actions
import {
  fetchProductCategories,
  updateAddItems,
  addProduct,
} from '../../actions/seller/storeActions';

class AddItems extends Component {
  state = {
    category: '',
    sub_category: '',
    categories: [],
    sub_categories: [],
    errors: {},
  };

  componentWillMount() {
    this.props.fetchProductCategories();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.seller.categories) {
      this.setState({
        categories: nextProps.seller.categories.categories,
        sub_categories: nextProps.seller.categories.sub_categories,
      });
    } else if (nextProps.seller.error) {
      this.setState({
        error: nextProps.seller.error,
      });
    }
  }

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  onChange({prop, value}) {
    this.props.updateAddItems({prop, value});
  }

  onSubmit() {
    let errors = {};
    if (this.state.category === '') {
      errors.category = 'required';
    }

    if (this.state.sub_category === '') {
      errors.sub_category = 'required';
    }

    if (this.props.seller.name === '') {
      errors.name = 'required';
    }

    if (this.props.seller.unit === '') {
      errors.unit = 'required';
    }

    if (this.props.seller.price === '') {
      errors.price = 'required';
    }

    if (this.props.seller.quantity === '') {
      errors.quantity = 'required';
    }

    if (this.props.seller.weight === '') {
      errors.weight = 'required';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
      });
      return;
    }

    const {name, unit, price, quantity, weight} = this.props.seller;
    const {category, sub_category} = this.state;
    const {_id} = this.props.auth.selected_store;
    this.props.addProduct({
      name,
      unit,
      price,
      quantity,
      weight,
      category,
      sub_category,
      store: _id,
    });
  }

  render() {
    const {errors, categories, sub_categories, category} = this.state;

    let data = [];
    let sub = [];

    if (categories.length > 0) {
      data = categories.map((item) => {
        return {label: item.category, value: item._id};
      });
    }

    if (sub_categories.length > 0) {
      sub = sub_categories
        .filter((item) => {
          return item.category_id === category;
        })
        .map((item) => {
          return {label: item.name, value: item._id};
        });
    }

    return (
      <View style={styles.container}>
        <Header
          bell={true}
          onBack={() => Actions.pop()}
          style={styles.header}
        />

        <View style={styles.body}>
          <ScrollView contentContainerStyle={{flex: 1}}>
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
              <View style={styles.row}>
                <Text style={styles.formLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={this.props.seller.name}
                  onChangeText={(text) => {
                    this.onChange({prop: 'name', value: text});
                  }}
                />
              </View>
              {errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <View style={styles.row}>
                <Text style={styles.formLabel}>Unit</Text>
                <TextInput
                  style={styles.input}
                  value={this.props.seller.unit}
                  onChangeText={(text) => {
                    this.onChange({prop: 'unit', value: text});
                  }}
                />
              </View>
              {errors.unit && <Text style={styles.error}>{errors.unit}</Text>}

              <View style={styles.row}>
                <Text style={styles.formLabel}>Price</Text>
                <TextInput
                  style={styles.input}
                  value={this.props.seller.price}
                  onChangeText={(text) => {
                    this.onChange({prop: 'price', value: text});
                  }}
                />
              </View>
              {errors.price && <Text style={styles.error}>{errors.price}</Text>}

              <View style={styles.row}>
                <Text style={styles.formLabel}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  value={this.props.seller.quantity}
                  onChangeText={(text) => {
                    this.onChange({prop: 'quantity', value: text});
                  }}
                />
              </View>
              {errors.quantity && (
                <Text style={styles.error}>{errors.quantity}</Text>
              )}

              <View style={styles.row}>
                <Text style={styles.formLabel}>Weight</Text>
                <TextInput
                  style={styles.input}
                  value={this.props.seller.weight}
                  onChangeText={(text) => {
                    this.onChange({prop: 'weight', value: text});
                  }}
                />
              </View>
              {errors.weight && (
                <Text style={styles.error}>{errors.weight}</Text>
              )}

              <Button
                mode="outlined"
                color="#546"
                style={styles.btnSubmit}
                onPress={this.onSubmit.bind(this)}>
                Add
              </Button>
            </View>
          </ScrollView>
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
  label: {
    fontSize: widthToDp(4),
    fontWeight: 'bold',
  },
  dropdown: {backgroundColor: '#fafafa'},

  row: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  formLabel: {flex: 0.2, fontWeight: 'bold'},
  input: {
    flex: 0.8,
    height: 40,
    backgroundColor: '#fafafa',
    borderBottomWidth: 0.5,
  },
  btnSubmit: {alignSelf: 'center'},
  error: {color: 'red'},
  invite: {alignSelf: 'flex-start'},
  container1: {flex: 0.2, justifyContent: 'space-between'},
  container2: {
    flex: 0.8,

    marginLeft: widthToDp(2),
    marginRight: widthToDp(2),
    paddingLeft: widthToDp(4),
    paddingRight: widthToDp(4),
    marginTop: heightToDp(2),
    borderRadius: widthToDp(2),
    justifyContent: 'space-between',
  },
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    seller: state.seller,
  };
};

export default connect(mapStateToProps, {
  fetchProductCategories,
  updateAddItems,
  addProduct,
})(AddItems);
