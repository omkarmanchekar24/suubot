import React, {Component} from 'react';
import {Text, View, Share} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
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
    const {stores} = this.state;
    let data = this.state.stores.map((item) => {
      return {label: item.name, value: item._id};
    });
    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          bell={true}
          onBack={() => Actions.select()}
        />
        <View style={styles.body}>
          <View style={styles.labelDrop}>
            <Text style={styles.label}>
              Stores Selling {selected_product_category.category}
            </Text>

            <DropDownPicker
              placeholder="Select an option"
              items={data}
              containerStyle={{height: 40}}
              style={styles.dropdown}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => {
                let store = stores.filter((store) => {
                  return store._id === item.value;
                });
                this.props.setValue({
                  prop: 'selected_store',
                  value: store[0],
                });
                Actions.products();
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
    stores: state.store.stores,
    selected_product_category: state.store.selected_product_category,
  };
};

export default connect(mapStateToProps, {
  fetchStoresByProductCategory,
  setValue,
})(Stores);
