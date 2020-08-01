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
  constructor(props) {
    super(props);
    //this.handleBackButton = this.handleBackButton.bind(this);
  }

  // componentDidMount() {
  //   this.BackHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButton,
  //   );
  // }
  // componentWillUnmount() {
  //   // BackHandler.removeEventListener('hardwareBackPress');
  // }

  // handleBackButton() {
  //   if (Actions.currentScene === 'welcome') {
  //     BackHandler.exitApp();
  //   }
  // }

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
