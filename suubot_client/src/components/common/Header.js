import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {widthToDp, heightToDp} from '../../Responsive';
import {IconButton} from 'react-native-paper';
import {connect} from 'react-redux';

import {logoutUser} from '../../actions/authActions';

class Header extends Component {
  renderLogout() {
    if (this.props.logout) {
      return (
        <IconButton
          icon={require('../../assets/switch.png')}
          size={20}
          onPress={() => this.props.logoutUser()}
        />
      );
    }
  }

  renderProfile() {
    if (this.props.profile) {
      return <IconButton icon="bell" size={20} onPress={() => {}} />;
    }
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View
          style={{
            width: widthToDp(15),
            justifyContent: 'center',
            height: '100%',
          }}>
          {this.renderLogout()}
        </View>

        <Text style={styles.title}>Suubot</Text>
        <View
          style={{
            width: widthToDp(15),
            justifyContent: 'center',
            height: '100%',
          }}>
          {this.renderProfile()}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    backgroundColor: '#546',
    height: heightToDp(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {color: '#fff', fontSize: widthToDp(5), fontWeight: 'bold'},
};

export default connect(null, {logoutUser})(Header);
