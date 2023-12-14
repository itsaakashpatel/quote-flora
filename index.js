// Main.js
import React, {useEffect} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
// import {loadFonts} from './src/utils/fontLoader';

import App from './App';

const Main = () => {
  // useEffect(() => {
  //   const loadAsync = async () => {
  //     await loadFonts();
  //   };

  //   loadAsync();
  // }, []);

  return (
    <I18nextProvider i18n={i18next}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </I18nextProvider>
  );
};

export default Main;
