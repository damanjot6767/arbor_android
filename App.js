import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyStack from './navigationScreen';
import { store, persistor } from './store';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";



const App = () => {
  

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <PersistGate persistor={persistor}>
          <ReduxProvider store={store}>
            <MyStack />
          </ReduxProvider>
        </PersistGate>
      </PaperProvider>
    </SafeAreaProvider>
  );
};


export default App;
