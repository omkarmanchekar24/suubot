import React, {Component} from 'react';
import {Text, View, Picker, ScrollView, BackHandler, Share} from 'react-native';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer} from '../../components';

//Action
import {fetchProductCategories, setValue} from '../../actions/storeActions';

class Select extends Component {
  state = {pickerValue: '', product_categories: []};

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  componentWillMount() {
    this.props.fetchProductCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product_categories) {
      this.setState({
        product_categories: nextProps.product_categories,
      });
    }
  }

  renderPicker() {
    if (this.state.product_types.length > 0) {
    }
  }

  render() {
    const {product_categories} = this.state;

    return (
      <View style={styles.container}>
        <Header style={styles.header} profile={true} logout={true} />
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>What would you like to shop?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.pickerValue}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({pickerValue: itemValue});
                  if (itemValue !== '0') {
                    let category = this.state.product_categories.filter(
                      (item) => {
                        return item._id === itemValue;
                      },
                    );

                    this.props.setValue({
                      prop: 'selected_product_category',
                      value: category[0],
                    });
                    if (itemIndex !== 0) {
                      Actions.stores();
                    }
                  }
                }}>
                <Picker.Item label="Select an option" value="0" />
                {product_categories.length !== 0 ? (
                  product_categories.map((item) => {
                    return (
                      <Picker.Item label={item.category} value={item._id} />
                    );
                  })
                ) : (
                  <Picker.Item label="Loading..." value="0" />
                )}
              </Picker>
            </View>
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
  container: {
    display: 'flex',
    height: '100%',
    flex: 1,
  },
  header: {flex: 0.13},
  body: {flex: 0.74, padding: widthToDp(8)},
  footer: {padding: widthToDp(1), flex: 0.13, justifyContent: 'flex-end'},

  title: {fontSize: widthToDp(5), fontWeight: 'bold'},
  label: {fontSize: widthToDp(5), marginTop: heightToDp(5)},
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'rgb(204, 204, 204)',
    width: '80%',
    borderRadius: widthToDp(2),
    marginTop: heightToDp(2),
  },
  picker: {},
  search: {
    flexDirection: 'row',
    marginTop: heightToDp(5),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '70%',
    borderWidth: 1,
    borderRadius: widthToDp(1),
    marginLeft: widthToDp(1),
  },
  inputLabel: {fontSize: widthToDp(5)},
  invite: {alignSelf: 'flex-start'},
};

const mapStateToProps = (state) => {
  return {
    product_categories: state.store.product_categories,
  };
};

export default connect(mapStateToProps, {fetchProductCategories, setValue})(
  Select,
);
