import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';

//Components
import {Header} from '../components';
import {widthToDp} from '../Responsive';

class SelectRole extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={{flex: 0.13}} />
        <View style={styles.body}>
          <View style={styles.box}>
            <Text style={styles.label}>Select Role:</Text>
            <Button mode="outlined" onPress={() => {}}>
              Customer
            </Button>
            <Button mode="outlined" onPress={() => {}}>
              Seller
            </Button>
            <Button mode="outlined" onPress={() => {}}>
              Professional
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  body: {alignItems: 'center', flex: 0.87, justifyContent: 'center'},
  box: {height: '40%', width: '50%', justifyContent: 'space-around'},
  label: {fontWeight: 'bold', fontSize: widthToDp(5), color: '#546'},
};

export default SelectRole;
