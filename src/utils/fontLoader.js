// fontLoader.js

import { useFonts } from '@react-native-async-storage/async-storage';
// import { NunitoRegular, NunitoItalic, NunitoBold } from './assets/fonts';


export const loadFonts = async () => {

  return useFonts({
    YourNormalFontFamily: require('./assets/fonts/NormalFont.ttf'),
    YourItalicFontFamily: require('./assets/fonts/ItalicFont.ttf'),
    YourBoldFontFamily: require('./assets/fonts/BoldFont.ttf'),
  });
};


