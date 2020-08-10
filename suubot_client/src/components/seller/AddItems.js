import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Share,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer, Input} from '../../components';

//Actions
import {
  fetchProductCategories,
  updateAddItems,
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
    if (nextProps.categories) {
      this.setState({
        categories: nextProps.categories.categories,
        sub_categories: nextProps.categories.sub_categories,
      });
    } else if (nextProps.error) {
      this.setState({
        error: nextProps.error,
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

    if (this.props.name === '') {
      errors.name = 'required';
    }

    if (this.props.unit === '') {
      errors.unit = 'required';
    }

    if (this.props.price === '') {
      errors.price = 'required';
    }

    if (this.props.quantity === '') {
      errors.quantity = 'required';
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
      });
      return;
    }

    const {name, unit, price, quantity} = this.props;
    console.log({name, unit, price, quantity});
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
    return (
      <View style={styles.container}>
        <Header profile={true} style={styles.header} logout={true} />
        <View style={styles.body}>
          <ScrollView>
            <Text style={[styles.label, {marginTop: heightToDp(0)}]}>
              Select Category
            </Text>
            <DropDownPicker
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
            />
            {errors.category && (
              <Text style={styles.error}>{errors.category}</Text>
            )}

            <Text style={styles.label}>Select Sub-Category</Text>
            <DropDownPicker
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
            <View style={styles.form}>
              <View style={styles.row}>
                <Text style={styles.formLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={this.props.name}
                  onChangeText={(text) => {
                    this.onChange({prop: 'name', value: text});
                  }}
                />
              </View>
              {errors.name && <Text style={styles.error}>{errors.name}</Text>}

              <View style={[styles.row, {marginTop: heightToDp(4)}]}>
                <Text style={styles.formLabel}>Unit</Text>
                <TextInput
                  style={styles.input}
                  value={this.props.unit}
                  onChangeText={(text) => {
                    this.onChange({prop: 'unit', value: text});
                  }}
                />
              </View>
              {errors.unit && <Text style={styles.error}>{errors.unit}</Text>}

              <View style={[styles.row, {marginTop: heightToDp(4)}]}>
                <Text style={styles.formLabel}>Price</Text>
                <TextInput
                  style={styles.input}
                  value={this.props.price}
                  onChangeText={(text) => {
                    this.onChange({prop: 'price', value: text});
                  }}
                />
              </View>
              {errors.price && <Text style={styles.error}>{errors.price}</Text>}

              <View style={[styles.row, {marginTop: heightToDp(4)}]}>
                <Text style={styles.formLabel}>Quantity</Text>
                <TextInput
                  style={styles.input}
                  value={this.props.quantity}
                  onChangeText={(text) => {
                    this.onChange({prop: 'quantity', value: text});
                  }}
                />
              </View>
              {errors.quantity && (
                <Text style={styles.error}>{errors.quantity}</Text>
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
    padding: widthToDp(8),
  },
  footer: {padding: widthToDp(1), flex: 0.05, justifyContent: 'flex-end'},
  label: {
    fontSize: widthToDp(5),
    marginTop: heightToDp(3),
    marginBottom: heightToDp(2),
  },
  dropdown: {backgroundColor: '#fafafa'},
  form: {flex: 1, marginTop: heightToDp(4)},
  row: {flexDirection: 'row', flex: 1, alignItems: 'center'},
  formLabel: {flex: 0.2, fontWeight: 'bold'},
  input: {
    flex: 0.8,
    height: 40,
    backgroundColor: '#fafafa',
    borderBottomWidth: 0.5,
  },
  btnSubmit: {alignSelf: 'center', marginTop: heightToDp(4)},
  error: {color: 'red'},
  invite: {alignSelf: 'flex-start'},
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    categories: state.seller.categories,
    name: state.seller.name,
    unit: state.seller.unit,
    price: state.seller.price,
    quantity: state.seller.quantity,
  };
};

export default connect(mapStateToProps, {
  fetchProductCategories,
  updateAddItems,
})(AddItems);
