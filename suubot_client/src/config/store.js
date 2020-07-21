import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from '@react-native-community/async-storage';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
//applyMiddleware(ReduxThunk)
export default () => {
  let store = createStore(
    persistedReducer,
    {},
    composeEnhancers(applyMiddleware(ReduxThunk)),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};


