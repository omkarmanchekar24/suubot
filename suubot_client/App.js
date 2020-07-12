import React, {Component} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Router from './src/Router';
import reducers from './src/reducers';
import {Actions} from 'react-native-router-flux';

console.disableYellowBox = true;
class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }

  handleBackButton() {
    if (
      Actions.currentScene === 'welcome' ||
      Actions.currentScene === 'signin'
    ) {
      BackHandler.exitApp();
    }
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
