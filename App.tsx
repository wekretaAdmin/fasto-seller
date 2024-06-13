import {LogBox, View} from 'react-native';
import React from 'react';
import AppContainer from './src/navigation/AppContainer';

import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {persistor, store} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
              <AppContainer />
            </PaperProvider>
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
