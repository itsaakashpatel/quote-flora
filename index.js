// Main.js
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import { View } from 'react-native';
// import {loadFonts} from './src/utils/fontLoader';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import App from './App';

SplashScreen.preventAutoHideAsync();
const Main = () => {
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./src/assets/fonts/Nunito-Regular.otf'),
    'Nunito-Bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      console.log("FONT LOADED")
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
 <I18nextProvider i18n={i18next}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </I18nextProvider>
    </View>
   
  );
};

export default Main;
