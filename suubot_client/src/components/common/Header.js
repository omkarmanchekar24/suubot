import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {widthToDp, heightToDp} from '../../Responsive';
import {IconButton} from 'react-native-paper';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {logoutUser} from '../../actions/authActions';

class Header extends Component {
  renderBackButton() {
    if (this.props.onBack) {
      return (
        <View>
          <IconButton icon="arrow-left" size={20} onPress={this.props.onBack} />
        </View>
      );
    }
  }

  renderBell() {
    if (this.props.bell) {
      return (
        <IconButton
          icon="bell"
          size={20}
          onPress={() => {
            Actions.payment();
          }}
        />
      );
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
          {this.renderBackButton()}
        </View>

        <Text style={styles.title}>Suubot</Text>
        <View
          style={{
            width: widthToDp(15),
            justifyContent: 'center',
            height: '100%',
          }}>
          {this.renderBell()}
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
