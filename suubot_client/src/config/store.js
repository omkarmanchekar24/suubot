import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {AsyncStorage} from '@react-native-community/async-storage';
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';
import {createLogger} from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'cart'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
//applyMiddleware(ReduxThunk)

const middlewares = [ReduxThunk, createLogger()];

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    composeEnhancers(applyMiddleware(...middlewares)),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};
