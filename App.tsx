import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import store from './features';
import Loading from './components/Loading';

let persistor = persistStore(store);
console.log(process.env)

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
         <PersistGate loading={<Loading/>} persistor={persistor}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
         </PersistGate>
      </Provider>
    );
  }
}

