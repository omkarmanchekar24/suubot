import React, {Component} from 'react';
import {Text, View, Share, TouchableOpacity, FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';

import {widthToDp, heightToDp} from '../Responsive';

//Components
import {Header, Footer} from '../components';
import {Actions} from 'react-native-router-flux';

//Actions
import {setAccount} from '../actions/authActions';

class SwitchAccount extends Component {
  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  renderSeller({item}) {
    return (
      <TouchableOpacity
        style={styles.element}
        onPress={() => {
          this.props.setAccount({name: 'selected_store', item});
          Actions.seller({item});
        }}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderProfessional({item}) {
    return (
      <TouchableOpacity
        style={styles.element}
        onPress={() => {
          this.props.setAccount({name: 'selected_profession', item});
          Actions.professional();
        }}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderStores() {
    if (this.props.user.seller) {
      return (
        <FlatList
          data={this.props.user.seller}
          renderItem={this.renderSeller.bind(this)}
          keyExtractor={(item) => item._id}
          style={{width: '100%'}}
        />
      );
    }
    return null;
  }

  renderProfessionals() {
    if (this.props.user.professional) {
      return (
        <FlatList
          data={this.props.user.professional}
          renderItem={this.renderProfessional.bind(this)}
          keyExtractor={(item) => item._id}
          style={{width: '100%'}}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />

        <View style={styles.body}>
          {this.renderStores()}
          {this.renderProfessionals()}
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
  container: {flex: 1},
  header: {flex: 0.13},
  body: {
    flex: 0.74,
    padding: widthToDp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {padding: widthToDp(1), flex: 0.13, justifyContent: 'flex-end'},
  title: {fontSize: widthToDp(5), fontWeight: 'bold'},
  label: {fontSize: widthToDp(5), marginTop: heightToDp(5)},

  invite: {alignSelf: 'flex-start'},
  element: {
    height: heightToDp(8),
    width: '100%',

    borderWidth: 0.5,
    borderRadius: widthToDp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {setAccount})(SwitchAccount);
