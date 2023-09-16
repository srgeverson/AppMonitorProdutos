import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Rotas from '../../../core/Routes';
import SQLiteManager from '../../../core/database/SQLiteManager';
import { useColorScheme } from 'react-native';

const App = () => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  useEffect(() => {
    iniciarDB();
  }, [])

  const iniciarDB = async () => {
    await SQLiteManager.initDB();
  }

  return (
    <SafeAreaProvider style={[isDarkTheme ? { backgroundColor: 'black' } : { backgroundColor: 'white' },]}>
      <Rotas />
    </SafeAreaProvider>
  )
}

export default App;
