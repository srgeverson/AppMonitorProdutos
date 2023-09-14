import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Rotas from '../../../core/Routes';
import SQLiteManager from '../../../core/database/SQLiteManager';

const App = () => {

  useEffect(() => {
    iniciarDB();
  }, [])

  const iniciarDB = async () => {
     //await SQLiteManager.dropDatabase();
    await SQLiteManager.initDB();
    await SQLiteManager.fakeData();
  }

  return (
    <SafeAreaProvider>
      <Rotas />
    </SafeAreaProvider>
  )
}

export default App;
