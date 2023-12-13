// fontLoader.js

import {useFonts} from 'expo-font';

export const loadFonts = async () => {
  return useFonts({
    Nutino: require('./assets/fonts/Nutino-Regular.ttf'),
  });
};
