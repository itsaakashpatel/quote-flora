// Main.js
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import App from './App';

const Main = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </I18nextProvider>
  );
};

export default Main;
