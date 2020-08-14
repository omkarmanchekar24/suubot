import React, {Component} from 'react';
import {Text, View, ScrollView, Share} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../../Responsive';

import {Header, Footer} from '../../components';

//Action
import {fetchProductCategories, setValue} from '../../actions/storeActions';

class Select extends Component {
  state = {product_categories: []};

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

    let temp = product_categories.map((item) => {
      return {label: item.category, value: item._id};
    });

    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          bell={true}
          onBack={() => Actions.welcome()}
        />
        <View style={styles.body}>
          <View style={styles.labelDrop}>
            <Text style={styles.label}>What would you like to shop?</Text>

            <DropDownPicker
              placeholder="Select an option"
              items={temp}
              containerStyle={{height: 40}}
              style={styles.dropdown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => {
                let category = product_categories.filter((product) => {
                  return product._id === item.value;
                });
                this.props.setValue({
                  prop: 'selected_product_category',
                  value: category[0],
                });
                Actions.stores();
              }}
              searchableError={() => {
                return <Text>Loading...</Text>;
              }}
            />
          </View>
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
  body: {flex: 0.8, padding: widthToDp(8)},
  footer: {padding: widthToDp(1), flex: 0.07, justifyContent: 'flex-end'},
  title: {fontSize: widthToDp(5), fontWeight: 'bold'},
  label: {fontSize: widthToDp(5)},
  dropdown: {backgroundColor: '#fafafa'},
  labelDrop: {
    height: 80,
    justifyContent: 'space-between',
    marginTop: heightToDp(1),
  },
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
