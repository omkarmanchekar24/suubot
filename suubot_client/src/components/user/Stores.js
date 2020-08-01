import React, {Component} from 'react';
import {Text, View, Picker, ScrollView, Share} from 'react-native';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

//Components
import {Header, Footer} from '../../components';

//Actions
import {
  fetchStoresByProductCategory,
  setValue,
} from '../../actions/storeActions';

class Stores extends Component {
  state = {pickerValue: '', stores: []};
  clickme() {
    alert(this.state.pickerValue);
  }

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  componentWillMount() {
    const {selected_product_category} = this.props;
    this.props.fetchStoresByProductCategory(selected_product_category._id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stores) {
      this.setState({
        stores: nextProps.stores,
      });
    }
  }

  render() {
    const {selected_product_category} = this.props;
    return (
      <View style={styles.container}>
        <Header style={styles.header} profile={true} logout={true} />
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>
              Stores Selling {selected_product_category.category}
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.pickerValue}
                onValueChange={(itemValue, itemIndex) => {
                  let store = this.state.stores.filter((item) => {
                    return item._id === itemValue;
                  });

                  this.setState({pickerValue: itemValue});
                  if (itemIndex !== 0) {
                    this.props.setValue({
                      prop: 'selected_store',
                      value: store[0],
                    });
                    Actions.products();
                  }
                }}>
                <Picker.Item label="Select an option" value="0" />
                {this.state.stores.length !== 0 ? (
                  this.state.stores.map((item) => {
                    return (
                      <Picker.Item
                        label={item.business_name}
                        value={item._id}
                      />
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
    stores: state.store.stores,
    selected_product_category: state.store.selected_product_category,
  };
};

export default connect(mapStateToProps, {
  fetchStoresByProductCategory,
  setValue,
})(Stores);