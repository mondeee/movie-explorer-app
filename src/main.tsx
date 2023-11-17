import React from 'react';
import RootNavigator from './navigation';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaView} from 'react-native';

const Main: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView className="flex-1 bg-primary_bg">
          <RootNavigator />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default Main;
