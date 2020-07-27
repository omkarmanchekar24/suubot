import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {widthToDp, heightToDp} from '../Responsive';

import {Actions} from 'react-native-router-flux';

class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (this.props.token) {
        Actions.main();
      } else {
        Actions.auth();
      }
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}> Suubot </Text>
        <Text style={styles.tagline}>Tagline Here</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#546',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: widthToDp(10),
  },
  tagline: {
    color: 'white',
  },
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, null)(Splash);
