import React, {Component} from 'react';
import {BackHandler, ToastAndroid} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Router from './src/components/Router';
import {Actions} from 'react-native-router-flux';
import persist from './src/config/store';

const persistStore = persist();

console.disableYellowBox = true;
class App extends Component {
  render() {
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
