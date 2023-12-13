import React, {useEffect} from 'react';
import {registerRootComponent} from 'expo';
import {Provider as PaperProvider} from 'react-native-paper';
import { loadFonts } from './src/utils/fontLoader';

import App from './App';


const Main = () => {
  useEffect(() => {
    const loadAsync = async () => {
      await loadFonts();
    };

    loadAsync();
  }, []);

  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

registerRootComponent(Main);
