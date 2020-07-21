import React, {Component} from 'react';
import {Text, View, Picker, ScrollView, Share} from 'react-native';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {widthToDp, heightToDp} from '../Responsive';

//Components
import {Header, Footer} from '../components';
import {TextInput} from 'react-native';

//Actions
import {fetchStoresByProductType, setValue} from '../actions/storeActions';

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
    const {selected_product_type_id} = this.props;
    this.props.fetchStoresByProductType(selected_product_type_id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stores) {
      this.setState({
        stores: nextProps.stores,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} profile={true} logout={true} />
        <View style={styles.body}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Stores</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.pickerValue}
                onValueChange={(itemValue, itemIndex) => {
                  this.setState({pickerValue: itemValue});
                  if (itemIndex === 1) {
                    this.props.setValue({
                      prop: 'selected_store_id',
                      value: itemValue,
                    });
                    Actions.products();
                  }
                }}>
                <Picker.Item label="Select an option" value="0" />
                {this.state.stores.length !== 0 ? (
                  this.state.stores.map((item) => {
                    return <Picker.Item label={item.name} value={item.id} />;
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
    selected_product_type_id: state.store.selected_product_type_id,
  };
};

export default connect(mapStateToProps, {fetchStoresByProductType, setValue})(
  Stores,
);
