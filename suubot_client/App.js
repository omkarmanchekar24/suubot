import React, {Component} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import {applyMiddleware, createStore} from 'redux';

import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Router from './src/components/Router';
import reducers from './src/reducers';
import {Actions} from 'react-native-router-flux';
import persist from './src/config/store';

const persistStore = persist();

console.disableYellowBox = true;
class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }

  handleBackButton() {
    ToastAndroid.show('back', ToastAndroid.SHORT);
    if (
      Actions.currentScene === 'welcome' ||
      Actions.currentScene === 'signin' ||
      Actions.currentScene === 'login'
    ) {
      BackHandler.exitApp();
    }
  }

  render() {
    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
