import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Rotas from '../../../core/Routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <Rotas />
    </SafeAreaProvider>
  )
}

export default App;
