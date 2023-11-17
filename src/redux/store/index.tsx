import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, combineReducers, Middleware} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {appReducer} from '@/redux/slices/appReducer';
import {dataReducer} from '@/redux/slices/dataReducer';

const rootReducer = combineReducers({
  app: appReducer,
  data: dataReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  mergeStrategy: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const crashReporter: Middleware = () => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught an exception!', err);
    throw err;
  }
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(crashReporter),
});

export const persistor = persistStore(store);
