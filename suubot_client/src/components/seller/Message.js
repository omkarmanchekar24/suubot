import React, {Component} from 'react';
import {Text, View, Share} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {widthToDp, heightToDp} from '../../Responsive';

//Components
import {Header, Footer} from '../../components';

//Actions
import {sendMessage} from '../../actions/seller/storeActions';

class Message extends Component {
  state = {
    message: '',
  };

  invite() {
    Share.share({
      message: 'I invite you to sell your products on Suubot',
    });
  }

  render() {
    const {message} = this.state;
    const {_id} = this.props.selected_store;
    return (
      <View style={styles.container}>
        <Header profile={true} style={styles.header} logout={true} />
        <View style={styles.body}>
          <TextInput
            multiline={true}
            numberOfLines={5}
            label="Type a message to send to your buyers"
            mode="outlined"
            onChangeText={(text) =>
              this.setState({
                message: text,
              })
            }
          />
          <Button
            mode="outlined"
            onPress={() => {
              this.props.sendMessage(_id, message);
            }}
            style={styles.button}>
            Send
          </Button>
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
  body: {flex: 0.74, padding: widthToDp(8)},
  footer: {padding: widthToDp(1), flex: 0.13, justifyContent: 'flex-end'},
  button: {alignSelf: 'flex-start', marginTop: 20},
  invite: {alignSelf: 'flex-start'},
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    selected_store: state.auth.selected_store,
  };
};

export default connect(mapStateToProps, {sendMessage})(Message);
